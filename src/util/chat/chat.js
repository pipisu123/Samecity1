import { myRequest } from '../api.js'

//添加聊天关系,接口在页面上
export function addMessageUserList(data){
	return myRequest ({
		url:'sys/message/addMessageUserList?toId=8052376913067384832',
		method:'POST',
		data:data	
	})
}

//获取该用户的所有聊天用户列表
export function getMessageUserList(data){
	return myRequest ({
		url:'sys/message/getMessageUserList',
		method:'GET',
		data:data	
	})
}

//拉取消息列表
export function queryMessageList(data){
	return myRequest ({
		url:'sys/message/queryMessageList',
		method:'GET',
		data:data	
	})
}