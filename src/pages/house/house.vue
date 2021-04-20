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
						<u-search  v-model="seach"  placeholder="请输入工作或房屋信息" @input="oninput" ></u-search>
					</view>
				</view>
				<Grid></Grid>
				<swippe></swippe>
				<view class="wage">
				<u-dropdown @open="open" ref="uDropdown">
							<u-dropdown-item v-model="value1" title="区域" :options="options1"></u-dropdown-item>
							<u-dropdown-item v-model="value2" title="价格" :options="options2"></u-dropdown-item>
							<u-dropdown-item v-model="value3" title="户型" :options="options3"></u-dropdown-item>
						</u-dropdown>
						
						<view class="wages"@click="show5 = true">
						更多
						</view>
						<u-popup  v-model="show5" width=600>
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
							<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition" label="朝向" prop="cour">
								<u-radio-group v-model="value" @change="radioGroupChange">
											<u-radio 
												@change="radioChange" 
												v-for="(item, index) in list" :key="index" 
												:name="item.name"
												:disabled="item.disabled"
											>
												{{item.name}}
											</u-radio>
										</u-radio-group>
							</u-form-item>
							<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition" label="朝向" prop="court">
								<u-radio-group v-model="value" @change="radioGroupChange">
											<u-radio 
												@change="radioChange" 
												v-for="(item, index) in list2" :key="index" 
												:name="item.name"
												:disabled="item.disabled"
											>
												{{item.name}}
											</u-radio>
										</u-radio-group>
							</u-form-item>
						</u-popup>
						</view>
						<!-- 传给子组件 -->
				<ym :houselist="houselist"></ym>
			</view>
		</template>
		<template v-else-if="show1">
			<view class="EC_mr15">
				第二页
			</view>
		</template>
		<template v-else-if="show2">
			<view>
				<view class="EC_mr15">
					选择发布类型
				</view>
				<rental></rental>
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
	import swippe from './bar/swippe.vue'
	import fz from './bar/fz.vue'
	import ym from './bar/ym.vue'
	import bar from './bar/bar.vue'
	import rental from './rental/rentalissue.vue'
	import mypage from './mypage/mypage.vue'
	export default {
		data() {
			return {
				houselist:[],//搜索出来的房源
				city:'',//城市
				seach: '', //搜索框
				value2:2,
				value3:3,
				value1:1,
				show: true,
				show1: false,
				show2: false,
				show3: false,
				show4: false,
				show5: false,
					id:0,
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
															value:'0',
															name: '整租',
															disabled: false
														},
														{
															value:'1',
															name: '合租',
															disabled: false
														},
													],	
											
									
									options1:[
									
									],
									options2: [
										{
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
									options3: [{
											label: '不限',
											value: 0,
										},
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
			swippe,
			fz,
			ym,
			bar,
			rental,
			mypage
		},
		onReady() {
			this.$store.dispatch('getCity')
			this.city = this.$store.state.city
		},
		onLoad() {
			
			this.$myRequest({
				url: '/solr-query/house/leaseQuery',//url就是放接口的地址的   
				method: "GET",//method是放GET或者POST的   不写的话默认POST  看接口文档 根据接口文档写
				data:{
					city:'茂名',
					limit:10,
					page:1
				}//写完上面两个就可以开始写你需要传给后端的数据了  this是指针  指向全局变量的   也就是说你用data里面的变量要在前面加this.    在html中渲染数据不用加this.   有的时候会出现指针无法指向全局变量的情况    那就在方法中第一行加上 let self=this  然后用self.全局变量就可以了
								//这里传的是对象  不能加引号   加引号的话就变成了字符串
			}).then(res => {//这里是请求成功之后饭后的数据
			this.houselist=res.data.data
				console.log(res)
			}).catch(err => {//这里是失败   一般用不着
				console.log(err)
			})
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
			closeDropdown() {
							this.$refs.uDropdown.close();
						},
					
			
			close(index) {
				// 关闭的时候，给当前项加上高亮
				// 当然，您也可以通过监听dropdown-item的@change事件进行处理
				this.$refs.uDropdown.highlight(index);
			},
			change() {
				// 更多的细节，如有需要请自行根据业务逻辑进行处理
				// this.$refs.uDropdown.highlight(xxx);
			},
			open(index){
				this.$refs.uDropdown.highlight();
					if(index===0){
						// let self=this
						// console.log(uni.getStorageSync('token'))
						// console.log(self.city)
						this.$myRequest({
							url: '/comboBoxList/house/getAreaComboBoxListByCity',//url就是放接口的地址的   
							method: "GET",//method是放GET或者POST的   不写的话默认POST  看接口文档 根据接口文档写
							data:{
								city:this.city,
							} //写完上面两个就可以开始写你需要传给后端的数据了  this是指针  指向全局变量的   也就是说你用data里面的变量要在前面加this.    在html中渲染数据不用加this.   有的时候会出现指针无法指向全局变量的情况    那就在方法中第一行加上 let self=this  然后用self.全局变量就可以了
											//这里传的是对象  不能加引号   加引号的话就变成了字符串
						}).then(res => {//这里是请求成功之后饭后的数据
							console.log(res)
							
							this.options1=res.data.data
							console.log(this.options1)
							
						}).catch(err => {//这里是失败   一般用不着
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
			
			oninput(e){
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
			width: 65px;
			margin-top: 10rpx;
		}

		.seach {
			width: 88%;
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
	.wage{
		width: 100%;
		display:flex;
		
		 
	}
	.wages{
		padding: 20rpx;
	}
</style>
