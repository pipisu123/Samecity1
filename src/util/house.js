import { myRequest } from './api.js'

// 

//发布租房
export function addLease(data){
	return myRequest ({
		url:'house/lease/addLease',
		method:'POST',
		data:data	
	})
}

// 发布二手房
export function addSecondHand(data){
	return myRequest ({
		url:'house/second-hand/addSecondHand',
		method:'POST',
		data:data	
	})
}