import { myRequest } from '../api.js'

// 添加中介公司
export function addBrokerCompany(data){
	return myRequest ({
		url:'house/broker-company/addBrokerCompany',
		method:'POST',
		data:data	
	})
}

// 根据城市获取该城市所有公司的数据接口
export function findCompanyByCity(data){
	return myRequest ({
		url:'house/broker-company/findAllBrokerCompanyByCity',
		method:'GET',
		data:data	
	})
}