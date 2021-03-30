<template>
	<view class="news">
		<view class="new-items" @click="goDetail">
			<image src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1358193358,3195625911&fm=26&gp=0.jpg" mode=""></image>
			<view class="right">
				<view class="title">
					<text>出售|</text>
					<text class="worktype">双山二路花园小区 4室2厅2卫</text>
				</view>
				<view class="industry">
					<text>4室.360㎡|东| 双山二路花园小区</text>
				</view>
				
				<view class="wags">
					个人|南北通透|电梯房
					</view>
					<view class="wrap">
						<u-row gutter="16">
							<u-col span="4">
								<view class="demo-layout bg-purple">
									<text>押一付一</text>
								</view>
							</u-col>
							<u-col span="4">
								<view class="demo-layout bg-purple-light">
									<text>精装修</text>
								</view>
							</u-col>
							<u-col span="4">
								<view class="demo-layout bg-purple-dark">
									<text>随时看房</text>
								</view>
							</u-col>
						</u-row>
						</u-row>
					</view>
				<view>208万</view>
				
			</view>
			<view>
				
				
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
					url:'/pages/house/secondhandhousingpage/secondhandhousingpage'
				})
		}
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

	
</style>
