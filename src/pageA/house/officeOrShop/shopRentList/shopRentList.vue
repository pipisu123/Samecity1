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
				<u-search placeholder="你想在哪里办公？" @search="search1" v-model="content" @custom="custom"></u-search>
			</view>
		</view>
		<view class="center-bar">
			<Dropdown :itemArr="itemArr" :listArr="listArr" @SelectMore="show5 = true" @subItemClick="subItemClick" @itemClick="itemClick"></Dropdown>
			<u-popup v-model="show5" width=600>
				<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
				 label="商铺类型" prop="shopType">
					<u-radio-group v-model="value" @change="radioGroupChange1">
						<u-radio @change="radioGroupChange1" v-for="(item, index) in list" :key="index" :name="item.name" :disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
				 label="发布类型" prop="identityType">
					<u-radio-group v-model="value" @change="radioGroupChange3">
						<u-radio @change="radioGroupChange3" v-for="(item, index) in list4" :key="index" :name="item.name" :disabled="item.disabled">
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
		<rentShopList :houseList="houseList"></rentShopList>
	</view>
</template>

<script>
	import rentShopList from '../childComps/rentShopList.vue'
	import Dropdown from '@/pageA/house/common/dropdown-screen.vue'
	
	import { shopLeaseQuery } from '@/util/house/searchHouse.js'
	import {
		getAreaComboBoxListByCity
	} from '@/util/house/area.js'
	export default {
		data() {
			return {
				listArr: ['区域', '价格', '面积'],
				itemArr: [
					[{
						label: '0-5000元',
						value: 1,
					},
					{
						label: '5000-10000元',
						value: 2,
					},
					{
						label: '10000-15000元',
						value: 3,
					},
					{
						label: '15000-20000元',
						value: 4,
					},
					{
						label: '20000-50000元',
						value: 5,
					},
					{
						label: '50000元以上',
						value: 6,
					}
					],
					[{
						label: '0-20㎡',
						value: 1,
					},
					{
						label: '20-50㎡',
						value: 2,
					},
					{
						label: '50-100㎡',
						value: 3,
					},
					{
						label: '100-150㎡',
						value: 4,
					},
					{
						label: '150-200㎡',
						value: 5,
					},
					{
						label: '200-500㎡',
						value: 6,
					},
					{
						label: '500-1000㎡以上',
						value: 7,
					},
					{
						label: '1000㎡以上',
						value: 8,
					},
					],
				],
				currentIndex: '',
				city: '',
				houseList: [],
				content: '',
				page: 1,
				limit: 10,
				hasMore:true,
				area:'',
				money:'',
				square:'',
				show5: false,
				search: {
					shopType: '',
					identityType: ''
				},
				list: [
					{
						name: '商业街店铺',
						checked: false,
						disabled: false
					},
					{
						name: '写字楼配套',
						checked: false,
						disabled: false
					},
					{
						name: '社区底商',
						checked: false,
						disabled: false
					},
					{
						name: '临街门面',
						checked: false,
						disabled: false
					},
					{
						name: '档口摊位',
						checked: false,
						disabled: false
					},
					{
						name: '购物百货中心',
						checked: false,
						disabled: false
					},
					{
						name: '其他',
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
			this.city = tuni.getStorageSync('city');
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
			rentShopList,
			Dropdown
		},
		onReachBottom() {
			if(this.hasMore){
				uni.showLoading({
					title:'正在加载中...'
				})
				this.page += 1;
				shopLeaseQuery({
					"area": this.area,
					"city": this.city,
					"keywords": this.content,
					"money": this.money,
					"square":this.square,
					"limit": this.limit,
					"page": this.page,
				}).then(res => {
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
						console.log(res)
				}).catch(err => {
					console.log(err)
				})
			}else{
				console.log("无数据")
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
					shopLeaseQuery({
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
					shopLeaseQuery({
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
				}else {
					this.page = 1;
					this.limit = 10;
					uni.showLoading({
						title: '加载中...'
					})
					shopLeaseQuery({
						"square": e.value,
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
			radioGroupChange1(e) {
				if (e === '商业街店铺') {
					this.search.shopType = 1
				} else if (e === '写字楼配套') {
					this.search.shopType = 2
				} else if (e === '社区底商') {
					this.search.shopType = 3
				} else if (e === '临街门面') {
					this.search.shopType = 4
				} else if (e === '档口摊位') {
					this.search.shopType = 5
				} else if (e === '购物百货中心') {
					this.search.shopType = 6
				} else if (e === '其他') {
					this.search.shopType = 7
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
				shopLeaseQuery({
					"page": this.page,
					"limit": this.limit,
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
				this.page = 1;
				this.limit = 10;
				console.log(this.search)
				uni.showLoading({})
				this.show5 = false
				shopLeaseQuery({			
					"identityType": this.search.identityType,
					"shopType": this.search.shopType,
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
