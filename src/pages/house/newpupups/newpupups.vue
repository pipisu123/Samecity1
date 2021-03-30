<template>
	<u-mask :show="show" @click="show = false">
		<view class="warp">
			<view class="rect"  @tap.stop @click="navclick">个人
			<image src="../../../static/70.jpg" mode=""  style="width: 80rpx;height: 80rpx;"></image>
			</view>
			<view class="rec" @tap.stop @click="navclick1">经纪人
			<image src="../../../static/70.jpg" mode=""  style="width: 80rpx;height: 80rpx;"></image>
			</view>
		
		</view>
	</u-mask>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				
				}
			},
			methods: {
				navclick(){
					console.log("===========")
					uni.navigateTo({
						url: '/pages/house/newhouserelease/newhouserelease'
					})
				},
				navclick1(){
					console.log("===========")
					uni.navigateTo({
						url: '/pages/house/register/register',
					})
				}
			
		}
	}
</script>

<style scoped>
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		
		
	}

	.rect {
		width: 120px;
		height: 120px;
		background-color:#a0cfff;
        text-align: center;
		padding: 80rpx;
		color: $u-main-color;
		margin-right: 120rpx;
		
		
	}
	.rec {
		width: 120px;
		height: 120px;
		background-color: #a0cfff;
		 text-align: center;
		 padding: 70rpx;
	}
</style>