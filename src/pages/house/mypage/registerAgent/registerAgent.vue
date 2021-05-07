<template>
	<view class="">
		<view class="person" v-if="showsearch">
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
				 label="公司" prop="company">
					<u-input :border="border" placeholder="请输入公司名称" v-model="model.company" type="select" @click="addCompany"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="上传头像" prop="photo" label-width="150">
					<u-upload width="160" height="160" action="#" ref="uUpload" :auto-upload="true" @on-choose-complete="uploadImage"
					 max-count=1 :max-size="1 * 1024 * 1024"></u-upload>
				</u-form-item>
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
				 label="经纪人姓名" prop="name">
					<u-input :border="border" placeholder="请输入姓名" v-model="model.name" type="text"></u-input>
				</u-form-item>
			</u-form>
			<view style="margin-top: 100px;padding: 40px;">
				<u-button type="primary" @click="resgister">立即注册</u-button>
			</view>
		</view>
		<!-- 显示搜索 -->
		<view class="" v-else>
			<uSearch :dictArr="wArr" @selectIndexValue="getVal" ref="usearch" @getValue="getValue" @getid="getid" @cancel="cancel"></uSearch>
			<view class="bottom-nav">
				<u-button type="primary" @click="ToaddCompany">添加公司</u-button>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import uSearch from './userzero-search.vue'
	import {
		findCompanyByCity
	} from '@/util/house/company.js'
	import {
		addBroker
	} from '@/util/house/agent.js'
	export default {
		data() {
			return {
				model: {
					company: '',
					name: '',
					photo: ''
				},
				city: '',
				companyId: '',
				avatar: '',
				showsearch: true,
				border: true,
				labelPosition: 'top',
				errorType: ['message'],
				wArr: [

				],
				rules: {
					company: [{
						required: true,
						message: '请输入公司名称',
						trigger: 'blur',
					}],
					name: [{
						required: true,
						message: '请输入姓名',
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
			this.getCompanyBycity()
		},
		components: {
			uSearch
		},
		methods: {
			// 根据城市获取所有的公司列表
			getCompanyBycity() {
				findCompanyByCity({
					"cityName": this.city,
				}).then(res => {
					console.log(res)
					this.wArr = res.data.data
				}).catch(err => {
					console.log(err)
				})
			},
			// 注册经纪人
			resgister() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						uni.showLoading({
							title: '注册中...'
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
								this.avatar = ob.data
								console.log(this.avatar)
								addBroker({
									"companyId": this.companyId,
									"imgPath": this.avatar,
									"username": this.model.name,
								}).then(res => {
									console.log(res)
									if (res.data.code === 0) {
										uni.hideLoading()
										uni.navigateBack()
									} else if (res.data.code === 4000020) {
										uni.hideLoading()
										this.$refs.uToast.show({
											title: '该账号已被注册',
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
			},
			// 上传图片回调
			uploadImage() {
				let files = [];
				var object = {}
				files = this.$refs.uUpload.lists;
				this.model.photo = files[0].url
			},
			addCompany() {
				this.showsearch = false
			},
			// 前往添加公司
			ToaddCompany() {
				uni.navigateTo({
					url: '../addCompany/addCompany'
				})
			},
			// 取消
			cancel() {
				this.showsearch = true
			},
			getid(e) {
				console.log(e)
				this.companyId = e
			},
			// 
			getValue(e) {
				console.log(e)
			},
			getVal(e) {
				console.log(e)
				this.showsearch = true
				this.model.company = e
			}
		}
	}
</script>

<style lang="scss">
	.person {
		margin-left: 20rpx;
	}

	.bottom-nav {
		height: 45px;
		background: #FFFFFF;
		border-top: 3rpx solid #F1F1F1;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		text-align: center;
	}
</style>
