<template>
	<view class="content">
		<swiper>
			<swiper-item>
					<view class="nav" >
						<view class="nav-item" v-for="(item,index) in navs" :key="index" @click="fb(item.path)">
							<view>
								<image :src="item.src" mode="" style="width: 65rpx;height: 65rpx;"></image>
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
						src:'/static/011.jpg',
						title: '全新楼盘',
						path: '/pages/house/newbuildings/newbuildings'
					},
					{
						src: '/static/022.jpg',
						title: '在售楼盘',
						path: '/pages/house/Soldbuilding/Soldbuilding'
					},
					{
						src: '/static/033.jpg',
						title: '即将开盘',
						path: '/pages/house/earlymorning/earlymorning'
					},
					{
						src: '/static/044.jpg',
						title: '已开盘',
						path: '/pages/house/beenopened/beenopened'
					},
					{
						src: '/static/055.jpg',
						title: '低总价',
						path: '/pages/house/lowprice/lowprice'
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
		width: 20%;
		text-align: center;
		view{
			width: 90rpx;
			height: 80rpx;
			background-color:#F1F1F1;
			margin: 10rpx auto 10rpx;
			line-height: 120rpx;
			color: #fff;
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
	// margin-top: 45rpx;
	background-color: #F1F1F1;
}

</style>
