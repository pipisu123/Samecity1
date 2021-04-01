<template>
	<view class="public">
		<u-form :model="form" ref="uForm">
			<u-form-item label="标题" prop="title" :label-position="labelPosition">
				<u-input v-model="form.title" placeholder="请输入问题标题" :border="border" />
			</u-form-item>
			<u-form-item label="问题内容" prop="intro" :label-position="labelPosition">
				<u-input v-model="form.intro" height=200 :border="border" placeholder="请输入问题内容..." type="textarea" />
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="上传图片" prop="photo" label-width="150">
				<u-upload width="160" height="160" action="#" ref="uUpload" :auto-upload="true" @on-choose-complete="uploadImage"></u-upload>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="上传视频" prop="video" label-width="150">
				<easyUpload :dataList="dataList" types="video" @successImage="successImage" @successVideo="successvideo" @getPath="getPath"></easyUpload>
			</u-form-item>
		</u-form>
		<view class="topulic">
			<u-button type="primary" @click="public">发布</u-button>
		</view>
	</view>

</template>

<script>
	import easyUpload from '../../components/easy-upload.vue'

	import {
		addQuestion
	} from '../../../util/questions/question.js'
	export default {
		data() {
			return {
				border: true,
				labelPosition: 'top',
				images:[], //后端返回的图片路径
				src:'', //后端返回的视频路径
				form: {
					title: '',
					intro: '',
					photo: [],
					video: ''
				},
				rules: {
					title: [{
						required: true,
						message: '请输入标题',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					intro: [{
						min: 5,
						message: '简介不能少于5个字',
						trigger: 'change'
					}]
				}
			}
		},
		components: {
			easyUpload
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			uploadImage() {
				let files = [];
				var object = {}
				files = this.$refs.uUpload.lists;
				for (var i = 0; i < files.length; i++) {
					object = files[i].url
					this.form.photo.push(object)
				}
				console.log(this.form.photo);
			},
			getPath(e){
				this.form.video = e
			},
			public() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						// 1.调用上传图片，循环调用用接口
						for (let i = 0; i <= this.form.photo.length; i++) {
							uni.uploadFile({
								url: 'http://192.168.101.74:8080/sys/uploadImgFile',
								method: 'POST', // 可用可不用
								filePath: this.form.photo[i],
								header: {
									"Content-Type": "multipart/form-data",
									"authorization": uni.getStorageSync('token'),
								},
								name: 'file', // 服务器定义key字段名称
								success: (res) => {
									console.log(res)
									var ob = JSON.parse(res.data);
									console.log(ob)
									this.images.push(ob.data)
									console.log(this.images)
								},
								// fail: function() {
								// 	console.log('接口调用失败')
								// }
							})
						}
						// 2.先调用上传视频接口
						uni.uploadFile({
							url: 'http://192.168.101.74:8080/sys/uploadVideoFile',
							method: 'POST', // 可用可不用
							filePath: this.form.video,
							header: {
								"Content-Type": "multipart/form-data",
								"authorization": uni.getStorageSync('token'),
							},
							name: 'file', // 服务器定义key字段名称
							success: (res) => {
								console.log('视频上传成功');
								console.log(res);
								let data = JSON.parse(res.data)
								this.src = data.data
								// 3.最后调用上传所有信息接口
								addQuestion({
									"content": this.form.intro,
									"pictures": this.images,
									"reward": 0,
									"title": this.form.title,
									"video": this.src,
								}).then(res=>{
									console.log(res)
								}).catch(err=>{
									console.log(err)
								})
							},
							// fail: function() {
								
							// }
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.public {
		padding: 10px;
	}

	.topulic {
		margin-top: 10px;
	}
</style>
