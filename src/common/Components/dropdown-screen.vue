<template>
  <view style="width: 100%;">
    <view class="screen-bar" :style="{'height':height + 'rpx',backgroundColor:bgcolor}">
      <view class="screen-bar-item" @tap.stop="itemClick(index)" v-for="(item,index) in updateArr" :key="index" :style="{'width':(100/listArr.length)+'%','fontSize':barFontSize+'rpx','color':(currentIndex==index&&show)?activeColor:barTextColor}" >
        <view class="bar-item-text">
          {{item}}
        </view>
        <image src="https://i.loli.net/2020/07/15/QsHxlr1gbSImvWt.png" :style="{'transform': show?currentIndex==index? 'rotate(180deg)':'rotate(0)':'rotate(0)'}"></image>
      </view>
	  <view style="width: 60px;text-align: center;margin-top: 25rpx;" @click="SelectMore" v-show="isShowMore != false">
		  <text>行业</text>
	  </view>
      <view class="dropdown-box" :style="{'bottom':'-' + (itemHeight*maxDropdownLength) + 'rpx','height':(itemHeight*maxDropdownLength) + 'rpx',backgroundColor:bgcolor,'opacity':show?'1':'0','display':show?'block':'none'}">
        <scroll-view scroll-y="true" style="height: 100%;">
          <view class="dropdown-item" :style="{'height':itemHeight+'rpx','paddingLeft':itemPadding+'rpx','fontSize':itemFontSize+'rpx','color':itemTextColor}" v-for="(item,index) in itemArr[currentIndex]" :key="index" @tap.stop="subItemClick(index,item)">
            {{item[showTag]}}
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="bg-mask" :class="[show?'bg-mask-show':'']" @tap="maskClose" @touchmove="touchControl"></view>
  </view>

</template>

<script>
  /**
   *  下拉组件
   * @author xzj
   * @create date 2021-4-3
   * @update user xzj
   * @update date 2021-4-3
   * @note 遮罩层级98 筛选条&下拉层层级99
   **/
	export default {
    name:'com-dropdown-screen',
		data() {
			return {
        currentIndex:0,
        currentSubIndex:0,
        show:false,
        updateArr:[]
			};
		},
    computed:{
      maxDropdownLength(){
        return this.itemArr[this.currentIndex].length > this.maxItemCount ? this.maxItemCount : this.itemArr[this.currentIndex].length
      }
    },
    props:{
	  // 是否显示更多
	  isShowMore:{
		  type:Boolean,
		  default:null
	  },
      // 筛选条高度 （rpx）
      height:{
        type:Number,
        default:88
      },
      // 下拉单项高度
      itemHeight:{
        type:Number,
        default:88
      },
      // 当前文字活跃颜色
      activeColor:{
        type:String,
        default:'#0377fc'
      },
      //背景颜色
      bgcolor:{
        type:String,
        default:'#fff'
      },
      //下拉标题数组
      listArr:{
        type:Array,
        default:()=>{
          return []
        }
      },
      // item数量超过多少开始滚动
      maxItemCount:{
        type:Number,
        default:5
      },
      //下拉选项数组（二维数组）
      itemArr:{
        type:Array,
        default:()=>{
          return [
		
		]
        }
      },
      // 选项左偏移
      itemPadding:{
        type:Number,
        default:34
      },
      // 能否遮罩关闭
      maskTouch:{
        type:Boolean,
        default:true
      },
      // 是否需要选择后替换标题
      isNeedChangeTitle:{
        type:Boolean,
        default:true
      },
      // 标题字号
      barFontSize:{
        type:Number,
        default:30
      },
      //标题颜色
      barTextColor:{
        type:String,
        default:'#666'
      },
      //下拉字号
      itemFontSize:{
        type:Number,
        default:30
      },
      // 下拉文字颜色
      itemTextColor:{
        type:String,
        default:'#666'
      },
      // 需要展示的字段，比如你的数据是item.name 这里填的就是name
      showTag:{
        type:String,
        default:'name'
      },
      // 是否要滑动关闭
      isTouchPrevent:{
        type:Boolean,
        default:true
      }
    },
    mounted() {
      this.updateArr = [...new Set(this.listArr)]
    },
    methods:{
		// 选择更多
	  SelectMore(){
		 this.$emit('SelectMore') 
	  },
      itemClick(index){
		 this.$emit('itemClick',index)
        if(this.currentIndex==index) {
          this.show = !this.show
        }else{
          this.currentIndex = index
          this.show = true
        }
      },
      subItemClick(index,item){
		this.$emit('subItemClick',item)
        this.currentSubIndex = index
        if(this.isNeedChangeTitle){
          this.updateArr.splice(this.currentIndex,1,this.itemArr[this.currentIndex][this.currentSubIndex][this.showTag])
        }
        this.$emit('finish',{
          '$index':this.currentIndex,
          ...this.itemArr[this.currentIndex][this.currentSubIndex]
        })
        this.show = false
      },
      maskClose(){
        if(!this.maskTouch) return
        this.show = false
      },
      //
      touchControl(){
        if(this.isTouchPrevent){
          this.maskClose()
        }
      }
    }
	}
</script>

<style>
.screen-bar{
  width: 100%;
  display: flex;
  position: relative;
  z-index: 99;
}
.screen-bar::after{
  position: absolute;
  content: '';
  width: 100%;
  height: 1rpx;
  background-color: #EEEEEE;
  bottom: -1rpx;
  left: 0;
  z-index: 99;
}
.screen-bar-item{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.screen-bar-item image{
  width: 24rpx;
  height: 16rpx;
  display: block;
  margin-left: 12rpx;
  transition: all .3s;
  flex-shrink: 0;
}
.dropdown-box{
  width: 100%;
  position: absolute;
  left: 0;
  z-index: 99;
  overflow: hidden;
}
.dropdown-item{
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  box-sizing: border-box;
  font-size: 28rpx;
  color: #111111;
  border-bottom: 1rpx solid #EEEEEE;
}
	.bg-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 98;
		transition: all 0.3s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}

	.bg-mask-show {
		visibility: visible;
		opacity: 1;
	}
  .bar-item-text{
    max-width: 120rpx;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
