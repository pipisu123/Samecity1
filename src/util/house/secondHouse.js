import { myRequest } from '../api.js'

// 二手房详情
export function getSecondHandDetails(data){
	return myRequest ({
		url:'house/secondHand/getSecondHandDetails',
		method:'GET',
		data:data	
	})
}

// 查看个人二手发布列表
export function getSecondHandList(data){
	return myRequest ({
		url:'house/secondHand/getSecondHandListByPerson',
		method:'GET',
		data:data	
	})
}

// 查询经纪人身份发布的房源列表
export function getSecondHandListByBroker(data){
	return myRequest ({
		url:'house/secondHand/getSecondHandListByBroker',
		method:'GET',
		data:data	
	})
}

// 经纪人添加二手房
export function addSecondHandByBroker(data){
	return myRequest ({
		url:'house/secondHand/addSecondHandByBroker',
		method:'POST',
		data:data	
	})
}
