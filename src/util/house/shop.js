import { myRequest } from '../api.js'

// 经纪人添加商铺出租
export function addShopLeaseByBroker(data){
	return myRequest ({
		url:'house/shop/addShopLeaseByBroker',
		method:'POST',
		data:data	
	})
}

// 经纪人添加商铺出售
export function addShopSecondHandByBroker(data){
	return myRequest ({
		url:'house/shop/addShopSecondHandByBroker',
		method:'POST',
		data:data	
	})
}

// 个人添加商铺出租
export function addShopLeaseByPerson(data){
	return myRequest ({
		url:'house/shop/addShopLeaseByPerson',
		method:'POST',
		data:data	
	})
}

// 个人添加商铺二手
export function addShopSecondHandByPerson(data){
	return myRequest ({
		url:'house/shop/addShopSecondHandByPerson',
		method:'POST',
		data:data	
	})
}

// 经纪人添加商铺转租
export function addShopSubletByBroker(data){
	return myRequest ({
		url:'house/shop/addShopSubletByBroker',
		method:'POST',
		data:data	
	})
}

// 个人添加商铺转租
export function addShopSubletByPerson(data){
	return myRequest ({
		url:'house/shop/addShopSubletByPerson',
		method:'POST',
		data:data	
	})
}

// 查看商铺房源详情
export function getShopDetails(data){
	return myRequest ({
		url:'house/shop/getShopDetails',
		method:'GET',
		data:data	
	})
}

// 查询个人身份发布的商铺租赁房源列表
export function getShopLeaseListByPerson(data){
	return myRequest ({
		url:'house/shop/getShopLeaseListByPerson',
		method:'GET',
		data:data	
	})
}

// 查询个人身份发布的商铺二手房源列表
export function getShopSecondHandListByPerson(data){
	return myRequest ({
		url:'house/shop/getShopSecondHandListByPerson',
		method:'GET',
		data:data	
	})
}

// 查询个人身份发布的商铺转租房源列表
export function getShopSubletListByPerson(data){
	return myRequest ({
		url:'house/shop/getShopSubletListByPerson',
		method:'GET',
		data:data	
	})
}

// 查询经纪人身份发布的商铺租赁房源列表
export function getShopLeaseListByBroker(data){
	return myRequest ({
		url:'house/shop/getShopLeaseListByBroker',
		method:'GET',
		data:data	
	})
}

// 查询经纪人身份发布的商铺二手房源列表
export function getShopSecondHandListByBroker(data){
	return myRequest ({
		url:'house/shop/getShopSecondHandListByBroker',
		method:'GET',
		data:data	
	})
}

// 查询经纪人身份发布的商铺转租房源列表
export function getShopSubletListByBroker(data){
	return myRequest ({
		url:'house/shop/getShopSubletListByBroker',
		method:'GET',
		data:data	
	})
}
