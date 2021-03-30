import { myRequest } from './api.js'

//登录
export function Login(data){
	return myRequest ({
		url:'/sys/user/weChatLogin',
		method:'POST',
		data:data	
	})
}