import { myRequest } from './api.js'

//查询个人信息
export function findUser(data){
	return myRequest ({
		url:'recruitment/recruitment-recruitment/findRecruitment',
		method:'POST',
		data:data	
	})
}