import { myRequest } from '../apiformdata.js'
//点赞问题
export function thumbsUp(data){
	return myRequest ({
		url:'question/question/thumbsUp',
		method:'POST',
		data:data	
	})
}