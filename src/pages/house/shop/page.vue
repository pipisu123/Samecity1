<template>
	<view class="news">
		<view class="new-items" @click="goDetail">
			<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.zp365.com%2Fnews%2Fimages%2Fq4%2F201368414006006.jpg&refer=http%3A%2F%2Fimage.zp365.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614501044&t=654adc215a334861a2c2274d1ae2e20d" mode=""></image>
			
			<view class="right">
				<view class="title">
					<text>出租|</text>
					<text class="worktype">人民广场文创街</text>
				</view>
				<view class="industry">
					<text>面积：65㎡|商业街店铺|</text>
				</view>
				<view></view>
				<view class="wages">临街门面|可餐饮|上水</view>
				<view>2000/月</view>
				
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
					url:'/pages/house/shoppage/shoppage'
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
