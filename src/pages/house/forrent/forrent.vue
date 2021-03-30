<template>
<view class="content">
	<!-- 创建房源信息-->
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType" v-if="showview">
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="120" :label-position="labelPosition" label="标题" prop="name">
				<u-input :border="border" placeholder="请输入标题" v-model="model.name" type="text"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '32rpx'}" left-icon="home" label-width="120" :label-position="labelPosition" label="小区" prop="area">
				<!-- <u-input :border="border" placeholder="请输入小区" v-model="model.area" type="text"></u-input> -->
				<uSearch :dictArr="wArr" @selectIndexValue="getVal" ref="usearch" @getValue="getValue" @getid="getid"></uSearch>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition" label="出租价格" prop="count">
				<u-input :border="border" placeholder="出租价格" v-model="model.count" type="text"></u-input>
			</u-form-item>
			<!-- <u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition" label="押金方式" prop="coun">
				<u-input :border="border" placeholder="押金方式" v-model="model.coun" type="text"></u-input>
			</u-form-item> -->
			<u-form-item :label-position="labelPosition" label="押金方式" prop="coun" label-width="150" color="#a0cfff">
				<u-input :border="border" type="select" :select-open="selectShow7" v-model="model.coun" placeholder="请选择押金方式" @click="selectShow7 = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="朝向" prop="workType" label-width="150">
				<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="model.workType" placeholder="选择朝向" @click="actionSheetShow = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="租房类型" prop="zuf" label-width="150" color="#a0cfff">
				<u-input :border="border" type="select" :select-open="selectShow5" v-model="model.zuf" placeholder="请选择租房类型" @click="selectShow5 = true"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition" label="面积" prop="phone">
				<u-input :border="border" placeholder="请输入面积" v-model="model.phone" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="选择装修" prop="wagesType" label-width="150" color="#a0cfff">
				<u-input :border="border" type="select" :select-open="selectShow1" v-model="model.wagesType" placeholder="请选择装修" @click="selectShow1 = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="选择房型" prop="industry" label-width="150">
				<u-input :border="border" type="select" :select-open="selectShow2" v-model="model.industry" placeholder="请选择房型" @click="selectShow2 = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="房源类型" prop="goodsType" label-width="150">
				<u-input :border="border" type="select" :select-open="selectShow" v-model="model.goodsType" placeholder="请选择房源类型" @click="selectShow = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="楼层类型" prop="loceng" label-width="150">
				<u-input :border="border" type="select" :select-open="selectShow4" v-model="model.loceng" placeholder="请输入楼层类型" @click="selectShow4 = true"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="180" :label-position="labelPosition" label="楼层" prop="lasttime">
				<u-input :border="border" placeholder="请输入楼层" v-model="model.lasttime" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="看房时间" prop="Type" label-width="150" color="#a0cfff">
				<u-input :border="border" type="select" :select-open="selectShow6" v-model="model.Type" placeholder="请选择看房时间" @click="selectShow6 = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="简介" prop="intro">
				<u-input type="textarea" :border="border" placeholder="请填写房子特点趴!" v-model="model.intro" />
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="看房必读" prop="intr" label-width="150">
				<u-input type="textarea" :border="border" placeholder="请填写你的看房必读吧!" v-model="model.intr" />
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition" label="电梯" prop="cou">
				<u-radio-group v-model="value" @change="radioGroupChange">
							<u-radio 
								@change="radioChange" 
								v-for="(item, index) in list1" :key="index" 
								:name="item.name"
								:disabled="item.disabled"
							>
								{{item.name}}
							</u-radio>
						</u-radio-group>
			</u-form-item>
	       <u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition" label="家具" prop="appliances">
				<u-checkbox-group @change="checkboxGroupChange">
							<u-checkbox 
								@change="checkboxChange" 
								v-model="item.checked" 
								v-for="(item, index) in list" :key="index" 
								:name="item.name"
							>{{item.name}}</u-checkbox>
						</u-checkbox-group>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="上传图片" prop="photo" label-width="150">
				<u-upload width="160" height="160" action="#"  ref="uUpload" :auto-upload="false" :before-upload="beforeUpload" max-count=9 :max-size="1 * 1024 * 1024" @on-choose-complete="uploadImage"></u-upload>
			</u-form-item>
			<text style="color: #a0cfff;">可上传多张图片，大小不超1m</text>
			<u-form-item :label-position="labelPosition" label="上传视频" prop="video" label-width="150">
				<uploadvideo
				        :dataList="dataList" 
				        types="video"
				        @successImage="successImage" 
				        @successVideo="successvideo"
						@getPath="getPath"
				    />
			</u-form-item>
		</u-form>
		<!-- 创建个体发布信息 -->
		<PersonRecruitment v-else></PersonRecruitment>
		<!-- <view class="public">
			<u-button @click="submit" type="primary">发布房源</u-button>
		</view> -->
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
		<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
		<u-select mode="single-column" :list="selectList1" v-model="selectShow1" @confirm="selectConfirm1"></u-select>
		<u-select mode="single-column" :list="selectList5" v-model="selectShow5" @confirm="selectConfirm5"></u-select>
		<u-select mode="single-column" :list="selectList6" v-model="selectShow6" @confirm="selectConfirm6"></u-select>
		<u-select mode="single-column" :list="selectList7" v-model="selectShow7" @confirm="selectConfirm7"></u-select>
		<u-select mode="single-column" :list="selectList4" v-model="selectShow4" @confirm="selectConfirm4"></u-select>
		<u-select mode="mutil-column" :list="selectList2" v-model="selectShow2" @confirm="selectConfirm2"></u-select>
		<u-toast ref="uToast" />
		<!-- <u-button @click="submit" type="primary" v-if="showview">立即发布</u-button> -->
		<u-button @click="submit" type="primary">立即发布</u-button>
	</view>
	
</view>
	
</template>

<script>
import uploadvideo from '../../components/easy-upload.vue'
import uSearch from '../../components/userzero-search.vue'
	
import { addLease } from '../../../util/house.js'
import { findAllCommunityByCity } from '../../../util/house/arealist.js'

export default {
	data() {
		return {
			showview: true,
			sahow:false,
			dataList:[],
			public:{
				publicType:''
			},
			wArr: [],
			src:'',  //后端返回的视频路径
			images:[], //后端返回的图片路径
			list1: [
							{
								value:'1',
								name: '有',
								disabled: false
							},
							{
								value:'0',
								name: '没',
								disabled: false
							},
						],
			list: [
							{
								name: '洗衣机',
								checked: false,
								disabled: false
							},
							{
								
								name: '电视机',
								checked: false,
								disabled: false
							},
							{
								
								name: '热水器',
								checked: false,
								disabled: false
							},
							{
							
								name: '沙发 ',
								checked: false,
								disabled: false
							},
							{
								
								name: '电视',
								checked: false,
								disabled: false
							},
							{
								
								name: '空调',
								checked: false,
								disabled: false
							},
							{
								
								name: '可做饭',
								checked: false,
								disabled: false
							},
							{
								
								name: '暖气',
								checked: false,
								disabled: false
							},
							{
								
								name: '阳台',
								checked: false,
								disabled: false
							},
							{
								
								name: '床',
								checked: false,
								disabled: false
							},
							{
								
								name: '智能门锁',
								checked: false,
								disabled: false
							},
							
							{
								
								name: '油烟机',
								checked: false,
								disabled: false
							},
							{
								
								name: '煤气灶',
								checked: false,
								disabled: false
							},
						],
			recruitment:{
				name: '',
				workType: '',
				phone:'',
				wechat:'',
				wagesType: '',
				Type:'',
				zuf:'',
				worktime: '',
				goodsType: '',
				intro: '',
				intr:'',
				region: '',
				loceng: '',
				photo:'',
				lasttime: '',
				count: '',
				show: false,
				photourl:'',
				industry:'',
				"hallNum": '',//厅
				"roomNum": '',//房
				"bathroomNum": '',//卫
			},
			model:{
				name: '',
				workType: '',
				phone:'',
				wechat:'',
				wagesType: '',
				Type:'',
				worktime: '',
				zuf:'',
				decorationId:'',
				goodsType: '',
				houseTypeId:'',
				loceng:'',
				locengId:'',
				intro: '',
				intr:'',
				seehouseId:'',
				region: '',
				photo:[],
				orientationId:'',
				lasttime: '',
				count: '',
				coun: '',
				appliances:[],
				deposit:'',
				payment:'',
				industry:'',
				video:'',
				area:'',
				zufId:'',
				communityId:''
			},
			rules:{
				nam:[
					{
						required: true,
						message: '请输入标题',
						trigger: 'blur' ,
					}
				],
				name:[
					{
						required: true,
						message: '请输入小区',
						trigger: 'blur' ,
					}
				],
				coun:[
					{
						required: true,
						message: '请输入押金方式',
						trigger: 'blur' ,
					}
				],
					phone: [
						{
							required: true,
							message: '请输入面积',
							trigger: 'blur'
						},
					],
					goodsType: [
						{
							required: true,
							message: '请选择房源类型',
							trigger: 'change',
						}
					],
					loceng: [
						{
							required: true,
							message: '请选择楼层类型',
							trigger: 'change',
						}
					],
					count:[
						{
							required: true,
							message: '出租价格不能空',
							trigger: 'blur' ,
						}
					],
					lasttime:[
						{
							required: true,
							message: '楼层不能为空',
							trigger: 'blur' ,
						}
					],
				
			},
			selectList: [
				{
					value: '1',
					label: '普通住宅'
				},
				{
					value: '2',
					label: '公寓'
				},
				{
					value: '3',
					label: '别墅'
				},
				{
					value: '4',
					label: '平房'
				},
				{
					value: '5',
					label: '商住楼'
				},
				{
					value: '0',
					label: '其他'
				},
			],
			selectList1: [
				{
					value: '1',
					label: '毛坯'
				},
				{
					value: '2',
					label: '简单装修'
				},
				{
					value: '3',
					label: '精装修'
				},
				{
					value: '4',
					label: '豪华装修'
				},
				{
					value: '0',
					label: '其他'
				},
				
			],
			selectList5: [
				{
					value: '1',
					label: '整租'
				},
				{
					value: '2',
					label: '合租'
				},
				
				
			],
			selectList4: [
				{
					value: '1',
					label: '顶层'
				},
				{
					value: '2',
					label: '高层'
				},
				{
					value: '3',
					label: '中层'
				},
				{
					value: '4',
					label: '低层'
				},
				{
					value: '5',
					label: '底层'
				},
				
				
			],
			selectList2:[
				[
						{
							value: '1',
							label: '1室'
						},
						{
							value: '2',
							label: '2室'
						},
						{
							value: '3',
							label: '3室'
						},
						{
							value: '4',
							label: '4室'
						},
						{
							value: '5',
							label: '5室'
						},
						{
							value: '6',
							label: '6室'
						},
						{
							value: '7',
							label: '7室'
						},
					],
					[
						{
							value: '0',
							label: '0厅'
						},
						{
							value: '1',
							label: '1厅'
						},
						{
							value: '2',
							label: '2厅'
						},
						{
							value: '3',
							label: '3厅'
						},
						{
							value: '4',
							label: '4厅'
						},
						{
							value: '5',
							label: '5厅'
						},
						{
							value: '6',
							label: '6厅'
						},
						{
							value: '7',
							label: '7厅'
						},
						
					],
					[
						{
							value: '0',
							label: '0卫'
						},
						{
							value: '1',
							label: '1卫'
						},
						{
							value: '2',
							label: '2卫'
						},
						{
							value: '3',
							label: '3卫'
						},
						{
							value: '4',
							label: '4卫'
						},
						{
							value: '5',
							label: '5卫'
						},
						{
							value: '6',
							label: '6卫'
						},
						{
							value: '7',
							label: '7卫'
						}	
					],
					
			],
			selectList6: [
				{
					value: '0',
					label: '其他'
				},
				{
					value: '1',
					label: '随时看房'
				},
				{
					value: '2',
					label: '周末看房'
				},
				{
					value: '3',
					label: '下班后看房'
				},
				{
					value: '4',
					label: '电话预约'
				},
				{
					value: '5',
					label: '有租户预约'
				},
				
				
			],
			selectList7: [
				{
					value: '0',
					label: '押一付一'
				},
				{
					value: '1',
					label: '押一付二'
				},
				{
					value: '2',
					label: '押二付一'
				},
				{
					value: '3',
					label: '押二付二'
				},
				{
					value: '4',
					label: '押一付三'
				},
				{
					value: '5',
					label: '押三付一'
				},
				{
					value: '6',
					label: '押二付三'
				},
				{
					value: '7',
					label: '半年付'
				},
				{
					value: '8',
					label: '年付'
				},
				{
					value: '9',
					label: '押一年付'
				},

				
				
			],
			actionSheetList: [
			{
				id:'1',
				text: '东'
			},
			{
				id:'2',
				text: '南'
			},
			{
				id:'3',
				text: '西'
			},
			{
				id:'4',
				text: '北'
			},
			{
				id:'5',
				text: '东西'
			},
			{
				id:'6',
				text: '东南'
			},
			{
				id:'7',
				text: '南北'
			},
			{
				id:'8',
				text: '西南'
			},
			{
				id:'9',
				text: '东北'
			},
			{
				id:'10',
				text: '西北'
			},
			
			],
			check: false,
			selectStatus: 'close',
			border: false,
			labelPosition: 'left',
			actionSheetShow: false,
			errorType: ['message'],
			pickerShow: false,
			selectShow: false,
			selectShow1:false,
			selectShow2:false,
			selectShow4:false,
			selectShow5:false,
			selectShow6:false,
			selectShow7:false,
			selectShow3:true,
			show: false,
			zoom: false,
	
			contentSlot: false,
			showTitle: true,
			asyncClose: false,
		};
	},
	components:{
		uploadvideo,
		uSearch
	},
	computed: {
		borderCurrent() {
			return this.border ? 0 : 1;
		}
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
		console.log("这是父组件")
	},
	onLoad() {
	   // 获取当前地区所有小区
	   findAllCommunityByCity({
		   "cityName": '茂名'
	   }).then(res=>{
		   console.log(res)
		   this.wArr = res.data.data
	   }).catch(err=>{
		   console.log(err)
	   })
	},
	
	methods:{
		// 小区获取
		getValue(e){
			this.model.area = e
		},
		// 选择回调出小区id
		getid(e){
			this.model.communityId = e
		},
		getVal(val){
			
		},
		getInputVal(){
			var val = this.$refs.usearch.getSearchInputValue();
			console.log(val)
		},
		// 获取视频文件路径
		getPath(e){
			this.model.video = e
		},
		radioChange(e) {
					
					if(e == '有'){
						this.model.cou = 1
					}else{
						this.model.cou = 0
						console.log(this.model.cou);
					}
				},
				// 选中任一radio时，由radio-group触发
				radioGroupChange(e) {
					console.log(e);
				},
	// 选中某个复选框时，由checkbox时触发
		checkboxChange(e) {
		},
		// 选中任一checkbox时，由checkbox-group触发
		checkboxGroupChange(e) {
			this.model.appliances= e
			console.log(e);
		},
		// 全选
		checkedAll() {
			this.list.map(val => {
				val.checked = true;
			})
		},
		// 关闭提示
		close() {
			this.show1 = false;
		},
		toCreate(){
			uni.navigateTo({
				url:'/pages/house/brokerpage/brokerpage'
			})
		},
		confirm() {
			uni.navigateTo({
				url:'/pages/house/brokerpage/brokerpage'
			})
			setTimeout(() => {
				this.show = false;
			}, 2000)
		},
		click(){
			let files = [];
			files = this.$refs.uUpload.lists;
			// this.urlTobase64(files[0].url); 
			this.base64(files[0].url)
			this.recruitment.photourl = files[0].url
			console.log(files[0].url);
			console.log(this.model.photo)
		},
		// 创建企业招聘信息
	       submit() {
			   console.log(this.model.deposit)
			this.$refs.uForm.validate(valid => {
					if (valid) {
						// 1.上传视频成功后再调用上传图片，循环调用用接口
							for(let i=0;i<=this.model.photo.length;i++){
								uni.uploadFile({
								  url: 'http://192.168.101.74:8080/sys/uploadImgFile',
								  method: 'POST',           // 可用可不用
								  filePath:this.model.photo[i],
									header:{
										"Content-Type":"multipart/form-data",
										"authorization":uni.getStorageSync('token'),
									},
								  name: 'file',              // 服务器定义key字段名称
								  success: (res)=> {
									 console.log(res)
									 var ob = JSON.parse(res.data);
									 console.log(ob)
									 this.images.push(ob.data)
									 console.log(this.images)
								  },
								  fail: function() {
									console.log('接口调用失败')
								  }
								})	
							}
						// 2.先调用上传视频接口
						uni.uploadFile({
						  url: 'http://192.168.101.74:8080/sys/uploadVideoFile',
						  method: 'POST',           // 可用可不用
						  filePath: this.model.video,
						  header:{
							"Content-Type":"multipart/form-data",
							"authorization":uni.getStorageSync('token'),
						   },
						  name: 'file',              // 服务器定义key字段名称
						  success: (res)=> {
						  console.log('视频上传成功');
						  console.log(res);
						  let data = JSON.parse(res.data)
						  this.src = data.data
						  // 3.最后调用上传所有房源基本信息接口
						  addLease({
						  	"canLookTime": this.model.seehouseId,//看房时间
						  	 "leaseType":this.model.zufId,//租房类型
						  	"checkInCondition":'',//入住条件
						  	"checkInTime":'2021-03-06',//看房时间
						  	"communityId":this.model.communityId,//小区
						  	"decorationId":this.model.decorationId,//装修id
						  	"deposit":this.model.deposit,//押金
						  	"payment":this.model.payment,//付款数
						  	"elevator": this.model.cou,//电梯
						  	"floorId":this.model.locengId,//楼层
						  	"floorNum":this.model.lasttime,//总楼层
						  	"generalize":this.model.intro,//房屋概况
						  	"houseTypeId":this.model.houseTypeId,//房屋类型
						  	"identityType":1,//发布类型
						  	"orientationId":this.model.orientationId,
						  	"money":this.model.count,//价钱
						  	"square":this.model.phone,//面积
						  	"title": this.model.name,//标题
						  	"appliance": this.model.appliances,//家具
						  	"hallNum":this.model.hallNum,//厅
						  	"roomNum":this.model.roomNum,//房
						  	"bathroomNum":this.model.bathroomNum,//卫		
						  	 "videoFile":this.src,//视频
						  	"imgFiles": this.images//图片
						  }).then(res=>{
						  	console.log(res)
						  	
						  }).catch(err=>{
						  	console.log(err)
						  })	    
						  },
						  fail: function() {
						    console.log('接口调用失败')
						  }
						})
							
					}
				 })	
		},
		uploadImage(){
			let files = [];
			var object = {}
			files = this.$refs.uUpload.lists;
			for(var i=0;i<files.length;i++){
				object = files[i].url
				this.model.photo.push(object)
			}
			
			console.log(this.model.photo);
			
		},
		// submit(recruitment) {
			
		// 	this.$refs.uForm.validate(valid => {
		// 			if (valid) {
		// 				this.recruitment.wechat = this.model.wechat
		// 				this.recruitment.name = this.model.name
		// 				this.recruitment.phone = this.model.phone
		// 				this.recruitment.wagesType = this.model.wagesType
		// 				this.recruitment.worktime = this.model.worktime
		// 				this.recruitment.intro = this.model.intro
		// 				this.recruitment.lasttime = this.model.lasttime
		// 				this.recruitment.count = this.model.count
		// 				this.recruitment.region = this.model.region
		// 				this.recruitment.photo = this.model.photo
		// 				this.recruitment.goodsType = this.model.goodsType
		// 				this.recruitment.workType = this.model.workType
		// 				this.recruitment.industry = this.model.industry
		// 				this.recruitment.show = true
		// 				console.log(this.recruitment)
		// 				uni.navigateTo({
		// 					url:'/pages/house/pubilshedpage/pubilshedpage?recruitment='+encodeURIComponent(JSON.stringify(recruitment))
		// 				})
		// 			}
		// 		 })	
		// },
		base64(url){
		      return new Promise((resolve, reject) => {
		        wx.getFileSystemManager().readFile({
		          filePath: url, //选择图片返回的相对路径
		          encoding: 'base64', //编码格式
		          success: res => {
		            resolve('data:image/' + ';base64,' + res.data)
					console.log(res)
					this.model.photo = res.data	
		          },
		          fail: res => reject(res.errMsg)
		        })
		      })
		},
		// 点击actionSheet回调
		actionSheetCallback(index) {
			uni.hideKeyboard();
			this.model.workType = this.actionSheetList[index].text;
			this.model.orientationId = this.actionSheetList[index].id;
		},
		// 选择职位类型回调
		selectConfirm(e) {
			this.model.goodsType = '';
			e.map((val, index) => {
				this.model.goodsType += this.model.goodsType == '' ? val.label : '-' + val.label;
				this.model.houseTypeId = e[index].value
			})
		},
		// 选择职位类型回调
		selectConfirm1(e) {
			this.model.wagesType = '';
			e.map((val, index) => {
				this.model.wagesType += this.model.wagesType == '' ? val.label : '-' + val.label;
				this.model.decorationId = e[index].value
			})
		},
		// 选择楼层回调
		selectConfirm4(e) {
			this.model.loceng = '';
			e.map((val, index) => {
				this.model.loceng += this.model.loceng == '' ? val.label : '-' + val.label;
				this.model.locengId = e[index].value
			})
			
			console.log(e)
		},
		// 选择租房类型回调
		selectConfirm5(e) {
			this.model.zuf = '';
			this.model.zufId = e[0].value
			e.map((val, index) => {
				this.model.zuf += this.model.zuf == '' ? val.label : '-' + val.label;
			})
			
		},
		// 选择行业回调
		selectConfirm2(e){
			console.log(e)
			this.model.industry = '';
			this.model.hallNum = e[0].value
			this.model.roomNum = e[1].value
			this.model.bathroomNum = e[2].value
			e.map((val, index) => {
				this.model.industry += this.model.industry == '' ? val.label : '/' + val.label;
			})
		},
		// 选择行业回调
		selectConfirm6(e) {
			this.model.Type = '';
			e.map((val, index) => {
				this.model.Type += this.model.Type == '' ? val.label : '-' + val.label;
				this.model.seehouseId = e[index].value
			})
		},
		// 选择付款方式回调
		selectConfirm7(e){
			this.model.coun = '';
			e.map((val, index) => {
				this.model.coun += this.model.coun == '' ? val.label : '-' + val.label;
				
			})
			console.log(e[0].value)
			if(e[0].value === '0'){
				this.model.deposit = 1;
				this.model.payment = 1;
			}else if(e[0].value === '1'){
				this.model.deposit = 1;
				this.model.payment = 2;
			}else if(e[0].value === '2'){
				this.model.deposit = 2;
				this.model.payment = 1;
			}else if(e[0].value === '3'){
				this.model.deposit = 2;
				this.model.payment = 2;
			}else if(e[0].value === '4'){
				this.model.deposit = 1;
				this.model.payment = 3;
			}else if(e[0].value === '5'){
				this.model.deposit = 3;
				this.model.payment = 1;
			}else if(e[0].value === '6'){
				this.model.deposit = 2;
				this.model.payment = 3;
			}else if(e[0].value === '7'){
				this.model.payment = 6;
			}else if(e[0].value === '8'){
				this.model.payment = 12;
			}else if(e[0].value === '9'){
				this.model.deposit = 1;
				this.model.payment = 12;
			}
			console.log(this.model.deposit)
		},
		borderChange(index) {
			this.border = !index;
		},
		labelPositionChange(index) {
			this.labelPosition = index == 0 ? 'left' : 'top';
		},
		codeChange(text) {
			this.codeTips = text;
		},
		popup(){
			this.show=true
		}
		
		
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	padding: 30rpx;
}

.title{
	text{
		color: #a0cfff;
	}
}
.company{
	text-align: center;
}
.public{
	// width: 100%;
	// height: 44px;
	// position: fixed;
	// bottom: 0rpx;
	
}
.upload{
	width: 30%;
	height: 160rpx;
	background-color: #F1F1F1;
}

</style>
