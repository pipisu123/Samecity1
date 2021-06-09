import { myRequest } from '../apiformdata.js'

// 删除房源
export function deleteHouseByHouseId(data){
	return myRequest ({
		url:'house/common/deleteHouseByHouseId',
		method:'PUT',
		data:data	
	})
}

// 个人上架房源
export function doReleaseOnlineTrue(data){
	return myRequest ({
		url:'house/common/doReleaseOnlineTrue',
		method:'PUT',
		data:data	
	})
}

// 个人下架房源
export function doReleaseOnlineFalse(data){
	return myRequest ({
		url:'house/common/doReleaseOnlineFalse',
		method:'PUT',
		data:data	
	})
}

// 置顶房源
export function isTopHouseByHouseId(data){
	return myRequest ({
		url:'house/common/isTopHouseByHouseId',
		method:'PUT',
		data:data	
	})
}

// 获取浏览记录列表
export function getBrowsingHistoryList(data){
	return myRequest ({
		url:'house/common/getBrowsingHistoryList',
		method:'GET',
		data:data	
	})
}

// 获取浏览记录数
export function getBrowsingHistoryNum(data){
	return myRequest ({
		url:'house/common/getBrowsingHistoryNum',
		method:'GET',
		data:data	
	})
}

// 删除所有浏览记录
export function deleteAllBrowsingHistory(data){
	return myRequest ({
		url:'house/common/deleteAllBrowsingHistory',
		method:'DELETE',
		data:data	
	})
}

// 删除具体某条浏览记录
export function deleteBrowsingHistory(data){
	return myRequest ({
		url:'house/common/deleteBrowsingHistory',
		method:'DELETE',
		data:data	
	})
}

//添加收藏
export function addFavorites(data){
	return myRequest ({
		url:'house/common/addFavorites',
		method:'POST',
		data:data	
	})
}

//删除单条收藏
export function deleteFavorites(data){
	return myRequest ({
		url:'house/common/deleteFavorites',
		method:'DELETE',
		data:data	
	})
}

//获取收藏列表
export function getFavoritesList(data){
	return myRequest ({
		url:'house/common/getFavoritesList',
		method:'GET',
		data:data	
	})
}
