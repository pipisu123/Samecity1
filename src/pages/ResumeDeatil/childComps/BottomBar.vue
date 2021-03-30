<template>
	<view class="bottom-bar">
		<view class="bar-item">
			<view class="" @click="gochat(userId)">
				<view>
				 <u-icon name="chat" size=45></u-icon>
				  <view class="">
				  	<text>微聊</text>
				  </view>
				</view>
			</view>
			<view class="defa" :class="{'active': rSelect.indexOf()!=-1}" @tap="tapInfo()" v-if="collectionResumeId === '0'">
				<view>
				 <u-icon name="star" size=45></u-icon>
				  <view>
				  	<text>{{status}}</text>
				  </view>
				</view>
			</view>
			<view class="defa" :class="color" @tap="tapInfo1()" v-else>
				<view>
				 <u-icon name="star" size=45></u-icon>
				  <view>
				  	<text>{{status1}}</text>
				  </view>
				</view>
			</view>
		</view>
		<view class="bar-item bar-right" @click="buyResume">
			<view>
				<view class="send">购买简历</view>
			</view>
		</view>
		<u-modal v-model="show" :show-cancel-button="true" 
					:show-title="showTitle" 
					@confirm="confirm" :content="content"></u-modal>
	</view>
</template>

<script>
	export default {
	props: {
		userId: {
			type: String,
			default: null
		},
		collectionResumeId:{
			type: String,
			default: null
		},
	},
	 data(){
	   return{
	       rSelect:[],
		   show:false,
		   content:'是否花费10积分购买此简历',
		   showTitle:true,
		   status:'收藏',
		   status1:'已收藏',
		   color:'active'
	  }
	},
	methods:{
		// 收藏与取消收藏
		tapInfo(e) {
			if (this.rSelect.indexOf(e) == -1) {
				this.rSelect.push(e);//选中添加到数组里
				this.$emit('Collect')
				console.log("收藏")
				this.status = '已收藏'
			} else {
				this.rSelect.splice(this.rSelect.indexOf(e), 1); //取消
			    this.$emit('UnCollect')
				this.status ='收藏'
			}
			
		},
		tapInfo1(e){
			console.log("取消")
			this.color = 'active1'
			this.status1 = '收藏'
			this.$emit('UnCollect')
		},
		// 聊天
		gochat(userId){
			this.$emit('gochat',userId)
		},
		// 购买简历
		buyResume(){
			this.show = true
		},
		confirm(){
			this.$emit('buyResume')
		}
	}
	}
</script>

<style lang="scss" scoped>
	.bottom-bar{
		height: 49px;
		background: #FFFFFF;
		border-top: 3rpx solid #F1F1F1;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		text-align: center;
	}
	.bar-item{
		flex: 1;
		display: flex;
	}
	.bar-item>view {
	  flex: 1;
	}
	.bar-right {
	  font-size: 15px;
	  color: #fff;
	  line-height: 49px;
	}
	.bar-right .send {
	  background-color: #ffe817;
	  color: #333;
	}
	// 收藏
	.defa{
		 width: 100%;
		// height: 50rpx;
		margin-right: 10rpx;
	}
	.active{
		 width: 100%;
		background-color: #ff5d00;
	}
	.active1{
		 width: 100%;
		background-color: #FFFFFF;
	}
</style>