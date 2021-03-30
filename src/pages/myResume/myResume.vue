<template>
	<view class="resume" v-if="resumeId!='0'">
		<!-- 个人信息 -->
		<view class="person">
			<view class="tit">
				<image :src="src" mode="" style="width: 15rpx;height: 15rpx;"></image>
				<text>个人信息</text>
			</view>
			<view class="intro">
				<view class="avatar">
					<u-avatar :src="avatar" show-sex=true :sex-icon="sex"></u-avatar>
					<view class="info">
						<text class="name">{{resume.resumeName}}</text>
						<text class="info1">{{resume.age}} 岁</text>
						<view class="info3">
							<text class="info2">{{resume.maxDegree}}</text>
							<view class="phone">
								<u-icon name="phone" color="#5785E5"></u-icon>
								<text class="info1">{{resume.phone}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="intro">
				<text>期望工作：</text>
			    <text>{{resume.industry}}</text>
			</view>
			<view class="introwages">
				<text>期望薪资：</text>
			    <text>{{resume.compensation}}</text>
			</view>
			<view class="intro">
				<view class="">
					<text>邮箱：</text>
					<text>15627534849</text>
				</view>
			</view>
			<view class="intro">
				<text>求职地区：</text>
			    <text>{{resume.workCity}}</text>
			</view>
			<view class="PersonInfo">
				<u-button size="mini" type="info" shape="circle" @click="open(resume)">修改</u-button>
			</view>
		</view>
		<!-- 工作经验 -->
		<view class="workExp">
			<view class="tit">
				<image :src="src" mode="" style="width: 15rpx;height: 15rpx;"></image>
				<text>工作经验</text>
			</view>
			<view class="experience">
				<text>公司名称：</text>
				<text>{{workExp.companyName}}</text>
			</view>
			<view class="experience">
				<text>在公司担任职位：</text>
				<text>{{workExp.workName}}</text>
			</view>
			<view class="experience">
				<text>就职时间：</text>
				<text>1年</text>
			</view>
			<view class="experience">
				<text>工作内容：</text>
				<text>{{workExp.workMatter}}</text>
				<view class="PersonInfo">
					<u-button size="mini" type="info" shape="circle" @click="Updatework(resume.workExp[0])">修改</u-button>
				</view>
			</view>
			
			<!-- 修改工作经历 -->
			<!-- <UpdateworkEXP :workExp="workExp"></UpdateworkEXP> -->
		</view>
		<!-- 教育经历 -->
		<view class="education">
			<view class="tit">
				<image :src="src" mode="" style="width: 15rpx;height: 15rpx;"></image>
				<text>教育经历</text>
			</view>
			<view class="graduate">
				<text>毕业学校：</text>
				<text>{{education.schoolName}}</text>
			</view>
			<view class="graduate">
				<text>毕业时间：</text>
				<text>2021-07-10</text>
			</view>
			<view class="graduate">
				<text>最高学历：</text>
				<text>{{education.degree}}</text>
			</view>
			<view class="graduate">
				<text>专业：</text>
				<text>{{education.specialty}}</text>
			</view>
			<view class="graduate">
				<text>学校经历：</text>
				<text>{{education.schoolExperience}}</text>
				<view class="PersonInfo">
					<u-button size="mini" type="info" shape="circle" @click="Updateeducation(resume.educationalExp[0])">修改</u-button>
				</view>
			</view>
			<!-- 修改教育经历 -->
			<!-- <UpdateeducationEXP></UpdateeducationEXP> -->
		</view>
		<!-- 项目经历 -->
		<view class="project">
			<view class="tit">
				<image :src="src" mode="" style="width: 15rpx;height: 15rpx;"></image>
				<text>项目经历</text>
			</view>
			<view class="project">
				<text>项目名称：</text>
				<text>{{project.projectName}}</text>
			</view>
			<view class="project">
				<text>项目描述：</text>
				<text>{{project.projectDescription}}</text>
			</view>
			<view class="project">
				<text>项目链接：</text>
				<text>{{project.projectLink}}</text>
				<!-- <u-link href="project.project_link" :under-line="true">{{project.project_link}}</u-link> -->
				<view class="PersonInfo">
					<u-button size="mini" type="info" shape="circle" @click="Updateproject(resume.projectExp[0])">修改</u-button>
				</view>
			</view>
		</view>
		<!-- 修改项目经历 -->
		<!-- <UpdateprojectEXP></UpdateprojectEXP> -->
	</view>
	<view v-else>
		<u-empty text="你还没有创建自己的简历,请先创建简历" mode="list" margin-top=600></u-empty>
		<view class="create">
			<u-button type="primary" @click="toCreateResume">点击前往创建简历</u-button>
		</view>
	</view>
</template>

<script>
	import {updateResume,resumeList} from '../../util/resume.js'
	export default {
		data() {
			return {
				src:'../../static/radius.png',
				avatar: '',
				resume:'',
				resumeId:'',
				workExp:'',
				education:'',
				project: {},
				sex: '',
				show:false,
				model:{
					name:'',
					age:'',
					sex:'',
					phone:'',
					wages:'',
					degree:'',
					industry:'',
					region:''
				},
			}
		},
		components:{
			
		},
		created() {
			this.avatar=this.$store.state.avatar
		},
	  onLoad(options) {
	  	console.log(options.resumeId)
		this.resumeId = options.resumeId
	  	this.getResume(options.resumeId)
	  },
		// onShow() {
		// 	this.getResume()
		// },
		methods: {
			open(resume) {
					// this.show = true;
					uni.navigateTo({
						url:'/pages/myResume/UpdatemyResume/UpdatemyResume?resume='+encodeURIComponent(JSON.stringify(resume))
					})
					},
		    Updatework(workExp){
				console.log(workExp)
				uni.navigateTo({
					url:'/pages/myResume/UpdateworkExp/UpdateworkExp?workExp='+encodeURIComponent(JSON.stringify(workExp))
				})
			},
			Updateeducation(educationalExp){
				uni.navigateTo({
					url:'/pages/myResume/UpdateEducation/UpdateEducation?educationalExp='+encodeURIComponent(JSON.stringify(educationalExp))
				})
			},
			Updateproject(projectExp){
				uni.navigateTo({
					url:'/pages/myResume/UpdateProject/UpdateProject?projectExp='+encodeURIComponent(JSON.stringify(projectExp))
				})
			},
			toCreateResume(){
				uni.navigateTo({
					url:'../CreateResume/CreateResume'
				})
			},
		// 查询我的简历
		  async getResume(resumeId){
			  console.log(resumeId)
			  resumeList({
				"resumeId":resumeId,
				"paging":{
					"page":0
				}
			  }).then(res=>{
				  console.log(res)
				  this.resume = res.data.data.resumes[0],
				  this.workExp = res.data.data.resumes[0].workExp[0],
				  this.education = res.data.data.resumes[0].educationalExp[0],
				  this.project = res.data.data.resumes[0].projectExp[0],
				  // 修改个人信息
				  this.model.name = res.data.data.resumes[0].resume_name,
				  this.model.age = res.data.data.resumes[0].age,
				  this.model.sex = res.data.data.resumes[0].sex,
				  this.model.phone = res.data.data.resumes[0].phone,
				  this.model.wages = res.data.data.resumes[0].compensation,
				  this.model.industry = res.data.data.resumes[0].industry,
				  this.model.degree = res.data.data.resumes[0].maxDegree,
				  this.model.region = res.data.data.resumes[0].workCity
				  if(this.resume.sex=='男'){
				  	this.sex = "man"
				  }else{
				  	this.sex = "woman"
				  }
			  }).catch(err=>{
				   console.log(err)
			  })
				
				},
		},
		
	}
</script>

<style lang="scss">
.tit{
	padding: 10rpx;
}
// 个人资料
.person{
	border-bottom: 10rpx solid #F1F1F1;
	height: 500rpx;
}	
.intro{
	display: flex;
	padding: 10rpx;
}
.introwages{
	display: flex;
	padding: 10rpx;
	color: #FF0000;
}
// 求职意向
.intention{
	border-bottom: 10rpx solid #F1F1F1;
	.work{
		display: flex;
		padding: 10rpx;
	}
}
// 教育经历
.education{
	border-bottom: 10rpx solid #F1F1F1;
	.graduate{
		display: flex;
		padding: 10rpx;
	}
}
// 工作经历
.workExp{
	border-bottom: 10rpx solid #F1F1F1;
	.experience{
		padding: 10rpx;
	}
}
// 项目经历
.project{
	padding: 10rpx;
}
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
.PersonInfo{
	float: right;
}
.create{
	width: 80%;
	margin-left: 40px;
}
</style>
