<template>
	<view>
		<view class="content" v-if="showview">
			<view style="padding: 10rpx;">
				<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
					<u-form-item :leftIconStyle="{color: '#888', fsontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="地址" prop="address">
						<u-input :border="border" placeholder="请输入楼盘名称地址" v-model="model.address" type="select" @click="Toaddress"></u-input>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="标题" prop="title">
						<u-input :border="border" placeholder="请输入出租标题" v-model="model.title" type="text"></u-input>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="写字楼名称" prop="officeName">
						<u-input :border="border" placeholder="请输入写字楼名称" v-model="model.officeName" type="text"></u-input>
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
					<u-form-item :label-position="labelPosition" label="选择装修" prop="decoration" label-width="150" color="#a0cfff">
						<u-input :border="border" type="select" :select-open="selectShow2" v-model="model.decoration" placeholder="请选择装修"
						 @click="selectShow2 = true"></u-input>
					</u-form-item>
					<u-form-item :label-position="labelPosition" label="写字楼类型" prop="officeType" label-width="150" color="#a0cfff">
						<u-input :border="border" type="select" :select-open="selectShow3" v-model="model.officeType" placeholder="请选择写字楼类型"
						 @click="selectShow3 = true"></u-input>
					</u-form-item>
					<u-form-item :label-position="labelPosition" label="性质" prop="officeProperty" label-width="150" color="#a0cfff">
						<u-input :border="border" type="select" :select-open="selectShow4" v-model="model.officeProperty" placeholder="请选择写字楼类型"
						 @click="selectShow4 = true"></u-input>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="面积" prop="square">
						<u-input :border="border" placeholder="请输入面积" v-model="model.square" type="text"></u-input>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="得房率" prop="houseEfficient">
						<view style="display: flex;">
							<view style="width: 98%;">
								<u-input :border="border" placeholder="请输入得房率" v-model="model.houseEfficient" type="text"></u-input>
							</view>
							<text>%</text>
						</view>
					</u-form-item>
					<u-form-item :label-position="labelPosition" label="是否分割" prop="isPartition" label-width="150" color="#a0cfff">
						<u-input :border="border" type="select" :select-open="selectShow5" v-model="model.isPartition" placeholder="请选择是否分割"
						 @click="selectShow5 = true"></u-input>
					</u-form-item>
					<u-form-item :label-position="labelPosition" label="是否注册" prop="isRegisterCompany" label-width="150" color="#a0cfff">
						<u-input :border="border" type="select" :select-open="selectShow6" v-model="model.isRegisterCompany" placeholder="请选择是否注册"
						 @click="selectShow6 = true"></u-input>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="租金单位" prop="moneyUnit ">
						<u-input :border="border" type="select" :select-open="Showprice" v-model="model.moneyUnit" placeholder="请选择租金单位"
						 @click="Showprice = true"></u-input>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="租金" prop="price">
						<view style="display: flex;">
							<view style="width: 80%;">
								<u-input :border="border" placeholder="请输入租金" v-model="model.price" type="text"></u-input>
							</view>
							<text>{{model.moneyUnit}}</text>
						</view>
					</u-form-item>
					<u-form-item :label-position="labelPosition" label="联系电话" prop="phone" label-width="150">
						<u-input type="text" :border="border" placeholder="请输入联系人电话" v-model="model.phone" />
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="起租期" prop="startMonth ">
						<u-input :border="border" type="select" :select-open="selectShow7" v-model="model.startMonth" placeholder="请选择起租期"
						 @click="selectShow7 = true"></u-input>
					</u-form-item>
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
					 label="免租期" prop="rentFreeMonth ">
						<u-input :border="border" type="select" :select-open="selectShow8" v-model="model.rentFreeMonth" placeholder="请选择免租期"
						 @click="selectShow8 = true"></u-input>
					</u-form-item>
					<u-form-item :label-position="labelPosition" label="押金方式" prop="depositOrpayment" label-width="150" color="#a0cfff">
						<u-input :border="border" type="select" :select-open="selectShow9" v-model="model.depositOrpayment" placeholder="请选择押金方式"
						 @click="selectShow9 = true"></u-input>
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
					 label="写字楼配套" prop="facility">
						<u-checkbox-group @change="checkboxGroupChange">
							<u-checkbox @change="checkboxChange" v-model="item.checked" v-for="(item, index) in list" :key="index" :name="item.name">{{item.name}}</u-checkbox>
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
				<u-select mode="single-column" :list="selectList2" v-model="selectShow2" @confirm="selectConfirm2"></u-select>
				<u-select mode="single-column" :list="selectList3" v-model="selectShow3" @confirm="selectConfirm3"></u-select>
				<u-select mode="single-column" :list="selectList4" v-model="selectShow4" @confirm="selectConfirm4"></u-select>
				<u-select mode="single-column" :list="selectList5" v-model="selectShow5" @confirm="selectConfirm5"></u-select>
				<u-select mode="single-column" :list="selectList6" v-model="selectShow6" @confirm="selectConfirm6"></u-select>
				<u-select mode="single-column" :list="selectList7" v-model="selectShow7" @confirm="selectConfirm7"></u-select>
				<u-select mode="single-column" :list="selectList7" v-model="selectShow8" @confirm="selectConfirm8"></u-select>
				<u-select mode="single-column" :list="selectList9" v-model="selectShow9" @confirm="selectConfirm9"></u-select>
				<u-select mode="single-column" :list="priceList" v-model="Showprice" @confirm="selectConfirm10"></u-select>
				<u-toast ref="uToast" />
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
	import uSearch from '@/pageA/house/common/userzero-search.vue'
	import {
		addOfficeLeaseByBroker
	} from '@/util/house/office.js'

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
					officeName: '',
					floorType: '',
					floor: '',
					floor1: '', //第几层
					floor2: '', //共几层
					floor3: '', //共几层
					floors: [],
					floorTypeId: '',
					estateId: '',
					decoration: '',
					decorationId: '',
					officeType: '',
					officeTypeId: '',
					officeProperty: '',
					officePropertyId: '',
					square: '',
					isPartition: '',
					isPartitionId: '',
					houseEfficient: '',
					isRegisterCompany: '',
					startMonth: '',
					rentFreeMonth: '',
					rentFreeMonthId: '',
					depositOrpayment: '',
					deposit: '',
					payment: '',
					facility: [],
					moneyUnit: '',
					moneyUnitId: '',
					price: '',
					sellingPoint: '',
					service: '',
					photo: [],
					phone:'',
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
					officeName: [{
						required: true,
						message: '请输入写字楼名称',
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
					houseEfficient: [{
							required: true,
							message: '请输入得房率',
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
				selectShow2: false,
				selectShow3: false,
				selectShow4: false,
				selectShow5: false,
				selectShow6: false,
				selectShow7: false,
				selectShow8: false,
				selectShow9: false,
				Showprice: false,
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
				selectList: [],
				selectList1: [],
				selectList2: [{
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
				selectList3: [{
						value: '1',
						label: '纯写字楼'
					},
					{
						value: '2',
						label: '商业综合体'
					},
					{
						value: '3',
						label: '商务公寓'
					},
					{
						value: '4',
						label: '商务酒店'
					},
				],
				selectList4: [{
						value: '1',
						label: '新房 '
					},
					{
						value: '2',
						label: '二手房'
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
						label: '是'
					},
					{
						value: '0',
						label: '否'
					},
				],
				selectList7: [],
				selectList9: [{
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
				priceList: [{
						value: '1',
						label: '元/m²/天'
					},
					{
						value: '2',
						label: '元/月'
					},
					{
						value: '3',
						label: '元/m²/月'
					},
				]
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad() {
			this.city = this.$store.state.city
			this.getlist()
			this.getmonth()
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
											addOfficeLeaseByBroker({
												"area": this.$store.state.district, //区域
												"decoration": this.model.decorationId, //装修
												"deposit": this.model.deposit, //押金数
												"estateId": this.model.estateId, //楼盘ID
												"facility": this.model.facility, //配套设施
												"floorType": this.model.floorTypeId, //楼层类型
												"floors": this.model.floors, //写字楼楼层
												"generalize": '', //房源详情
												"houseEfficient": this.model.houseEfficient, //得房率(%)
												"imgFiles": this.model.images, //多张图片
												"isPartition": this.model.isPartitionId, //可分割
												"isRegisterCompany": this.model.isRegisterCompanyId, //可注册公司 
												"labels": ['啊啊'], //房源标签
												"moneyUnit": this.model.moneyUnitId, //租金单位
												"officeName": this.model.officeName, //写字楼名称
												"officeProperty": this.model.officePropertyId, //写字楼性质
												"officeType": this.model.officeTypeId, //写字楼类型
												"payment": this.model.payment, //付款数
												"price": this.model.price, //租金
												"propertyFee": '', //物业费
												"phone": this.model.phone,
												"rentFreeMonth": this.model.rentFreeMonthId, //免租期
												"sellingPoint": this.model.sellingPoint, //卖点
												"service": this.model.service, //服务介绍
												"square": this.model.square, //面积
												"startMonth": this.model.startMonthId, //起租期
												"title": this.model.title, //标题
												"videoFile": '', //单个视频
											}).then(res => {
												console.log(res)
												if (res.data.code === 0) {
													setTimeout(() => {
														uni.hideLoading()
														uni.reLaunch({
															url: '/pageA/house/mypage/agentPublic/myOfficePublicList/myOfficePublicList'
														})
													}, 1500);
												} else {
													this.$refs.uToast.show({
														title: '系统错误，请重新发布',
														type: 'error',
													})
												}
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
									addOfficeLeaseByBroker({
										"area": this.$store.state.district, //区域
										"decoration": this.model.decorationId, //装修
										"deposit": this.model.deposit, //押金数
										"estateId": this.model.estateId, //楼盘ID
										"facility": this.model.facility, //配套设施
										"floorType": this.model.floorTypeId, //楼层类型
										"floors": this.model.floors, //写字楼楼层
										"generalize": '', //房源详情
										"houseEfficient": this.model.houseEfficient, //得房率(%)
										"imgFiles": this.model.images, //多张图片
										"isPartition": this.model.isPartitionId, //可分割
										"isRegisterCompany": this.model.isRegisterCompanyId, //可注册公司 
										"labels": ['啊啊'], //房源标签
										"moneyUnit": this.model.moneyUnitId, //租金单位
										"officeName": this.model.officeName, //写字楼名称
										"officeProperty": this.model.officePropertyId, //写字楼性质
										"officeType": this.model.officeTypeId, //写字楼类型
										"payment": this.model.payment, //付款数
										"price": this.model.price, //租金
										"propertyFee": '', //物业费
										"phone": this.model.phone,
										"rentFreeMonth": this.model.rentFreeMonthId, //免租期
										"sellingPoint": this.model.sellingPoint, //卖点
										"service": this.model.service, //服务介绍
										"square": this.model.square, //面积
										"startMonth": this.model.startMonthId, //起租期
										"title": this.model.title, //标题
										"videoFile": this.model.videoCallback, //单个视频
									}).then(res => {
										console.log(res)
										if (res.data.code === 0) {
											setTimeout(() => {
												uni.hideLoading()
												uni.reLaunch({
													url: '/pageA/house/mypage/agentPublic/myOfficePublicList/myOfficePublicList'
												})
											}, 1500);
										} else {
											this.$refs.uToast.show({
												title: '系统错误，请重新发布',
												type: 'error',
											})
										}
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
				// console.log(e)
				// this.model.estateId = e;
			},
			getVal(val) {
				this.showview = true
				this.model.address = val.lable
				this.model.estateId = val.value;
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
			// 获取月份
			getmonth() {
				for (let h = 0; h < 100; h++) {
					let ob3 = {
						value: h,
						label: h + '个月',
					}
					this.selectList7.push(ob3)
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
			// 选择装修会调
			selectConfirm2(e) {
				this.model.decorationId = e[0].value;
				this.model.decoration = '';
				e.map((val, index) => {
					this.model.decoration += this.model.decoration == '' ? val.label : '/' + val.label;
					// this.model.houseTypeId = e[index].value
				})
			},
			// 选择写字楼类型回调
			selectConfirm3(e) {
				this.model.officeType = '';
				this.model.officeTypeId = e[0].value;
				e.map((val, index) => {
					this.model.officeType += this.model.officeType == '' ? val.label : '/' + val.label;
					// this.model.houseTypeId = e[index].value
				})
			},
			// 选择写字楼性质回调
			selectConfirm4(e) {
				this.model.officeProperty = '';
				this.model.officePropertyId = e[0].value;
				e.map((val, index) => {
					this.model.officeProperty += this.model.officeProperty == '' ? val.label : '/' + val.label;
					// this.model.houseTypeId = e[index].value
				})
			},
			// 选择写字楼是否可分割回调
			selectConfirm5(e) {
				this.model.isPartition = '';
				this.model.isPartitionId = e[0].value;
				e.map((val, index) => {
					this.model.isPartition += this.model.isPartition == '' ? val.label : '/' + val.label;
					// this.model.houseTypeId = e[index].value
				})
			},
			// 选择写字楼是否可注册回调
			selectConfirm6(e) {
				this.model.isRegisterCompany = '';
				this.model.isRegisterCompanyId = e[0].value;
				e.map((val, index) => {
					this.model.isRegisterCompany += this.model.isRegisterCompany == '' ? val.label : '/' + val.label;
					// this.model.houseTypeId = e[index].value
				})
			},
			// 选择写字楼起租期回调
			selectConfirm7(e) {
				this.model.startMonthId = e[0].value;
				this.model.startMonth = '';
				e.map((val, index) => {
					this.model.startMonth += this.model.startMonth == '' ? val.label : '/' + val.label;
					// this.model.houseTypeId = e[index].value
				})
			},
			// 选择写字楼免租期回调
			selectConfirm8(e) {
				console.log(e)
				this.model.rentFreeMonth = '';
				this.model.rentFreeMonthId = e[0].value;
				e.map((val, index) => {
					this.model.rentFreeMonth += this.model.rentFreeMonth == '' ? val.label : '/' + val.label;
					// this.model.houseTypeId = e[index].value
				})
			},
			// 选择写字楼压几付几回调
			selectConfirm9(e) {
				this.model.depositOrpayment = '';
				e.map((val, index) => {
					this.model.depositOrpayment += this.model.depositOrpayment == '' ? val.label : '/' + val.label;
				})
				console.log(e)
				if (e[0].value === '0') {
					this.model.deposit = 1;
					this.model.payment = 1;
				} else if (e[0].value === '1') {
					this.model.deposit = 1;
					this.model.payment = 2;
				} else if (e[0].value === '2') {
					this.model.deposit = 2;
					this.model.payment = 1;
				} else if (e[0].value === '3') {
					this.model.deposit = 2;
					this.model.payment = 2;
				} else if (e[0].value === '4') {
					this.model.deposit = 1;
					this.model.payment = 3;
				} else if (e[0].value === '5') {
					this.model.deposit = 3;
					this.model.payment = 1;
				} else if (e[0].value === '6') {
					this.model.deposit = 2;
					this.model.payment = 3;
				} else if (e[0].value === '7') {
					this.model.payment = 6;
				} else if (e[0].value === '8') {
					this.model.payment = 12;
				} else if (e[0].value === '9') {
					this.model.deposit = 1;
					this.model.payment = 12;
				}
				console.log(this.model.deposit)
			},
			// 选择写字楼租金单位回调
			selectConfirm10(e) {
				this.model.moneyUnit = '';
				this.model.moneyUnitId = e[0].value;
				e.map((val, index) => {
					this.model.moneyUnit += this.model.moneyUnit == '' ? val.label : '/' + val.label;
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
