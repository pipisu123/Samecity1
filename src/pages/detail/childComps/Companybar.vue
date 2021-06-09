<template>
	<view class="tabbar">
		<view class="wrap" @click="btn(item.companyId)">
			<view>
				<image :src="'http://192.168.3.77:8080/'+item.logoPicturePath" mode="aspectFill" style="width: 90rpx;height: 90rpx;border-radius: 50rpx;"></image>
			</view>
			<view style="margin-top: 30rpx;width: 80%;margin-left: 15rpx;">
				<text>{{item.companyName}}</text>
			</view>
			<view style="margin-top: 30rpx;">
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: null
			}
		},
		data() {
			return {

			}
		},
		components: {


		},
		methods: {
			btn(companyId) {
				this.$emit('itemClick', companyId)
			}
		}
	}
</script>

<style lang="scss">
.wrap{
	display: flex;
	padding: 10rpx;
}
</style>
