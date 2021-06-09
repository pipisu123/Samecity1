import { myRequest } from '../api.js'

// 添加工作经历
export function addWorkExp(data){
	return myRequest ({
		url:'recruitment/work-exp/addWorkExp',
		method:'POST',
		data:data	
	})
}