import { myRequest } from '../api.js'

//添加回复接口
export function addCommentReply(data){
	return myRequest ({
		url:'question/comment-reply/addCommentReply',
		method:'POST',
		data:data	
	})
}

//查找回复接口
export function findCommentReply(data){
	return myRequest ({
		url:'question/comment-reply/findCommentReply',
		method:'POST',
		data:data	
	})
}