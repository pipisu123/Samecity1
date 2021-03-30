<template>
	<view>

		<view>
			<view>
				<view class='header'>
					<image src='../../static/logo.png'></image>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>
	
				<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="appLoginWx">
					授权登录
				</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {Login} from '../../util/login.js'
	export default {
		data() {
			return {
				src:'',
				name: '',
				code:'',
				nickName:'',
				avatarUrl:'',
				gender:''
			}
		},
		methods: {
			
			 appLoginWx(){
			                // #ifdef MP-WEIXIN
							 let _this = this;
							 uni.showLoading({
							 	title:'登录中...'
							 })
			                    uni.getProvider({
			                      service: 'oauth',
			                      success: function (res) {
			                        if (~res.provider.indexOf('weixin')) {
			                            uni.login({
			                                provider: 'weixin',
			                                success: (res2) => {
			                               _this.code = res2.code
			                                    uni.getUserInfo({
			                                        provider: 'weixin',
			                                        success: (info) => {//这里请求接口
													 _this.nickName = info.userInfo.nickName
													 _this.avatarUrl = info.userInfo.avatarUrl
													 _this.gender = info.userInfo.gender
														Login({
															"code" : _this.code,
															"avatarUrl": _this.avatarUrl,
															"gender" : _this.gender,
															"nickName" : _this.nickName,
														}).then(res=>{
															if(res.data.code === 0){
																_this.$store.commit('setToken',res.data.data.accessToken)
																_this.$store.commit('setavatar',info.userInfo.avatarUrl)
																_this.$store.commit('setwechatname',info.userInfo.nickName)
																_this.$store.commit('setUserId',res.data.data.id)
																_this.$store.commit('setUsername',res.data.data.username)
																_this.$store.commit('setRefreshtoken',res.data.data.refreshToken)
															    uni.hideLoading()
																uni.switchTab({
																	url:'../me/me'
																})
															}
															console.log(res)
														}).catch(err=>{
															console.log(err)
														})
			                                        },
			                                        fail: () => {
			                                            uni.showToast({title:"微信登录授权失败",icon:"none"});
			                                        }
			                                    })
			                            
			                                },
			                                fail: () => {
			                                    uni.showToast({title:"微信登录授权失败",icon:"none"});
			                                }
			                            })
			                            
			                        }else{
			                            uni.showToast({
			                                title: '请先安装微信或升级版本',
			                                icon:"none"
			                            });
			                        }
			                      }
			                    });
			                    //#endif
			            }
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}
	
	.header image {
		width: 200rpx;
		height: 200rpx;
	}
	
	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}
	
	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}
	
	.bottom {
		line-height: 80upx;
		border-radius: 80upx;
		margin: 70rpx 50rpx;
		height: 80upx;
		font-size: 35rpx;
	}
</style>