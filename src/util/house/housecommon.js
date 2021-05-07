import { myRequest } from '../apiformdata.js'

// 发布出租房源
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