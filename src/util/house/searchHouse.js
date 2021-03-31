import { myRequest } from '../api.js'

// 根据条件搜索二手房源
export function secondHandQuery(data){
	return myRequest ({
		url:'solr-query/house/secondHandQuery',
		method:'GET',
		data:data	
	})
}
