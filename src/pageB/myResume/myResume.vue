<template>
	<view class="resume" v-if="resumeId!='0'">
		<!-- 个人信息 -->
		<view class="person">
			<view class="tit">
				<text>个人信息</text>
			</view>
			<view class="intro" @click="open(resume)">
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
						<text style="color: #999999;">{{resume.industry}}</text>
					</view>
				</view>
				<u-icon name="arrow-right" color="#2979ff" size="28"></u-icon>
			</view>
		</view>
		<!-- 工作经验 -->
		<view class="workExp">
			<view class="tit">
				<text>工作经历</text>
				<u-icon name="plus-circle" color="#2979ff" size=50 @click="addWork"></u-icon>
			</view>
			<view style="display: flex;" v-for="(item,index) in workExp" :key="index" @click="Updatework(workExp[index])">
				<view style="width: 97%;">
					<view>
						<text>{{item.companyName}}</text>
					</view>
					<view class="experience">
						<text>{{item.workName}},</text>
						<text>{{item.workTime}}</text>
					</view>
					<view class="experience">
						<text>{{item.workMatter}}</text>
					</view>
				</view>
				<u-icon name="arrow-right" color="#2979ff" size="28"></u-icon>
			</view>
		</view>
		<!-- 教育经历 -->
		<view class="education">
			<view class="tit">
				<text>教育经历</text>
				<u-icon name="plus-circle" color="#2979ff" size=50 @click="addEducate"></u-icon>
			</view>
			<view style="display: flex;" v-for="(item1,index) in education" :key="index" @click="Updateeducation(education[index])">
				<view style="width: 97%;">
					<view style="padding: 10rpx;">
						<text>{{item1.schoolName}}</text>
					</view>
					<view style="display: flex;color: #999999;font-size: 25rpx;padding: 10rpx;">
						<text>{{item1.specialty}},</text>
						<text>{{item1.schoolTime}}毕业</text>
					</view>
					<view class="graduate">
						<text>{{item1.schoolExperience}}</text>
					</view>
				</view>
				<u-icon name="arrow-right" color="#2979ff" size="28"></u-icon>
			</view>
		</view>
		<!-- 项目经历 -->
		<view>
			<view class="tit">
				<text>项目经历</text>
				<u-icon name="plus-circle" color="#2979ff" size=50 @click="addProject"></u-icon>
			</view>
			<view style="display: flex;" v-for="(item2,index) in project" :key="index" @click="Updateproject(project[index])">
				<view style="width: 97%;">
					<view class="project">
						<text>{{item2.projectName}}</text>
					</view>
					<view class="project">
						<text>{{item2.projectLink}}</text>
					</view>
					<view class="project">
						<text>{{item2.projectDescription}}</text>
					</view>
				</view>
				<u-icon name="arrow-right" color="#2979ff" size="28"></u-icon>
			</view>
		</view>
		<view class="bottom-nav">
			<view style="align-items: center">
				<view style="font-size: 40rpx;width: 100%;margin-top: 15rpx;">预览简历</view>
			</view>
		</view>
		<!-- 弹出层 -->
		<!-- 添加工作经历 -->
		<u-popup v-model="popupShow" width=100% closeable=true>
			<view>
				<view style="text-align: center;margin-top: 50rpx;">
					添加工作经历
				</view>
				<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="150" :label-position="labelPosition"
					 label="公司名称" prop="Companyname">
						<u-input :border="border" placeholder="请输入公司名称" v-model="addResume.Companyname" type="text"></u-input>
					</u-form-item>
					<u-form-item :label-position="labelPosition" label="选择职位" prop="workname" label-width="150">
						<u-input :border="border" placeholder="请输入职位名称" v-model="addResume.workname" type="text"></u-input>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="150" :label-position="labelPosition"
					 label="在职时间" prop="worktime">
						<view style="display: flex;">
							<u-input border="true" placeholder="起始日期" v-model="addResume.beginTime" type="text" @click="pickerShow2 = true"></u-input>
							<text>到</text>
							<u-input border="true" placeholder="结束日期" v-model="addResume.stopTime" type="text" @click="pickerShow3 = true"></u-input>
						</view>
					</u-form-item>
					<u-form-item :label-position="labelPosition" label="工作内容" prop="workmatter" label-width="150">
						<u-input type="textarea" :border="border" placeholder="请填写工作内容" v-model="addResume.workmatter" />
					</u-form-item>
				</u-form>
				<u-picker mode="time" v-model="pickerShow2" @confirm="timeConfirm2"></u-picker>
				<u-picker mode="time" v-model="pickerShow3" @confirm="timeConfirm3"></u-picker>
				<view style="margin-top: 150rpx;">
					<u-button type="primary" @click="submit(resume.resumeId)">提交</u-button>
				</view>
			</view>
		</u-popup>
		<!-- 添加教育经历 -->
		<u-popup v-model="popupShow1" width=100% closeable=true>
			<view>
				<view style="text-align: center;margin-top: 50rpx;">
					添加教育经历
				</view>
				<u-form :model="model" :rules="rules" ref="uForm1" :errorType="errorType">
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="150" :label-position="labelPosition"
					 label="学校名称" prop="Schoolname">
						<u-input :border="border" placeholder="请输入学校名称" v-model="addEducation.schoolName" type="text"></u-input>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="120" :label-position="labelPosition"
					 label="专业" prop="speciality">
						<u-input :border="border" placeholder="请输入专业名称" v-model="addEducation.speciality" type="text"></u-input>
					</u-form-item>
					<u-form-item :label-position="labelPosition" label="毕业时间" prop="time" label-width="150">
						<u-input :border="border" type="select" :select-open="pickerShow1" v-model="addEducation.time" placeholder="请选择毕业时间"
						 @click="pickerShow1 = true"></u-input>
					</u-form-item>
					<u-form-item :label-position="labelPosition" label="学校经历" prop="shcoolexp" label-width="150">
						<u-input type="textarea" :border="border" placeholder="请填写学校经历" v-model="addEducation.schoolExperience" />
					</u-form-item>
				</u-form>
				<u-picker mode="time" v-model="pickerShow1" @confirm="timeConfirm"></u-picker>
				<view style="margin-top: 150rpx;">
					<u-button type="primary" @click="submit1(resume.resumeId)">提交</u-button>
				</view>
			</view>
		</u-popup>
		<!-- 添加项目经历 -->
	<u-popup v-model="popupShow2" width=100% closeable=true>
		<view>
			<view style="text-align: center;margin-top: 50rpx;">
				添加项目经历
			</view>
			<u-form :model="model" :rules="rules" ref="uForm2" :errorType="errorType">
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="150" :label-position="labelPosition" label="项目名称" prop="Projectname">
				<u-input :border="border" placeholder="请输入项目名称" v-model="addproject.Projectname" type="text"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="150" :label-position="labelPosition" label="担任角色" prop="Proworkname">
				<u-input :border="border" placeholder="请输入担任角色" v-model="addproject.Proworkname" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="项目描述" prop="Prodescribe" label-width="150">
				<u-input type="textarea" :border="border" placeholder="请填项目描述" v-model="addproject.Prodescribe" />
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="150" :label-position="labelPosition" label="项目链接" prop="Projecturl">
				<u-input :border="border" placeholder="请输入项目url" v-model="addproject.Projecturl" type="text"></u-input>
			</u-form-item>
			</u-form>
			<view style="margin-top: 150rpx;">
				<u-button type="primary" @click="submit2(resume.resumeId)">提交</u-button>
			</view>
		</view>
	</u-popup>
		<u-toast ref="uToast" />
	</view>
	<view v-else>
		<u-empty text="你还没有创建自己的简历,请先创建简历" mode="list" margin-top=600></u-empty>
		<view class="create">
			<u-button type="primary" @click="toCreateResume">点击前往创建简历</u-button>
		</view>
	</view>
</template>

<script>
	import {
		updateResume,
		resumeList
	} from '../../util/resume.js'
	import {
		addWorkExp
	} from '@/util/recruitment/work.js'
	import {
		addEducationalExp
	} from '@/util/recruitment/education.js'
	import {
		addProjectExp
	} from '@/util/recruitment/project.js'
	export default {
		data() {
			return {
				// 添加工作经历
				addResume: {
					Companyname: '',
					workname: '',
					beginTime: '',
					stopTime: '',
					workmatter: '',
					worktime: ''
				},
				// 添加教育经历
				addEducation: {
					schoolExperience: '',
					schoolName: '',
					time: '',
					speciality: ''
				},
				// 添加项目经历
				addproject:{
					Projectname:'',
					Proworkname:'',
					Prodescribe:'',
					Projecturl:''
				},
				pickerShow1: false,
				pickerShow2: false,
				pickerShow3: false,
				popupShow: false,
				popupShow1: false,
				popupShow2: false,
				src: '../../static/radius.png',
				avatar: '',
				resume: '',
				resumeId: '',
				workExp: [],
				education: [],
				project: [],
				sex: '',
				show: false,
				border: false,
				labelPosition: 'left',
				actionSheetShow: false,
				errorType: ['message'],
				model: {
					name: '',
					age: '',
					sex: '',
					phone: '',
					wages: '',
					degree: '',
					industry: '',
					region: ''
				},
			}
		},
		components: {

		},
		created() {
			this.avatar = this.$store.state.avatar
		},
		onLoad(options) {
			console.log(options.resumeId)
			this.resumeId = options.resumeId
			this.getResume(this.resumeId)
		},
		onShow() {
			this.getResume(this.resumeId)
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			this.$refs.uForm1.setRules(this.rules);
			this.$refs.uForm2.setRules(this.rules);
		},
		methods: {
			addWork() {
				this.popupShow = true;
			},
			timeConfirm2(e) {
				this.addResume.beginTime = e.year + '-' + e.month + '-' + e.day;
			},
			timeConfirm3(e) {
				this.addResume.stopTime = e.year + '-' + e.month + '-' + e.day;
				this.addResume.worktime = this.addResume.beginTime + '到' + this.addResume.stopTime;
				console.log(this.addResume.worktime)
			},
			// 提交添加简历
			submit(resumeId) {
				uni.showLoading({})
				addWorkExp({
					"resumeId": resumeId,
					"companyName": this.addResume.Companyname,
					"workMatter": this.addResume.workmatter,
					"workName": this.addResume.workname,
					"workTime": this.addResume.worktime
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						setTimeout(() => {
							uni.hideLoading();
							this.popupShow = false;
							this.getResume(resumeId);
						}, 1500);
					} else {
						this.$refs.uToast.show({
							title: '系统错误，稍后再试',
							type: 'error',
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			addEducate() {
				this.popupShow1 = true;
			},
			timeConfirm(e) {
				this.addEducation.time = e.year + '-' + e.month + '-' + e.day;
			},
			submit1(resumeId) {
				uni.showLoading({})
				addEducationalExp({
					"resumeId": resumeId,
					"schoolExperience": this.addEducation.schoolExperience,
					"schoolName": this.addEducation.schoolName,
					"schoolTime": this.addEducation.time,
					"specialty": this.addEducation.speciality
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						setTimeout(() => {
							uni.hideLoading();
							this.popupShow1 = false;
							this.getResume(resumeId);
						}, 1500);
					} else {
						this.$refs.uToast.show({
							title: '系统错误，稍后再试',
							type: 'error',
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			addProject() {
				this.popupShow2 = true;
			},
			submit2(resumeId) {
				uni.showLoading({})
				addProjectExp({
					 "projectDescription": this.addproject.Prodescribe,
					  "projectLink": this.addproject.Projecturl,
					  "projectName": this.addproject.Projectname,
					  "resumeId": resumeId,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						setTimeout(() => {
							uni.hideLoading();
							this.popupShow2 = false;
							this.getResume(resumeId);
						}, 1500);
					} else {
						this.$refs.uToast.show({
							title: '系统错误，稍后再试',
							type: 'error',
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			open(resume) {
				// this.show = true;
				uni.navigateTo({
					url: '/pageB/myResume/UpdatemyResume/UpdatemyResume?resume=' + encodeURIComponent(JSON.stringify(resume))
				})
			},
			Updatework(workExp) {
				console.log(workExp)
				uni.navigateTo({
					url: '/pageB/myResume/UpdateworkExp/UpdateworkExp?workExp=' + encodeURIComponent(JSON.stringify(workExp))
				})
			},
			Updateeducation(educationalExp) {
				uni.navigateTo({
					url: '/pageB/myResume/UpdateEducation/UpdateEducation?educationalExp=' + encodeURIComponent(JSON.stringify(
						educationalExp))
				})
			},
			Updateproject(projectExp) {
				uni.navigateTo({
					url: '/pageB/myResume/UpdateProject/UpdateProject?projectExp=' + encodeURIComponent(JSON.stringify(projectExp))
				})
			},
			toCreateResume() {
				uni.navigateTo({
					url: '/pages/CreateResume/CreateResume'
				})
			},
			// 查询我的简历
			getResume(resumeId) {
				console.log(resumeId)
				resumeList({
					"resumeId": resumeId
				}).then(res => {
					console.log(res)
					this.resume = res.data.data.resumes[0],
						this.workExp = res.data.data.resumes[0].workExp,
						this.education = res.data.data.resumes[0].educationalExp,
						this.project = res.data.data.resumes[0].projectExp,
						// 修改个人信息
						this.model.name = res.data.data.resumes[0].resumeName,
						this.model.age = res.data.data.resumes[0].age,
						this.model.sex = res.data.data.resumes[0].sex,
						this.model.phone = res.data.data.resumes[0].phone,
						this.model.wages = res.data.data.resumes[0].compensation,
						this.model.industry = res.data.data.resumes[0].industry,
						this.model.degree = res.data.data.resumes[0].maxDegree,
						this.model.region = res.data.data.resumes[0].workCity
					if (this.resume.sex == '男') {
						this.sex = "man"
					} else {
						this.sex = "woman"
					}
				}).catch(err => {
					console.log(err)
				})

			},
		},

	}
</script>

<style lang="scss">
	.resume{
		margin-bottom: 49px;
	}
	.tit {
		padding: 10rpx;
		display: flex;
		justify-content: space-between;
		font-size: 35rpx;
		font-weight: bold;
	}

	// 个人资料
	.person {
		border-bottom: 10rpx solid #F1F1F1;
	}

	.intro {
		display: flex;
		padding: 10rpx;
	}

	.introwages {
		display: flex;
		padding: 10rpx;
		color: #FF0000;
	}

	// 求职意向
	.intention {
		border-bottom: 10rpx solid #F1F1F1;

		.work {
			display: flex;
			padding: 10rpx;
		}
	}

	// 教育经历
	.education {
		border-bottom: 10rpx solid #F1F1F1;

		.graduate {
			display: flex;
			padding: 10rpx;
			font-size: 25rpx;
			color: #999999;
		}
	}

	// 工作经历
	.workExp {
		border-bottom: 10rpx solid #F1F1F1;

		.experience {
			padding: 10rpx;
			color: #999999;
			font-size: 25rpx;
		}
	}

	// 项目经历
	.project {
		padding: 10rpx;
		color: #999999;
		font-size: 25rpx;
	}

	.avatar {
		display: flex;
		padding: 8rpx;
		width: 95%;

		.info {
			padding-left: 20rpx;
		}

		.info1 {
			font-size: 20rpx;
			color: #999999;
			margin-left: 10rpx;
		}

		.info2 {
			font-size: 20rpx;
			color: #999999;
			margin-top: 3px;
		}

		.info3 {
			display: flex;

			.phone {
				margin-left: 20rpx;
			}
		}

		.name {
			font-size: 30rpx;
			font-weight: bold;
		}
	}

	.PersonInfo {
		float: right;
	}

	.create {
		width: 80%;
		margin-left: 40px;
	}

	.bottom-nav {
		height: 45px;
		background: #ff9900;
		border-top: 3rpx solid #F1F1F1;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		text-align: center;
		border-top: 2rpx solid #F1F1F1;
	}
</style>
