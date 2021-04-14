import { myRequest } from '../api.js'

//查找通知信息接口
export function findNotice(data){
	return myRequest ({
		url:'question/notice/findNotice',
		method:'POST',
		data:data	
	})
}