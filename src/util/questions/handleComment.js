import { myRequest } from '../apiformdata.js'
//点赞评论
export function thumbsUpCommentMain(data){
	return myRequest ({
		url:'question/comment-main/thumbsUpCommentMain',
		method:'POST',
		data:data	
	})
}