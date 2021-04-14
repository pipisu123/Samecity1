<template>
	<view class="public">
		<u-form :model="form" ref="uForm">
			<u-form-item label="标题" prop="title" :label-position="labelPosition">
				<u-input v-model="form.title" placeholder="请输入问题标题" :border="border" />
			</u-form-item>
			<u-form-item label="问题内容" prop="intro" :label-position="labelPosition">
				<u-input v-model="form.intro" height=200 :border="border" placeholder="请输入问题内容..." type="textarea" />
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="图片或者视频或者文字" prop="ImgsorVideo" label-width="150">
				<u-input :border="border" type="select" :select-open="selectShow1" v-model="form.ImgsorVideo" placeholder="请选择上传图片或者视频或者文字"
				 @click="selectShow1 = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="上传图片" prop="photo" label-width="150" v-show="showUploadimg">
				<u-upload width="160" height="160" action="#" ref="uUpload" :auto-upload="true" @on-choose-complete="uploadImage"></u-upload>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="上传视频" prop="video" label-width="150" v-show="showUploadvideo">
				<easyUpload :dataList="dataList" types="video" @successImage="successImage" @successVideo="successvideo" @getPath="getPath"></easyUpload>
			</u-form-item>
		</u-form>
		<u-select mode="single-column" :list="selectList1" v-model="selectShow1" @confirm="selectConfirm1"></u-select>
		<view class="topulic">
			<u-button type="primary" @click="public" v-show="showUploadimg">发布</u-button>
			<u-button type="primary" @click="public1" v-show="showUploadvideo">发布</u-button>
			<u-button type="primary" @click="public2" v-show="showtext">发布</u-button>
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
				showUploadimg: true,
				showUploadvideo: false,
				showtext: false,
				images: [], //后端返回的图片路径
				src: '', //后端返回的视频路径
				form: {
					title: '',
					intro: '',
					photo: [],
					video: '',
					ImgsorVideo: '图片'
				},
				selectShow1: false,
				selectList1: [{
						value: 1,
						label: '图片'
					},
					{
						value: 2,
						label: '视频'
					},
					{
						value: 3,
						label: '文字'
					},
				],
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
			selectConfirm1(e) {
				this.form.ImgsorVideo = '';
				e.map((val, index) => {
					this.form.ImgsorVideo += this.form.ImgsorVideo == '' ? val.label : '-' + val.label;
					if (val.label === '视频') {
						this.showUploadvideo = true
						this.showUploadimg = false
						this.showtext = false
					} else if (val.label === '图片') {
						this.showUploadimg = true
						this.showUploadvideo = false
						this.showtext = false
					} else {
						this.showUploadimg = false
						this.showUploadvideo = false
						this.showtext = true
					}
				})
			},
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
			getPath(e) {
				this.form.video = e
			},
			// 发布文字问题
			public2() {
				console.log("文字")
				this.$refs.uForm.validate(valid => {
					if (valid) {
						addQuestion({
							"content": this.form.intro,
							"reward": 0,
							"title": this.form.title,
							"video": '',
						}).then(res => {
							console.log(res)
						}).catch(err => {
							console.log(err)
						})
					}
				})

			},
			// 发布图片问题
			public() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						// 1.调用上传图片，循环调用用接口
						for (let i = 0; i <= this.form.photo.length; i++) {
							uni.uploadFile({
								url: 'http://192.168.3.9:8080/sys/uploadImgFile',
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
									console.log(this.src)
									if (i === this.form.photo.length - 1) {
										console.log("======================")
										addQuestion({
											"content": this.form.intro,
											"pictures": this.images,
											"reward": 0,
											"title": this.form.title,
											"video": '',
										}).then(res => {
											console.log(res)
										}).catch(err => {
											console.log(err)
										})
									}
								},
							})
						}
					}
				})
			},
			// 发布视频问题
			public1() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						uni.uploadFile({
							url: 'http://192.168.3.9:8080/sys/uploadVideoFile',
							method: 'POST', // 可用可不用
							filePath: this.form.video,
							header: {
								"Content-Type": "multipart/form-data",
								"authorization": uni.getStorageSync('token'),
							},
							name: 'file', // 服务器定义key字段名称
							success: (res) => {
								console.log('视频上传成功');
								// console.log(res);
								let data = JSON.parse(res.data)
								this.src = data.data
								addQuestion({
									"content": this.form.intro,
									"reward": 0,
									"title": this.form.title,
									"video": this.src,
								}).then(res => {
									console.log(res)
								}).catch(err => {
									console.log(err)
								})
							},
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
