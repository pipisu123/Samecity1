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

// 办公楼二手搜索
export function officeSecondHandQuery(data){
	return myRequest ({
		url:'solr-query/house/officeSecondHandQuery',
		method:'GET',
		data:data	
	})
}

// 办公楼租赁搜索
export function officeLeaseQuery(data){
	return myRequest ({
		url:'solr-query/house/officeLeaseQuery',
		method:'GET',
		data:data	
	})
}

// 商铺租赁搜索
export function shopLeaseQuery(data){
	return myRequest ({
		url:'solr-query/house/shopLeaseQuery',
		method:'GET',
		data:data	
	})
}

// 商铺二手搜索
export function shopSecondHandQuery(data){
	return myRequest ({
		url:'solr-query/house/shopSecondHandQuery',
		method:'GET',
		data:data	
	})
}

// 商铺转租搜索
export function shopSubletQuery(data){
	return myRequest ({
		url:'solr-query/house/shopSubletQuery',
		method:'GET',
		data:data	
	})
}