<template>
	<view class="news">
		
		<view class="new-items" @click="goDetail">
			<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fs3.ifengimg.com%2F2016%2F04%2F14%2Fc9e3918b453c5fd579467e50c32a0739.jpg&refer=http%3A%2F%2Fs3.ifengimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614590390&t=75830ac972812e6c7ee63402c691b2cc" mode=""></image>
			
			<view class="right">
				<view class="title">
					<text>出售|</text>
					<text class="worktype">茂名保利东湾</text>
				</view>
				<view class="industry">
					<text>面积：66-227㎡|茂南区|茂南</text>
				</view>
				<view></view>
				<view class="wages">住宅|今年交房|项目在建</view>
				<view>8500元/㎡</view>
				
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
			goDetail() {
				uni.navigateTo({
					url:'/pages/house/newdishpage/newdishpage'
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
