import { myRequest } from '../api.js'

//添加评论接口
export function addCommentMain(data){
	return myRequest ({
		url:'question/comment-main/addCommentMain',
		method:'POST',
		data:data	
	})
}

//查找评论接口
export function findCommentMain(data){
	return myRequest ({
		url:'question/comment-main/findCommentMain',
		method:'POST',
		data:data	
	})
}