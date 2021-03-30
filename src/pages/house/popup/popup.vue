<template>
	<view class="">
		<u-button @click="show = true;">打开弹窗</u-button>
		<u-popup mode="bottom" v-model="show">
			<view class="content">
				<scroll-view scroll-y="true" style="height: 300rpx;">
					<view>
						<view v-for="index in 20" :key="index">
							第{{index}}个Item
						</view>
					</view>
				</scroll-view>
				<view class="confrim-btn">
					<u-button @click="show = false;">确定</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 24rpx;
		text-align: center;
	}
</style>