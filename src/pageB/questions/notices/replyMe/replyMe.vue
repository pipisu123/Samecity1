<template>
	<view class="notice">
		<view class="notice-itme" v-for="(item,index) in noticeList" :key="index" @click="questionDetail(item.questionId)">
			<view class="head">
				<text>关于您的问题：</text>
			</view>
			<view style="background-color: #FFFFFF;height: 40px;border-radius: 2%;padding: 15rpx;margin-top: 10rpx;">
				{{item.title}}
			</view>
			<view class="" style="margin-top: 15rpx;">
				<text style="color: #10AEFF;">得到一个回复：</text>
				<text>{{item.theme}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { findNotice } from '@/util/questions/notice.js'
	export default {
		data() {
			return {
				noticeList:[]
			}
		},
		onLoad() {
			this.getNotices()
		},
		methods: {
		
			questionDetail(questionId){
				console.log("===============")
				uni.navigateTo({
					url:'/pages/questions/detailpage/detailpage?questionId='+questionId
				})
			},
			getNotices(){
				findNotice({
					
				}).then(res=>{
					console.log(res)
					this.noticeList = res.data.data
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss">
	.notice{
		padding: 10rpx;
		.notice-itme{
			padding: 15rpx;
			margin-top: 10rpx;
			border-radius: 2%;
			background-color: #F1F1F1;
		}
	}
</style>
