<template>
	<view class="vbox">
		<!-- <image class="top_back_img" src="../../../static/set-top-bg.png" mode="aspectFit"></image> -->
		<view class="top_back_img">

		</view>
		<view class="top">
			<view class="circle">
				<image class="head" :src="userinfo.imgpath" mode="widthFix"></image>
			</view>
			<view class="top-texts">
				<text class="name">{{userinfo.nickName}}</text>
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
				<text>客户数：</text>
				<text class="middle-num">2302</text>
			</view>
			<view class="middle-line"></view>
			<view class="middle-right" @click="Mypoints">
				<image class="middle-icon" src="../../../static/loan.png"></image>
				<text>我的积分：</text>
				<text class="middle-num">{{userinfo.integral}}</text>
			</view>
		</view>
		
 
		<!-- 下半部分 -->
			<view class="title_line">
				<text class="title">求职管理</text>
				<text class="more">查看更多</text>
			</view>
			
			<view class="message">
				<template>
					<view class="item" @click="myInvitation">
						<view class="u-badge-wrap">
							<u-badge type="error" count="7" offset=[-20,-20] ></u-badge>
							<view class="border">
								<image class="img" src="../../../static/card.png" style="width: 60rpx; height: 60rpx;"></image>
							</view>
							<text class="txt">我的面试</text>
						</view>
					</view>
					<view class="item" @click="myDelivery">
						<view class="border">
							<image class="img" src="../../../static/main_off.png" style="width: 60rpx; height: 60rpx;"></image>
						</view>
						<text class="txt">我的投递</text>
					</view>
					<view class="item">
						<view class="border">
							<image class="img" src="../../../static/main_off.png" style="width: 60rpx; height: 60rpx;"></image>
						</view>
						<text class="txt">我的简历</text>
					</view>
					<view class="item" @click="godetail">
						<view class="border">
							<image class="img" src="../../../static/5.png" style="width: 60rpx; height: 60rpx;"></image>
						</view>
						<text class="txt">招聘收藏</text>
					</view>
					<view class="item" @click="buyResume">
						<view class="border">
							<image class="img" src="../../../static/5.png" style="width: 60rpx; height: 60rpx;"></image>
						</view>
						<text class="txt">简历购买</text>
					</view>
					<view class="item" @click="godetail">
						<view class="border">
							<image class="img" src="../../../static/5.png" style="width: 60rpx; height: 60rpx;"></image>
						</view>
						<text class="txt">招聘收藏</text>
					</view>
					<view class="item" @click="godetail">
						<view class="border">
							<image class="img" src="../../../static/5.png" style="width: 60rpx; height: 60rpx;"></image>
						</view>
						<text class="txt">招聘收藏</text>
					</view>
					<view class="item" @click="godetail">
						<view class="border">
							<image class="img" src="../../../static/5.png" style="width: 60rpx; height: 60rpx;"></image>
						</view>
						<text class="txt">招聘收藏</text>
					</view>
				</template>
			</view>
			
			<view class="title_line">
				<text class="title">招聘管理</text>
				<text class="more">查看更多</text>
			</view>
			
			<view class="message">
				<template>
					<view class="item" @click="manageInvitation">
						<view class="u-badge-wrap">
							<u-badge type="error" count="3" offset=[-20,-20] ></u-badge>
							<view class="border">
								<image class="img" src="../../../static/card.png" style="width: 60rpx; height: 60rpx;"></image>
							</view>
							<text class="txt">面试邀请</text>
						</view>
					</view>
					<view class="item" @click="ManageDelivery(userinfo.userId)">
						<view class="u-badge-wrap">
							<u-badge type="error" count="1" offset=[-20,-20] ></u-badge>
							<view class="border">
								<image class="img" src="../../../static/main_off.png" style="width: 60rpx; height: 60rpx;"></image>
							</view>
							<text class="txt">投递管理</text>
						</view>
					</view>
					<view class="item">
						<view class="border">
							<image class="img" src="../../../static/main_off.png" style="width: 60rpx; height: 60rpx;"></image>
						</view>
						<text class="txt">职位管理</text>
					</view>
					<view class="item" @click="ResumeCollection">
						<view class="border">
							<image class="img" src="../../../static/5.png" style="width: 60rpx; height: 60rpx;"></image>
						</view>
						<text class="txt">简历收藏</text>
					</view>
				</template>
			</view>
		
		<view class="index">
			<view class="cell" @click="myResume(userinfo.resumeId)">
				<view class="cell-left">
					<image class="cell_icon" src="../../../static/card.png"></image>
					<text class="cell-text">我的简历</text>
				</view>
				<view class="cell-right">
					<image class="right-arrow" src="../../../static/right-arrow.png"></image>
				</view>
			</view>

			<view class="cell" @click="myCompany(userinfo.companyId)">
				<view class="cell-left">
					<image class="cell_icon" src="../../../static/main_off.png"></image>
					<text class="cell-text">我的公司</text>
				</view>
				<view class="cell-right">
					<image class="right-arrow" src="../../../static/right-arrow.png"></image>
				</view>
			</view>

			<view class="cell">
				<view class="cell-left">
					<image class="cell_icon" src="../../../static/5.png"></image>
					<text class="cell-text">我的收藏</text>
				</view>
				<view class="cell-right">
					<image class="right-arrow" src="../../../static/right-arrow.png"></image>
				</view>
			</view>

			<view class="cell" @click="myPosition">
				<view class="cell-left">
					<image class="cell_icon" src="../../../static/4.png"></image>
					<text class="cell-text">我的职位</text>
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
	import { findRecruitmentUser } from '../../../util/recruitment/personCenter.js'
	export default {
		data() {
			return {
				userinfo:null,
			
			}
		},
		created() {
			this.getUser()
		},
		onLoad() {
			
		},
		methods: {
			// 查询个人信息
			async getUser(){
				uni.showLoading({
					title:'正在加载数据...'
				})
				findRecruitmentUser({
					
				}).then(res=>{
					console.log(res)
					if(res.data.code === 20000){
						uni.hideLoading()
					}
					this.userinfo = res.data.data.recruitmentUserVO
				}).catch(err=>{
					console.log(err)
				})
				
				},

			// logout() {

			// 	uni.showModal({
			// 		title: '提示',
			// 		content: '确认退出登陆？',
			// 		success: function(res) {
			// 			if (res.confirm) {
			// 				uni.removeStorage({
			// 					key: 'token',
			// 					success(res) {
			// 						uni.redirectTo({
			// 							url: '/pages/login/login'
			// 						})
			// 					}
			// 				})
			// 			} else if (res.cancel) {
			// 				console.log('用户点击取消');
			// 			}
			// 		}
			// 	});


			// }
			// 我的积分
			Mypoints(){
				uni.navigateTo({
					url:'/pages/man/PersonalCenter/myPoints/myPoints'
				})
			},
			// 我的投递
			myDelivery(){
				uni.navigateTo({
					url:'/pages/man/PersonalCenter/myDelivery/myDelivery'
				})
			},
			// 管理投递
			ManageDelivery(userId){
				uni.navigateTo({
					url:'/pages/man/PersonalCenter/manageDelivery/manageDelivery?userId='+userId
				})
			},
			// 我的收藏
			godetail(){
				uni.navigateTo({
					url:'/pages/man/PersonalCenter/myCollection/myCollection'
				})
			},
			// 简历购买
			buyResume(){
				uni.navigateTo({
					url:'/pages/man/PersonalCenter/buyResume/buyResume'
				})
			},
			// 我的职位
			myPosition(){
				uni.navigateTo({
					url:'/pages/man/PersonalCenter/myPosition/myPosition'
				})
			},
			// 我的面试
			myInvitation(){
				uni.navigateTo({
					url:'/pages/man/PersonalCenter/myInvitation/myInvitation'
				})
			},
			// 面试邀请
			manageInvitation(){
				uni.navigateTo({
					url:'/pages/man/PersonalCenter/manageInvitation/manageInvitation'
				})
			},
			// 我的公司
			myCompany(companyId) {
				console.log(companyId)
				uni.navigateTo({
					url: '/pageB/myCompany/myCompany?companyId='+companyId
				})
			},
			// 我的简历
			myResume(resumeId) {
				uni.navigateTo({
					url: '/pageB/myResume/myResume?resumeId='+resumeId
				})
			},
			// 我的简历收藏
			ResumeCollection(){
				uni.navigateTo({
					url:'/pages/man/PersonalCenter/resumeCollection/resumeCollection'
				})
			},
			// 我的招聘收藏
			myCollection(){
				uni.navigateTo({
					url:'/pages/man/PersonalCenter/myCollection/myCollection'
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
	
		.title {
			margin-left: 20px;
			font-size: 15px;
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
	
	.message {
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
	     .u-badge-wrap{
			 // width: px;
			 height: 40px;
			 border-radius: 6px;
			 // background-color: $u-light-color;
			 position: relative;
			 // margin: auto;
			 margin-bottom: 13px;
			 // padding: 5px;
		 }
		.item {
			padding: 15px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
	
			
	
				.img{
					width: 10rpx;
					height: 10rpx;
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
