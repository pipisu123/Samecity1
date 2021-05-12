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
		url:'house/lease/getLeaseListByPerson',
		method:'GET',
		data:data	
	})
}

//查看经纪人租赁发布列表
export function getLeaseListByBroker(data){
	return myRequest ({
		url:'house/lease/getLeaseListByBroker',
		method:'GET',
		data:data	
	})
}
