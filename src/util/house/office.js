import { myRequest } from '../api.js'

// 经纪人添加办公楼出租
export function addOfficeLeaseByBroker(data){
	return myRequest ({
		url:'house/office/addOfficeLeaseByBroker',
		method:'POST',
		data:data	
	})
}

// 个人添加办公楼出租
export function addOfficeLeaseByPerson(data){
	return myRequest ({
		url:'house/office/addOfficeLeaseByPerson',
		method:'POST',
		data:data	
	})
}

// 经纪人添加办公楼二手
export function addOfficeSecondHandByBroker(data){
	return myRequest ({
		url:'house/office/addOfficeSecondHandByBroker',
		method:'POST',
		data:data	
	})
}

// 个人添加办公楼二手
export function addOfficeSecondHandByPerson(data){
	return myRequest ({
		url:'house/office/addOfficeSecondHandByPerson',
		method:'POST',
		data:data	
	})
}

// 查看办公楼房源详情
export function getOfficeDetails(data){
	return myRequest ({
		url:'house/office/getOfficeDetails',
		method:'GET',
		data:data	
	})
}

// 查看个人办公楼租赁发布列表
export function getOfficeLeaseList(data){
	return myRequest ({
		url:'house/office/getOfficeLeaseList',
		method:'GET',
		data:data	
	})
}

// 查看个人办公楼二手发布列表
export function getOfficeSecondHandList(data){
	return myRequest ({
		url:'house/office/getOfficeSecondHandList',
		method:'GET',
		data:data	
	})
}