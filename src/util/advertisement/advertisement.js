import { myRequest } from '../api.js'

// 查询广告
export function findAdvertisement(data){
	return myRequest ({
		url:'utils/advertisement/findAdvertisement',
		method:'POST',
		data:data	
	})
}