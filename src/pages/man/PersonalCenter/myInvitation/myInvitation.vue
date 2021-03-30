<template>
	<view class="invitation" v-if="InviteesVOsList.length!=0">
		<view class="invitation-items" @click="goDetailInvite(invitationInfo,index)" v-for="(item,index) in InviteesVOsList" :key="index">
			<image :src="'http://192.168.101.24:8080/'+item.recruitment.poster_path" mode=""></image>
			<view class="right">
				<view class="title">
					<text>{{item.recruitment.recruitment_title}}</text>
				</view>
				<view class="industry">
					<text>职位：{{item.recruitment.work_name}}</text>
				</view>
				<view>面试时间：{{item.interviewTime}}</view>
				<view class="wages">薪资：{{item.recruitment.wages}}</view>
				<view>公司：{{item.company.company_name}}</view>
			</view>
			<view class="handle-invitation">
				<text v-if="item.handle ===2">{{item.handleStr}}</text>
				<text v-else-if="item.handle ===1" class="agreehandle">{{item.handleStr}}</text>
				<text v-else-if="item.handle ===0" class="refusehandle">{{item.handleStr}}</text>
			</view>
		</view>
	</view>
	<view v-else>
		<u-empty text="暂无简历邀请" mode="list" margin-top=600></u-empty>
	</view>
</template>

<script>
	import { findInvitationByInviteesId } from '../../../../util/recruitment/invitation.js'
	export default {
		data() {
			return {
				InviteesVOsList: [],
				invitationInfo:{
					image: null,
					title:'',
					workname:'',
					wage:'',
					conpanyname:'',
					worktype:'',
					invitationtime:'',
					invitaionaddress:'',
					remark:'',
					invitationId:'',
					handle:'',
				}
			}
		},
		onLoad() {
			this.getInvitationList()
		},
		methods: {
			// 跳转面试邀请详情
			goDetailInvite(invitationInfo,index){
				console.log(index)
					this.invitationInfo.image = this.InviteesVOsList[index].recruitment.poster_path
					this.invitationInfo.title = this.InviteesVOsList[index].recruitment.recruitment_title
					this.invitationInfo.workname = this.InviteesVOsList[index].recruitment.work_name
					this.invitationInfo.wage = this.InviteesVOsList[index].recruitment.wages
					this.invitationInfo.conpanyname = this.InviteesVOsList[index].company.company_name
					this.invitationInfo.worktype = this.InviteesVOsList[index].recruitment.work_types
					this.invitationInfo.invitationtime = this.InviteesVOsList[index].interviewTime
					this.invitationInfo.invitaionaddress = this.InviteesVOsList[index].companyAddress
					this.invitationInfo.remark = this.InviteesVOsList[index].remarks
					this.invitationInfo.invitationId = this.InviteesVOsList[index].invitationId
					this.invitationInfo.handle = this.InviteesVOsList[index].handle
				uni.navigateTo({
					url:'/pages/man/PersonalCenter/DetailInvite/DetailInvite?invitationInfo='+encodeURIComponent(JSON.stringify(invitationInfo))
				})
			},
			// 查询面试邀请列表
			getInvitationList(){
				uni.showLoading({
					title:'正在加载中...'
				})
				findInvitationByInviteesId({
					
				}).then(res=>{
					console.log(res)
					if(res.data.code === 20000){
					   uni.hideLoading()
					}
					this.InviteesVOsList = res.data.data.InviteesVOs;
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss">
	.invitation {
		.invitation-items {
			display: flex;
			padding: 15rpx 20rpx;
			border-bottom: 2rpx solid #F1F1F1;
	
			image {
				min-width: 30rpx;
				max-width: 200rpx;
				min-height: 30rpx;
				max-height: 160rpx;
			}
	
			.right {
				width: 350rpx;
				margin-left: 15rpx;
				margin-right: 40rpx;
	
				view {
					font-size: 23rpx;
				}
	
				.title {
					font-weight: bold;
					font-size: 28rpx;
					display: flex;
				}
			}
	
		}
	}
	.handle-invitation{
		font-size: 23rpx;
		color: #ff0000;
		.agreehandle{
			color: #008000;
		}
		.refusehandle{
			color: #ff0000;
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

</style>
