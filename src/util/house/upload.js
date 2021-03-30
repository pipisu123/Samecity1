import { myRequest } from '../api.js'

// 上传视频接口
export function uploadVideoFile(data){
	return myRequest ({
		url:'sys/uploadVideoFile',
		method:'POST',
		data:data	
	})
}

// 上传图片接口
export function uploadImgFile(data){
	return myRequest ({
		url:'sys/uploadImgFile',
		method:'POST',
		data:data	
	})
}
