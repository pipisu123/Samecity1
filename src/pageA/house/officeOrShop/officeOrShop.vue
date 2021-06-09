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
				<u-search placeholder="请输入房屋信息" @search="search" v-model="content" @custom="custom"></u-search>
			</view>
		</view>
		<centerBar></centerBar>
		<view class="center-bar">
			<Dropdown :itemArr="itemArr" :listArr="listArr" @SelectMore="show5 = true" @subItemClick="subItemClick" @itemClick="itemClick"
			 :isShowMore="isShowMore"></Dropdown>
		</view>
		<officeHouse :houseList="houseList"></officeHouse>
	</view>
</template>

<script>
	import centerBar from './childComps/centerBar.vue'
	import Dropdown from '@/pageA/house/common/dropdown-screen.vue'
	import officeHouse from './childComps/officeHouseList.vue'
	import {
		officeSecondHandQuery
	} from '@/util/house/searchHouse.js'
	import {
		getAreaComboBoxListByCity
	} from '@/util/house/area.js'
	export default {
		data() {
			return {
				listArr: ['区域', '价格', '面积', '发布类型'],
				itemArr: [
					[{
							label: '0-100万',
							value: 1,
						},
						{
							label: '100-200万',
							value: 2,
						},
						{
							label: '200-300万',
							value: 3,
						},
						{
							label: '300-500万',
							value: 4,
						},
						{
							label: '500-800万',
							value: 5,
						},
						{
							label: '800-1200万',
							value: 6,
						},
						{
							label: '1200-2000万',
							value: 7,
						},
						{
							label: '2000万以上',
							value: 8,
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
					[{
							label: '个人',
							value: 1,
						},
						{
							label: '经纪人',
							value: 2,
						},
					],
				],
				currentIndex: '',
				isShowMore: false,
				city: '',
				houseList: [],
				content: '',
			}
		},
		onLoad() {
			this.city = this.$store.state.city;
			this.getsecondList()
			getAreaComboBoxListByCity({
				"city": this.$store.state.city
			}).then(res => {
				console.log(res)
				this.itemArr.unshift(res.data.data)
				console.log(this.itemArr)
			}).catch(err => {
				console.log(err)
			})
		},
		components: {
			centerBar,
			officeHouse,
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
					this.limit = 5;
					this.hasMore = true;
					// this.area = e.label;
					uni.showLoading({
						title: '加载中...'
					})
					officeSecondHandQuery({
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
					officeSecondHandQuery({
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
				}else if(this.currentIndex === 2){
					this.page = 1;
					this.limit = 10;
					uni.showLoading({
						title: '加载中...'
					})
					officeSecondHandQuery({
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
				}else{
					this.page = 1;
					this.limit = 10;
					uni.showLoading({
						title: '加载中...'
					})
					officeSecondHandQuery({
						"identityType": e.value,
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
			// 获取二手列表
			getsecondList() {
				officeSecondHandQuery({
					"page": 1,
					"limit": 10,
					"city": this.$store.state.city,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						this.houseList = res.data.data;
					} else {
						console.log("搜索失败！")
					}
				}).catch(err => {
					console.log(err)
				})
			},
			btn() {
				console.log("==========")
			},
			search() {
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
			gethouseList() {
				officeSecondHandQuery({
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
		}
	}
</script>

<style lang="scss" scoped>
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

	.wage {
		width: 100%;
		background-color: #F1F1F1;
		display: flex;
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
