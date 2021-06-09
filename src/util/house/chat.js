import { myRequest } from '../apiformdata.js'

// 添加联系人
export function addMessageUserList(data){
	return myRequest ({
		url:'sys/message/addMessageUserList',
		method:'POST',
		data:data	
	})
}
