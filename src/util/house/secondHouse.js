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
		url:'house/secondHand/getSecondHandList',
		method:'GET',
		data:data	
	})
}
