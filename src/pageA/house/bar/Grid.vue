<template>
	<view class="content">
		<swiper>
			<swiper-item>
					<view class="nav" >
						<view class="nav-item" v-for="(item,index) in navs" :key="index" @click="fb(item.path)">
							<view>
								<image :src="item.src" mode="" style="width: 80rpx;height: 80rpx;"></image>
							</view>
							<text>{{item.title}}</text>
						</view>
					</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navs:[
					{
						src:'/static/homeIcon/01.png',
						title: '出租',
						path: '/pageA/house/rent/rent'
					},
					{
						src: '/static/homeIcon/02.png',
						title: '二手房',
						path: '/pageA/house/resold/resold'
					},
					{
						src: '/static/homeIcon/03.png',
						title: '写字楼商铺',
						path: '/pageA/house/officeOrShop/officeOrShop'
					},
					{
						src: '/static/homeIcon/04.png',
						title: '商铺转让',
						path: '/pageA/house/shopTransfer/shopTransfer'
					},
					
				]
			}
		},
		methods: {
			fb(url){
				console.log(url)
				uni.navigateTo({
					url
				})
			}
			
		}
	}
</script>

<style lang="scss">
.nav{
	display: flex;
    flex-wrap: wrap;
	.nav-item{
		width: 25%;
		text-align: center;
		view{
			width: 90rpx;
			height: 80rpx;
			background-color:#F1F1F1;
			margin: 30rpx auto 2rpx;
			line-height: 120rpx;
			// color: #fff;
			font-size: 50rpx;
		}
		text{
			font-size: 23rpx;
		}
	}
}
.grid{
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 10rpx;
}
.content{
	height: 150rpx;
	margin-top: 55rpx;
	background-color: #F1F1F1;
}

</style>
