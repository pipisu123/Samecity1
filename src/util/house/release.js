import { myRequest } from '../api.js'

// 发布租房
export function addLease(data){
	return myRequest ({
		url:'house/lease/addLease',
		method:'POST',
		data:data	
	})
}

// 查看租房详情
export function getLeaseDetails(data){
	return myRequest ({
		url:'house/lease/getLeaseDetails',
		method:'GET',
		data:data	
	})
}

//查看个人租赁发布列表
export function getLeaseList(data){
	return myRequest ({
		url:'house/lease/getLeaseList',
		method:'GET',
		data:data	
	})
}
