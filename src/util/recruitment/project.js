import { myRequest } from '../api.js'

// 添加教育经历
export function addProjectExp(data){
	return myRequest ({
		url:'recruitment/project-exp/addProjectExp',
		method:'POST',
		data:data	
	})
}