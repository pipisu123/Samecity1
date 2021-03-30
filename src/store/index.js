import Vue from 'vue'
import Vuex from 'vuex'


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
	},
	mutations:{
		setavatar(state,data){
			state.avatar = data;
			uni.setStorageSync('avatar',data)
		},
		setwechatname(state,data){
			state.wechatname = data;
			uni.setStorageSync('wechatname',data)
		},
		//存token
		setToken(state,data){
			uni.setStorageSync('token',data)
		},
		setRefreshtoken(state,data){
			uni.setStorageSync('refreshtoken',data)
		},
		setUserId(state,data){
			uni.setStorageSync('userid',data)
		},
		setUsername(state,data){
			uni.setStorageSync('username',data)
		}
	},
	action:{
		
	}
 })
 
 //导出store独享
export default store