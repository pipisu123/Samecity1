<template>
	<view>
		<view class="searchbar">
			<view class="address">
				<view>
					<u-icon name="map"></u-icon>
				</view>
				<!-- 在html中用变量直接用两个大括号包着变量就行了 -->
				<text>{{city}}</text>
			</view>
			<view class="seach">
				<u-search placeholder="你想住哪里？" @search="search1" v-model="content" @custom="custom"></u-search>
			</view>
		</view>
		<view class="center-bar">
			<Dropdown :itemArr="itemArr" :listArr="listArr" @SelectMore="show5 = true" @subItemClick="subItemClick" @itemClick="itemClick"></Dropdown>
			<u-popup v-model="show5" width=600>
				<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
				 label="电梯" prop="cou">
					<u-radio-group v-model="value" @change="radioGroupChange">
						<u-radio @change="radioGroupChange" v-for="(item, index) in list1" :key="index" :name="item.name" :disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
				 label="朝向" prop="cour">
					<u-radio-group v-model="value" @change="radioGroupChange1">
						<u-radio @change="radioGroupChange1" v-for="(item, index) in list" :key="index" :name="item.name" :disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
				 label="租房类型" prop="court">
					<u-radio-group v-model="value" @change="radioGroupChange2">
						<u-radio @change="radioGroupChange2" v-for="(item, index) in list2" :key="index" :name="item.name" :disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<view class="bottom-nav">
					<view style="width: 50%;text-align: center;background-color: #F3F3F3;line-height: 49px;" @click="Cancel"><text>取消</text></view>
					<view style="width: 50%;color: #FFFFFF;text-align: center; background-color: #5785E5;line-height: 49px;" @click="Confirm">确定</view>
				</view>
			</u-popup>
		</view>
		<housing :houseList="houseList"></housing>
	</view>
</template>

<script>
	import housing from '../rent/housing.vue'
	import Dropdown from '@/pageA/house/common/dropdown-screen.vue'
	import {
		leaseQuery
	} from '@/util/house/searchHouse.js'
	import {
		getAreaComboBoxListByCity
	} from '@/util/house/area.js'
	export default {
		data() {
			return {
				listArr: ['区域', '价格', '户型'],
				itemArr: [
					[{
							label: '不限',
							value: 0,
						},
						{
							label: '0-500元',
							value: 1,
						},
						{
							label: '500-1000/元',
							value: 2,
						},
						{
							label: '1000-2000/元',
							value: 3,
						},
						{
							label: '2000-3000/元',
							value: 4,
						},
						{
							label: '3000-4000/元',
							value: 5,
						},
						{
							label: '5000以上',
							value: 6,
						},
					],
					[{
						label: '一室',
						value: 1,
					},
					{
						label: '二室',
						value: 2,
					},
					{
						label: '三室',
						value: 3,
					},
					{
						label: '四室',
						value: 4,
					},
					{
						label: '五室以上',
						value: 5,
					},],
				],
				currentIndex:'',
				city: '',
				houseList: [],
				content: '',
				value1: 1,
				value2: 2,
				value3: 3,
				value4: 4,
				show5: false,
				page:1,
				limit:10,
				hasMore:true,
				search: {
					elevator: '',
					orientation: '',
					leaseType: '',
					identityType: ''
				},
				list1: [{
						value: '1',
						name: '有',
						disabled: false
					},
					{
						value: '0',
						name: '没',
						disabled: false
					},
				],
				list: [{
						name: '东',
						checked: false,
						disabled: false
					},
					{

						name: '南',
						checked: false,
						disabled: false
					},
					{

						name: '西',
						checked: false,
						disabled: false
					},
					{

						name: '北',
						checked: false,
						disabled: false
					},
					{

						name: '南北',
						checked: false,
						disabled: false
					},
					{

						name: '东西',
						checked: false,
						disabled: false
					},
					{

						name: '东南',
						checked: false,
						disabled: false
					},
					{

						name: '西南',
						checked: false,
						disabled: false
					},
					{

						name: '东北',
						checked: false,
						disabled: false
					},
					{

						name: '西北',
						checked: false,
						disabled: false
					},
				],
				list2: [{
						value: '0',
						name: '是',
						disabled: false
					},
					{
						value: '1',
						name: '否',
						disabled: false
					},
				],
				list3: [{
						value: '1',
						name: '整租',
						disabled: false
					},
					{
						value: '2',
						name: '合租',
						disabled: false
					},
				],
				list4: [{
						value: '1',
						name: '个人',
						disabled: false
					},
					{
						value: '2',
						name: '经纪人',
						disabled: false
					},
				],
			}
		},
		onLoad() {
			this.city = uni.getStorageSync('city');
			this.gethouseList()
			getAreaComboBoxListByCity({
				"city": uni.getStorageSync('city')
			}).then(res => {
				console.log(res)
				this.itemArr.unshift(res.data.data)
				console.log(this.itemArr)
			}).catch(err => {
				console.log(err)
			})
		},
		components: {
			housing,
			Dropdown
		},
		onReachBottom() {
			if(this.hasMore){
				uni.showLoading({
					title:'正在加载中...'
				})
				this.page += 1;
				leaseQuery({
					"city": this.city,
					"limit": this.limit,
					"page": this.page,
				}).then(res => {
					console.log(res)
					if(res.data.code === 0){
						uni.hideLoading()
						if(res.data.data.length===0){
							 this.hasMore = false;
							 return;
						}
						  this.houseList= this.houseList.concat(res.data.data)
					}else{
						console.log("加载失败")
					}
				}).catch(err => {
					console.log(err)
				})
			}
		},
		methods: {
			// 下拉那个菜单
			itemClick(index){
				this.currentIndex = index
			},
			// 选择下拉回调
			subItemClick(e){
				console.log(e)
				if(this.currentIndex === 0){
					this.page = 1;
					this.limit = 10;
					this.hasMore = true;
					// this.area = e.label;
					uni.showLoading({
						title: '加载中...'
					})
					leaseQuery({
						"area": e.label,
						"city": this.city,
						"limit": this.limit,
						"page": this.page,
					}).then(res => {
						console.log(res)
						if (res.data.code === 0) {
							setTimeout(() => {
								uni.hideLoading()
								this.houseList = res.data.data
							}, 1000);
						} else {
							console.log("搜索失败")
						}
					}).catch(err => {
						console.log(err)
					})
				}else if(this.currentIndex === 1){
					this.page = 1;
					this.limit = 10;
					uni.showLoading({
						title: '加载中...'
					})
					leaseQuery({
						"money": e.value,
						"city": this.city,
						"limit": this.limit,
						"page": this.page,
					}).then(res => {
						console.log(res)
						if (res.data.code === 0) {
							setTimeout(() => {
								uni.hideLoading()
								this.houseList = res.data.data
							}, 1000);
						} else {
							console.log("搜索失败")
						}
					}).catch(err => {
						console.log(err)
					})
				}else{
					this.page = 1;
					this.limit = 10;
					uni.showLoading({
						title: '加载中...'
					})
					leaseQuery({
						"roomNum": e.value,
						"city": this.city,
						"limit": this.limit,
						"page": this.page,
					}).then(res => {
						if (res.data.code === 0) {
							setTimeout(() => {
								uni.hideLoading()
								this.houseList = res.data.data
							}, 1000);
						} else {
							console.log("搜索失败")
						}
					}).catch(err => {
						console.log(err)
					})
				}
			},
			search1() {
				if (this.content != '') {
					this.gethouseList()
				} else {
					console.log("内容不能为空")
				}
			},
			custom() {
				if (this.content != '') {
					this.gethouseList()
				} else {
					console.log("内容不能为空")
				}
			},
			radioGroupChange(e) {
				if (e === '有') {
					this.search.elevator = 1
				} else {
					this.search.elevator = 2
				}
			},
			radioGroupChange1(e) {
				if (e === '东') {
					this.search.orientation = 1
				} else if (e === '南') {
					this.search.orientation = 2
				} else if (e === '西') {
					this.search.orientation = 3
				} else if (e === '北') {
					this.search.orientation = 4
				} else if (e === '南北') {
					this.search.orientation = 5
				} else if (e === '东西') {
					this.search.orientation = 6
				} else if (e === '东南') {
					this.search.orientation = 7
				} else if (e === '西南') {
					this.search.orientation = 8
				} else if (e === '东北') {
					this.search.orientation = 9
				} else if (e === '西北') {
					this.search.orientation = 10
				}
			},
			radioGroupChange2(e) {
				if(e === '整租'){
					this.search.leaseType = 1
				}else{
					this.search.leaseType = 2
				}
			},
			radioGroupChange3(e) {
				console.log(e)
				if(e === '个人'){
					this.search.identityType = 1
				}else{
					this.search.identityType = 2
				}
			},
			open(index) {
				this.$refs.uDropdown.highlight();
				if (index === 0) {
					let self = this
					this.$myRequest({
						url: '/comboBoxList/house/getAreaComboBoxListByCity', //url就是放接口的地址的   
						method: "GET", //method是放GET或者POST的   不写的话默认POST  看接口文档 根据接口文档写
						data: {
							city: self.city,
						} //写完上面两个就可以开始写你需要传给后端的数据了  this是指针  指向全局变量的   也就是说你用data里面的变量要在前面加this.    在html中渲染数据不用加this.   有的时候会出现指针无法指向全局变量的情况    那就在方法中第一行加上 let self=this  然后用self.全局变量就可以了
						//这里传的是对象  不能加引号   加引号的话就变成了字符串
					}).then(res => { //这里是请求成功之后饭后的数据
						console.log(res)
						this.options1 = res.data.data
						console.log(this.options1)
					}).catch(err => { //这里是失败   一般用不着
						console.log(err)
					})
				}
			},
			gethouseList() {
				leaseQuery({
					"limit": this.limit,
					"page": this.page,
					"city": this.city,
					"keywords": this.content,
				}).then(res => {
					console.log(res)
					this.houseList = res.data.data
				}).catch(err => {
					console.log(err)
				})
			},
			// 筛选条件，点击确定回调
			Confirm(){
				console.log(this.search)
				this.page = 1;
				this.limit = 10;
				uni.showLoading({})
				this.show5 = false
				leaseQuery({
					"elevator": this.search.elevator,
					"leaseType": this.search.leaseType,
					"identityType": this.search.identityType,
					"orientation": this.search.orientation,
					"limit": this.limit,
					"page": this.page,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						uni.hideLoading()
						this.houseList = res.data.data
					} else {
						console.log("搜索失败")
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 取消筛选
			Cancel(){
				this.show5 = false
			}
		}
	}
</script>

<style lang="scss">
	.searchbar {
		display: flex;
		border-color: #fff;
		// position: fixed;//这里是固定定位   固定定位会脱离文档流 也就是说在你这个页面中是不计算占位的   所以会出现重叠的显现   如果不是特俗需要 尽量不要使用脱离文档流的布局
		// left: 0;
		// right: 0;
		// top: 0;
		width: 100%;
		z-index: 9;
		background-color: #5785E5;
		padding-bottom: 10rpx;

		.address {
			display: flex;
			width: 55px;
			margin-top: 10rpx;
		}

		.seach {
			width: 100%;
		}
	}

	.search {
		border-color: #fff;
		// position: fixed;
		// left: 0;
		// right: 0;
		// top: 0;
		z-index: 9;
		background-color: #5785E5;
		padding-bottom: 10rpx;
	}
	.center-bar {
		position: -webkit-sticky;
		position: sticky;
		top: var(--window-top);
		z-index: 999;
	}

	.wages {
		padding: 20rpx;
	}

	.bottom-nav {
		position: fixed;
		display: flex;
		left: 0;
		width: 100%;
		bottom: 0;
		height: 49px;
		z-index: 2;
		border-top: #e5e5e5 solid 1px;
		box-sizing: content-box;
	}
</style>
