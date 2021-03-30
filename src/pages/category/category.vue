<template>
  <view class="content">
	  <button type="default" @click="btn1">上传视频</button>
	<button type="default" @click="btn">上传图片</button>
	<button type="default" @click="btn2">提交视频</button>
  </view>
</template>

<script>
	import { addLease } from '../../util/house.js'
	var sourceType = [
	        ['camera'],
	        ['album'],
	        ['camera', 'album']
	    ]
export default {
 data(){
   return{
	  src:[],
      src1:'',
	  sourceType: ['拍摄', '相册', '拍摄或相册'],
	  cameraList: [{
	          value: 'back',
	          name: '后置摄像头',
	          checked: 'true'
	      },
	      {
	          value: 'front',
	          name: '前置摄像头'
	      },
	  ],
	  cameraIndex: 0,
	  VideoOfImagesShow:true,
  }
},
onLoad() {
	var time = new Date();
	console.log(time)
},
methods:{
	
	btn2(){
		uni.request({
		    url: 'http://192.168.101.24:8080/house/lease/addLease', //仅为示例，并非真实接口地址。
		    data: {
		        "canLookTime": 5,
				 "leaseType":1,
				"checkInCondition":'',
				"checkInTime":'2021-03-06',
				"communityId":8051306208787283968,
				"decorationId":4,
				"deposit":1,
				"elevator":1,
				"floorId":'',
				"floorNum":28,
				"generalize":'',
				"hallNum":2,
				"houseTypeId":'',
				"identityType":'',
				"orientationId":4,
				"money":2500,
				"payment":'',
				"roomNum":3,
				"square":5000,
				"title":'ksjdksjak',
				"appliances":'沙发',
				"bathroomNum":2,		
			   "videoFile":'ssss',
			  "imgFiles":this.src
		    },
			method:'POST',
		    header: {
		      'content-type': 'application/json',
			  "authorization":uni.getStorageSync('token'),
		    },
		    success: (res) => {
		        console.log(res.data);
		       
		    }
		});
		// addLease({
		// 		"canLookTime": 5,
		// 		 "leaseType":1,
		// 		"checkInCondition":'',
		// 		"checkInTime":'2021-03-06',
		// 		"communityId":8051306208787283968,
		// 		"decorationId":4,
		// 		"deposit":1,
		// 		"elevator":1,
		// 		"floorId":'',
		// 		"floorNum":28,
		// 		"generalize":'',
		// 		"hallNum":2,
		// 		"houseTypeId":'',
		// 		"identityType":'',
		// 		"orientationId":4,
		// 		"money":2500,
		// 		"payment":'',
		// 		"roomNum":3,
		// 		"square":5000,
		// 		"title":'ksjdksjak',
		// 		"appliances":'沙发',
		// 		"bathroomNum":2,		
		// 	   "videoFile":'ssss',
  //               "imgFiles":this.src
		// }).then(res=>{
		// 	console.log(res)
		// }).catch(err=>{
		// 	console.log(err)
		// })
	},
	// 上传视频
	btn1(){
		uni.chooseVideo({
		    maxDuration:10,
		    count: 1,
		    camera: this.cameraList[this.cameraIndex].value,
		    sourceType: sourceType[this.sourceTypeIndex],
		    success: (res) => {
		        console.log(JSON.stringify(res.tempFilePath),'视频')
				
				this.src1 = res.tempFilePath;
				
		    },
		})
	},
	// 上传图片
	btn(){
		let that = this
		uni.chooseImage({
		 count: 3, // 默认9
		 sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
		 sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		 success: function (res) {
		 // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
		 var tempFilePaths = res.tempFilePaths;
		 that.src = res.tempFilePaths;//将选的图片路径数组赋值给src
		 console.log(res.tempFilePaths)
		 
		 // console.log(res)
		//  wx.uploadFile({
		//  url: 'http://192.168.101.24:8080/house/lease/addLease', //此处换上你的接口地址
		//  filePath: tempFilePaths[0],
		//  name: 'imgFiles',
		//  header: { 
		//  'content-type':  `multipart/form-data; boundary=${boundary}`,
		//  // 'accept': 'application/json',
		//  "authorization":uni.getStorageSync('token'),
		//  },
		// formData:{
					 
		// 			 	canLookTime: 5,
		// 			 	 leaseType:1,
		// 			 	checkInCondition:'',
		// 			 	checkInTime:'2021-03-06',
		// 			 	communityId:8051306208787283968,
		// 			 	decorationId:4,
		// 			 	deposit:1,
		// 			 	elevator:1,
		// 			 	floorId:'',
		// 			 	floorNum:28,
		// 			 	generalize:'',
		// 			 	hallNum:2,
		// 			 	houseTypeId:'',
		// 			 	identityType:'',
		// 			 	orientationId:4,
		// 			 	money:2500,
		// 			 	payment:'',
		// 			 	roomNum:3,
		// 			 	square:5000,
		// 			 	title:'ksjdksjak',
		// 			 	"imgFiles":null,
		// 			 	appliances:'沙发',
		// 			 	bathroomNum:2,		
					   
		// 			 videoFile:'AAA'   
		               
		// },
		
		//  success: function(res){
		//  var data=res.data;
		//  console.log("上传图片");
		//  },
		//  fail: function(res){
		//  console.log('fail');
		  
		//  },
		//  })
		 }
		 })
	}
	
},
}
</script>

<style scoped lang="scss">

</style>