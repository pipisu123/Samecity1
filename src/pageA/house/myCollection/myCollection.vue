<template>
	<view class="house" v-if="CollectList.length !=0">
		<u-modal ref="uModal" v-model="show" :show-cancel-button="true" :async-close="asyncClose" title="提示" @confirm="confirm"
		 :content="content" confirm-text="确定">
		</u-modal>
		<view class="house-items" v-for="(item,index) in CollectList" :key="index" @click="goDetail(item.id,item.houseType)">
			<image :src="item.img" mode="aspectFill"></image>
			<view class="right">
				<view class="title">
					<view>
						<text class="title-item" v-if="item.houseType === 1">出租|</text>
						<text class="title-item" v-else-if="item.houseType === 2">二手房|</text>
						<text class="title-item" v-else-if="item.houseType === 3">写字楼出租|</text>
						<text class="title-item" v-else-if="item.houseType === 4">写字楼出售|</text>
						<text class="title-item" v-else-if="item.houseType === 5">商铺出租|</text>
						<text class="title-item" v-else-if="item.houseType === 6">商铺出售|</text>
						<text class="title-item" v-else-if="item.houseType === 7">商铺转租|</text>
					</view>
					<view class="title-item">
						<text>{{item.title}}</text>
					</view>
				</view>
				<view class="industry" style="display: flex;margin-top: 15rpx;font-size: 25rpx;margin-bottom: 25rpx;color: #999999;">
					<text>{{item.city}}</text>
					<view style="margin-left: 20px;">
						<text>{{item.district}}</text>
					</view>
				</view>
				<view style="display: flex;">
					<view class="money">
						<text>{{item.money}}</text>
					</view>
					<text style="margin-left: 20rpx;margin-top: 5rpx;">{{item.square}}㎡</text>
				</view>
			</view>
			<view>
			</view>
		</view>
	</view>
	<view v-else>
		<u-empty text="暂无浏览记录" mode="list" margin-top=600></u-empty>
	</view>
</template>

<script>
	import {
		getFavoritesList,
		deleteFavorites
	} from '@/util/house/housecommon.js'
	export default {
		data() {
			return {
				title: '三房一厅，出租',
				show: false,
				CollectList: [],
				content: '是否清除所有浏览记录？'
			}
		},
		onLoad() {
			this.getCollectList();
		},
		methods: {
			getCollectList() {
				getFavoritesList({

				}).then(res => {
					console.log(res)
					this.CollectList = res.data.data;
				}).catch(err => {
					console.log(err)
				})
			},
			goDetail(id, houseType) {
				if (houseType === 1) {
					uni.navigateTo({
						url: '/pageA/house/detailpage/detailpage?id=' + id
					})
				} else if (houseType === 2) {
					uni.navigateTo({
						url: '/pageA/house/secondhandhousingpage/secondhandhousingpage?id=' + id
					})
				} else if (houseType === 3) {
					uni.navigateTo({
						url: '/pageA/house/officeDetail/officeDetail?id=' + id
					})
				} else if (houseType === 4) {
					uni.navigateTo({
						url: '/pageA/house/officeDetail/officeDetail?id=' + id
					})
				} else if (houseType === 5) {
					uni.navigateTo({
						url: '/pageA/house/shopDetail/shopDetail?id=' + id
					})
				} else if (houseType === 6) {
					uni.navigateTo({
						url: '/pageA/house/shopDetail/shopDetail?id=' + id
					})
				} else if (houseType === 7) {
					uni.navigateTo({
						url: '/pageA/house/shopDetail/shopDetail?id=' + id
					})
				}
			},
			deleteHistory() {
				this.show = true
			},
			// 确定删除所有浏览记录
			confirm() {
				deleteAllBrowsingHistory({

				}).then(res => {
					console.log(res)
					this.getHistoryList()
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.house {
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

	.delete {
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
