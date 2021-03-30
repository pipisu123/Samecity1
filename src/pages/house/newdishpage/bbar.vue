<template>
	<view class="bottom-bar">
		<view class="bar-item">
			<view class="">
				<view>
				 <u-icon name="phone" size=45></u-icon>
				  <view class="">
				  	<text>电话</text>
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
			<view  class="defa" :class="{'active': rSelect.indexOf()!=-1}" @tap="tapInfo()">
				<view>
				 <u-icon name="star" size=45></u-icon>
				  <view class="">
				  	<text>收藏</text>
				  </view>
				</view>
			</view>
			 <u-toast ref="uToast" />
		</view>
		<view class="bar-item bar-right">
			<view>
				<view class="send">致电售楼处</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	 data(){
	   return{
	       rSelect:[]
	  }
	},
	methods:{
		tapInfo(e) {
			if (this.rSelect.indexOf(e) == -1) {
				this.rSelect.push(e);//选中添加到数组里
				this.$refs.uToast.show({
					title: '收藏成功',
					type: 'default',
					// url: '/pages/user/index'
					})
				console.log("收藏成功")
			} else {
				this.rSelect.splice(this.rSelect.indexOf(e), 1); //取消
				this.$refs.uToast.show({
					title: '已取消收藏',
					type: 'default',
					// url: '/pages/user/index'
					})
					console.log("取消收藏")
			}
			
		},
		gochat(){
			this.$emit('gochat')
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
		// height: 50rpx;
		// color: white;
		border: 1px solid #e5e5e5;
		background-color: #ff5d00;
	}
</style>