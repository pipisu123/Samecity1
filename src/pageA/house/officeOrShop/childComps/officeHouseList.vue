<template>
	<view class="news">
		<view class="new-items" @click="goDetail(item.id)" v-for="(item,index) in houseList" :key="index">
			<image :src="item.img" mode="scaleToFill"></image>
			<view class="right">
				<view class="title">
					<!-- <view><text class="title-item">{{item.leaseType}} |</text></view> -->
					<view class="title-item">
						<u-parse :html="item.title" :tag-style="style"></u-parse>
					</view>
				</view>
				<view class="square" style="display: flex;">
					<text>{{item.square}}㎡|</text>
					<u-parse :html="item.estateName" :tag-style="style"></u-parse>
				</view>
				<view class="item">
					<view class="item1">
						<text>{{item.decoration}}</text>
					</view>
					<view class="item1" style="margin-left: 10rpx;">
						<text>{{item.isRegisterCompany}}</text>
					</view>
					<view class="item1" style="margin-left: 10rpx;">
						<text>{{item.officeType}}</text>
					</view>
				</view>
				<view style="font-size: 30rpx;color: #ff0000;">{{item.money}}万</view>
			</view>
			<view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			houseList: {
				type: Array,
				default: null
			}
		},
		data() {
			return {
				src: null,
				pic: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				scrollTop: 0,
				style:{
					title: 'font-size: 30rpx'
				},
				html: '出租茂南区文化广场纯写字楼1020室',
				html1:'名雅花园',
			}
		},
		onLoad() {

		},
		created() {
			this.src = this.$store.state.avatar
		},
		methods: {
			goDetail(id) {
				uni.navigateTo({
					url: '/pageA/house/officeDetail/officeDetail?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	.news {
		.new-items {
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
					text{
						font-size: 30rpx;
					}
					.title-item {
						overflow:hidden;
						text-overflow:ellipsis;
						white-space:nowrap; 
					}
					
				}
				.item{
					margin-top: 10rpx;
					display: flex;
					margin-bottom: 10rpx;
					.item1{
						background-color: #5785E5;
						text-align: center;
						border-radius: 10upx;
					}
				}
			}

		}
	}
</style>
