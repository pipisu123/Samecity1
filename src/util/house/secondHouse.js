import { myRequest } from '../api.js'

// 二手房详情
export function getSecondHandDetails(data){
	return myRequest ({
		url:'house/secondHand/getSecondHandDetails',
		method:'GET',
		data:data	
	})
}
