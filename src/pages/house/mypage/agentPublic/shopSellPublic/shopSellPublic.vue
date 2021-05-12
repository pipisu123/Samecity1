<template>
	<view>
		<view class="content" v-if="showview">
			<view style="padding: 10rpx;">
				<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
					<u-form-item :leftIconStyle="{color: '#888', fsontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="地址" prop="address">
						<u-input :border="border" placeholder="请输入商铺地址" v-model="model.address" type="select" @click="Toaddress"></u-input>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="标题" prop="title">
						<u-input :border="border" placeholder="请输入出租标题" v-model="model.title" type="text"></u-input>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="商铺名称" prop="shopName">
						<u-input :border="border" placeholder="请输入商铺名称" v-model="model.shopName" type="text"></u-input>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="适合行业" prop="applicableIndustry">
						<u-input :border="border" placeholder="请输入适合行业" v-model="model.applicableIndustry" type="text"></u-input>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="楼层类型" prop="floor ">
						<u-radio-group v-model="value" @change="radioChange">
							<u-radio @change="radioChange" v-for="(item, index) in list1" :key="index" :name="item.name" :disabled="item.disabled">
								{{item.name}}
							</u-radio>
						</u-radio-group>
						<u-input :border="border" placeholder="请选择" v-model="model.floor" type="select"></u-input>
					</u-form-item>
					<u-form-item :label-position="labelPosition" label="商铺类型" prop="shopType" label-width="150" color="#a0cfff">
						<u-input :border="border" type="select" :select-open="selectShow3" v-model="model.shopType" placeholder="请选择商铺类型"
						 @click="selectShow3 = true"></u-input>
					</u-form-item>
					<u-form-item :label-position="labelPosition" label="性质" prop="shopProperty" label-width="150" color="#a0cfff">
						<u-input :border="border" type="select" :select-open="selectShow4" v-model="model.shopProperty" placeholder="请选择商铺类型"
						 @click="selectShow4 = true"></u-input>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="面积" prop="square">
						<u-input :border="border" placeholder="请输入面积" v-model="model.square" type="text"></u-input>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="进深" prop="depth">
						<view style="display: flex;">
							<view style="width: 98%;">
								<u-input :border="border" placeholder="请输入进深" v-model="model.depth" type="text"></u-input>
							</view>
							<text>m</text>
						</view>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="面宽" prop="faceWidth">
						<view style="display: flex;">
							<view style="width: 98%;">
								<u-input :border="border" placeholder="请输入面宽" v-model="model.faceWidth" type="text"></u-input>
							</view>
							<text>m</text>
						</view>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="层高" prop="storeyHeight">
						<view style="display: flex;">
							<view style="width: 98%;">
								<u-input :border="border" placeholder="请输入层高" v-model="model.storeyHeight" type="text"></u-input>
							</view>
							<text>m</text>
						</view>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="电费" prop="electricity">
						<view style="display: flex;">
							<view style="width: 98%;">
								<u-input :border="border" placeholder="请输入电费" v-model="model.electricity" type="text"></u-input>
							</view>
							<text>元</text>
						</view>
					</u-form-item>
					<u-form-item :label-position="labelPosition" label="是否临街" prop="isFrontage" label-width="150" color="#a0cfff">
						<u-input :border="border" type="select" :select-open="selectShow5" v-model="model.isFrontage" placeholder="请选择是否临街"
						 @click="selectShow5 = true"></u-input>
					</u-form-item>
					<u-form-item :label-position="labelPosition" label="经营状态" prop="manageState" label-width="150" color="#a0cfff">
						<u-input :border="border" type="select" :select-open="selectShow6" v-model="model.manageState" placeholder="请选择经营状态"
						 @click="selectShow6 = true"></u-input>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="售价" prop="price">
						<view style="display: flex;">
							<view style="width: 95%;">
								<u-input :border="border" placeholder="请输入售价" v-model="model.price" type="text"></u-input>
							</view>
							<text>万</text>
						</view>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="卖点" prop="sellingPoint">
						<u-input :border="border" placeholder="请输入出租卖点" v-model="model.sellingPoint" type="textarea" height="150"></u-input>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="服务介绍" prop="service">
						<u-input :border="border" placeholder="请输入出租服务介绍" v-model="model.service" type="textarea" height="150"></u-input>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="商铺配套" prop="facility">
						<u-checkbox-group @change="checkboxGroupChange">
							<u-checkbox @change="checkboxChange" v-model="item.checked" v-for="(item, index) in list" :key="index" :name="item.name">{{item.name}}</u-checkbox>
						</u-checkbox-group>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="客流人群" prop="trafficCrowds">
						<u-checkbox-group @change="checkboxGroupChange">
							<u-checkbox @change="checkboxChange" v-model="item.checked" v-for="(item, index) in list2" :key="index" :name="item.name">{{item.name}}</u-checkbox>
						</u-checkbox-group>
					</u-form-item>
					<u-form-item :label-position="labelPosition" label="上传图片" prop="photo" label-width="150">
						<u-upload width="160" height="160" action="#" ref="uUpload" :auto-upload="false" :before-upload="beforeUpload"
						 max-count=9 :max-size="1 * 1024 * 1024" @on-choose-complete="uploadImage"></u-upload>
					</u-form-item>
					<u-form-item :label-position="labelPosition" label="上传视频" prop="video" label-width="150">
						<uploadvideo :dataList="dataList" types="video" @successImage="successImage" @successVideo="successvideo"
						 @getPath="getPath" />
					</u-form-item>
				</u-form>
				<u-select mode="mutil-column-auto" :list="selectList" v-model="selectShow" @confirm="Confirm"></u-select>
				<u-select mode="single-column" :list="selectList1" v-model="selectShow1" @confirm="selectConfirm1"></u-select>
				<u-select mode="single-column" :list="selectList3" v-model="selectShow3" @confirm="selectConfirm3"></u-select>
				<u-select mode="single-column" :list="selectList4" v-model="selectShow4" @confirm="selectConfirm4"></u-select>
				<u-select mode="single-column" :list="selectList5" v-model="selectShow5" @confirm="selectConfirm5"></u-select>
				<u-select mode="single-column" :list="selectList6" v-model="selectShow6" @confirm="selectConfirm6"></u-select>
			</view>
			<view class="public">
				<u-button type="primary" @click="addOffice" throttle-time=3000>立即发布</u-button>
			</view>
		</view>
		<view class="" v-else>
			<uSearch :dictArr="wArr" @selectIndexValue="getVal" ref="usearch" @getid="getid" @cancel="cancel"></uSearch>
			<view class="bottom-nav">
				<u-button type="primary" @click="addEstate" >添加楼盘(如未搜索出添加即可)</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import uploadvideo from '@/pages/components/easy-upload.vue'
	import uSearch from '@/pages/house/common/userzero-search.vue'
	import { addShopSecondHandByBroker } from '@/util/house/shop.js'
	import {
		findAllEstateByCity
	} from '@/util/house/estate.js'
	export default {
		data() {
			return {
				showview: true,
				wArr: [],
				model: {
					address: '',
					title: '',
					shopName: '',
					applicableIndustry: '',
					floorType: '',
					floor: '',
					floor1: '', //第几层
					floor2: '', //共几层
					floor3: '', //共几层
					floors: [],
					floorTypeId: '',
					estateId: '',
				    electricity:'',
					storeyHeight:'',
					shopType: '',
					shopTypeId: '',
					shopProperty: '',
					shopPropertyId: '',
					square: '',
					isFrontage: '',
					isFrontageId: '',
					depth: '',
					faceWidth: '',
					manageState: '',
					manageStateId:'',
					depositOrpayment: '',
					facility: [],
					trafficCrowds: [],
					price: '',
					sellingPoint: '',
					service: '',
					photo: [],
					images: [],
					video: '',
					videoCallback: '',
				},
				rules: {
					title: [{
						required: true,
						message: '请输入标题',
						trigger: 'blur',
					}],
					shopName: [{
						required: true,
						message: '请输入商铺名称',
						trigger: 'blur',
					}],
					square: [{
							required: true,
							message: '请输入面积',
							trigger: 'blur'
						},
						{
							type: 'number',
							message: '只能为数字',
							trigger: ['change', 'blur'],
						}
					],
					depth: [{
							required: true,
							message: '请输入进深',
							trigger: 'blur'
						},
						{
							type: 'number',
							message: '只能为数字',
							trigger: ['change', 'blur'],
						}
					],
					price: [{
							required: true,
							message: '请输入租金',
							trigger: 'blur'
						},
						{
							type: 'number',
							message: '只能为数字',
							trigger: ['change', 'blur'],
						}
					],
					officeType: [{
						required: true,
						message: '请选择楼层类型',
						trigger: 'change',
					}],
					address: [{
						required: true,
						message: '请选择楼地址',
						trigger: 'change',
					}],

				},
				border: true,
				labelPosition: 'top',
				errorType: ['message'],
				selectShow: false,
				selectShow1: false,
				selectShow3: false,
				selectShow4: false,
				selectShow5: false,
				selectShow6: false,
				selectShow8: false,
				selectShow9: false,
				list: [{
						name: '宽带',
						checked: false,
						disabled: false
					},
					{

						name: '有线电视',
						checked: false,
						disabled: false
					},
					{

						name: '水',
						checked: false,
						disabled: false
					},
					{

						name: '电 ',
						checked: false,
						disabled: false
					},
					{

						name: '电话',
						checked: false,
						disabled: false
					},
					{

						name: '中央空调',
						checked: false,
						disabled: false
					},
					{

						name: '电梯',
						checked: false,
						disabled: false
					},
					{

						name: '暖气',
						checked: false,
						disabled: false
					},
					{

						name: '集中供暖',
						checked: false,
						disabled: false
					},
					{

						name: '办公家具',
						checked: false,
						disabled: false
					},
					{

						name: '免费车位',
						checked: false,
						disabled: false
					},

					{

						name: '员工餐厅',
						checked: false,
						disabled: false
					},
					{

						name: '安全监控',
						checked: false,
						disabled: false
					},
				],
				list1: [{
						value: '1',
						name: '单层',
						disabled: false
					},
					{
						value: '0',
						name: '独栋',
						disabled: false
					},
				],
				list2: [{
						name: '学生',
						checked: false,
						disabled: false
					},
					{
						name: '居民',
						checked: false,
						disabled: false
					},
					{
						name: '其他',
						checked: false,
						disabled: false
					},
				],
				selectList: [],
				selectList1: [],
				selectList3: [{
						value: '1',
						label: '商业街店铺'
					},
					{
						value: '2',
						label: '写字楼配套'
					},
					{
						value: '3',
						label: '社区底商'
					},
					{
						value: '4',
						label: '临街门面'
					},
					{
						value: '5',
						label: '档口摊位'
					},
					{
						value: '6',
						label: '购物百货中心'
					},
					{
						value: '7',
						label: '其他'
					},
				],
				selectList4: [{
						value: '1',
						label: '商铺新房 '
					},
					{
						value: '2',
						label: '二手商铺'
					},
				],
				selectList5: [{
						value: '1',
						label: '是'
					},
					{
						value: '0',
						label: '否'
					},
				],
				selectList6: [{
						value: '1',
						label: '经营中'
					},
					{
						value: '2',
						label: '空置中'
					},
				],
				selectList7: [],
				
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad() {
			this.city = this.$store.state.city
			this.getlist()
			this.getEstate()
			console.log(uni.getStorageSync('token'))
		},
		components: {
			uploadvideo,
			uSearch
		},
		methods: {
			addOffice() {
				if (this.model.floorTypeId === 1) {
					this.model.floors.push(this.model.floor1)
					this.model.floors.push(this.model.floor2)
				} else {
					this.model.floors.push(this.model.floor3)
				}
				console.log(this.model.floors)
				this.$refs.uForm.validate(valid => {
					if (valid) {
						uni.showLoading({
							title: '发布中...'
						})
						if (this.model.video === '') {
							for (let i = 0; i <= this.model.photo.length; i++) {
								uni.uploadFile({
									url: 'http://192.168.3.9:8080/sys/uploadImgFile',
									method: 'POST', // 可用可不用
									filePath: this.model.photo[i],
									header: {
										"Content-Type": "multipart/form-data",
										"authorization": uni.getStorageSync('token'),
									},
									name: 'file', // 服务器定义key字段名称
									success: (res) => {
										console.log(res)
										var ob = JSON.parse(res.data);
										console.log(ob)
										this.model.images.push(ob.data)
										console.log(this.model.images)
										if (i === this.model.photo.length - 1) {
											console.log("======================")
											addShopSecondHandByBroker({
												"area": this.$store.state.district, //区域
												"decoration": this.model.decorationId, //装修
												"applicableIndustry": this.model.applicableIndustry, //适合行业
												"estateId": this.model.estateId, //楼盘ID
												"facility": this.model.facility, //配套设施
												"floorType": this.model.floorTypeId, //楼层类型
												"floors": this.model.floors, //商铺楼层
												"generalize": '', //房源详情
												"imgFiles": this.model.images, //多张图片
												"depth": this.model.depth, //进深
												"electricity": this.model.electricity, //电费
												"faceWidth": this.model.faceWidth,
												"labels": ['啊啊'], //房源标签
												"isFrontage": this.model.isFrontageId, //是否临街
												"manageState": this.model.manageStateId, //经营状态
												"shopProperty": this.model.shopPropertyId,//性质
												"shopName": this.model.shopName, //商铺名称
												"shopType": this.model.shopTypeId, //商铺类型
												"price": this.model.price, //售价
												"propertyFee": '', //物业费
												"trafficCrowds": this.model.trafficCrowds, //客流人群
												"surroundingTraffic":'',
												"waterRates":'',//水费
												"storeyHeight": this.model.storeyHeight,//层高
												"sellingPoint": this.model.sellingPoint, //卖点
												"service": this.model.service, //服务介绍
												"square": this.model.square, //面积
												"title": this.model.title, //标题
												"videoFile": '', //单个视频
											}).then(res => {
												uni.hideLoading()
												console.log(res)
											}).catch(err => {
												console.log(err)
											})
										}
									},
								})
							}
						} else {
							// 1.调用上传图片，循环调用用接口
							for (let i = 0; i <= this.model.photo.length; i++) {
								uni.uploadFile({
									url: 'http://192.168.3.9:8080/sys/uploadImgFile',
									method: 'POST', // 可用可不用
									filePath: this.model.photo[i],
									header: {
										"Content-Type": "multipart/form-data",
										"authorization": uni.getStorageSync('token'),
									},
									name: 'file', // 服务器定义key字段名称
									success: (res) => {
										console.log(res)
										var ob = JSON.parse(res.data);
										console.log(ob)
										this.model.images.push(ob.data)
										console.log(this.model.images)
									},
									fail: function() {
										console.log('接口调用失败')
									}
								})
							}
							// 2.先调用上传视频接口
							uni.uploadFile({
								url: 'http://192.168.3.9:8080/sys/uploadVideoFile',
								method: 'POST', // 可用可不用
								filePath: this.model.video,
								header: {
									"Content-Type": "multipart/form-data",
									"authorization": uni.getStorageSync('token'),
								},
								name: 'file', // 服务器定义key字段名称
								success: (res) => {
									console.log('视频上传成功');
									console.log(res);
									let data = JSON.parse(res.data)
									this.model.videoCallback = data.data
									// 3.最后调用上传所有房源基本信息接口
									addShopSecondHandByBroker({
										"area": this.$store.state.district, //区域
										"decoration": this.model.decorationId, //装修
										"applicableIndustry": this.model.applicableIndustry, //适合行业
										"estateId": this.model.estateId, //楼盘ID
										"facility": this.model.facility, //配套设施
										"floorType": this.model.floorTypeId, //楼层类型
										"floors": this.model.floors, //商铺楼层
										"generalize": '', //房源详情
										"imgFiles": this.model.images, //多张图片
										"depth": this.model.depth, //进深
										"electricity": this.model.electricity, //电费
										"faceWidth": this.model.faceWidth,
										"labels": ['啊啊'], //房源标签
										"isFrontage": this.model.isFrontageId, //是否临街
										"manageState": this.model.manageStateId, //经营状态
										"shopProperty": this.model.shopPropertyId,//性质
										"shopName": this.model.shopName, //商铺名称
										"shopType": this.model.shopTypeId, //商铺类型
										"price": this.model.price, //售价
										"propertyFee": '', //物业费
										"trafficCrowds": this.model.trafficCrowds, //客流人群
										"surroundingTraffic":'',
										"waterRates":'',//水费
										"storeyHeight": this.model.storeyHeight,//层高
										"sellingPoint": this.model.sellingPoint, //卖点
										"service": this.model.service, //服务介绍
										"square": this.model.square, //面积
										"title": this.model.title, //标题
										"videoFile": this.model.videoCallback, //单个视频
									}).then(res => {
										uni.hideLoading()
										console.log(res)
									}).catch(err => {
										console.log(err)
									})
								},
								fail: function() {
									console.log('接口调用失败')
								}
							})
						}
					}
				})
			},
			// 获取视频临时路径
			getPath(e) {
				this.model.video = e;
			},
			// 前往添加地址
			Toaddress() {
				this.showview = false
			},
			// 取消
			cancel() {
				this.showview = true
			},
			getid(e) {
				console.log(e)
				this.model.estateId = e;
			},
			getVal(val) {
				this.showview = true
				this.model.address = val.lable
			},
			// 获取城市楼盘接口
			getEstate() {
				findAllEstateByCity({
					"cityName": this.$store.state.city,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						this.wArr = res.data.data
					} else {
						console.log("获取失败")
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 添加楼盘
			addEstate() {
				uni.navigateTo({
					url: '../addEstate/addEstate'
				})
			},
			// 上传图片
			uploadImage() {
				let files = [];
				var object = {}
				files = this.$refs.uUpload.lists;
				for (var i = 0; i < files.length; i++) {
					object = files[i].url
					this.model.photo.push(object)
				}
				console.log(this.model.photo);
			},
			// 选择楼层类型
			radioChange(e) {
				if (e === '单层') {
					this.selectShow = true
					this.model.floorTypeId = 1
				} else {
					this.selectShow1 = true
					this.model.floorTypeId = 2
				}
			},
			// 获取楼层数
			getlist() {
				for (let i = 0; i < 100; i++) {
					let ob = {
						value: i,
						label: '第' + i + '层',
						children: []
					}
					this.selectList.push(ob)
					for (let j = i; j < 100; j++) {
						let ob1 = {
							value: j,
							label: '共' + j + '层',
						}
						this.selectList[i].children.push(ob1)
					}
				}
				for (let k = 0; k < 100; k++) {
					let ob2 = {
						value: k,
						label: '共' + k + '层',
					}
					this.selectList1.push(ob2)
				}
			},
			// 多选框回调
			checkboxChange() {},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				this.model.facility = e
				console.log(e);
			},
			// 全选
			checkedAll() {
				this.list.map(val => {
					val.checked = true;
				})
			},
			// 选择楼层回调
			Confirm(e) {
				console.log(e)
				this.model.floor = '';
				this.model.floor1 = e[0].label;
				this.model.floor2 = e[1].label;
				e.map((val, index) => {
					this.model.floor += this.model.floor == '' ? val.label : '/' + val.label;
				})
			},
			selectConfirm1(e) {
				this.model.floor = '';
				this.model.floor3 = e[0].label;
				e.map((val, index) => {
					this.model.floor += this.model.floor == '' ? val.label : '/' + val.label;
				})
			},
			// 选择商铺类型回调
			selectConfirm3(e) {
				this.model.shopType = '';
				this.model.shopTypeId = e[0].value;
				e.map((val, index) => {
					this.model.shopType += this.model.shopType == '' ? val.label : '/' + val.label;
					// this.model.houseTypeId = e[index].value
				})
			},
			// 选择商铺性质回调
			selectConfirm4(e) {
				this.model.shopProperty = '';
				this.model.shopPropertyId = e[0].value;
				e.map((val, index) => {
					this.model.shopProperty += this.model.shopProperty == '' ? val.label : '/' + val.label;
					// this.model.houseTypeId = e[index].value
				})
			},
			// 选择商铺是否临街回调
			selectConfirm5(e) {
				this.model.isFrontage = '';
				this.model.isFrontageId = e[0].value;
				e.map((val, index) => {
					this.model.isFrontage += this.model.isFrontage == '' ? val.label : '/' + val.label;
					// this.model.houseTypeId = e[index].value
				})
			},
			// 选择商铺是否可注册回调
			selectConfirm6(e) {
				this.model.manageState = '';
				this.model.manageStateId = e[0].value;
				e.map((val, index) => {
					this.model.manageState += this.model.manageState == '' ? val.label : '/' + val.label;
					// this.model.houseTypeId = e[index].value
				})
			},
		}
	}
</script>

<style lang="scss">
	.content {
		height: calc(100% - 89px);
		margin-bottom: 49px;
	}

	.public {
		position: fixed;
		left: 0;
		width: 100%;
		bottom: 0;
		height: 49px;
		z-index: 9999;
		border-top: #e5e5e5 solid 1px;
		box-sizing: content-box;
		background-color: #F3F3F3;
	}

	.bottom-nav {
		height: 45px;
		background: #FFFFFF;
		border-top: 3rpx solid #F1F1F1;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		text-align: center;
	}
</style>
