<template>
	<view class="">
		<view style="padding: 10rpx;">
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
				 label="公司" prop="company">
					<u-input :border="border" placeholder="请输入公司名称" v-model="model.company" type="text"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="上传营业执照照片(最多上传一张)" prop="photo" label-width="150">
					<u-upload width="160" height="160" action="#" ref="uUpload" :auto-upload="true" @on-choose-complete="uploadImage"
					 max-count=1 :max-size="1 * 1024 * 1024"></u-upload>
				</u-form-item>
			</u-form>
		</view>
		<view style="margin-top: 100px;padding: 40px;">
			<u-button type="primary" @click="addCompany">立即注册</u-button>
		</view>
	</view>
</template>

<script>
	import {
		addBrokerCompany
	} from '@/util/house/addCompany.js'
	export default {
		data() {
			return {
				model: {
					company: '',
					photo: '',
				},
				city:'',
				businessLicenseImg: '',
				showsearch: true,
				border: true,
				labelPosition: 'top',
				errorType: ['message'],
				rules: {
					company: [{
						required: true,
						message: '请输入公司名称',
						trigger: 'blur',
					}],
					city: [{
						required: true,
						message: '请输入城市名称',
						trigger: 'blur',
					}],
				},
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad() {
			this.city = this.$store.state.city
		},
		methods: {
			// 上传图片
			uploadImage() {
				let files = [];
				var object = {}
				files = this.$refs.uUpload.lists;
				this.model.photo = files[0].url
			},
			// 添加中介公司
			addCompany() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						uni.uploadFile({
							url: 'http://192.168.3.9:8080/sys/uploadImgFile',
							method: 'POST', // 可用可不用
							filePath: this.model.photo,
							header: {
								"Content-Type": "multipart/form-data",
								"authorization": uni.getStorageSync('token'),
							},
							name: 'file', // 服务器定义key字段名称
							success: (res) => {
								console.log(res)
								var ob = JSON.parse(res.data);
								this.businessLicenseImg = ob.data
								console.log(this.businessLicenseImg)
								addBrokerCompany({
									"name": this.model.company,
									"cityName": this.city,
									"businessLicenseImg": this.businessLicenseImg,
								}).then(res => {
									console.log(res)
								}).catch(err => {
									console.log(err)
								})
							},
							fail: function() {
								console.log('接口调用失败')
							}
						})
					}
				})

			}
		}
	}
</script>

<style lang="scss">

</style>
