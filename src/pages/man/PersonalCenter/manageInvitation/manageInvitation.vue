<template>
	<view v-if="resumelist.length!=0">
		<view class="resumelist" v-for="(item1,index) in resumelist" :key="index" @click="godetail(inviteInfo,index)">
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
			<view class="handle-text">
				<text v-if="item1.handle === 2" class="handle">{{item1.handleStr}}</text>
				<text v-else-if="item1.handle ===1" class="handle1">{{item1.handleStr}}</text>
				<text v-else-if="item1.handle ===0" class="handle">{{item1.handleStr}}</text>
			</view>
			</view>
	</view>
	<view v-else>
		<u-empty text="暂无面试邀请" mode="list" margin-top=600></u-empty>
	</view>
</template>

<script>
	import { findInvitation } from '../../../../util/recruitment/invitation.js'
	export default {
		data() {
			return {
				resumelist:[],
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
				}
			}
		},
		onLoad() {
			this.getInvitationList()
		},
		methods: {
			// 跳转到建立邀请详情
			godetail(inviteInfo,index){
				this.inviteInfo.resumeName = this.resumelist[index].resume.resumeName
				this.inviteInfo.age = this.resumelist[index].resume.age
				this.inviteInfo.maxDegree = this.resumelist[index].resume.maxDegree
				this.inviteInfo.sex = this.resumelist[index].sex
				this.inviteInfo.workType = this.resumelist[index].resume.workType
				this.inviteInfo.industry = this.resumelist[index].resume.industry
				this.inviteInfo.compensation = this.resumelist[index].resume.compensation
				this.inviteInfo.workCity = this.resumelist[index].resume.workCity
				this.inviteInfo.interviewTime = this.resumelist[index].interviewTime
				this.inviteInfo.companyAddress = this.resumelist[index].companyAddress
				this.inviteInfo.remarks = this.resumelist[index].remarks
				this.inviteInfo.handle = this.resumelist[index].handle
				console.log(inviteInfo)
				uni.navigateTo({
					url:'/pages/man/PersonalCenter/resumeInvite/resumeInvite?inviteInfo='+encodeURIComponent(JSON.stringify(inviteInfo))
				})
			},
			getInvitationList(){
				uni.showLoading({
					title:'正在加载中...'
				})
				findInvitation({
					
				}).then(res=>{
					console.log(res)
					if(res.data.code === 20000){
						uni.hideLoading()
					}
					this.resumelist = res.data.data.InvitationVOs
					for (var i = 0; i < this.resumelist.length; i++) {
						if (this.resumelist[i].resume.sex == '男') {
							this.resumelist[i].sex = "man"
					
						} else {
							this.resumelist[i].sex = "woman"
					
						}
					}
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" >
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
		.handle-text{
			font-size: 22rpx;
			margin-left: 180rpx;
			.handle{
				color: #ff0000;
			}
			.handle1{
				color: #008000;
			}
			
			
		}
}
</style>
