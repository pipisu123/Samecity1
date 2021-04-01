<template>
	<view>
		<view>
			<u-subsection :list="list" :current="curNow" @change="sectionChange"></u-subsection>
		</view>
		<view class="news">

			<view class="new-items" @click="goDetail">
				<image src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=191240271,1971414211&fm=26&gp=0.jpg" mode=""></image>

				<view class="right">
					<view class="title">
						<text>出租|</text>
						<text class="worktype">茂名保利东湾</text>
					</view>
					<view class="industry">
						<text>66-227㎡</text>
					</view>
					<view>
						<text>|茂南区|茂南</text>
					</view>
					<view class="" style="">8500元/㎡</view>

				</view>
				<view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

				list: [{
						name: '出租'
					},
					{
						name: '二手房'
					},
					{
						name: '新房'
					},
					{
						name: '商铺'
					}
				],
				curNow: 0,
				// created() {
				// 	this.src = this.$store.state.avatar
				// },
			}
		},
		methods: {
			sectionChange(index) {
				this.curNow = index;
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
				width: 400rpx;
				margin-left: 15rpx;
				margin-right: 40rpx;

				view {
					font-size: 23rpx;
				}

				.title {
					font-weight: bold;
					font-size: 28rpx;
					display: flex;

					.worktype {
						font-weight: bold;
						font-size: 28rpx;
					}

				}
			}

		}
	}

	.avatar {}

	.info {
		margin-top: 15rpx;

		.time {
			font-size: 20rpx;
		}
	}


	// .wages {
	// 	color: #FF0000;
	// }
</style>
