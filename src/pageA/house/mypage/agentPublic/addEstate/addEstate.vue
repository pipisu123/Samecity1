<template>
	<view class="">
		<view style="padding: 10rpx;">
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
				 label="楼盘地址" prop="address">
					<u-input :border="border" placeholder="请选择楼盘地址" v-model="model.address" type="select" @click="ChooseAddress"></u-input>
				</u-form-item>
			</u-form>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
			 label="楼盘" prop="name">
				<u-input :border="border" placeholder="请输入楼盘名称" v-model="model.name" type="text"></u-input>
			</u-form-item>
		</view>
		<u-toast ref="uToast" />
		<view style="margin-top: 50px;padding: 40px;">
			<u-button type="primary" @click="addEstate">立即添加</u-button>
		</view>
	</view>
</template>

<script>
	import { addEstate } from '@/util/house/estate.js'
	export default {
		data() {
			return {
				model: {
					address: '',
					name: '',
					latitude:'',
					longitude:''
				},
				city: '',
				district:'',
				showsearch: true,
				border: true,
				labelPosition: 'top',
				errorType: ['message'],
				rules: {
					company: [{
						required: true,
						message: '请输入楼盘地址',
						trigger: 'blur',
					}],
					city: [{
						required: true,
						message: '请输入楼盘名称',
						trigger: 'blur',
					}],
				},
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad() {
			this.city = this.$store.state.city;
			this.district = this.$store.state.district;
		},
		methods: {
			// 选择地址
			ChooseAddress() {
				uni.chooseLocation({
					success: (res) => {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('城市：' + res.address.cityCode);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						this.model.address = res.address;
						this.model.latitude = res.latitude;
						this.model.longitude = res.longitude;
						this.model.name = res.name;
					}
				});
			},
			// 添加楼盘
			addEstate() {
				uni.showLoading({})
				addEstate({
					"address":this.model.address,
					"city":this.city,
					"district":this.district,
					"lat":this.model.latitude,
					"lng":this.model.longitude,
					"name":this.model.name,
				}).then(res=>{
					console.log(res)
					if(res.data.code === 0){
						setTimeout(() => {
							uni.hideLoading()
							uni.navigateBack({})
						}, 1500);
					}else {
						this.$refs.uToast.show({
							title: '系统错误，请重新发布',
							type: 'error',
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
