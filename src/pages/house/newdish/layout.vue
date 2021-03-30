<template>
	<view class="wrap">
		<u-row gutter="16">
			<u-col span="4">
				<view class="demo-layout bg-purple">
					<text>小户型</text>
				</view>
			</u-col>
			<u-col span="4">
				<view class="demo-layout bg-purple-light">
					<text>楼盘热榜</text>
				</view>
			</u-col>
			<u-col span="4">
				<view class="demo-layout bg-purple-dark">
					<text>特惠好房</text>
				</view>
			</u-col>
		</u-row>
		</u-row>
	</view>
</template>
<!-- <script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			goearlymorning(){
				uni.navigateTo({
					// url:'test?id=1&name=uniapp'
					url:"/pages/earlymorning/earlymoning"
				})
			}
			
		},
		{
			"path":"pages/earlymorning/earlymorning",
			"styly":{}
		}
	}
</script>
 -->
<style scoped lang="scss">
	.wrap {
		padding: 24rpx;
	}

	.u-row {
		margin: 40rpx 0;
	}

	.demo-layout {
		height: 80rpx;
		border-radius: 8rpx;
	}

	.bg-purple {
		background: #a0cfff;
		 text-align: center;
		 padding: 25rpx;
	}

	.bg-purple-light {
		background: #a0cfff; 
	    text-align: center;
		padding: 25rpx;
		
	}

	.bg-purple-dark {
		background: #a0cfff;
		 text-align: center;
		 padding: 25rpx;
	}
</style>