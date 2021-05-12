<template>
	<view>
		<template v-if="show">
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
						<u-search v-model="content" placeholder="请输入房屋关键词" @search="searchRent"></u-search>
					</view>
				</view>
				<Grid></Grid>
				<swipper></swipper>
				<view class="wage">
					<u-dropdown @open="open" ref="uDropdown">
						<u-dropdown-item v-model="value1" title="区域" :options="options1" @change="change"></u-dropdown-item>
						<u-dropdown-item v-model="value2" title="价格" :options="options2" @change="change1"></u-dropdown-item>
						<u-dropdown-item v-model="value3" title="户型" :options="options3" @change="change2"></u-dropdown-item>
					</u-dropdown>
					<view class="wages" @click="show5 = true">
						更多
					</view>
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
				<!-- 传给子组件 -->
				<view>
					<view v-if="houselist.length === 0">
						<u-empty text="暂无数据" mode="search" margin-top=200></u-empty>
					</view>
				</view>
				<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="lower">
					<ym :houselist="houselist"></ym>
				</scroll-view>
			</view>
		</template>
		<template v-else-if="show1">
			<view class="EC_mr15">
				第二页
			</view>
		</template>
		<template v-else-if="show2">
			<view>
				<NavBar></NavBar>
			</view>
		</template>
		<template v-else-if="show3">
			<view class="EC_mr15">
				第四页
			</view>
		</template>
		<template v-else-if="show4">
			<view>
				<view class="EC_mr15">

				</view>
				<mypage></mypage>
			</view>
		</template>
		<bar @Clickitem="Clickitem"></bar>
	</view>
</template>

<script>
	import Grid from './bar/Grid.vue';
	import swipper from './common/swipper.vue'
	import fz from './bar/fz.vue'
	import ym from './bar/ym.vue'
	import bar from './bar/bar.vue'
	import NavBar from './common/NavBar.vue'
	import mypage from './mypage/mypage.vue'
	import {
		leaseQuery
	} from '@/util/house/searchHouse.js'
	export default {
		data() {
			return {
				houselist: [], //搜索出来的房源
				city: '', //城市
				content: '', //搜索框
				value2: 2,
				value3: 3,
				value1: 1,
				show: true,
				show1: false,
				show2: false,
				show3: false,
				show4: false,
				show5: false,
				id: 0,
				search: {
					elevator: '',
					orientation: '',
					identityType: '',
					leaseType: ''
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

						name: '东南',
						checked: false,
						disabled: false
					},
					{

						name: '东北',
						checked: false,
						disabled: false
					},
					{

						name: '西南',
						checked: false,
						disabled: false
					},
					{

						name: '西北',
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
				],
				list2: [{
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


				options1: [

				],
				options2: [{
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
				options3: [
					{
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
					},
				]

			}
		},
		components: {
			Grid,
			swipper,
			fz,
			ym,
			bar,
			NavBar,
			mypage
		},
		onReady() {
			this.$store.dispatch('getCity')
			this.city = this.$store.state.city
		},
		onLoad() {
			this.getRentHouse();
			// console.log(this.city)
			// 	let self=this//这里面出现了指针问题  
			// uni.chooseLocation({

			// 	success: function(res) {
			// 		var reg = /.+?(省|市|自治区|自治州|县|区)/g;     
			// 					  var re =/.+?(?=省|市|自治区|自治州|县|区)/;
			// 		console.log(res)
			// 		let a=(res.address.match(reg))
			// 		console.log(a)
			// 		self.city = (a[1].match(re))[0];

			// 	}
			// });

		},

		methods: {
			// 搜索关键词回调
			searchRent() {
				if (this.content != '') {
					this.getRentHouse()
				} else {
					console.log("内容不能为空")
				}
			},
			// 根据区域查询
			change(e, index) {
				console.log("====")
				uni.showLoading({
					title: '加载中...'
				})
				leaseQuery({
					"area": this.options1[index].label,
					"city": this.city,
					"limit": 10,
					"page": 1,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						uni.hideLoading()
						this.houselist = res.data.data
					} else {
						console.log("搜索失败")
					}
				}).catch(err => {
					console.log(err)
				})
				console.log(this.options1[index].label)
			},
			change1(e, index) {
				uni.showLoading({
					title: '加载中...'
				})
				leaseQuery({
					"money": this.options2[index].value,
					"city": this.city,
					"limit": 10,
					"page": 1,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						uni.hideLoading()
						this.houselist = res.data.data
					} else {
						console.log("搜索失败")
					}
				}).catch(err => {
					console.log(err)
				})
				console.log(this.options2[index].value)
			},
			// 根据多少室查询
			change2(e, index) {
				uni.showLoading({
					title: '加载中...'
				})
				leaseQuery({
					"roomNum": this.options3[index].value,
					"city": this.city,
					"limit": 10,
					"page": 1,
				}).then(res => {
					if (res.data.code === 0) {
						uni.hideLoading()
						this.houselist = res.data.data
					} else {
						console.log("搜索失败")
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getRentHouse(){
				this.$myRequest({
					url: '/solr-query/house/leaseQuery', //url就是放接口的地址的   
					method: "GET", //method是放GET或者POST的   不写的话默认POST  看接口文档 根据接口文档写
					data: {
						city: this.city,
						"keywords": this.content,
						limit: 10,
						page: 1
					} //写完上面两个就可以开始写你需要传给后端的数据了  this是指针  指向全局变量的   也就是说你用data里面的变量要在前面加this.    在html中渲染数据不用加this.   有的时候会出现指针无法指向全局变量的情况    那就在方法中第一行加上 let self=this  然后用self.全局变量就可以了
					//这里传的是对象  不能加引号   加引号的话就变成了字符串
				}).then(res => { //这里是请求成功之后饭后的数据
					this.houselist = res.data.data
					console.log(res)
				}).catch(err => { //这里是失败   一般用不着
					console.log(err)
				})
			},
			// 选择电梯回调
			radioGroupChange(e) {
				if (e === '有') {
					this.search.elevator = 1
				} else {
					this.search.elevator = 2
				}
			},
			// 选择朝向回调
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
			// 选择租房类型回调
			radioGroupChange2(e) {
				if (e === '整租') {
					this.search.leaseType = 1
				} else {
					this.search.leaseType = 2
				}
			},
			// 筛选条件，点击确定回调
			Confirm() {
				console.log(this.search)
				uni.showLoading({})
				this.show5 = false
				leaseQuery({
					"elevator": this.search.elevator,
					"leaseType": this.search.leaseType,
					"orientation": this.search.orientation,
					"limit": 10,
					"page": 1,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						uni.hideLoading()
						this.houselist = res.data.data
					} else {
						console.log("搜索失败")
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 选择
			closeDropdown() {
				this.$refs.uDropdown.close();
			},
			lower() {
				console.log("触底了")
			},
			close(index) {
				// 关闭的时候，给当前项加上高亮
				// 当然，您也可以通过监听dropdown-item的@change事件进行处理
				this.$refs.uDropdown.highlight(index);
			},
			open(index) {
				this.$refs.uDropdown.highlight();
				if (index === 0) {
					// let self=this
					// console.log(uni.getStorageSync('token'))
					// console.log(self.city)
					this.$myRequest({
						url: '/comboBoxList/house/getAreaComboBoxListByCity', //url就是放接口的地址的   
						method: "GET", //method是放GET或者POST的   不写的话默认POST  看接口文档 根据接口文档写
						data: {
							city: this.city,
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
			Clickitem(index) {
				// console.log(index)
				switch (index) {
					case 0:
						this.show = true;
						this.show1 = false;
						this.show2 = false;
						this.show3 = false;
						this.show4 = false;
						break;
					case 1:
						this.show = false;
						this.show1 = true;
						this.show2 = false;
						this.show3 = false;
						this.show4 = false;
						break;
					case 2:
						this.show = false;
						this.show1 = false;
						this.show2 = true;
						this.show3 = false;
						this.show4 = false;
						break;
					case 3:
						this.show = false;
						this.show1 = false;
						this.show2 = false;
						this.show3 = true;
						this.show4 = false;
						break;
					case 4:
						this.show = false;
						this.show1 = false;
						this.show2 = false;
						this.show3 = false;
						this.show4 = true;
						break;
				}
			},

			oninput(e) {
				console.log(e)

			},
			// seach (){

			// }
		}
	}
</script>

<style lang="scss">
	.searchbar {
		display: flex;
		border-color: #fff;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
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
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9;
		background-color: #5785E5;
		padding-bottom: 10rpx;
	}

	.wage {
		width: 100%;
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

	scroll-view {
		height: 900rpx;
	}
</style>
