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
				<u-search placeholder="你想租哪里？" @search="search1" v-model="content" @custom="custom"></u-search>
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
	import rentShopList from '../officeOrShop/childComps/rentShopList.vue'
	import Dropdown from '@/pageA/house/common/dropdown-screen.vue'
	
	import { shopSubletQuery } from '@/util/house/searchHouse.js'
	import {
		getAreaComboBoxListByCity
	} from '@/util/house/area.js'
	export default {
		data() {
			return {
				listArr: ['区域', '价格', '面积'],
				itemArr: [
					[{
						label: '0-3',
						value: 1,
					},
					{
						label: '3-4',
						value: 2,
					},
					{
						label: '4-5',
						value: 3,
					},
					{
						label: '5-6',
						value: 4,
					},
					{
						label: '6-8',
						value: 5,
					},
					{
						label: '8-10',
						value: 6,
					},
					{
						label: '10以上',
						value: 7,
					},
					],
					[{
						label: '0-100㎡',
						value: 1,
					},
					{
						label: '100-150㎡',
						value: 2,
					},
					{
						label: '150-200㎡',
						value: 3,
					},
					{
						label: '200-300㎡',
						value: 4,
					},
					{
						label: '300-500㎡',
						value: 5,
					},
					{
						label: '500-1000㎡',
						value: 6,
					},
					{
						label: '1000㎡以上',
						value: 7,
					},
					],
				],
				currentIndex: '',
				city: '',
				houseList: [],
				content: '',
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
			rentShopList,
			Dropdown
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
					shopSubletQuery({
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
					shopSubletQuery({
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
					shopSubletQuery({
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
			gethouseList() {
				shopSubletQuery({
					"page": 1,
					"limit": 10,
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
				uni.showLoading({})
				this.show5 = false
				shopSubletQuery({			
					"identityType": this.search.identityType,
					"shopType": this.search.shopType,
					"limit": 10,
					"page": 1,
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
