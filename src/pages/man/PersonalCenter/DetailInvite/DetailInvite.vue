<template>
	<view class="content">
		<view class="circle">
		</view>
		<view class="circle1">
		</view>
		<view class="invitation">
			<view class="recruitment">
				<view class="recruitment-items">
					<image :src="'http://192.168.101.24:8080/'+inviteInfo.image" mode=""></image>
					<view class="right">
						<view class="title">
							<text>{{inviteInfo.title}}</text>
							<text class="worktype">{{inviteInfo.worktype}}</text>
						</view>
						<view class="industry">
							<text>职位：{{inviteInfo.workname}}</text>
						</view>
						<view class="wages">薪资：{{inviteInfo.wage}}</view>
						<view>公司：{{inviteInfo.conpanyname}}</view>
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
						<text>{{inviteInfo.invitationtime}}</text>
					</view>
				</view>
				<view class="itemInfo">
					<u-icon name="map-fill" color="#2979ff" size="35"></u-icon>
					<view class="left">
						<text>{{inviteInfo.invitaionaddress}}</text>
					</view>
					<view class="right">
						<u-button size="mini" @click="copy">复制</u-button>
					</view>
				</view>
				<view class="itemInfo">
					<u-icon name="file-text-fill" color="#2979ff" size="35"></u-icon>
					<view class="left">
						<text>{{inviteInfo.remark}}</text>
					</view>
				</view>
			</view>
			<view class="handle-button" v-if="inviteInfo.handle === 2">
				<view class="button1">
					<u-button size="medium" type="error" @click="refuseInvitation">拒绝面试</u-button>
				</view>
				<view class="button2">
					<u-button size="medium" type="success" @click="agreeInvitaion">接受面试</u-button>
				</view>
			</view>
			<view class="agree" v-else-if="inviteInfo.handle === 1">
				<u-button size="medium" type="success" disabled=true>已接受</u-button>
			</view>
			<view class="refuse" v-else-if="inviteInfo.handle === 0">
				<u-button size="medium" type="error" disabled=true>已拒绝</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import { handleInvitation } from '../../../../util/recruitment/invitation.js'
	export default {
		data() {
			return {
				inviteInfo:{
					image: null,
					title:'',
					workname:'',
					wage:'',
					conpanyname:'',
					worktype:'',
					invitationtime:'',
					invitaionaddress:'',
					remark:'',
					invitaionId:'',
					handle:''
				},

			}
		},
		components: {

		},
		onLoad(options) {
			const invitationInfo = JSON.parse(decodeURIComponent(options.invitationInfo));
			this.inviteInfo.image = invitationInfo.image
			this.inviteInfo.title = invitationInfo.title
			this.inviteInfo.workname = invitationInfo.workname
			this.inviteInfo.wage = invitationInfo.wage
			this.inviteInfo.conpanyname = invitationInfo.conpanyname
			this.inviteInfo.worktype = invitationInfo.worktype
			this.inviteInfo.invitationtime = invitationInfo.invitationtime
			this.inviteInfo.invitaionaddress = invitationInfo.invitaionaddress
			this.inviteInfo.remark = invitationInfo.remark
			this.inviteInfo.invitaionId = invitationInfo.invitationId
			this.inviteInfo.handle = invitationInfo.handle
			console.log(invitationInfo)
		},
		methods: {
			// 复制地址
			copy(){
				uni.setClipboardData({
					data: this.inviteInfo.invitaionaddress,
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: '已复制到剪贴板'
								});
							}
						});
					}
				});
			},
			// 拒绝面试
			refuseInvitation(){
				handleInvitation({
					"handle":0,
					"invitationId": this.inviteInfo.invitaionId
				}).then(res=>{
					console.log(res)
				}).catch(err=>{
					console.log(err)
				})
			},
			// 接受面试
			agreeInvitaion(){
				handleInvitation({
					"handle":1,
					"invitationId": this.inviteInfo.invitaionId
				}).then(res=>{
					console.log(res)
				}).catch(err=>{
					console.log(err)
				})
			}

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
			.recruitment {
				.recruitment-items {
					display: flex;
					padding: 15rpx 20rpx;

					image {
						min-width: 30rpx;
						max-width: 200rpx;
						min-height: 30rpx;
						max-height: 160rpx;
					}
					.right {
						width: 400rpx;
						margin-left: 15rpx;
						margin-right: 40rpx;

						view {
							font-size: 23rpx;
						}

						.title {
							font-weight: bold;
							font-size: 28rpx;
							display: flex;

							.worktype {
								margin-left: 30rpx;
								color: #999999;
								font-size: 20rpx;
								padding: 3px;
							}

						}
					}

				}
			}
			.info {
				margin-top: 15rpx;
				.time {
					font-size: 20rpx;
				}
			}
			.wages {
				color: #FF0000;
			}
			// 线条
			.line {
				margin-top: 33rpx;
			}
			// 邀请信息
			.inviteInfo{
				.itemInfo{
					display: flex;
					padding: 20px;
					margin-left: 20px;
					.right{
						margin-left: 15rpx;
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
