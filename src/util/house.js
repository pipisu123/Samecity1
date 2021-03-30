import { myRequest } from './api.js'

// 

//创建公司
export function addLease(data){
	return myRequest ({
		url:'house/lease/addLease',
		method:'POST',
		data:data	
	})
}