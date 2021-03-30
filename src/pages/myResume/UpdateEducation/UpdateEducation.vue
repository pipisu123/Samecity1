<template>
	<view>
		<view class="title" style="text-align: center;">
			修改教育经历
		</view>
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="home" label-width="180" :label-position="labelPosition" label="毕业学校" prop="company">
				<u-input :border="border"  v-model="model.school" type="text" ></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="workname" label-width="150" :label-position="labelPosition" label="专业" prop="specialty">
				<u-input :border="border"  v-model="model.specialty" type="text" ></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="worktime" label-width="150" :label-position="labelPosition" label="学历" prop="degree">
				<u-input :border="border"  v-model="model.degree" type="text" ></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="学校经历" prop="experience" label-width="150">
				<u-input type="textarea" :border="border"  v-model="model.experience" />
			</u-form-item>
			</u-form>
			<view>
				<button type="default" @click="update">保存</button>
			</view>
			<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {updateResume} from '../../../util/resume.js'
	export default {
		data() {
			return {
				model:{
					"school":'',
					"degree":'',
					"specialty":'',
					"experience":''
				}
			}
		},
		onLoad(options) {
			const educationalEXP = JSON.parse(decodeURIComponent(options.educationalExp));
			console.log(educationalEXP)
			this.model.school = educationalEXP.schoolName
			this.model.degree = educationalEXP.degree
			this.model.specialty = educationalEXP.specialty
			this.model.experience = educationalEXP.schoolExperience
		},
		methods: {
			update(){
				this.$refs.uForm.validate(valid => {
				   if (valid) {
					  updateResume({
						"user_id":1,
						"resume_id":55,
						"educationalEXP": [
							{
								"school_id":5,
								"school_name":this.model.school,
								"degree":this.model.degree,
								"specialty":this.model.specialty,
								"school_experience":this.model.experience
							}
						]
					  }).then(res=>{
						  console.log(res)
						  this.$refs.uToast.show({
						  	title: '修改成功',
						  	type: 'success',				
						  })
						  uni.redirectTo({
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
			}
		}
	}
</script>

<style>

</style>
