<template>
	<view>
		<u-steps :list="numList" :current="100"></u-steps>
		<text>楼盘时刻</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				numList: [{
					name: '开盘'
				}, {
					name: '预证'
				}, {
					name: '预证'
				}, {
					name: '交房'
				}, ],
			}
		}
	}
</script>
<style lang="scss">
	.numlist{
		padding: 100rpx;
	}
	.u-padding-65 {
		padding: 65rpx;
	}
</style>
