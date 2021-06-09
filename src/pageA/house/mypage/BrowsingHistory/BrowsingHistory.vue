<template>
	<view class="house" v-if="HistoryList.length !=0">
		<u-modal ref="uModal" v-model="show" :show-cancel-button="true"  :async-close="asyncClose" title="提示"
		 @confirm="confirm" :content="content" confirm-text="确定">
		</u-modal>
		<view class="house-items" v-for="(item,index) in HistoryList" :key="index" @click="goDetail(item.id,item.houseType)">
			<image :src="item.img" mode="aspectFill"></image>
			<view class="right">
				<view class="title">
					<view><text class="title-item">{{item.houseTypeName}}|</text></view>
					<view class="title-item">
						<text>{{item.title}}</text>
					</view>
				</view>
				<view class="industry" style="display: flex;margin-top: 15rpx;font-size: 30rpx;margin-bottom: 25rpx;">
					<view class="money">
						<text v-if="item.houseType === 1">{{item.money}}</text>
						<text v-else-if="item.houseType === 2">{{item.money}}</text>
						<text v-else-if="item.houseType === 3">{{item.money}}</text>
						<text v-else-if="item.houseType === 4">{{item.money}}</text>
						<text v-else-if="item.houseType === 5">{{item.money}}</text>
						<text v-else-if="item.houseType === 6">{{item.money}}</text>
						<text v-else-if="item.houseType === 7">{{item.money}}</text>
					</view>
					<text>{{item.square}}㎡</text>
				</view>
				<view style="display: flex;justify-content: space-between;">
					<view>
						<text>{{item.city}}</text>
						<text style="margin-left: 20rpx;">{{item.district}}</text>
					</view>
					<view style="color: #999999;display: flex;">
						<image src="../../../../static/eye.png" mode="aspectFill" style="width: 35rpx;height: 35rpx;"></image>
						<view style="margin-left: 10rpx;">{{item.time}}</view>
					</view>
				</view>
			</view>
			<view>
			</view>
		</view>
		<view class="delete">
			<u-button type="error" @click="deleteHistory" throttle-time=3000>清空浏览记录</u-button>
		</view>
	</view>
	<view v-else>
		<u-empty text="暂无浏览记录" mode="list" margin-top=600></u-empty>
	</view>
</template>

<script>
	import {
		getBrowsingHistoryList,
		deleteAllBrowsingHistory
	} from '@/util/house/housecommon.js'
	export default {
		data() {
			return {
				title: '三房一厅，出租',
				show: false,
				HistoryList: [],
				content:'是否清除所有浏览记录？'
			}
		},
		onLoad() {
			this.getHistoryList();
		},
		methods: {
			getHistoryList() {
				getBrowsingHistoryList({

				}).then(res => {
					console.log(res)
					this.HistoryList = res.data.data;
				}).catch(err => {
					console.log(err)
				})
			},
			goDetail(id,houseType){
				if(houseType === 1){
					uni.navigateTo({
						url:'/pageA/house/detailpage/detailpage?id='+id
					})
				}else if(houseType === 2){
					uni.navigateTo({
						url:'/pageA/house/secondhandhousingpage/secondhandhousingpage?id='+id
					})
				}else if(houseType === 3){
					uni.navigateTo({
						url:'/pageA/house/officeDetail/officeDetail?id='+id
					})
				}else if(houseType === 4){
					uni.navigateTo({
						url:'/pageA/house/officeDetail/officeDetail?id='+id
					})
				}else if(houseType === 5){
					uni.navigateTo({
						url:'/pageA/house/shopDetail/shopDetail?id='+id
					})
				}else if(houseType === 6){
					uni.navigateTo({
						url:'/pageA/house/shopDetail/shopDetail?id='+id
					})
				}else if(houseType === 7){
					uni.navigateTo({
						url:'/pageA/house/shopDetail/shopDetail?id='+id
					})
				}
			},
			deleteHistory(){
				this.show = true
			},
			// 确定删除所有浏览记录
			confirm(){
				deleteAllBrowsingHistory({
					
				}).then(res=>{
					console.log(res)
					this.getHistoryList()
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.house {
		margin-bottom: 49px;
		.house-items {
			width: 100%;
			display: flex;
			padding: 15rpx 20rpx;
			border-bottom: 2rpx solid #F1F1F1;
			image {
				min-width: 30rpx;
				max-width: 200rpx;
				min-height: 30rpx;
				max-height: 160rpx;
			}
			.right {
				width: 450rpx;
				margin-left: 15rpx;
				margin-right: 40rpx;

				view {
					font-size: 23rpx;
				}
				.title {
					font-weight: bold;
					font-size: 80rpx;
					display: flex;
					text {
						font-size: 30rpx;
					}
					.title-item {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
				.money {
					color: #ff0000;
					font-size: 30rpx;
					margin-right: 20rpx;
				}
			}
		}
	}
	.info {
		margin-top: 15rpx;
		.time {
			font-size: 20rpx;
		}
	}
	.delete{
		position: fixed;
		left: 0;
		width: 100%;
		bottom: 0;
		height: 49px;
		z-index: 9999;
		border-top: #e5e5e5 solid 1px;
		box-sizing: content-box;
		background-color: #F3F3F3;
	}
</style>
