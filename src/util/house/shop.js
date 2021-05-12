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

