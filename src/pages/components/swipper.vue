<template>
		<view class="wrap">
			<u-swiper :list="list" effect3d="true" height=320 title=true effect3d-previous-margin=35 @click="click"></u-swiper>
		</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: null
			}
		},
			data() {
				return {
					
				}
			},
			methods: {
				click(index){
					let url = encodeURIComponent(this.list[index].advertisementPath)
					console.log(url)
					uni.navigateTo({
						url:'/pages/index/advertisementUrl/advertisementUrl?url='+url
					})
				}
			}
		}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 20rpx 10rpx;
	}
</style>
