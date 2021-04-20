<template>
	<view class="">
		<view style="padding: 10rpx;">
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
				 label="公司" prop="company">
					<u-input :border="border" placeholder="请输入公司名称" v-model="model.company" type="text"></u-input>
				</u-form-item>
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
				 label="隶属城市" prop="city">
					<u-input :border="border" placeholder="请输入城市名称" v-model="model.city" type="text"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="上传营业执照照片" prop="photo" label-width="150">
					<u-upload width="160" height="160" action="#" ref="uUpload" :auto-upload="true" @on-choose-complete="uploadImage"
					 max-count=1 :max-size="1 * 1024 * 1024"></u-upload>
				</u-form-item>
			</u-form>
		</view>
		<view style="margin-top: 100px;padding: 40px;">
			<u-button type="primary">立即注册</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				model: {
					company: '',
					city: '',
				},
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
					name: [{
						required: true,
						message: '请输入城市名称',
						trigger: 'blur',
					}],
				},
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
