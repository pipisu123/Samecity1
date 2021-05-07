import { myRequest } from '../apiformdata.js'

// 添加中介公司
export function addBrokerCompany(data){
	return myRequest ({
		url:'house/broker-company/addBrokerCompany',
		method:'POST',
		data:data	
	})
}