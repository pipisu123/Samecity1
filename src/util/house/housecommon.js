import { myRequest } from '../api.js'

// 发布出租房源
export function deleteHouseByHouseId(data){
	return myRequest ({
		url:'house/common/deleteHouseByHouseId',
		method:'PUT',
		data:data	
	})
}