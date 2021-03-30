<template>
	<view>
		<view class="title" style="text-align: center;">
			修改工作经历
		</view>
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="home" label-width="180" :label-position="labelPosition" label="公司名称" prop="company">
				<u-input :border="border"  v-model="model.company" type="text" ></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="workname" label-width="150" :label-position="labelPosition" label="担任角色" prop="company">
				<u-input :border="border"  v-model="model.workname" type="text" ></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="worktime" label-width="150" :label-position="labelPosition" label="工作时间" prop="company">
				<u-input :border="border"  v-model="model.worktime" type="text" ></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="工作内容" prop="workmatter" label-width="150">
				<u-input type="textarea" :border="border"  v-model="model.workmatter" />
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
					company: '',
					workname:'',
					worktime:'',
					workmatter:''
				},
			}
		},
		onLoad(options) {
			const workEXP = JSON.parse(decodeURIComponent(options.workExp));
			console.log(workEXP)
			this.model.company = workEXP.companyName
			this.model.workname = workEXP.workName
			this.model.worktime = workEXP.worktime
			this.model.workmatter = workEXP.workMatter
		},
		methods: {
			update(){
				this.$refs.uForm.validate(valid => {
				   if (valid) {
					   updateResume({
						"userId":"8040423884719751168",
						"resumeId": "8044822629026156544",
						"workExp": [
							{
								"workId": "8044822629814685696",
								"companyName":this.model.company,
								"workName":this.model.workname,
								"workMatter":this.model.workmatter
							}
						]
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
			}
		}
	}
</script>

<style>

</style>
