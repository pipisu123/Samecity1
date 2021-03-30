import { myRequest } from '../api.js'

// 下拉区域
export function getAreaComboBoxListByCity(data){
	return myRequest ({
		url:'/comboBoxList/house/getAreaComboBoxListByCity',
		method:'GET',
		data:data	
	})
}