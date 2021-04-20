import { myRequest } from '../api.js'

// 根据条件搜索二手房源
export function secondHandQuery(data){
	return myRequest ({
		url:'solr-query/house/secondHandQuery',
		method:'GET',
		data:data	
	})
}

// 根据条件搜索租房房源
export function leaseQuery(data){
	return myRequest ({
		url:'solr-query/house/leaseQuery',
		method:'GET',
		data:data	
	})
}

// 
export function officeLeaseQuery(data){
	return myRequest ({
		url:'solr-query/house/officeLeaseQuery',
		method:'GET',
		data:data	
	})
}

// 办公楼二手搜索
export function officeSecondHandQuery(data){
	return myRequest ({
		url:'solr-query/house/officeSecondHandQuery',
		method:'GET',
		data:data	
	})
}