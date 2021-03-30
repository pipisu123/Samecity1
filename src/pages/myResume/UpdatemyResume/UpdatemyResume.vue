<template>
	<view>
		<view class="title" style="text-align: center;">
			修改个人信息
		</view>
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="120" :label-position="labelPosition" label="姓名" prop="name">
				<u-input :border="border"  v-model="model.name" type="text" ></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition" label="年龄" prop="age">
				<u-input :border="border"  v-model="model.age" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="性别" prop="sex">
				<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="model.sex"  @click="actionSheetShow = true"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="phone" label-width="120" :label-position="labelPosition" label="电话" prop="phone">
				<u-input :border="border"  v-model="model.phone" type="text" ></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="150" :label-position="labelPosition" label="期望薪资" prop="wages">
				<u-input :border="border"  v-model="model.wages" type="text" ></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="150" :label-position="labelPosition" label="期望职位" prop="industry">
				<u-input :border="border"  v-model="model.industry" type="text" ></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="学历" prop="degree" label-width="120">
				<u-input :border="border" type="select" :select-open="selectShow" v-model="model.degree" placeholder="请选择学历" @click="selectShow = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="所在地区" prop="region" label-width="150">
				<u-input :border="border" type="select" :select-open="pickerShow" v-model="model.region"  @click="pickerShow = true"></u-input>
			</u-form-item>
			</u-form>
			<view>
				<button type="default" @click="updateResume">保存</button>
			</view>
			<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
			<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
			<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
			<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {updateResume} from '../../../util/resume.js'
	export default {
		data() {
			return {
				model:{
					name:'',
					age:'',
					phone:'',
					wages:'',
					industry:'',
					degree:'',
					region:''
				},
				actionSheetList: [
					{
						text: '男'
					},
					{
						text: '女'
					},
					{
						text: '保密'
					}
				],
				selectList:[
					{
						value: '高中',
						label: '高中'
					},
					{
						value: '大专',
						label: '大专'
					},
					{
						value: '本科',
						label: '本科'
					},
					{
						value: '研究生',
						label: '研究生'
					},
					{
						value: '博士',
						label: '博士'
					},
					{
						value: '其他',
						label: '其他'
					},
				],
				actionSheetShow: false,
				selectShow: false,
				pickerShow: false,
			}
		},
		onLoad(options) {
			const resume = JSON.parse(decodeURIComponent(options.resume));
			this.model.name = resume.resumeName
			this.model.age = resume.age
			this.model.sex = resume.sex
			this.model.phone = resume.phone
			this.model.wages = resume.compensation
			this.model.industry = resume.industry
			this.model.degree = resume.maxDegree
			this.model.region = resume.workCity
		},
		methods: {
			updateResume(){
				this.$refs.uForm.validate(valid => {
					 if (valid) {
						updateResume({
							"user_id":1,
							"resume_id":55,
							"resume_name":this.model.name,
							"age":this.model.age,
							"sex":this.model.sex,
							"phone":this.model.phone,
							"compensation":this.model.wages,
							"industry":this.model.industry,
							"max_degree":this.model.degree,
							"work_city":this.model.region
						 
						}).then(res=>{
							console.log(res)
							this.$refs.uToast.show({
								title: '修改成功',
								type: 'success',				
							})
							uni.navigateBack({
									url:'/pages/myResume/myResume'
								   });
						}).catch(err=>{
							console.log(err)
						})
				
				}else{
					this.$refs.uToast.show({
						title: '修改失败，请重新修改',
						type: 'error',
						duration: 2500
													
					})		
				}
				});
			},
			// 点击actionSheet回调
			actionSheetCallback(index) {
				uni.hideKeyboard();
				this.model.sex = this.actionSheetList[index].text;
			},
			// 选择学历回调
			selectConfirm(e){
				this.model.degree = '';
				e.map((val, index) => {
					this.model.degree += this.model.degree == '' ? val.label : '-' + val.label;
				})
			},
			// 选择地区回调
			regionConfirm(e) {
				this.model.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
			},
		}
	}
</script>

<style>

</style>
