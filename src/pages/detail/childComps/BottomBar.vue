<template>
	<view class="bottom-bar">
		<view class="bar-item">
			<view class="" @click="Callphone">
				<view>
				 <u-icon name="phone" size=45></u-icon>
				  <view class="">
				  	<text>电话</text>
				  </view>
				</view>
			</view>
			<view class="" @click="gochat(releaseUserId)">
				<view>
				 <u-icon name="chat" size=45></u-icon>
				  <view class="">
				  	<text>微聊</text>
				  </view>
				</view>
			</view>
			<view class="defa" :class="{'active': rSelect.indexOf()!=-1}" @tap="tapInfo()" v-if="collectId === '0'">
				<view>
				 <u-icon name="star" size=45></u-icon>
				  <view>
				  	<text>{{collectName}}</text>
				  </view>
				</view>
			</view>
			<view class="defa" :class="{'active': rSelect.indexOf()!=1}" @tap="tapInfo1()" v-else>
				<view>
				 <u-icon name="star" size=45></u-icon>
				  <view>
				  	<text>已收藏</text>
				  </view>
				</view>
			</view>
		</view>
		<view class="button">
			<u-button type="warning" @click="deliveryResume" :disabled="disabled" v-if="DeliveryId==='0'">{{Delivery}}</u-button>
			<u-button type="warning" @click="deliveryResume" disabled=true v-else>已投递</u-button>
		</view>
	</view>
</template>

<script>
	export default {
	props: {
		collectId: {
			type: String,
			default: null
		},
		DeliveryId: {
			type: String,
			default: null
		},
		releaseUserId: {
			type: String,
			default: null
		},
	},
	 data(){
	   return{
	       rSelect:[],
		   collectName:'收藏',
		   Delivery:'投递简历',
		   disabled:false
	  }
	},
	methods:{
		tapInfo(e) {
			if (this.rSelect.indexOf(e) == -1) {
				this.rSelect.push(e);//选中添加到数组里
				this.$emit('Collect')
				this.collectName = '已收藏'
				
			} else {
				this.rSelect.splice(this.rSelect.indexOf(e), 1); //取消
			    this.$emit('UnCollect')
				this.collectName = '收藏'	
					console.log("取消收藏")
			}
			
		},
		// 第二次进来取消收藏
		tapInfo1(e){
			this.rSelect.splice(this.rSelect.indexOf(e), 1);
			this.$emit('UnCollect1')
			this.collectName = '收藏'
			console.log("取消收藏")
		},
		// 拨打电话
		Callphone(){
			this.$emit('Callphone')
		},
		// 投递简历
		deliveryResume(){
			this.Delivery ='已投递'
			this.disabled = true
			this.$emit('Delivery')
		},
		// 跳转聊天
		gochat(releaseUserId){
			this.$emit('gochat',releaseUserId)
		}
	}
	}
</script>

<style lang="scss" scoped>
	.bottom-bar{
		height: 45px;
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
	// 收藏
	.defa{
		 width: 100%;
		// height: 50rpx;
		margin-right: 10rpx;
	}
	.active{
		 width: 100%;
		// height: 50rpx;
		// color: white;
		border: 1px solid #e5e5e5;
		background-color: #ff5d00;
	}
	.button{
		width: 50%;
		margin-top: 5rpx;
	}
</style>