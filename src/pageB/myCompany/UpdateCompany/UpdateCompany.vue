<template>
	<view>
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="home" label-width="180" :label-position="labelPosition" label="公司名称" prop="companyname">
				<u-input :border="border"  v-model="model.companyname" type="text" ></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}"  label-width="150" :label-position="labelPosition" label="公司地址" prop="companyaddress">
				<u-input :border="border"  v-model="model.companyaddress" type="select" @click="selectaddress"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="150" :label-position="labelPosition" label="公司福利" prop="companywelfare">
				<u-input :border="border"  v-model="model.companywelfare" type="text" ></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="公司简介" prop="companyintro" label-width="150">
				<u-input type="textarea" :border="border"  v-model="model.companyintro" />
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="上传图片" prop="photo" label-width="150">
				<u-upload width="160" height="160" action="#"  ref="uUpload" :auto-upload="false" max-count=5 @on-remove="deleteImgs"></u-upload>
			</u-form-item>
			</u-form>
			<view class="company_picture">
				<scroll-view scroll-x="true">
					<video class="video" object-fit="fill" id="demoVideo" :controls="true" :enable-progress-gesture="false"
					 :show-center-play-btn="disable" autoplay=false :src="'http://192.168.101.24:8080/'+company.company_video.video_path">
					 <view class="icon-cuo" @tap="delectVideo">
					 	<u-icon name="close" size="28"></u-icon>
					 </view>
					</video>
					<view class="item1" v-for="item in listimg" :key="item">
						<image :src="'http://192.168.101.24:8080/'+item.picture_path" mode="" @tap="_previewImage('http://192.168.101.24:8080/'+item.picture_path)" mode="heightFix;widthFix"></image>
					</view>
				</scroll-view>
			</view>
			<view>
				<button type="default" @click="update(company.company_id)">保存</button>
			</view>
	</view>
</template>

<script>
	import { findCompany } from '../../../util/company.js'
	import { updateCompany } from '../../../util/company.js'
	export default {
		data() {
			return {
				company:null,
				listimg:[],
				model:{
					companyname: '',
					companyaddress:'',
					companywelfare:'',
					companyintro:'',
					longitude: '',//经度
					latitude: '',//纬度
				},
			}
		},
		onLoad(options) {
			console.log(options)
			this.getmyCompany(options.company_id)
		},
		methods: {
			// 删除视频
			delectVideo(){
			        uni.showModal({
			            title:"提示",
			            content:"是否要删除此视频",
			            success:(res) =>{
			            	
			                }
			            
			        })
			    },
			// 查询我的公司
			async getmyCompany(company_id) {
				uni.showLoading({
					title:'正在努力加载中...'
				})
				findCompany({
					"company_id":company_id
				}).then(res=>{
					console.log(res)
					if(res.data.code === 20000){
						uni.hideLoading()
						uni.showToast({
							title:'加载成功'
						})
						this.company = res.data.data.companys[0]
						this.listimg = res.data.data.companys[0].company_picture
						this.model.companyname =  res.data.data.companys[0].company_name
						this.model.companyaddress =  res.data.data.companys[0].company_address
						this.model.companywelfare =  res.data.data.companys[0].company_welfare
						this.model.companyintro =  res.data.data.companys[0].company_introduction
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 修改公司信息
			update(company_id){
				uni.showLoading({
					title:'保存中...'
				})
				updateCompany({
					"company_id": company_id,
					"company_name": this.model.companyname,
					"company_introduction": this.model.companyintro,
					"company_address": this.model.companyaddress,
					"longitude": this.model.longitude,
					"latitude": this.model.latitude,
					
				}).then(res=>{
					console.log(res)
					if(res.data.code === 20000){
						uni.hideLoading()
						uni.showToast({
							title:'保存成功',
						})
					}else{
						uni.hideLoading()
						uni.showToast({
							title:'保存失败'
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 选择公司地址
			selectaddress(){
			uni.chooseLocation({
					success:(res)=>{
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						let latitude = res.latitude; //纬度
						let longitude = res.longitude; //经度
						this.model.companyaddress = res.address
						this.model.longitude = res.longitude
						this.model.latitude = res.latitude
					}
					});	
			},
		}
	}
</script>

<style lang="scss" scoped>
	.video {
		width: 50%;
		height: 250rpx;
	}
    .company_picture {
		padding: 15rpx;

		image {
			height: 150rpx;
			width: 25%;
			margin-top: 10rpx;
		}
	}

	scroll-view {
		width: 100%;
		height: 300rpx;
		white-space: nowrap;
	}

	.item1,
	.item2,
	.item3 {
		display: inline-block;
		width: 50%;
		height: 100%;
		padding: 5rpx;

		image {
			width: 100%;
			height: 250rpx;

		}
	}
	.icon-cuo {
	    position: absolute;
	    right: 0;
	    top: 5upx;
	    background: linear-gradient(90deg,rgba(251,91,80,1) 0%,rgba(240,45,51,1) 100%);
	    color: #FFFFFF;
	    z-index: 999;
	    border-top-right-radius: 5upx;
	    border-bottom-left-radius: 5upx;
	}
</style>
