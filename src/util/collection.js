import { myRequest } from './api.js'

//收藏招聘信息
export function collectRecruitment(data){
	return myRequest ({
		url:'recruitment/collection-recruitment/addCollectionRecruitment',
		method:'POST',
		data:data	
	})
}

//取消收藏招聘信息
export function UncollectRecruitment(data){
	return myRequest ({
		url:'recruitment/collection-recruitment/deleteCollectionRecruitment',
		method:'POST',
		data:data	
	})
} 

//查询我的收藏
export function findMycollection(data){
	return myRequest ({
		url:'recruitment/collection-recruitment/findCollectionRecruitment',
		method:'POST',
		data:data	
	})
} 