import { myRequest } from './api.js'

// 查询所有城市
export function CityList(data){
	return myRequest ({
		url:'comboBoxList/getProvinceAndCityComboBoxList',
		method:'GET',
		data:data	
	})
}