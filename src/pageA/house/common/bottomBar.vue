<template>
	<view class="bottom-bar">
		<view class="bar-item">
			<view class="" @click="share">
				<view>
				 <u-icon name="share" size=45></u-icon>
				  <view class="">
				  	<text>分享</text>
				  </view>
				</view>
			</view>
			<view class="" @click="gochat">
				<view>
				 <u-icon name="chat" size=45></u-icon>
				  <view class="">
				  	<text>微聊</text>
				  </view>
				</view>
			</view>
			<view v-if="isFavorites === true" @click="unCollect">
				<view>
				 <image src="../../../static/collect.png" mode="aspectFill" style="width: 40rpx;height: 40rpx;"></image>
				  <view class="">
				  	<text style="color: #f4ea2a;">已收藏</text>
				  </view>
				</view>
			</view>
			<view v-else @click="Collect">
				<view>
				<image src="../../../static/uncollect%20(2).png" mode="aspectFill" style="width: 40rpx;height: 40rpx;"></image>
				  <view class="">
				  	<text>收藏</text>
				  </view>
				</view>
			</view>
		</view>
		<view class="button">
			<u-button type="success" @click="toCall">拨打电话</u-button>
		</view>
	</view>
</template>

<script>
	export default {
	props: {
		isFavorites: {
			type: Boolean,
			default: null
		}
	},
	 data(){
	   return{
		   
	  }
	},
	methods:{
		// 打电话
		toCall(){
			this.$emit('toCall')
		},
		// 收藏
		Collect(){
			this.$emit('Collect')
		},
		// 取消收藏
		unCollect(){
			this.$emit('unCollect')
		},
		// 跳转聊天
		gochat(){
			this.$emit('gochat')
		},
		// 分享
		share(){
			this.$emit('share')
		},
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
		// height: 50rpx;
		// color: white;
		border: 1px solid #e5e5e5;
		background-color: #ff5d00;
	}
	.button{
		width: 50%;
		margin-top: 8rpx;
	}
</style>