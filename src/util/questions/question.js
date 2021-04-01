import { myRequest } from '../api.js'

//发布问题
export function addQuestion(data){
	return myRequest ({
		url:'/question/question/addQuestion',
		method:'POST',
		data:data	
	})
}

