import { myRequest } from './api.js'

// 

export function upload(data){
	return myRequest ({
		url:'house/broker-company/addBrokerCompany',
		// header:{'content-type': 'multipart/form-data;charset=UTF-8'},
		method:'POST',
		data:data	
	})
}
