import { myRequest } from '../api.js'

// 添加小区
export function addCommunity(data){
	return myRequest ({
		url:'house/community/addCommunity',
		method:'POST',
		data:data	
	})
}

// 根据城市获取该城市所有小区的数据接口
export function findAllCommunityByCity(data){
	return myRequest ({
		url:'house/community/findAllCommunityByCity',
		method:'GET',
		data:data	
	})
}

// 根据用户Id获取小区的数据接口
export function findAllCommunityByUserId(data){
	return myRequest ({
		url:'house/community/findAllCommunityByUserId',
		method:'GET',
		data:data	
	})
}