import { myRequest } from './api.js'


//查询我的收藏
export function findMycollection(data){
	return myRequest ({
		url:'recruitment/collection-recruitment/findCollectionRecruitment',
		method:'POST',
		data:data	
	})
} 