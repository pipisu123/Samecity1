<template>
	<view class="wrap">
		<u-row gutter="16">
			<u-col span="10">
				<view class="demo-layout bg-purple">
					<text>分享</text>
				</view>
			</u-col>
			<u-col span="10">
				<view class="demo-layout bg-purple-light">
					<text>在线聊</text>
				</view>
			</u-col>
			<u-col span="10">
				<view class="demo-layout bg-purple-dark">
					<text>打电话</text>
				</view>
			</u-col>
			</u-row>
	</view>
</template>

<style scoped lang="scss">
	.wrap {
		padding: 300rpx;
	 justify-content: center;
	 }
	 .u-col-bottom {
	 	align-items: flex-end;
	 }

	.u-row {
		margin: 40rpx 0;
	}

	.demo-layout {
		height: 80rpx;
		border-radius: 8rpx;
	}

	// .bg-purple {
	// 	background: #d3dce6;
	// }

	// .bg-purple-light {
	// 	background: #e5e9f2;
	// }

	// .bg-purple-dark {
	// 	background: #99a9bf;
	// }
</style>

