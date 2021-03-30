<template>
	<view class="wage">
		<u-dropdown ref="uDropdown" @click="change" >
			<u-dropdown-item v-model="value1" title="区域" :options="options1" @change="change"></u-dropdown-item>
			<u-dropdown-item v-model="value2" title="价格" :options="options2"></u-dropdown-item>
		<u-dropdown-item v-model="value3" title="户型" :options="options3"></u-dropdown-item>
		<!-- <u-dropdown-item  title="更多"></u-dropdown-item> -->
		</u-dropdown>
		
		<view class="wages"@click="show = true">
		更多
		</view>
		<u-popup  v-model="show" width=600>
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
</template>

<script>
	export default {
			props:{//这个是子组件   这个方法是父组件给子组件传值
				vaule:{//这里是传值的变量名
					type:String,//这里是值得类型
					default:"",//这里是值得内容   可以不写   如果添上了就是默认值   现在是无默认状态   传过来之后可以直接当成变量使用
				}
			},
		data() {
			return {
				
				show: false,
				value1: 1,
				value2: 2,
				value3: 3,
				value4: 4,
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
										
				options1: [
				],
				options2: [
					{
						label: '不限',
						value: 0,
					},
					{
						label: '0-500',
						value: 1,
					},
					{
						label: '500-1000',
						value: 2,
					},
					{
						label: '1000-2000',
						value: 3,
					},
					{
						label: '2000-3000',
						value: 4,
					},
					{
						label: '3000-4000',
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
					
				],
			}
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
			}
		},
		change(){
			
			
				console.log(this.city)
					this.$myRequest({
						url: '/comboBoxList/house/getAreaComboBoxListByCity',//url就是放接口的地址的   
						method: "GET",//method是放GET或者POST的   不写的话默认POST  看接口文档 根据接口文档写
						city:this.city //写完上面两个就可以开始写你需要传给后端的数据了  this是指针  指向全局变量的   也就是说你用data里面的变量要在前面加this.    在html中渲染数据不用加this.   有的时候会出现指针无法指向全局变量的情况    那就在方法中第一行加上 let self=this  然后用self.全局变量就可以了
										//这里传的是对象  不能加引号   加引号的话就变成了字符串
					}).then(res => {//这里是请求成功之后饭后的数据
						console.log(res)
						this.options1=res.data
					}).catch(err => {//这里是失败   一般用不着
						console.log(err)
					})
		
				if(index==3){
					this.show=true
				}
			},
		
	}
</script>
<style lang="scss">
	.wage{
		width: 100%;
		display:flex;
		
		 
	}
	.wages{
		padding: 20rpx;
	}
	 
	 
</style>
