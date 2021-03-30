<template>
	<view class="news">
		<view class="new-items"  @click="goDetail"
		>
			<image src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1358193358,3195625911&fm=26&gp=0.jpg" mode=""></image>
			
			<view class="right">
				<view class="title">
					<text>出租|</text>
					<text class="worktype">中成公寓</text>
				</view>
				<view class="industry">
					<text>面积：360平方米|东|明湖百货</text>
				</view>
				<view class="wages">中介|南北通透|随时看房</view>
				<view>1200/月</view>
				
			</view>
			<view>
				
				<view class="avatar">
					<u-avatar :src="src" size=55 show-level=true></u-avatar>
				</view>
				<!-- 	<text style="font-size: 18rpx; margin-left: 35rpx;">酒馆</text> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		// props: {
		// 	list: {
		// 		type: Array,
		// 		default: null
		// 	}
		// },
		data() {
			return {
				src: null,
				pic: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				scrollTop:0

			}
		},
		onLoad() {

		},
		created() {
			this.src = this.$store.state.avatar
		},
		methods: {
				goDetail(){
					uni.navigateTo({
						url:'/pages/house/detailpage/detailpage'
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
						margin-left: 30rpx;
						color: #999999;
						font-size: 20rpx;
						padding: 3px;
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

	.wages {
		color: #FF0000;
	}
</style>
