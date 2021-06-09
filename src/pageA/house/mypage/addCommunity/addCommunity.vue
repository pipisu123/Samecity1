<template>
	<view class="">
		<view style="padding: 10rpx;">
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
				 label="小区地址" prop="address">
					<u-input :border="border" placeholder="请选择小区详细地址" v-model="model.address" type="select" @click="selcetAddress"></u-input>
				</u-form-item>
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
				 label="小区" prop="community">
					<u-input :border="border" placeholder="请输入小区名称" v-model="model.community" type="text"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="竣工日期" prop="time" label-width="150">
					<u-input :border="border" type="select" :select-open="pickerShow" v-model="model.time" placeholder="请选择日期" @click="pickerShow = true"></u-input>
				</u-form-item>
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
				 label="绿化率(%)" prop="greening">
					<view style="display: flex;">
						<view style="width: 100%;">
							<u-input :border="border" placeholder="请输入小区绿化率" v-model="model.greening " type="number"></u-input>
						</view>
						<text>%</text>
					</view>
				</u-form-item>
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
				 label="总户数" prop="personcount">
					<u-input :border="border" placeholder="请输入小区总户数" v-model="model.personcount" type="text"></u-input>
				</u-form-item>
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
				 label="停车位" prop="carcount">
					<u-input :border="border" placeholder="请输入停车位" v-model="model.carcount" type="text"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="上传小区图片(最多上传一张)" prop="photo" label-width="150">
					<u-upload width="160" height="160" action="#" ref="uUpload" :auto-upload="true" @on-choose-complete="uploadImage"
					 max-count=1 :max-size="1 * 1024 * 1024"></u-upload>
				</u-form-item>
			</u-form>
			<u-picker mode="time" v-model="pickerShow" @confirm="timeConfirm" :params="params"></u-picker>
		</view>
		<view style="margin-top: 50px;padding: 20px;">
			<u-button type="primary" @click="addCommunity">添加</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		addCommunity
	} from '@/util/house/community.js'
	export default {
		data() {
			return {
				image: '', //上传小区图片
				model: {
					community: '',
					address: '',
					city: '',
					greening: '',
					personcount: '',
					carcount: '',
					latitude: '',
					longitude: '',
					photo: '',
				},
				params: {
					year: true,
					month: true,
					day: true
				},
				showsearch: true,
				pickerShow: false,
				border: false,
				labelPosition: 'top',
				errorType: ['message'],
				rules: {
					community: [{
						required: true,
						message: '请输入小区名称',
						trigger: 'blur',
					}],
					address: [{
						required: true,
						message: '请选择地址',
						trigger: 'blur',
					}],
					greening: [{
							required: true,
							message: '请输入小区绿化率',
							trigger: ['change', 'blur'],
						},
						{
							type: 'number',
							message: '只能为数字',
							trigger: ['change', 'blur'],
						}
					],
					personcount: [{
							required: true,
							message: '请输入总户数',
							trigger: 'blur',
						},
						{
							type: 'number',
							message: '只能为数字',
							trigger: ['change', 'blur'],
						}
					],
					carcount: [{
							required: true,
							message: '请输入停车位',
							trigger: 'blur',
						},
						{
							type: 'number',
							message: '只能为数字',
							trigger: ['change', 'blur'],
						}
					],
					photo: [{
						required: true,
						message: '请选择图片',
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
			// 选择地址
			selcetAddress() {
				uni.chooseLocation({
					success: (res) => {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('城市：' + res.address.cityCode);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						let latitude = res.latitude; //纬度
						let longitude = res.longitude; //经度
						this.model.address = res.address
						this.model.community = res.name
						this.model.latitude = res.latitude
						this.model.longitude = res.longitude
					}
				});
			},
			// 选择日期回调
			timeConfirm(e) {
				this.model.time = e.year + '-' + e.month + '-' + e.day;
				console.log(e)
			},
			// 添加小区
			addCommunity() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						uni.showLoading({
							
						})
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
								this.image = ob.data
								console.log(this.businessLicenseImg)
								addCommunity({
									"address": this.model.address,
									"city": this.$store.state.city,
									"completionDate": this.model.time,
									"district": this.$store.state.district,
									"greeningRate": this.model.greening,
									"householdsNum": this.model.personcount,
									"imgPath": this.image,
									"lat": this.model.latitude,
									"lng": this.model.longitude,
									"name": this.model.community,
									"parkingSpace": this.model.carcount,
								}).then(res => {
									console.log(res)
									if (res.data.code === 0) {
										uni.hideLoading()
										uni.showToast({
											title: '添加成功',
											duration:3000
										})
										uni.navigateBack()
									} else {
										uni.hideLoading()
										this.$refs.uToast.show({
											title: '添加失败',
											type: 'error',
										})
									}
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
