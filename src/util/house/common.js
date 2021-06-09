import { myRequest } from '../api.js'

//添加收藏
export function addFavorites(data){
	return myRequest ({
		url:'house/common/addFavorites',
		method:'POST',
		data:data	
	})
}

//取消收藏
export function deleteFavorites(data){
	return myRequest ({
		url:'house/common/deleteFavorites',
		method:'DELETE',
		data:data	
	})
}