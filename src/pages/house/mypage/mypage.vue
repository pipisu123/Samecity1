<template>
	<view class="vbox">
		<!-- <image class="top_back_img" src="../../../static/set-top-bg.png" mode="aspectFit"></image> -->
		<view class="top_back_img">

		</view>
		<view class="top">
			<view class="circle">
				<image class="head" :src="src" mode="widthFix"></image>
			</view>
			<view class="top-texts">
				<text class="name">某某</text>
				<image class="set-top-hr" src="../../../static/set-top-hr.png" mode=""></image>
				<view>
					<text>绑定手机：</text>
					<text>{{user.user_phone}}</text>
				</view>
			</view>
			<view class="top-changeInfo" @click="update">
				<text>完善资料</text>
			</view>
		</view>

		<!-- 中间部分 -->
		<view class="middle">
			<view class="middle-left">
				<image class="middle-icon" src="../../../static/cust.png"></image>
				<text>浏览数：</text>
				<text class="middle-num">2302</text>
			</view>
			<view class="middle-line"></view>
			<view class="middle-right" @click="myintegral">
				<image class="middle-icon" src="../../../static/loan.png"></image>
				<text>我的积分：</text>
				<text class="middle-num">{{user.integral}}</text>
			</view>
		</view>
		
 
		<!-- 下半部分 -->
		<view class="title_line" >
			<text class="title">我的发布</text>
			<text class="more">查看更多</text>
		</view>
		
		<view class="welfare">
			<template>
				<view class="item" @click="myrelease">
					<view class="border">
						<image class="img" src="../../../static/card.png" style="width: 60rpx; height: 60rpx;"></image>
					</view>
					<text class="txt">出租房源</text>
				</view>
				<view class="item">
					<view class="border">
						<image class="img" src="../../../static/main_off.png" style="width: 60rpx; height: 60rpx;" @click="SecHouseList"></image>
					</view>
					<text class="txt">二手房房源</text>
				</view>
				<view class="item">
					<view class="border">
						<image class="img" src="../../../static/main_off.png" style="width: 60rpx; height: 60rpx;"></image>
					</view>
					<text class="txt">新盘房源</text>
				</view>
				<view class="item">
					<view class="border">
						<image class="img" src="../../../static/5.png" style="width: 60rpx; height: 60rpx;"></image>
					</view>
					<text class="txt">商铺房源</text>
				</view>
			
			</template>
		</view>
			<!-- </view> -->
			
			<view class="title_line" >
				<text class="title">房产工具</text>
				<text class="more">查看更多</text>
			</view>
			
			<view class="welfare">
				<template>
					<view class="item" @click="agentPublic">
						<view class="border">
							<image class="img" src="../../../static/card.png" style="width: 60rpx; height: 60rpx;"></image>
						</view>
						<text class="txt">经纪人发布</text>
					</view>
					<view class="item">
						<view class="border">
							<image class="img" src="../../../static/main_off.png" style="width: 60rpx; height: 60rpx;"></image>
						</view>
						<text class="txt">房贷计算</text>
					</view>
					<view class="item">
						<view class="border">
							<image class="img" src="../../../static/main_off.png" style="width: 60rpx; height: 60rpx;"></image>
						</view>
						<text class="txt">我的点评</text>
					</view>
					<view class="item" @click="myCollection">
						<view class="border">
							<image class="img" src="../../../static/5.png" style="width: 60rpx; height: 60rpx;"></image>
						</view>
						<text class="txt">我的收藏</text>
					</view>
				
				</template>
			</view>
		
		<view class="index">
			<!-- <view class="cell" @click="Brokerrelease">
				<view class="cell-left">
					<image class="cell_icon" src="../../../static/card.png"></image>
					<text class="cell-text">经纪人发布</text>
				</view>
				<view class="cell-right">
					<image class="right-arrow" src="../../../static/right-arrow.png"></image>
				</view>
			</view> -->

			<view class="cell" @click="myCompany(user.company_id)">
				<view class="cell-left">
					<image class="cell_icon" src="../../../static/main_off.png"></image>
					<text class="cell-text">我的发布</text>
				</view>
				<view class="cell-right">
					<image class="right-arrow" src="../../../static/right-arrow.png"></image>
				</view>
			</view>

			<view class="cell" @click="myCollection">
				<view class="cell-left">
					<image class="cell_icon" src="../../../static/5.png"></image>
					<text class="cell-text">问卷调查</text>
				</view>
				<view class="cell-right">
					<image class="right-arrow" src="../../../static/right-arrow.png"></image>
				</view>
			</view>

			<view class="cell" @click="myPosition">
				<view class="cell-left">
					<image class="cell_icon" src="../../../static/4.png"></image>
					<text class="cell-text">客服服务</text>
				</view>
				<view class="cell-right">
					<image class="right-arrow" src="../../../static/right-arrow.png"></image>
				</view>
			</view>


			<view class="cell" @click="changeGray">
				<view class="cell-left">
					<image class="cell_icon" src="../../../static/account.png"></image>
					<text class="cell-text">关于</text>
				</view>
				<view class="cell-right">
					<image class="right-arrow" src="../../../static/right-arrow.png"></image>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: null,
				user:null
			}
		},
		created() {
		
		},
		onLoad() {
			
		},
		methods: {
			// 经纪人发布
			agentPublic(){
				uni.navigateTo({//这个是跳转的方法
					url:'/pages/house/mypage/agentPublic/agentPublic'//这个是跳转的路径
				})
			},
			//我的积分
			myintegral(){//这个叫方法     @click="houseestimates"   这个是点击事件   点击事件是要写方法触发的    并不是你只写个点击事件然后你就点他想让他干嘛就干嘛
				uni.navigateTo({//这个是跳转的方法 
					url:'/pages/house/myintegral/myintegral'//这个是跳转的路径
				})
			},
			
			myrelease(){//这个叫方法     @click="houseestimates"   这个是点击事件   点击事件是要写方法触发的    并不是你只写个点击事件然后你就点他想让他干嘛就干嘛
				uni.navigateTo({//这个是跳转的方法 
					url:'/pages/house/myrelease/myrelease'//这个是跳转的路径
				})
			},
			myCollection(){
				uni.navigateTo({//这个是跳转的方法
					url:'/pages/house/myCollection/myCollection'//这个是跳转的路径
				})
			},
			SecHouseList(){
				uni.navigateTo({//这个是跳转的方法
					url:'/pages/house/mypage/mySecHouseList/mySecHouseList'//这个是跳转的路径
				})
			},
			// 经纪人发布
			// Brokerrelease(){
			// 	uni.navigateTo({
			// 		url:'/pages/house/mypage/Brokerrelease/Brokerrelease'
			// 	})
			// },
			// 我的职位
			myPosition(){
				uni.navigateTo({
					url:'/pages/man/PersonalCenter/myPosition/myPosition'
				})
			},
			// 我的公司
			myCompany(company_id) {
				console.log(company_id)
				uni.navigateTo({
					url: '/pages/myCompany/myCompany?company_id='+company_id
				})
			},
			// 经纪人发布
			brokerpage() {
				uni.navigateTo({
					url: '/pages/house/brokerpage/brokerpage'
				})
			},
			// 我的收藏
			myCollection(){
				uni.navigateTo({
					url:'/pages/house/myCollection/myCollection'
				})
			},
			// 完善资料
			update() {
				uni.navigateTo({
					url: '/pages/update/update'
				})
			}
		}
		
	}
</script>

<style scoped lang="scss">
	.index {
		display: flex;
		flex-direction: column;
		width: 100%;
		background-color: white;
		border-top: 1px solid #cccccc;
	}

	.vbox {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.top_back_img {
		z-index: -1;
		position: absolute;
		top: 0upx;
		width: 100%;
		height: 420upx;
		background-color: #5785E5;

	}

	.top {
		display: flex;
		width: 100%;
		height: 420upx;
		align-items: center;
	}

	.circle {
		margin-left: 100upx;
		width: 120upx;
		height: 120upx;
		border: 10upx solid #a4f4f6;
		border-radius: 150upx;
		overflow: hidden;
	}

	.head {
		width: 120upx;
		height: 120upx;
		border-radius: 150upx;
	}

	.top-texts {
		display: flex;
		flex-direction: column;
		margin-left: 15upx;
		color: white;
	}

	.name {
		font-size: 36upx;
		font-weight: 500;
	}

	.set-top-hr {
		width: 210upx;
		height: 6upx;
	}

	.top-changeInfo {
		margin-top: 250upx;
		width: 150upx;
		height: 40upx;
		line-height: 28upx;
		background-color: #FFFFFF;
		border-radius: 15upx;
		padding: 10upx;
		color: #33dce8;
	}

	.middle {
		display: flex;
		align-items: center;
		position: relative;
		top: -50upx;
		width: 80%;
		height: 100upx;
		background-color: #F1F1F1;
		border-radius: 15upx;
	}

	.middle-line {
		width: 2upx;
		height: 80upx;
		background-color: #eeeeee;
	}

	.middle-left {
		flex-grow: 1;
		color: #666666;
		display: flex;
		align-items: center;
		text-align: center;
	}

	.middle-right {
		flex-grow: 1;
		color: #666666;
		display: flex;
		align-items: center;
		text-align: center;
	}

	.middle-icon {
		width: 40upx;
		height: 40upx;
		margin-left: 20upx;
	}

	.middle-num {
		color: #fcac45;
		-webkit-font-smoothing: antialiased;
	}

	.cell {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #ccc;
		height: 90upx;
		align-items: center;
		justify-content: space-between;
	}

	.cell:active {
		background-color: #333;
		color: white;
		box-shadow: 1upx 1upx 35upx #ccc;
	}

	.cell-left {
		display: flex;
		align-items: center;
		margin-left: 65upx;
	}

	.cell-text {
		margin-left: 25upx;
	}

	.cell-right {
		margin-right: 45upx;
		height: 28upx;
	}

	.cell_icon {
		width: 40upx;
		height: 40upx;
		height: 40upx;
	}

	.right-arrow {
		color: #aaa;
		width: 15upx;
		height: 28upx;
	}
	// 下半部分
	.title_line {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		// word-break: break-all;
	
		.title {
			margin-left: 20px;
			font-size: 18px;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 41px;
		}
	
		.more {
			margin-right: 20px;
			font-size: 10px;
			font-weight: 300;
			color: rgba(153, 153, 153, 1);
			line-height: 41px;
		}
	}
	// .box{
	// 	display: block;
		
	// 	white-space: pre-line;
	// 	padding: 10rpx;
	// 	border: 1rpx solid gray;
	// 	margin: 0;
		
	// }
	
	.welfare {
		width: 92%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 1px 21px 0px rgba(103, 103, 103, 0.2);
		border-radius: 10px;
		margin-bottom: 10px;
		
	
		.item {
			padding: 20px;
			flex-wrap: wrap;
			white-space: pre-wrap;
			flex-direction: column;
			align-items: center;
			justify-content: center;
	
			.border {
				margin-top: 5px;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
	
				.img{
					width: 10rpx;
					height: 10rpx;
					flex-wrap: wrap;
				}
			}
	
			.txt {
				margin-top: 5px;
				font-size: 10px;
				font-weight: 300;
				color: rgba(153, 153, 153, 1);
			}
		}
	}
</style>
