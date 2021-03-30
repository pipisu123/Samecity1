import { myRequest } from './api.js'

//收藏招聘信息
export function collectResume(data){
	return myRequest ({
		url:'recruitment/collection-resume/addCollectionResume',
		method:'POST',
		data:data	
	})
}

//取消收藏招聘信息
export function UncollectResume(data){
	return myRequest ({
		url:'recruitment/collection-resume/deleteCollectionResume',
		method:'POST',
		data:data	
	})
} 

//查询我的收藏
export function findResumecollection(data){
	return myRequest ({
		url:'recruitment/collection-resume/findCollectionResume',
		method:'POST',
		data:data	
	})
} 