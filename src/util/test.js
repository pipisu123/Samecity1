import { myRequest } from './api.js'

// 

//创建公司
export function Test(data){
	return myRequest ({
		url:'utils/advertisement/Test',
		method:'POST',
		data:data	
	})
}