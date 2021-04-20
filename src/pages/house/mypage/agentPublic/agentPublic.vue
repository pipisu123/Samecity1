<template>
	<view class="">
		<view class="publicitem">
			<view class="nav">
				<view class="nav-item" v-for="(item,index) in navs" :key="index" @click="navclick(item.path)">
					<view>
						<image :src="item.src" mode="" style="width: 50rpx;height: 50rpx;"></image>
					</view>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		<!-- 前往创建经纪人 -->
		<view class="box">
			<view class="item">
				<text @tap="confirm">如果还没有注册经纪人，请先前往创建经纪人？</text>
			</view>
		</view>
		<u-modal ref="uModal" v-model="show1" :show-cancel-button="true"  :async-close="asyncClose" title="提示"
		 @confirm="confirm" :content="content" confirm-text="立即注册">
		</u-modal>
	</view>
</template>

<script>
	import {
		checkRegisterByBroker
	} from '@/util/house/agent.js'
	export default {
		data() {
			return {
				show: false,
				show1: false,
				content:'您尚未注册经纪人，请先前往注册',
				navs: [{
						src: '../../../../static/17.jpg',
						title: '二手房发布',
						path: '/pages/house/secondhandhousingrelease/secondhandhousingrelease'
					},
					{
						src: '../../../../static/90.jpg',
						title: '新房发布',
						path: '/pages/house/econdhandhousingrelease/econdhandhousingrelease'
					},
					{
						src: '../../../../static/70.jpg',
						title: '商铺发布',
						path: '/pages/house/forrent/forrent'
					},
					{
						src: '../../../../static/70.jpg',
						title: '办公楼发布',
						path: '/pages/house/mypage/Brokerrelease/Brokerrelease'
					},
					{
						src: '../../../../static/70.jpg',
						title: '我的发布',
						path: '/pages/house/mypage/Brokerrelease/Brokerrelease'
					},
				]
			}
		},
		onLoad() {
			this.checkUser()
		},
		methods: {
			navclick(url) {
				console.log(url)
				uni.navigateTo({
					url
				})
			},
			// 立即注册
			confirm(){
				uni.navigateTo({
					url:'../registerAgent/registerAgent'
				})
			},
			// 检查是否注册经纪人
			checkUser() {
				checkRegisterByBroker({

				}).then(res => {
					console.log(res)
					if (res.data.code === 4000023) {
						this.show1 = true
					} else {
						console.log("已经注册经纪人")
					}
				}).catch(err => {
					console.log(err)
				})
			},
		}
	}
</script>

<style lang="scss">
	.publicitem {
		background-color: #F1F1F1;
		height: 160px;
	}

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
				margin: 8rpx auto;
				line-height: 110rpx;
				color: #fff;
				font-size: 50rpx;
			}

			text {
				font-size: 20rpx;
			}
		}
	}

	.box {
		.item {
			margin-top: 200px;
			text-align: center;

			text {
				color: #0A8DE7;
				font-size: 30rpx;
				text-decoration: underline;
			}
		}
	}
</style>
