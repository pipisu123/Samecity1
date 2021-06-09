import { myRequest } from '../apiformdata.js'

// 按id查招募信息
export function findRecruitmentById(data){
	return myRequest ({
		url:'recruitment/recruitment-recruitment/findRecruitmentById',
		method:'POST',
		data:data	
	})
}

// 收藏职位
export function collectRecruitment(data){
	return myRequest ({
		url:'recruitment/collection-recruitment/addCollectionRecruitment',
		method:'POST',
		data:data	
	})
}

// 取消收藏职位
export function UncollectRecruitment(data){
	return myRequest ({
		url:'recruitment/collection-recruitment/deleteCollectionRecruitment',
		method:'POST',
		data:data	
	})
}