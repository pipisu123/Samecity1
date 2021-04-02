import { myRequest } from '../api.js'

//发布问题
export function addQuestion(data){
	return myRequest ({
		url:'question/question/addQuestion',
		method:'POST',
		data:data	
	})
}

//查询所有问题
export function findQuestionAll(data){
	return myRequest ({
		url:'question/question/findQuestionAll',
		method:'POST',
		data:data	
	})
}
