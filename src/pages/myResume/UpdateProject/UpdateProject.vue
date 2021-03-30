<template>
	<view>
		<view class="title" style="text-align: center;">
			修改项目经历
		</view>
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="home" label-width="180" :label-position="labelPosition" label="项目名称" prop="project">
				<u-input :border="border"  v-model="model.project" type="text" ></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="项目描述" prop="description" label-width="150">
				<u-input type="textarea" :border="border"  v-model="model.description" />
			</u-form-item>
			<u-form-item  label-width="150" :label-position="labelPosition" label="项目链接" prop="url">
				<u-input :border="border"  v-model="model.url" type="text" ></u-input>
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
					project:'',
					description:'',
					url:''
				}
			}
		},
		onLoad(options) {
			const projectEXP = JSON.parse(decodeURIComponent(options.projectExp));
			this.model.project = projectEXP.projectName
			this.model.description = projectEXP.projectDescription
			this.model.url = projectEXP.projectLink
			console.log(projectEXP)
		},
		methods: {
			update(){
				console.log(this.model.project)
				this.$refs.uForm.validate(valid => {
				   if (valid) {
					   updateResume({
						"user_id":1,
						"resume_id":55,
						"projectExp": [
							{
								"project_id":5,
								"project_name":this.model.project,
								"project_link":this.model.url,
								"project_description":this.model.description
							}
						]
					   }).then(res=>{
						   console.log(res)
						   console.log("修改成功")
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
