<template>
	<view class="content1">
		<view class="nav">
			<view class="nav-item" v-for="(item1,index) in navs" :key="index" @click="navigateTo(item1.path)">
				<view>
					<image :src="item1.src" mode="" style="width: 80rpx;height: 80rpx;"></image>
				</view>
				<text>{{item1.title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navs: [
					{
						src: '/static/80.jpg',
						title: '租写字楼',
						path: '/pages/house/officeOrShop/officeRentList/officeRentList'
					},
					{
						src: '/static/17.jpg',
						title: '买写字楼',
						path: '/pages/house/officeOrShop/officeSellList/officeSellList'
					},
					{
						src: '/static/70.jpg',
						title: '租商铺',
						path: ''
					},
					{
						src: '/static/60.jpg',
						title: '买商铺',
						path: ''
					},
				]
			}
		},
		methods: {
			navigateTo(url) {
				console.log(url)
				uni.navigateTo({
					url
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.nav {
		display: flex;
		flex-wrap: wrap;

		.nav-item {
			width: 25%;
			text-align: center;

			view {
				width: 90rpx;
				height: 80rpx;
				background-color: #F1F1F1;
				margin: 30rpx auto 2rpx;
				line-height: 120rpx;
				color: #fff;
				font-size: 50rpx;
			}

			text {
				font-size: 23rpx;
			}
		}
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 10rpx;
	}

	.content1 {
		height: 150rpx;
		background-color: #F1F1F1;
	}
</style>
