import { myRequest } from '../api.js'

// 添加楼盘
export function addEstate(data){
	return myRequest ({
		url:'house/estate/addEstate',
		method:'POST',
		data:data	
	})
}

// 添加楼盘
export function findAllEstateByCity(data){
	return myRequest ({
		url:'house/estate/findAllEstateByCity',
		method:'GET',
		data:data	
	})
}

// 根据UserId获取所有楼盘的数据接口
export function findAllEstateByUserId(data){
	return myRequest ({
		url:'house/estate/findAllEstateByUserId',
		method:'GET',
		data:data	
	})
}