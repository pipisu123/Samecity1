import { myRequest } from '../api.js'

// 检查是否注册经纪人
export function checkRegisterByBroker(data){
	return myRequest ({
		url:'house/broker/checkRegisterByBroker',
		method:'GET',
		data:data	
	})
}

// 添加经纪人
export function addBroker(data){
	return myRequest ({
		url:'house/broker/addBroker',
		method:'POST',
		data:data	
	})
}