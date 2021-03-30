<template>
	<view class="wrap">
		<u-row gutter="10">
			<u-col span="2">
				<view class="demo-layout bg-purple">
					<text>在出售</text>
				</view>
			</u-col>
			<u-col span="2">
				<view class="demo-layout bg-purple-light">
					<text>住宅</text>
				</view>
			</u-col>
			<u-col span="2">
				<view class="demo-layout bg-purple-dark">
					<text>今年交房</text>
				</view>
			</u-col>
			<u-col span="2">
				<view class="demo-layout bg-purple-dark">
					<text>项目在建</text>
				</view>
			</u-col>
			<u-col span="2">
				<view class="demo-layout bg-purple-dark">
					<text>装修交付</text>
				</view>
			</u-col>
			<u-col span="2">
				<view class="demo-layout bg-purple-dark">
					<text>大型社区</text>
				</view>
			</u-col>
		</u-row>
		</u-row>
	</view>
</template>

<style scoped lang="scss">
	.wrap {
		padding: 0rpx;
	}

	.u-row {
		margin: 40rpx 0;
	}

	.demo-layout {
		height: 40rpx;
		border-radius: 8rpx;
	}

	.bg-purple {
		background: #c8c9cc;
		 text-align: center;
		 padding: 10rpx;
		 font-size: 20rpx;
	}

	.bg-purple-light {
		background: #c8c9cc; 
	    text-align: center;
		padding: 10rpx;
		font-size: 20rpx;
		
	}

	.bg-purple-dark {
		background: #c8c9cc;
		 text-align: center;
		 padding: 10rpx;
		 font-size: 20rpx;
	}
</style>