<template>
	<view class="news">
		<view class="new-items" @click="goDetail(item.id)" v-for="(item,index) in houselist" :key="index">
			<image :src="item.img" mode=""></image>
			<view class="right">
				<view class="title">
					<view><text class="title-item">{{item.leaseType}} |</text></view>
					<view class="title-item">
						<u-parse :html="item.title" :tag-style="style"></u-parse>
					</view>
				</view>
				<view class="industry" style="display: flex;">
					<text>{{item.roomNum}}室.</text>
					<text>{{item.square}}㎡</text>
					<text>|{{item.orientation}}|</text>
					<u-parse :html="item.community" :tag-style="style"></u-parse>
				</view>
				<view class="wagess">
					<text>{{item.identityType}}|</text>
					<text>{{item.elevator}}</text>
					</view>
					<view class="wrap">
						<u-row gutter="16">
							<u-col span="4">
								<view class="demo-layout bg-purple">
									<text v-if="item.deposit===1&&item.payment===1">押一付一</text>
									<text v-else-if="item.deposit===1&&item.payment===2">押一付二</text>
									<text v-else-if="item.deposit===2&&item.payment===1">押二付一</text>
									<text v-else-if="item.deposit===2&&item.payment===2">押二付二</text>
									<text v-else-if="item.deposit===1&&item.payment===3">押一付三</text>
									<text v-else-if="item.deposit===3&&item.payment===1">押三付一</text>
									<text v-else-if="item.deposit===2&&item.payment===3">押二付三</text>
									<text v-else-if="item.deposit===6">半年付</text>
									<text v-else-if="item.deposit===12">年付</text>
								</view>
							</u-col>
							<u-col span="4">
								<view class="demo-layout bg-purple-light">
									<text>{{item.decoration}}</text>
								</view>
							</u-col>
							<u-col span="4">
								<view class="demo-layout bg-purple-dark">
									<text>{{item.canLookTime}}</text>
								</view>
							</u-col>
						</u-row>
						</u-row>
					</view>
				<view class="money">
					<text>{{item.money}}元/月</text>
				</view>
			</view>
			<view>	
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			houselist: {
				type: Array,
				default: null
			}
		},
		data() {
			return {
				src: null,
				pic: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				scrollTop:0,
				style:{
					title: 'font-size: 30rpx'
				},
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
					url:'/pageA/house/detailpage/detailpage?id='+id
				})
			},
	}
	}
	
</script>

<style lang="scss">
	.wrap {
		padding: 2rpx;
	}
	
	.u-row {
		margin: 40rpx 0;
	}
	
	.demo-layout {
		height: 30rpx;
		border-radius: 8rpx;
	}
	
	.bg-purple {
		background: #a0cfff;
		 text-align: center;
		 padding: 2rpx;
	}
	
	.bg-purple-light {
		background: #a0cfff; 
	    text-align: center;
		padding: 2rpx;
		
	}
	.bg-purple-dark {
		background: #a0cfff;
		 text-align: center;
		 padding: 2rpx;
	}
	.news {
		.new-items {
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
				width: 400rpx;
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
				.money{
				 color: #ff0000;
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

	
</style>
