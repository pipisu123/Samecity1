<template>
	<view v-if="list.length!=0">
		<view class="resumelist" v-for="item in list" :key="item">
			<u-avatar :src="item.src" size=100 show-sex=true sex-icon="man"></u-avatar>
			<view class="right">
				<view class="title">
					<text class="name">{{item.resume.resumeName}}</text>
				</view>
				<view class="base">
					<view class="">
						<text>{{item.resume.sex}}岁-</text>
					</view>
					<view class="">
						<text>{{item.resume.maxDegree}}-</text>
					</view>
					<view class="">
						<text>{{item.workCity}}</text>
					</view>
					<view class="">
						<text>{{item.resume.workCity.split("-")[2]}}</text>
					</view>
				</view>
				<view class="work">
					<text>职位：{{item.resume.industry}}</text>
					<view class="worktype">
						<text>{{item.resume.workType}}</text>
					</view>
				</view>
				<view class="wages">
					<text>期望工资：{{item.resume.compensation}}</text>
				</view>
			</view>
			<view class="time">
				<text>{{item.collectionTime.split("T")[0]}}</text>
			</view>
		</view>
	</view>
	<view v-else>
		<u-empty text="暂无简历收藏" mode="list" margin-top=600></u-empty>
	</view>
</template>

<script>
	import { findResumecollection } from '../../../../util/resumecollection.js'
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.getResumeCollection()
		},
		methods: {
			getResumeCollection(){
				findResumecollection({
					"userId": "8040423884719751168"
				}).then(res=>{
					console.log(res)
					this.list = res.data.data.CollectionResumeVOs;
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.resumelist{
		display: flex;
		padding: 20rpx 20rpx;
		border-bottom: 2rpx solid #F1F1F1;
		.right{
			margin-left: 15rpx;
			margin-right: 40rpx;
			view{
					font-size: 25rpx;
					
			}
			.title{
				display: flex;
				.name{
					width: 300rpx;
					font-weight: bold;
					font-size: 30rpx;
				}
				
			}
			.base{
				display: flex;
				view{
					margin: 0rpx 5rpx 0rpx;
				}
				
			}
			}
			.work{
				display: flex;
				.worktype{
					margin-left: 15rpx;
					font-size: 20rpx;
					color: #999999;
				}
			}
			.wages{
				color: #FF0000;
			}
			.time{
				font-size: 25rpx;
				color: #C0C0C0;
				margin-left: 50px;
			}
	}

</style>
