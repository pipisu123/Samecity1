<template>
	<view class="wrap">
		<u-row gutter="1">
			<u-col span="3">
				<view class="demo-layout bg-purple">
					<text>普通住宅</text>
				</view>
			</u-col>
			<u-col span="3">
				<view class="demo-layout bg-purple-light">
					<text>3室2厅2卫</text>
				</view>
			</u-col>
			<u-col span="3">
				<view class="demo-layout bg-purple-dark">
					<text>97㎡</text>
				</view>
			</u-col>
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