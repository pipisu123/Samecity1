<template>
	<view class="" v-if="list.length!=0">
		<view class="collection" v-for="(item,index) in list" :key="index" @click="goRecruitmentDetail(item.recruitmentId)">
			<view class="title">
				<text>{{item.recruitmentTitle}}</text>
			</view>
			<view class="wage">
				<text>{{item.wages}}/月</text>
			</view>
			<u-line color="info" border-style="dotted"/>
			<view class="companyname">
			<image :src="'http://192.168.3.77:8080/'+item.logoPicturePath" mode="aspectFill" style="width: 40rpx;height: 40rpx;border-radius: 50rpx;"></image>
				<text style="margin-left: 10rpx;">{{item.companyName}}</text>
			</view>
		</view>
	</view>
	<view v-else>
		<u-empty text="暂无招聘收藏" mode="list" margin-top=600></u-empty>
	</view>
</template>

<script>
	import { findMycollection } from '@/util/collection.js'
	export default {
		data() {
			return {
				list:[]
			}
		},
		onLoad() {
			this.getMyCollection()
		},
		methods: {
			// 招聘收藏列表
			getMyCollection(){
				uni.showLoading({
					title:'正在加载中...'
				})
				findMycollection({
					
				}).then(res=>{
					console.log(res)
					console.log("====")
					uni.hideLoading()
					uni.showToast({
						title:'加载完毕'
					})
					this.list = res.data.data.collectionRecruitmentVOs
					console.log(this.list)
				}).catch(err=>{
					console.log(err)
				})
			},
			// 跳转到招聘详情
			goRecruitmentDetail(recruitmentId){
				uni.navigateTo({
					url:'/pages/detail/detail?recruitmentId=' + recruitmentId
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.collection{
		padding: 15rpx;
		margin: 15rpx;
		background: #F1F1F1;
		border-radius: 10px;
		.title{
		    font-weight: bold;
			font-size: 30rpx;
			margin-bottom: 10rpx;
		}
		.wage{
			margin-bottom: 10rpx;
			color: #FF0000;
		}
	}
	.companyname{
		margin-top: 10rpx;
		display: flex;
		.address{
			margin-left: 300rpx;
		}
	}
    
	
</style>
