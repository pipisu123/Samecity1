<template>
	<view class="container">
		<u-sticky>
			<!-- 只能有一个根元素 -->
			<view class="sticky">
				宝剑锋从磨砺出,梅花香自苦寒来
			</view>
		</u-sticky>
	</view>
</template>

<style lang="scss" scoped>
	.container {
		height: 200vh;
		margin-top: 50rpx;
	}
	
	.sticky {
		width: 750rpx;
		height: 120rpx;
		background-color: #2979ff;
		color: #fff;
		padding: 24rpx;
	}
</style>