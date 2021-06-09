import { myRequest } from '../api.js'

// 添加教育经历
export function addEducationalExp(data){
	return myRequest ({
		url:'recruitment/educational-exp/addEducationalExp',
		method:'POST',
		data:data	
	})
}