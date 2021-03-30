import { myRequest } from './api.js'

//查询招聘列表
export function recruitmentList(data){
	return myRequest ({
		url:'recruitment/recruitment-recruitment/findRecruitment',
		method:'POST',
		data:data	
	})
}
// 创建招聘新信息
export function addRecruitment(data){
	return myRequest ({
		url:'recruitment/recruitment-recruitment/addRecruitment',
		method:'POST',
		data:data	
	})
}
// 置顶招聘
export function addTopping(data){
	return myRequest ({
		url:'recruitment/recruitment-recruitment/addTopping',
		method:'POST',
		data:data	
	})
}
// 刷新招聘信息
export function refreshTime(data){
	return myRequest ({
		url:'recruitment/recruitment-recruitment/refreshTime',
		method:'POST',
		data:data	
	})
}
// 招聘失效时间
export function Invalidation(data){
	return myRequest ({
		url:'recruitment/recruitment-recruitment/Invalidation',
		method:'POST',
		data:data	
	})
}

