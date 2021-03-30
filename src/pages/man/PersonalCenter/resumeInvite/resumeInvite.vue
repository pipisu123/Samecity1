<template>
	<view class="content">
		<view class="circle">
		</view>
		<view class="circle1">
		</view>
		<view class="invitation">
	       <view class="resumelist">
			<u-avatar :src="item1.src" size=100 show-sex=true :sex-icon="inviteInfo.sex"></u-avatar>
			<view class="right">
				<view class="title">
					<text class="name">{{inviteInfo.resumeName}}</text>
				</view>
				<view class="base">
					<view class="">
						<text>{{inviteInfo.age}}岁-</text>
					</view>
					<view class="">
						<text>{{inviteInfo.maxDegree}}-</text>
					</view>
					<view class="">
						<text>{{inviteInfo.workCity.split("-")[2]}}</text>
					</view>
				</view>
				<view class="work">
					<text>职位：{{inviteInfo.industry}}</text>
					<view class="worktype">
						<text>{{inviteInfo.workType}}</text>
					</view>
				</view>
				<view class="wages">
					<text>期望工资：{{inviteInfo.compensation}}</text>
				</view>
			</view>
			</view>
			<view class="line">
				<u-line color="#5785E5" border-style="dashed"></u-line>
			</view>
			<view class="inviteInfo">
				<view class="itemInfo">
					<u-icon name="clock-fill" color="#2979ff" size="35"></u-icon>
					<view class="left">
						<text>{{inviteInfo.interviewTime}}</text>
					</view>
				</view>
				<view class="itemInfo">
					<u-icon name="map-fill" color="#2979ff" size="35"></u-icon>
					<view class="left">
						<text>{{inviteInfo.companyAddress}}</text>
					</view>
					<view class="right">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				<view class="itemInfo">
					<u-icon name="file-text-fill" color="#2979ff" size="35"></u-icon>
					<view class="left">
						<text>{{inviteInfo.remarks}}</text>
					</view>
				</view>
			</view>
			<view class="agree" v-if="inviteInfo.handle === 1">
				<u-button size="medium" type="success" disabled=true>已接受</u-button>
			</view>
			<view class="refuse" v-else-if="inviteInfo.handle === 0">
				<u-button size="medium" type="error" disabled=true>已拒绝</u-button>
			</view>
			<view class="refuse" v-else-if="inviteInfo.handle === 2">
				<u-button size="medium" type="error" disabled=true>未接受</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inviteInfo:{
					resumeName:'',
					age:'',
					sex:'',
					maxDegree:'',
					workType:'',
					industry: '',
					compensation:'',
					workCity:'',
					interviewTime:'',
					companyAddress:'',
					remarks:'',
					handle:''
				},

			}
		},
		components: {

		},
		onLoad(options) {
			const invitationInfo = JSON.parse(decodeURIComponent(options.inviteInfo));
			this.inviteInfo.resumeName = invitationInfo.resumeName
			this.inviteInfo.age = invitationInfo.age
			this.inviteInfo.sex = invitationInfo.sex
			this.inviteInfo.maxDegree = invitationInfo.maxDegree
			this.inviteInfo.workType = invitationInfo.workType
			this.inviteInfo.industry = invitationInfo.industry
			this.inviteInfo.compensation = invitationInfo.compensation
			this.inviteInfo.workCity = invitationInfo.workCity
			this.inviteInfo.interviewTime = invitationInfo.interviewTime
			this.inviteInfo.companyAddress = invitationInfo.companyAddress
			this.inviteInfo.remarks = invitationInfo.remarks
			this.inviteInfo.handle = invitationInfo.handle
			console.log(invitationInfo)
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #5785E5;
	}
	.content {
		.invitation {
			height: 1000rpx;
			background-color: #FFFFFF;
			border-radius: 2%;
			margin-top: 150rpx;
			margin-left: 70rpx;
			margin-right: 70rpx;
			.resumelist {
					display: flex;
					padding: 20rpx 20rpx;
					border-bottom: 2rpx solid #F1F1F1;
			
					.right {
						margin-left: 15rpx;
						margin-right: 40rpx;
			
						view {
							font-size: 25rpx;
			
						}
						.title {
							display: flex;
			
							.name {
								width: 300rpx;
								font-weight: bold;
								font-size: 30rpx;
							}
			
						}
						.base {
							display: flex;
							view {
								margin: 0rpx 5rpx 0rpx;
							}
						}
					}
					.work {
						display: flex;
						.worktype {
							margin-left: 15rpx;
							font-size: 20rpx;
							color: #999999;
						}
					}
			
					.wages {
						color: #FF0000;
					}
					}
			// 线条
			.line {
				margin-top: 43rpx;
			}
			// 邀请信息
			.inviteInfo{
				.itemInfo{
					display: flex;
					padding: 20px;
					margin-left: 20px;
					.right{
						margin-left: 20px;
					}
					.left{
						margin-left: 15rpx;
					}
				}
			}
		}
		// 按钮
		.handle-button{
			display: flex;
			margin-top: 150px;
			.button1{
				margin-left: 30rpx;
			}
			.button2{
				margin-left: 30rpx;
			}
		}
		.agree{
			margin-top: 150px;
			text-align: center;
		}
		.refuse{
			margin-top: 150px;
			text-align: center;
		}
		// 小圆圈
		.circle {
			width: 50rpx;
			height: 50rpx;
			background-color: #5785E5;
			border-radius: 100%;
			position: fixed;
			margin-top: 200rpx;
			margin-left: 45rpx;
		}

		.circle1 {
			width: 50rpx;
			height: 50rpx;
			background-color: #5785E5;
			border-radius: 100%;
			position: fixed;
			margin-top: 200rpx;
			margin-left: calc(100% - 45px);
		}
	}
</style>
