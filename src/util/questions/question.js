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
//根据问题id查找问题详细数据
export function findQuestionById(data){
	return myRequest ({
		url:'question/question/findQuestionById',
		method:'POST',
		data:data	
	})
}

//根据问题userid查找问题详细数据
export function findQuestionByUserId(data){
	return myRequest ({
		url:'question/question/findQuestionByUserId',
		method:'POST',
		data:data	
	})
}