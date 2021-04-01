<template>
	<view>
		<view class="" style="width: 690rpx;margin: 20rpx 30rpx;">
			<u-search placeholder="日照香炉生紫烟" animation v-model="keyword"></u-search>
		</view>
		<u-tabs :list="list" :is-scroll="false" bar-width="60" font-size="26" active-color="#00a95c" :current="current" @change="change"></u-tabs>
		<view class="" style="width: 690rpx;margin: 20rpx 30rpx;">
			<view class="" style="width: 690rpx;padding: 20rpx 20rpx;box-sizing: border-box;" @click="godetail">
				<view class=""  style="display: flex;align-items: center;">
					<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fs10.sinaimg.cn%2Fmiddle%2F4a8ee5a3t8da2e58b9f09%26690&refer=http%3A%2F%2Fs10.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619421539&t=3257f544d9187916d47eddc4bd69cf27" style="width: 80rpx;height: 80rpx;border-radius: 50rpx;" mode=""></image>
				<view class="" style="font-size: 28rpx;margin-left: 20rpx;">
					猫屎天使or猫屎魔
				</view>
				</view>
				<view class=""  style="font-size: 30rpx;margin: 20rpx 0;">
					猫屎天使or猫屎魔鬼
				</view>
				<view class="" style="display: flex;flex-wrap: wrap;">
					<image src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3346927711,3356608027&fm=11&gp=0.jpg" style="width: 190rpx;height: 190rpx;margin-left: 10rpx;margin-bottom: 10rpx;" mode=""></image>
					<image src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3346927711,3356608027&fm=11&gp=0.jpg" style="width: 190rpx;height: 190rpx;margin-left: 10rpx;margin-bottom: 10rpx;" mode=""></image>
					<image src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3346927711,3356608027&fm=11&gp=0.jpg" style="width: 190rpx;height: 190rpx;margin-left: 10rpx;margin-bottom: 10rpx;" mode=""></image>
				</view>
				<view class="" style="padding: 10rpx 10rpx;border-radius: 30rpx;background-color: #f7f7f7;width: 100rpx;text-align: center;font-size: 26rpx;margin-top: 10rpx;">
					猫屎吧
				</view>
				<view class=""style="display: flex;justify-content: space-between;margin-top: 30rpx;">
					<view class="" style="display: flex;">
						<view class="" style="display: flex;align-items: center;">
							<u-icon name="zhuanfa"  size="30"></u-icon>
							<view style="font-size: 26rpx;margin-left: 20rpx;">100</view>
						</view>
						<view class="" style="display: flex;align-items: center;margin-left: 50rpx;">
							<u-icon name="chat"  size="30"></u-icon>
							<view style="font-size: 26rpx;margin-left: 20rpx;">2016</view>
						</view>
					</view>
					<view class="" style="display: flex;align-items: center;margin-left: 50rpx;">
						<u-icon name="thumb-up"  size="30"></u-icon>
						<view style="font-size: 26rpx;margin-left: 20rpx;">2016</view>
					</view>
				</view>
			</view>
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '遥看瀑布挂前川',
				list: [{
					name: '推荐'
				},
				{
					name: '游戏'
				},
				{
					name: '动漫',
					// count: 5
				},
				{
					name: '体育'
				},
				{
					name: '情感'
				},
				{
					name: '文学'
				},
				],
				current: 0
			}
		},
		components:{
			
		},
		methods: {
			godetail(){
				uni.navigateTo({
					url:'/pages/questions/detailpage/detailpage'
				})
			},
			change(index) {
				this.current = index;
					
				
			}
		}
	}
</script>

<style>

</style>
