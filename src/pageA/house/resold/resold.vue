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
				<u-search placeholder="你想住哪里？" @search="searchSecondhouse" v-model="content" @custom="customSecondhouse"></u-search>
			</view>
		</view>
		<view class="container">
					<!-- 只能有一个根元素 -->
					<view class="center-bar">
						<Dropdown :itemArr="itemArr" :listArr="listArr" @SelectMore="show5 = true" @subItemClick="subItemClick" @itemClick="itemClick"></Dropdown>
						<u-popup v-model="show5" width=600>
							<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
							 label="电梯" prop="cou">
								<u-radio-group v-model="value" @change="radioChange">
									<u-radio @change="radioChange" v-for="(item, index) in list1" :key="index" :name="item.name" :disabled="item.disabled">
										{{item.name}}
									</u-radio>
								</u-radio-group>
							</u-form-item>
							<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
							 label="朝向" prop="cour">
								<u-radio-group v-model="value" @change="radioChange1">
									<u-radio @change="radioChange1" v-for="(item, index) in list" :key="index" :name="item.name" :disabled="item.disabled">
										{{item.name}}
									</u-radio>
								</u-radio-group>
							</u-form-item>
							<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
							 label="是否唯一住房" prop="court">
								<u-radio-group v-model="value" @change="radioChange2">
									<u-radio @change="radioChange2" v-for="(item, index) in list2" :key="index" :name="item.name" :disabled="item.disabled">
										{{item.name}}
									</u-radio>
								</u-radio-group>
							</u-form-item>
							<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
							 label="发布类型" prop="identityType">
								<u-radio-group v-model="value" @change="radioChange3">
									<u-radio @change="radioChange3" v-for="(item, index) in list4" :key="index" :name="item.name" :disabled="item.disabled">
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
			</view>
		<!-- 传给子组件 -->
		<page :houselist="houselist"></page>
	</view>
	</view>
</template>

<script>
	import page from '../resold/page.vue';
	import Dropdown from '@/pageA/house/common/dropdown-screen.vue'
	import {
		secondHandQuery
	} from '@/util/house/searchHouse.js'
	import {
		getAreaComboBoxListByCity
	} from '@/util/house/area.js'
	export default {
		data() {
			return {
				listArr: ['区域', '价格', '户型'],
				itemArr: [
					[
						{
							label: '0-50万',
							value: 1,
						},
						{
							label: '50-100万',
							value: 2,
						},
						{
							label: '100-200万',
							value: 3,
						},
						{
							label: '200-300万',
							value: 4,
						},
						{
							label: '300-400万',
							value: 5,
						},
						{
							label: '400-500万',
							value: 6,
						},
						{
							label: '500万以上',
							value: 7,
						},
						
					],
					[
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
					},],
				],
				currentIndex:'',
				houselist: [], //搜索出来的房源
				city: '未定位', //城市
				content: '', //搜索框
				show: true,
				show1: false,
				show2: false,
				show3: false,
				show4: false,
				show5: false,
				id: 0,
				page:1,
				limit:10,
				hasMore:true,
				area:'',
				money:'',
				roomNum:'',
				search: {
					elevator: '',
					orientation: '',
					Islive: '',
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
				list2: [
					{
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
				list4:[
					{
						value: '0',
						name: '个人',
						disabled: false
					},
					{
						value: '1',
						name: '经纪人',
						disabled: false
					},
				],
			}
		},
		components: {
			page,
			Dropdown
		},
		onReady() {
			this.$store.dispatch('getCity')
			this.city = this.$store.state.city
		},
		onLoad() {
			this.getHouseList()
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
		onReachBottom() {
			if(this.hasMore){
				uni.showLoading({
					title:'正在加载中...'
				})
				this.page += 1;
				this.$myRequest({
					url: 'solr-query/house/secondHandQuery', //url就是放接口的地址的   
					method: "GET", //method是放GET或者POST的   不写的话默认POST  看接口文档 根据接口文档写
					data: {
						city: this.$store.state.city,
						limit: this.limit,
						page: this.page,
					} //写完上面两个就可以开始写你需要传给后端的数据了  this是指针  指向全局变量的   也就是说你用data里面的变量要在前面加this.    在html中渲染数据不用加this.   有的时候会出现指针无法指向全局变量的情况    那就在方法中第一行加上 let self=this  然后用self.全局变量就可以了
					//这里传的是对象  不能加引号   加引号的话就变成了字符串
				}).then(res => { //这里是请求成功之后饭后的数据
					if(res.data.code === 0){
						uni.hideLoading()
						if(res.data.data.length===0){
							 this.hasMore = false;
							 return;
						}
						  this.houselist= this.houselist.concat(res.data.data)
					}else{
						console.log("加载失败")
					}
					console.log(res)
				}).catch(err => { //这里是失败   一般用不着
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
					secondHandQuery({
						"area": e.label,
						"city": this.city,
						"limit": this.limit,
						"page": this.page,
					}).then(res => {
						console.log(res)
						if (res.data.code === 0) {
							setTimeout(() => {
								uni.hideLoading()
								this.houselist = res.data.data
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
					secondHandQuery({
						"money": e.value,
						"city": this.city,
						"limit": this.limit,
						"page": this.page,
					}).then(res => {
						console.log(res)
						if (res.data.code === 0) {
							setTimeout(() => {
								uni.hideLoading()
								this.houselist = res.data.data
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
					secondHandQuery({
						"roomNum": e.value,
						"city": this.city,
						"limit": this.limit,
						"page": this.page,
					}).then(res => {
						if (res.data.code === 0) {
							setTimeout(() => {
								uni.hideLoading()
								this.houselist = res.data.data
							}, 1000);
						} else {
							console.log("搜索失败")
						}
					}).catch(err => {
						console.log(err)
					})
				}
			},
			searchSecondhouse() {
				if (this.content != '') {
					this.getHouseList()
				} else {
					console.log("内容不能为空")
				}
			},
			customSecondhouse() {
				if (this.content != '') {
					this.getHouseList()
				} else {
					console.log("内容不能为空")
				}
			},
			closeDropdown() {
				this.$refs.uDropdown.close();
			},
			// 选择电梯回调
			radioChange(e){
				if (e === '有') {
					this.search.elevator = 1
				} else {
					this.search.elevator = 2
				}
			},
			// 选择朝向回调
			radioChange1(e){
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
			// 选择是否唯一住房回调
			radioChange2(e){
				if(e === '是'){
					this.search.Islive = 1
				}else{
					this.search.Islive = 2
				}
			},
			// 选择发布类型回调
			radioChange3(e){
				if(e === '个人'){
					this.search.identityType = 1
				}else{
					this.search.identityType = 2
				}
			},
			// 筛选条件，点击确定回调
			Confirm(){
				console.log(this.search)
				uni.showLoading({})
				this.show5 = false
				secondHandQuery({
					"elevator": this.search.elevator,
					"onlyOne": this.search.Islive,
					"identityType": this.search.identityType,
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
			// 查询二手房列表
			getHouseList(){
				this.$myRequest({
					url: '/solr-query/house/secondHandQuery', //url就是放接口的地址的   
					method: "GET", //method是放GET或者POST的   不写的话默认POST  看接口文档 根据接口文档写
					data: {
						city: this.$store.state.city,
						limit: this.limit,
						page: this.page,
						"keywords": this.content,
					} //写完上面两个就可以开始写你需要传给后端的数据了  this是指针  指向全局变量的   也就是说你用data里面的变量要在前面加this.    在html中渲染数据不用加this.   有的时候会出现指针无法指向全局变量的情况    那就在方法中第一行加上 let self=this  然后用self.全局变量就可以了
					//这里传的是对象  不能加引号   加引号的话就变成了字符串
				}).then(res => { //这里是请求成功之后饭后的数据
					if(res.data.code === 0){
						if(res.data.data.length ===0){
							this.hasMore = false;
							return;
						}
						this.houselist = res.data.data
					}else{
						console.log("加载失败")
					}
					console.log(res)
				}).catch(err => { //这里是失败   一般用不着
					console.log(err)
				})
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
			width: 65px;
			margin-top: 10rpx;
		}

		.seach {
			width: 88%;
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
