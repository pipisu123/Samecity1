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
			<view v-if="collection === 1" @click="unCollect">
					<view>
					 <image src="../../../static/collect.png" mode="aspectFill" style="width: 40rpx;height: 40rpx;"></image>
					  <view class="">
					  	<text style="color: #f4ea2a;">已收藏</text>
					  </view>
					</view>
				</view>
				<view v-else @click="Collect">
					<view>
					<u-icon name="star" size=45></u-icon>
					  <view class="">
					  	<text>收藏</text>
					  </view>
					</view>
				</view>
				 <u-toast ref="uToast" />
			</view>
		<view class="button">
			<u-button type="warning" @click="deliveryResume" :disabled="disabled" v-if="delivery===0">{{Delivery}}</u-button>
			<u-button type="warning" @click="deliveryResume" disabled=true v-else>已投递</u-button>
		</view>
	</view>
</template>

<script>
	export default {
	props: {
		collection: {
			type: Number,
			default: null
		},
		delivery: {
			type: Number,
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
		// 收藏
		Collect(){
			this.$emit('Collect')
		},
		// 取消收藏
		unCollect(){
			this.$emit('unCollect')
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