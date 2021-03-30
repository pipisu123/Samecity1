import { myRequest } from '../api.js'

// 购买积分
export function buyIntegral(data){
	return myRequest ({
		url:'utils/userIntegral/buyIntegral',
		method:'POST',
		data:data	
	})
}

// 增加积分
export function addIntegral(data){
	return myRequest ({
		url:'utils/userIntegral/addIntegral',
		method:'POST',
		data:data	
	})
}

// 查询所有积分订单
export function findWeChatOrder(data){
	return myRequest ({
		url:'wechatpay/wechatOrder/findIntegralOrderFinish',
		method:'POST',
		data:data	
	})
}