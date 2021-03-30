import { myRequest } from '../api.js'

// 投递简历
export function addDelivery(data){
	return myRequest ({
		url:'recruitment/delivery/addDelivery',
		method:'POST',
		data:data	
	})
}

// 处理简历投递
export function handleDelivery(data){
	return myRequest ({
		url:'recruitment/delivery/handleDelivery',
		method:'POST',
		data:data	
	})
}

// 查看简历投递
export function findDelivery(data){
	return myRequest ({
		url:'recruitment/delivery/findDelivery',
		method:'POST',
		data:data	
	})
}