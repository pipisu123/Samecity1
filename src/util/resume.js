import {myRequest} from './api.js'

// 查询所有简历
export function resumeList(data){
	return myRequest ({
		url:'recruitment/recruitment-resume/findResume',
		method:'POST',
		data:data	
	})
}
//创建简历
export function addResume(data){
	return myRequest ({
		url:'recruitment/recruitment-resume/addResume',
		method:'POST',
		data:data	
	})
	}
//删除简历信息 
export function detecteResume(data){
	return myRequest ({
		url:'recruitment/recruitment-resume/detecteResume',
		method:'POST',
		data:data	
	})
	}
//更新简历信息
export function updateResume(data){
	return myRequest ({
		url:'recruitment/recruitment-resume/updateResume',
		method:'POST',
		data:data	
	})
	}
	
//购买简历
export function addBuyResume(data){
	return myRequest ({
		url:'recruitment/buy-resume/addBuyResume',
		method:'POST',
		data:data	
	})
	}
	
//查询购买的简历
export function findBuyResume(data){
	return myRequest ({
		url:'recruitment/buy-resume/findBuyResume',
		method:'POST',
		data:data	
	})
	}