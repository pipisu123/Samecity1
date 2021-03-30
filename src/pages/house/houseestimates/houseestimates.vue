<template>
	<view>
		<!-- <u-form-item label="姓名"><u-input v-model="form.name" /></u-form-item> -->
		<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '32rpx'}" left-icon="home" label-width="120" :label-position="labelPosition" label="小区" prop="area">
			<!-- <u-input :border="border" placeholder="请输入小区" v-model="model.area" type="text"></u-input> -->
			<uSearch :dictArr="wArr" @selectIndexValue="getVal" ref="usearch" @getValue="getValue" @getid="getid"></uSearch>
		</u-form-item>
		<u-form-item :label-position="labelPosition" label="朝向" prop="coun" label-width="150" color="#a0cfff">
			<u-input :border="border" type="select" :select-open="selectShow7" v-model="model.coun" placeholder="请选择朝向" @click="selectShow7 = true"></u-input>
		</u-form-item>
		<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition" label="面积" prop="phone">
			<u-input :border="border" placeholder="请输入面积" v-model="model.phone" type="text"></u-input>
		</u-form-item>
		<u-form-item :label-position="labelPosition" label="楼层类型" prop="loceng" label-width="150">
			<u-input :border="border" type="select" :select-open="selectShow4" v-model="model.loceng" placeholder="请输入楼层类型" @click="selectShow4 = true"></u-input>
		</u-form-item>
		<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="180" :label-position="labelPosition" label="楼层" prop="lasttime">
			<u-input :border="border" placeholder="请输入楼层" v-model="model.lasttime" type="text"></u-input>
		</u-form-item>
		<u-form-item :label-position="labelPosition" label="选择房型" prop="industry" label-width="150">
			<u-input :border="border" type="select" :select-open="selectShow2" v-model="model.industry" placeholder="请选择房型" @click="selectShow2 = true"></u-input>
		</u-form-item>
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
		<u-select mode="single-column" :list="selectList7" v-model="selectShow7" @confirm="selectConfirm7"></u-select>
		<u-select mode="mutil-column" :list="selectList2" v-model="selectShow2" @confirm="selectConfirm2"></u-select>
		<u-select mode="single-column" :list="selectList4" v-model="selectShow4" @confirm="selectConfirm4"></u-select>
			<u-toast ref="uToast" />
			<u-button type="primary">查看估价</u-button>
	
 </view>
</template>

<script>
export default {
	data() {
		return {
			wArr: [],
			form: {
				name: '',
				intro: '',
				sex: ''
			},
			recruitment:{
				coun:'',
				industry:'',
				phone:'',
				area:'',
			},
			model:{
				coun:'',
				industry:'',
				phone:'',
				area:'',
			},
			selectList7: [
				{
					value: '0',
					label: '东'
				},
				{
					value: '1',
					label: '南'
				},
				{
					value: '2',
					label: '西'
				},
				{
					value: '3',
					label: '北'
				},
				{
					value: '4',
					label: '东西'
				},
				{
					value: '5',
					label: '东南'
				},
				{
					value: '6',
					label: '南北'
				},
				{
					value: '7',
					label: '西南'
				},
				{
					value: '8',
					label: '东北'
				},
				{
					value: '9',
					label: '西北'
				},
			
				
				
			],
			selectList2:[
				[
						{
							value: '1',
							label: '1室'
						},
						{
							value: '2',
							label: '2室'
						},
						{
							value: '3',
							label: '3室'
						},
						{
							value: '4',
							label: '4室'
						},
						{
							value: '5',
							label: '5室'
						},
						{
							value: '6',
							label: '6室'
						},
						{
							value: '7',
							label: '7室'
						},
					],
					[
						{
							value: '0',
							label: '0厅'
						},
						{
							value: '1',
							label: '1厅'
						},
						{
							value: '2',
							label: '2厅'
						},
						{
							value: '3',
							label: '3厅'
						},
						{
							value: '4',
							label: '4厅'
						},
						{
							value: '5',
							label: '5厅'
						},
						{
							value: '6',
							label: '6厅'
						},
						{
							value: '7',
							label: '7厅'
						},
						
					],
					[
						{
							value: '0',
							label: '0卫'
						},
						{
							value: '1',
							label: '1卫'
						},
						{
							value: '2',
							label: '2卫'
						},
						{
							value: '3',
							label: '3卫'
						},
						{
							value: '4',
							label: '4卫'
						},
						{
							value: '5',
							label: '5卫'
						},
						{
							value: '6',
							label: '6卫'
						},
						{
							value: '7',
							label: '7卫'
						}	
					],
					
			],
			selectList4: [
				{
					value: '1',
					label: '顶层'
				},
				{
					value: '2',
					label: '高层'
				},
				{
					value: '3',
					label: '中层'
				},
				{
					value: '4',
					label: '低层'
				},
				{
					value: '5',
					label: '底层'
				},
				
				
			],
			radio: '',
			switchVal: false,
			selectShow7:false,
			selectShow2:false,
			selectShow4:false,
			labelPosition: 'left',
			
		};
	},
	onLoad() {
	   // 获取当前地区所有小区
	   findAllCommunityByCity({
		   "cityName": '茂名'
	   }).then(res=>{
		   console.log(res)
		   this.wArr = res.data.data
	   }).catch(err=>{
		   console.log(err)
	   })
	},
	
	methods:{
		// 小区获取
		getValue(e){
			this.model.area = e
		},
		// 选择回调出小区id
		getid(e){
			this.model.communityId = e
		},
		getVal(val){
			
		},
		getInputVal(){
			var val = this.$refs.usearch.getSearchInputValue();
			console.log(val)
		},
		},
};
</script>