import { myRequest } from './api.js'

//创建公司
export function addCompany(data){
	return myRequest ({
		url:'/recruitment/recruitment-company/addCompany',
		method:'POST',
		data:data	
	})
}

//修改公司信息
export function updateCompany(data){
	return myRequest ({
		url:'/recruitment/recruitment-company/updateCompany',
		method:'POST',
		data:data	
	})
}

//按条件查公司信息
export function findCompany(data){
	return myRequest ({
		url:'/recruitment/recruitment-company/findCompany',
		method:'POST',
		data:data	
	})
}

//按条件查公司信息
export function findCompanyByUserId(data){
	return myRequest ({
		url:'recruitment/recruitment-company/findCompanyByUserId',
		method:'POST',
		data:data	
	})
}