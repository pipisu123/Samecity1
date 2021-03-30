import { myRequest } from '../api.js'

// 招聘模块个人信息
export function findRecruitmentUser(data){
	return myRequest ({
		url:'recruitment/recruitment-user/findRecruitmentUser',
		method:'POST',
		data:data	
	})
}

