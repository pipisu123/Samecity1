import { myRequest } from '../api.js'

// 面试邀请
export function addInvitation(data){
	return myRequest ({
		url:'recruitment/invitation/addInvitation',
		method:'POST',
		data:data	
	})
}

//取消邀请面试
export function deleteInvitation(data){
	return myRequest ({
		url:'recruitment/invitation/deleteInvitation',
		method:'POST',
		data:data	
	})
}

//处理面试邀请
export function handleInvitation(data){
	return myRequest ({
		url:'recruitment/invitation/handleInvitation',
		method:'POST',
		data:data	
	})
}

//查看邀请面试列表
export function findInvitation(data){
	return myRequest ({
		url:'recruitment/invitation/findInvitation',
		method:'POST',
		data:data	
	})
}

// 查询邀请面试列表
export function findInvitationByInviteesId(data){
	return myRequest ({
		url:'recruitment/invitation/findInvitationByInviteesId',
		method:'POST',
		data:data	
	})
}