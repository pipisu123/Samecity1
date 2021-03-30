<template>
	<view class="ResumeDetail">
		<view class="person">
			<view class="intro">
				<view class="avatar">
					<u-avatar :src="avatar" show-sex=true :sex-icon="sex"></u-avatar>
					<view class="info">
						<text class="name">{{item.resumeName}}</text>
						<text class="info1">{{item.age}} 岁</text>
						<view class="info3">
							<text class="info2">{{item.maxDegree}}</text>
							<view class="phone">
								<u-icon name="phone" color="#5785E5"></u-icon>
								<text class="info1">{{item.phone}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="intension">
			<view class="nav">
				<text>求职意向</text>
			</view>
			<view class="job">
				<view class="intro">
					<view class="">
						<u-icon name="account" color="#5785E5"></u-icon>
						<text>{{item.industry}}</text>
					</view>
					<view class="">
						<u-icon name="map" color="#5785E5"></u-icon>
						<text>{{item.workCity}}</text>
					</view>
					<view class="wages">
						<u-icon name="rmb-circle" color="#FF0000"></u-icon>
						<text>{{item.compensation}}</text>
					</view>
					<view class="">
						<u-icon name="file-text-fill" color="#5785E5"></u-icon>
						<text>{{item.workType}}</text>
					</view>
				
				</view>
			</view>
		</view>
		<!-- 自我评价 -->
		<view class="comment">
			<view class="nav">
				<text>自我评价</text>
			</view>
			<view class="content">
				<text>{{item.introduction}}</text>
			</view>
		</view>
		<!-- 工作经历 -->
		<view class="work">
			<view class="nav">
				<text>工作经历</text>
			</view>
			<view class="experience">
				<view class="intro">
					<view class="">
						<u-icon name="home" color="#5785E5"></u-icon>
						<text>{{item.workExp[0].companyName}}</text>
					</view>
					<view class="">
						<u-icon name="edit-pen" color="#5785E5"></u-icon>
						<text>{{item.workExp[0].workName}}</text>
					</view>
					<view class="dec">
						<text>工作描述</text>
						<text>{{item.workExp[0].workMatter}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 教育经历 -->
		<view class="education">
			<view class="nav">
				<text>教育经历</text>
			</view>
			<view class="graduate">
				<text>毕业学校：</text>
				<text>{{item.educationalExp[0].schoolName}}</text>
			</view>
			<view class="graduate">
				<text>毕业时间：</text>
				<text>2021-07-10</text>
			</view>
			<view class="graduate">
				<text>最高学历：</text>
				<text>{{item.educationalExp[0].degree}}</text>
			</view>
			<view class="graduate">
				<text>专业：</text>
				<text>{{item.educationalExp[0].specialty}}</text>
			</view>
			<view class="graduate">
				<text>学校经历：</text>
				<text>{{item.educationalExp[0].schoolExperience}}</text>
			</view>
			</view>
		<!-- 项目经历 -->
		<view class="projectexp">
			<view class="nav">
				<text>项目经历</text>
			</view>
			<view class="project">
				<text>项目名称：</text>
				<text>{{item.projectExp[0].projectName}}</text>
			</view>
			<view class="project">
				<text>项目描述：</text>
				<text>{{item.projectExp[0].projectDescription}}</text>
			</view>
			<view class="project">
				<text>项目链接：</text>
				<text>{{item.projectExp[0].projectLink}}</text>
				<!-- <u-link href="project.project_link" :under-line="true">{{project.project_link}}</u-link> -->
			</view>
		</view>
		<BottomBar @Collect="Collect" 
		@UnCollect="UnCollect"
		 @Delivery="Delivery" 
		 @buyResume="buyResume" 
		 @gochat="gochat(userId)"
		  :userId="userId"
		  :collectionResumeId="collectionResumeId"
		  ></BottomBar>
		</view>
</template>

<script>
	import BottomBar from './childComps/BottomBar.vue'
	
	import {resumeList} from '../../util/resume.js'
	import {collectResume,UncollectResume} from '../../util/resumecollection.js'
	import {addBuyResume} from '../../util/resume.js'
	
	export default {
		data() {
			return {
				avatar: '',
				sex: '',
				item: '',
				resumeId:'',  
				userId:'',  //发布简历人的id
				collectionResumeId:''  //收藏id
				
			}
		},
		onLoad(options) {
			console.log(options)
			this.getDetail(options.resumeId)
		},
		components:{
			BottomBar
		},
		methods: {
			// 跳转到聊天
			gochat(e){
				console.log(e)
				const res = this.$myRequest({
						url:'sys/message/addMessageUserList?toId='+e,
						dataType: "json",
						header: {
						        'content-type': 'application/json', 
						        },
						data:JSON.stringify({ 
						  
						}),
						method: 'POST'
					})
				uni.navigateTo({
					url:'/pages/detail/chat/chat?e='+e
				})
			},
			// 收藏
			Collect(){
				collectResume({
					"resumeId": this.resumeId
				}).then(res=>{
					console.log(res)
					this.collectionResumeId = res.data.data.collectionResumeId
					if(res.data.code === 20000 ){
						uni.showToast({
							title:'收藏成功'
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 取消收藏
			UnCollect(){
				UncollectResume({
					"collectionResumeId": this.collectionResumeId
				}).then(res=>{
					console.log(res)
					if(res.data.code === 20000 ){
						uni.showToast({
							title:'已取消收藏'
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 购买简历
			buyResume(){
				addBuyResume({
					"resumeId":this.resumeId
				}).then(res=>{
					console.log(res)
				}).catch(err=>{
					console.log(err)
				})
			},
			// 查询简历详情
			 async getDetail(resumeId){
				 console.log(resumeId)
				 resumeList({
				"resumeId":resumeId,
				"paging":{
					"page":0
				}
				 }).then(res=>{
					 console.log(res)
					 this.item = res.data.data.resumes[0];
					 this.userId = res.data.data.resumes[0].userId;
					 this.resumeId = res.data.data.resumes[0].resumeId;
					 this.collectionResumeId = res.data.data.resumes[0].collectionResumeId;
					 if(this.item.sex=='男'){
					 	this.sex = "man"
					 }else{
					 	this.sex = "woman"
					 }
				 }).catch(err=>{
					 console.log(err)
				 })
				
			}
		}
	}
</script>

<style lang="scss">
// 个人资料
.person{
	border-bottom: 3rpx solid #F1F1F1;
	.avatar{
		display: flex;
		padding: 8rpx;
		.info{
			padding-left: 20rpx;
		}
		.info1{
			font-size: 20rpx;
			color: #999999;
			margin-left: 10rpx;
		}
		.info2{
			font-size: 20rpx;
			color: #999999;
			margin-top: 3px;
		}
		.info3{
			display: flex;
			.phone{
				margin-left: 20rpx;
			}
		}
		.name{
			font-size: 30rpx;
			font-weight: bold;
		}
	}
}
// 求职意向
.intension{
	
	.job{
		display: flex;
		padding: 20rpx;
		text{
			margin-left: 15rpx;
			font-size: 25rpx;
			color: #999999;
		}
		border-bottom: 1rpx solid #F1F1F1;
	}
	.wages{
		text{
			color: #FF0000;
		}
	}
}
.nav{
	border-bottom: 1rpx solid #F1F1F1;
	padding: 15rpx;
	}
.content{
	display: flex;
	border-bottom: 5rpx solid #F1F1F1;
	padding: 20rpx;	
	text{
		color: #999999;
		font-size: 25rpx;
	}
}
// 工作经历
.work{
	border-bottom: 5rpx solid #F1F1F1;
	.intro{
		text{
			margin-left: 15rpx;
			font-size: 25rpx;
			color: #999999;
		}
		.dec{
			
		}
	}
}
// 教育经历
.education{
	border-bottom: 10rpx solid #F1F1F1;
	.graduate{
		display: flex;
		padding: 10rpx;
		text{
			font-size: 25rpx;
			color: #999999;
		}
	}
}
// 项目经历
.projectexp{
	padding: 10rpx;
	text{
		font-size: 25rpx;
		color: #999999;
	}
}
</style>
