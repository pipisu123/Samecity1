<template>
	<view>
		<view class="" style="width: 690rpx;margin: 20rpx 30rpx;">
			<u-search placeholder="日照香炉生紫烟" animation v-model="keyword"></u-search>
		</view>
		<u-tabs :list="list" :is-scroll="false" bar-width="60" font-size="26" active-color="#00a95c" :current="current" @change="change"></u-tabs>
		<view class="content" style="width: 690rpx;margin: 20rpx 30rpx;" v-for="(item,index) in questionList" :key="index">
			<view class="" style="width: 690rpx;padding: 20rpx 20rpx;box-sizing: border-box;" @click="godetail">
				<view class=""  style="display: flex;align-items: center;">
					<image :src="item.imgPath" style="width: 80rpx;height: 80rpx;border-radius: 50rpx;" mode=""></image>
				<view class="" style="font-size: 28rpx;margin-left: 20rpx;">
					{{item.userName}}
				</view>
				</view>
				<view class=""  style="font-size: 30rpx;margin: 20rpx 0;">
					{{item.title}}
				</view>
				<view class="" style="display: flex;flex-wrap: wrap;">
					<image :src="item1" style="width: 190rpx;height: 190rpx;margin-left: 10rpx;margin-bottom: 10rpx;" mode=""v-for="(item1,index) in item.pictures" :key="index" v-show="item.pictures[0]!=''"></image>
				</view>
				<view class="" style="padding: 10rpx 10rpx;border-radius: 30rpx;background-color: #f7f7f7;width: 100rpx;text-align: center;font-size: 26rpx;margin-top: 10rpx;">
					问答
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
	import { findQuestionAll } from '../../../util/questions/question.js'
	export default {
		data() {
			return {
				keyword: '遥看瀑布挂前川',
				show:true,
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
				questionList:[],
				imgs:[],
				current: 0
			}
		},
		created() {
			findQuestionAll({
				"type": 0,
				"title": '',
			}).then(res=>{
				console.log(res)
				this.questionList = res.data.data
			}).catch(err=>{
				console.log(err)
			})
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

<style lang="scss">
.content{
	border-bottom: 5px solid #F1F1F1;
}
</style>
