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
		<u-modal ref="uModal" v-model="show1" :show-cancel-button="true"  :async-close="asyncClose" title="提示" @cancel="cancel"
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
						src: '/static/house/house2.png',
						title: '二手房出售',
						path: '/pageA/house/mypage/agentPublic/secondPublic/secondPublic'
					},
					{
						src: '/static/house/house3.png',
						title: '房屋出租',
						path: '/pageA/house/mypage/agentPublic/rentPublic/rentPublic'
					},
					{
						src: '/static/house/house3.png',
						title: '商铺出租',
						path: '/pageA/house/mypage/agentPublic/rentShop/rentShop'
					},
					{
						src: '/static/house/house4.png',
						title: '商铺转租',
						path: '/pageA/house/mypage/agentPublic/changeRentPublic/changeRentPublic'
					},
					{
						src: '/static/house/house5.png',
						title: '商铺出售',
						path: '/pageA/house/mypage/agentPublic/shopSellPublic/shopSellPublic'
					},
					{
						src: '/static/house/house6.png',
						title: '办公楼出租',
						path: '/pageA/house/mypage/agentPublic/officeRentPublic/officeRentPublic'
					},
					{
						src: '/static/house/house7.png',
						title: '办公楼出售',
						path: '/pageA/house/mypage/agentPublic/officeSellPublic/officeSellPublic'
					},
					{
						src: '/static/house/house8.png',
						title: '我的出租二手',
						path: '/pageA/house/mypage/agentPublic/myPublic/myPublic'
					},
					{
						src: '/static/house/house1.png',
						title: '我的写字楼',
						path: '/pageA/house/mypage/agentPublic/myOfficePublicList/myOfficePublicList'
					},
					{
						src: '/static/house/house1.png',
						title: '我的商铺',
						path: '/pageA/house/mypage/agentPublic/myShopPublicList/myShopPublicList'
					},
				]
			}
		},
		onLoad() {
			this.checkUser()
		},
		onShow() {
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
			cancel(){
				uni.navigateBack({
					
				})
			},
		}
	}
</script>

<style lang="scss">
	.publicitem {
		background-color: #F1F1F1;
		height: 210px;
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
</style>
