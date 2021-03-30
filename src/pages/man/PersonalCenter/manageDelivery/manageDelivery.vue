<template>
	<view v-if="list.length != 0">
		<view class="resumelist" v-for="(item1,index) in list" :key="index">
			<u-avatar :src="item1.src" size=100 show-sex=true :sex-icon="item1.sex"></u-avatar>
			<view class="right">
				<view class="title">
					<text class="name">{{item1.resume.resumeName}}</text>
				</view>
				<view class="base">
					<view class="">
						<text>{{item1.resume.age}}岁-</text>
					</view>
					<view class="">
						<text>{{item1.resume.maxDegree}}-</text>
					</view>
					<view class="">
						<text>{{item1.resume.workCity.split("-")[2]}}</text>
					</view>
				</view>
				<view class="work">
					<text>职位：{{item1.resume.industry}}</text>
					<view class="worktype">
						<text>{{item1.resume.workType}}</text>
					</view>
				</view>
				<view class="wages">
					<text>期望工资：{{item1.resume.compensation}}</text>
				</view>
			</view>
			<view class="handle">
				<u-button size="mini" shape="square" v-show="show" @click="agreeHandle(item1.deliveryId)" v-if="item1.handle === 2">通过</u-button>
				<u-button size="mini" shape="square" class="center" @click="inviteInterview(item1.userId,item1.recruitmentId,item1.deliveryId)" type="success" v-else-if="item1.handle === 1&&item1.invitationId===null">邀请面试</u-button>
				<u-button size="mini" shape="square" v-show="show" @click="rejectHandle(item1.deliveryId)" class="left" v-if="item1.handle === 2">拒绝</u-button>
				<u-button size="mini" shape="square" class="center" type="error" v-else-if="item1.handle === 0">已拒绝</u-button>
				<u-button size="mini" shape="square" class="center" type="success" disabled=true v-else-if="item1.handle === 1&&item1.invitationId!=null">已邀请</u-button>
			</view>
		</view>
		<!-- 邀请面试弹框 -->
		<u-popup v-model="showpopup" mode="center" closeable=true width="600rpx" height="500px" border-radius=25>
			<view>
				<view class="head">
					<text>请填写邀请信息</text>
				</view>
				<view class="form">
					<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
					<u-form-item label-width="80" :label-position="labelPosition" label="地址" prop="address">
						<u-input :border="border" placeholder="请选择公司地址" v-model="model.address" type="select" @click="Toaddress"></u-input>
					</u-form-item>
					<u-form-item :label-position="labelPosition" label="时间" prop="inviteTime" label-width="80">
						<u-input :border="border" type="select" :select-open="pickerShow" v-model="model.inviteTime" placeholder="请选择面试时间"
						 @click="pickerShow = true"></u-input>
					</u-form-item>
					<u-form-item label-position="left" label="备注" prop="remarks" label-width="80">
						<u-input type="textarea" :border="border" placeholder=" " v-model="model.remarks" :height="height" />
					</u-form-item>
					</u-form>
				</view>
				<u-alert-tips type="warning" :show-icon="true" :title="title" :description="description"></u-alert-tips>
				<view class="invite">
					<u-button type="success" @click="sendInvitation">发送邀请</u-button>
				</view>
			</view>
		</u-popup>
		<u-picker mode="time" v-model="pickerShow" @confirm="timeConfirm" :params="params"></u-picker>
	</view>
	<view v-else>
		<u-empty text="暂无简历投递" mode="list" margin-top=600></u-empty>
	</view>
</template>

<script>
	import {
		findDelivery,
		handleDelivery
	} from '../../../../util/recruitment/delivery.js'
	import {
		addInvitation
	} from '../../../../util/recruitment/invitation.js'
	import { findCompanyByUserId } from '../../../../util/company.js'
	export default {
		data() {
			return {
				list: [],
				show: true,
				show1: true,
				showpopup: false,
				pickerShow: false,
				border: true,
				height: 150,
				title: '温馨提示',
				description: '信息必须属实，若有违法行为，必受法律制裁！',
				userId:'',
				recruitmentId:'',
				deliveryId:'',
				errorType: ['message'],
				model: {
					address: '',
					inviteTime: '',
					remarks: ''
				},
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: false
				},
				rules:{
					inviteTime:[
						{
							required: true,
							message: '请输入面试时间',
							trigger: 'blur' ,
						}
					],
					remarks:[
						{
							required: true,
							message: '请输入备注',
							trigger: 'change' ,
						}
					]
				}
			}
		},
		onLoad(options) {
			this.getDeliveryList(options.userId)
		},
		methods: {
			// 选择面试时间回调
			timeConfirm(e) {
				this.model.inviteTime = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute;
			},
			// 选择地址
			Toaddress() {
				uni.chooseLocation({
					success: (res) => {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('城市：' + res.address.cityCode);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						let latitude = res.latitude; //纬度
						let longitude = res.longitude; //经度
						this.model.address = res.address
						this.model.latitude = res.latitude
						this.model.longitude = res.longitude
					}
				});
			},
			// 接受投递简历
			agreeHandle(deliveryId) {
				uni.showLoading({})
				handleDelivery({
					"handle": 1,
					"deliveryId": deliveryId,
				}).then(res => {
					console.log(res)
					if (res.data.code === 20000) {
						uni.hideLoading()
						this.show = false
						this.show1 = false
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 拒绝简历投递
			rejectHandle(deliveryId) {
				uni.showLoading({})
				handleDelivery({
					"handle": 0,
					"deliveryId": deliveryId,
				}).then(res => {
					console.log(res)
					if (res.data.code === 20000) {
						uni.hideLoading()
						this.show = false
						this.show1 = false
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 邀请面试弹框
			inviteInterview(userId,recruitmentId,deliveryId) {
				this.$refs.uForm.setRules(this.rules);
				uni.showLoading({
					title:'加载中...'
				})
				this.showpopup = true
				this.userId = userId
				this.recruitmentId = recruitmentId
				this.deliveryId = deliveryId
				findCompanyByUserId({
					
				}).then(res=>{
					console.log(res)
					uni.hideLoading()
					this.model.address = res.data.data.companys.company_address
				}).catch(err=>{
					console.log(err)
				})
			},
			sendInvitation() {
				this.$refs.uForm.validate(valid => {
						if (valid) {
							uni.showLoading({
								title:'正在发送邀请...'
							})
							addInvitation({
								"inviteesId": this.userId,
								"recruitmentId": this.recruitmentId,
								"interviewTime": this.model.inviteTime,
								"companyAddress": this.model.address,
								"remarks": this.model.remarks,
							    "deliveryId":this.deliveryId,
							}).then(res => {
								console.log(res)
								uni.hideLoading()
							}).catch(err => {
								console.log(err)
							})
						}
						})
			},
			// 查询投递简历
			getDeliveryList(userId) {
				uni.showLoading({
					title: '正在加载...'
				})
				findDelivery({
					"releaseUserId": userId
				}).then(res => {
					console.log(res)
					if (res.data.code === 20000) {
						uni.hideLoading()
					}
					this.list = res.data.data.deliveryVOs
					for (var i = 0; i < this.list.length; i++) {
						if (this.list[i].resume.sex == '男') {
							this.list[i].sex = "man"

						} else {
							this.list[i].sex = "woman"

						}
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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

		.handle {
			display: flex;
			padding: 30rpx;
			margin-left: 15rpx;

			.left {
				margin-left: 25rpx;
			}

			.center {
				width: 40rpx;
				margin-left: 100rpx;
			}
		}
	}

	// 弹框样式
	.head {
		width: 100%;
		height: 49px;
		background-color: #FF8000;
		text-align: center;
		padding-top: 15px;
	}
	.form{
		margin-left: 15rpx;
		margin-right: 15rpx;
	}

	.invite {
		width: 80%;
		margin-left: 70rpx;
		margin-top: 150rpx;
	}
	
</style>
