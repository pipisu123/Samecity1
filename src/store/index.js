import Vue from 'vue'
import Vuex from 'vuex'
import QQMapWX from '../lib/qqmap-wx-jssdk.min.js'

//安装插件
Vue.use(Vuex)

//创建对象
const store = new Vuex.Store({
	state: {
		avatar: uni.getStorageSync('avatar'),
		wechatname: uni.getStorageSync('wechatname'),
		show: false,
		token: uni.getStorageSync('token'),
		refreshtoken: uni.getStorageSync('refreshtoken'),
		userid: uni.getStorageSync('userid'),
		username: uni.getStorageSync('username'),
		city: uni.getStorageSync('city'),
		district:'',
		province:uni.getStorageSync('province'),
	},
	mutations: {
		setavatar(state, data) {
			state.avatar = data;
			uni.setStorageSync('avatar', data)
		},
		setwechatname(state, data) {
			state.wechatname = data;
			uni.setStorageSync('wechatname', data)
		},
		//存token
		setToken(state, data) {
			uni.setStorageSync('token', data)
		},
		setRefreshtoken(state, data) {
			uni.setStorageSync('refreshtoken', data)
		},
		setUserId(state, data) {
			uni.setStorageSync('userid', data)
		},
		setUsername(state, data) {
			uni.setStorageSync('username', data)
		},
		newCityFun(state, city) {
			uni.setStorageSync('city', city)
			console.log(state.city)
		},
		newDistrictFun(state, district) {
			state.district = district
			console.log(state.district)
		},
		newProvinceFun(state, province) {
			uni.setStorageSync('province', province)
			console.log(state.province)
		},
	},
	actions: {
			getCity(context) {
				// 向用户发起授权请求，弹框提示
				uni.authorize({
				    // 获取用户定位信息
					scope: "scope.userLocation",
					// 用户同意授权执行
					success(){
						// 引入腾讯地图api
						// 实例化API核心类
						let qqmapsdk = new QQMapWX({
						     // 填写自己的Key值，这个值是与AppID绑定的
						     key: 'GN7BZ-5CG6X-BC64A-TLNSK-4QAZ7-2MBZ7'
						 });
						//获取位置信息
						uni.getLocation({
						    type: 'gcj02',
						    success: function (res) {
						        console.log('当前位置的经度：' + res.longitude)
						        console.log('当前位置的纬度：' + res.latitude)
								   console.log('位置名称：' + res.name);
								// 逆地址解析方法
								qqmapsdk.reverseGeocoder({
									location: {
										latitude: res.latitude,
										longitude: res.longitude
									},
									success(res) {
										var city = ''
										var district=''
										var province=''
										console.log(res)
										// 取到用户的定位城市，赋值传递出去
										city = res.result.address_component.city.slice(0,2);
										district = res.result.address_component.district.slice(0,2);
										province = res.result.address_component.province;
										context.commit('newCityFun', city)
										context.commit('newDistrictFun', district)
										context.commit('newProvinceFun', province)
									}
								})	
						    }
						})
					},
					// 若用户不同意授权，弹框提示
					fail(res){
						uni.showToast({
							icon :"none",
						    title: '注意：需要获取您的定位授权,否则部分功能将无法使用',
						    duration: 2000
						})
					}
				})
			}
		}
})

//导出store独享
export default store
