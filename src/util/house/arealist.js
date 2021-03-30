import { myRequest } from '../api.js'

// 下拉区域
export function findAllCommunityByCity(data){
	return myRequest ({
		url:'house/community/findAllCommunityByCity',
		method:'GET',
		data:data	
	})
}