<template>
<view class="content">
	<u-form :model="model" ref="uForm2">
		<u-form-item :label-position="labelPosition" label="选择发布" prop="publicType" label-width="150">
			<u-input :border="border" type="select" :select-open="selectShow3" v-model="public.publicType" placeholder="请选择发布类型" @click="selectShow3 = true"></u-input>
		</u-form-item>
		</u-form>
	<!-- 创建房源信息-->
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType" v-if="showview">
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="120" :label-position="labelPosition" label="标题" prop="nam">
				<u-input :border="border" placeholder="请输入标题" v-model="model.nam" type="text"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '32rpx'}" left-icon="home" label-width="120" :label-position="labelPosition" label="小区" prop="name">
				<u-input :border="border" placeholder="请输入小区" v-model="model.name" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="朝向" prop="workType" label-width="150">
				<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="model.workType" placeholder="选择朝向" @click="actionSheetShow = true"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition" label="面积" prop="phone">
				<u-input :border="border" placeholder="请输入面积" v-model="model.phone" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="选择装修" prop="wagesType" label-width="150" color="#a0cfff">
				<u-input :border="border" type="select" :select-open="selectShow1" v-model="model.wagesType" placeholder="请选择装修" @click="selectShow1 = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="选择房型" prop="industry" label-width="150">
				<u-input :border="border" type="select" :select-open="selectShow2" v-model="model.industry" placeholder="请选择房型" @click="selectShow2 = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="房源类型" prop="goodsType" label-width="150">
				<u-input :border="border" type="select" :select-open="selectShow" v-model="model.goodsType" placeholder="请选择房源类型" @click="selectShow = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="楼层类型" prop="loceng" label-width="150">
				<u-input :border="border" type="select" :select-open="selectShow4" v-model="model.loceng" placeholder="请输入楼层类型" @click="selectShow4 = true"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="180" :label-position="labelPosition" label="楼层" prop="lasttime">
				<u-input :border="border" placeholder="请输入楼层" v-model="model.lasttime" type="text"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition" label="出售价格" prop="count">
				<u-input :border="border" placeholder="出售价格" v-model="model.count" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="简介" prop="intro">
				<u-input type="textarea" :border="border" placeholder="请填写房子特点趴!" v-model="model.intro" />
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="所在地区" prop="region" label-width="150">
				<u-input :border="border" type="select" :select-open="pickerShow" v-model="model.region" placeholder="请选择地区" @click="pickerShow = true"></u-input>
			</u-form-item>
		<!-- 	<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition" label="押金方式" prop="coun">
				<u-input :border="border" placeholder="押金方式" v-model="model.coun" type="text"></u-input>
			</u-form-item> -->
			<u-form-item :label-position="labelPosition" label="售房周期" prop="zuf" label-width="150" color="#a0cfff">
				<u-input :border="border" type="select" :select-open="selectShow5" v-model="model.zuf" placeholder="期待售房周期" @click="selectShow5 = true"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#a0cfff', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition" label="家具" prop="coun">
				<u-checkbox-group @change="checkboxGroupChange">
							<u-checkbox 
								@change="checkboxChange" 
								v-model="item.checked" 
								v-for="(item, index) in list" :key="index" 
								:name="item.name"
							>{{item.name}}</u-checkbox>
						</u-checkbox-group>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="上传图片" prop="photo" label-width="150">
				<u-upload width="160" height="160" action="#"  ref="uUpload" :auto-upload="false" :before-upload="beforeUpload" max-count=1 :max-size="1 * 1024 * 1024" ></u-upload>
			</u-form-item>
			<text style="color: #a0cfff;">只能上传一张图片，大小不超1m</text>
		</u-form>
		<!-- 创建个体发布信息 -->
		<PersonRecruitment v-else></PersonRecruitment>
		<view class="uni-uploader__input" @tap="chooseVideo" v-if="showview">
			<button type="default">上传视频</button>
		</view>
		<!-- <view class="public">
			<u-button @click="submit" type="primary">发布房源</u-button>
		</view> -->
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
		<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
		<u-select mode="single-column" :list="selectList1" v-model="selectShow1" @confirm="selectConfirm1"></u-select>
		<u-select mode="single-column" :list="selectList5" v-model="selectShow5" @confirm="selectConfirm5"></u-select>
		<u-select mode="single-column" :list="selectList4" v-model="selectShow4" @confirm="selectConfirm4"></u-select>
		<u-select mode="single-column" :list="selectList3" v-model="selectShow3" @confirm="selectConfirm3" title="请选择要发布的类型"></u-select>
		<u-select mode="mutil-column" :list="selectList2" v-model="selectShow2" @confirm="selectConfirm2"></u-select>
		
		<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
		<u-toast ref="uToast" />
		<u-button @click="submit" type="primary" v-if="showview">立即发布</u-button>
	</view>
	
</view>
	
</template>

<script>
	// import PersonRecruitment from './childComps/PersonRecruitment.vue'
export default {
	data() {
		return {
			// action: 'C:/Users/angel/Desktop/新建文件夹 (2)',
			// url:null,
			showview: true,
			sahow:false,
			public:{
				publicType:''
			},
			list: [
							{
								name: '洗衣机',
								checked: false,
								disabled: false
							},
							{
								
								name: '冰箱',
								checked: false,
								disabled: false
							},
							{
								
								name: '宽带',
								checked: false,
								disabled: false
							},
							{
								
								name: '热水器',
								checked: false,
								disabled: false
							},
							{
							
								name: '沙发',
								checked: false,
								disabled: false
							},
							{
								
								name: '可做饭',
								checked: false,
								disabled: false
							},
							{
								
								name: '电视机',
								checked: false,
								disabled: false
							},
							{
								
								name: '空调',
								checked: false,
								disabled: false
							},
							{
								
								name: '床',
								checked: false,
								disabled: false
							},
							{
								
								name: '智能门锁',
								checked: false,
								disabled: false
							},
							{
								
								name: '暖气',
								checked: false,
								disabled: false
							},
							{
								
								name: '阳台',
								checked: false,
								disabled: false
							},
							{
								
								name: '油烟机',
								checked: false,
								disabled: false
							},
							{
								
								name: '煤气灶',
								checked: false,
								disabled: false
							},
						],
			recruitment:{
				name: '',
				workType: '',
				phone:'',
				wechat:'',
				wagesType: '',
				zuf:'',
				worktime: '',
				goodsType: '',
				intro: '',
				region: '',
				loceng: '',
				photo:'',
				lasttime: '',
				count: '',
				show: false,
				photourl:'',
				industry:''
			},
			model:{
				name: '',
				workType: '',
				phone:'',
				wechat:'',
				wagesType: '',
				worktime: '',
				zuf:'',
				goodsType: '',
				loceng:'',
				intro: '',
				region: '',
				photo:'',
				lasttime: '',
				count: '',
				industry:'',
			},
			rules:{
				nam:[
					{
						required: true,
						message: '请输入标题',
						trigger: 'blur' ,
					}
				],
				name:[
					{
						required: true,
						message: '请输入小区',
						trigger: 'blur' ,
					}
				],
					phone: [
						{
							required: true,
							message: '请输入面积',
							trigger: 'blur'
						},
					],
					goodsType: [
						{
							required: true,
							message: '请选择房源类型',
							trigger: 'change',
						}
					],
					loceng: [
						{
							required: true,
							message: '请选择楼层类型',
							trigger: 'change',
						}
					],
					count:[
						{
							required: true,
							message: '出售价格不能空',
							trigger: 'blur' ,
						}
					],
					lasttime:[
						{
							required: true,
							message: '楼层不能为空',
							trigger: 'blur' ,
						}
					],
				
			},
			selectList: [
				{
					value: '1',
					label: '普通住宅'
				},
				{
					value: '2',
					label: '公寓'
				},
				{
					value: '3',
					label: '别墅'
				},
				{
					value: '4',
					label: '平房'
				},
				{
					value: '5',
					label: '商住楼'
				},
				{
					value: '0',
					label: '其他'
				},
			],
			selectList1: [
				{
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
			selectList5: [
				{
					value: '1',
					label: '一个月'
				},
				{
					value: '2',
					label: '三个月'
				},
				{
					value: '3',
					label: '半年'
				},
				{
					value: '4',
					label: '一年'
				},
				{
					value: '5',
					label: '不确定'
				},
				
				
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
			selectList3:[
				{
					value: '个人发布',
					label: '个人发布'
				},
				
			],
			actionSheetList: [
			{
				id:'1',
				text: '东'
			},
			{
				id:'2',
				text: '南'
			},
			{
				id:'3',
				text: '西'
			},
			{
				id:'4',
				text: '北'
			},
			{
				id:'5',
				text: '东西'
			},
			{
				id:'6',
				text: '东南'
			},
			{
				id:'7',
				text: '南北'
			},
			{
				id:'8',
				text: '西南'
			},
			{
				id:'9',
				text: '东北'
			},
			{
				id:'10',
				text: '西北'
			},
			
			],
			check: false,
			selectStatus: 'close',
			border: false,
			labelPosition: 'left',
			actionSheetShow: false,
			errorType: ['message'],
			pickerShow: false,
			selectShow: false,
			selectShow1:false,
			selectShow2:false,
			selectShow4:false,
			selectShow5:false,
			selectShow3:true,
			show: false,
			zoom: false,
	
			contentSlot: false,
			showTitle: true,
			asyncClose: false,
		};
	},
	components:{
		// PersonRecruitment
		
	},
	computed: {
		borderCurrent() {
			return this.border ? 0 : 1;
		}
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
		console.log("这是父组件")
	},
	onLoad() {
	   
	},
	
	methods:{
	// 选中某个复选框时，由checkbox时触发
		checkboxChange(e) {
		},
		// 选中任一checkbox时，由checkbox-group触发
		checkboxGroupChange(e) {
			console.log(2);
			console.log(e);
		},
		// 全选
		checkedAll() {
			this.list.map(val => {
				val.checked = true;
			})
		},
		// 关闭提示
		close() {
			this.show1 = false;
		},
		toCreate(){
			uni.navigateTo({
				url:'/pages/house/brokerpage/brokerpage'
			})
		},
		// 若不存在公司，则跳转创建公司
		asyncChange(index) {
			this.show = true;
			this.asyncClose = !index;
		},
		confirm() {
			uni.navigateTo({
				url:'/pages/house/brokerpage/brokerpage'
			})
			setTimeout(() => {
				this.show = false;
			}, 2000)
		},
		// 去创建公司
		ToCreate(){
			uni.navigateTo({
				url:'/pages/house/brokerpage/brokerpage'
			})
		},
		click(){
			let files = [];
			files = this.$refs.uUpload.lists;
			// this.urlTobase64(files[0].url); 
			this.base64(files[0].url)
			this.recruitment.photourl = files[0].url
			console.log(files[0].url);
			console.log(this.model.photo)
		},
		// 创建企业招聘信息
	    submit() {
			uni.navigateTo({
				// url:'/pages/house/pubilshedpage/pubilshedpage'
			})
			this.$refs.uForm.validate(valid => {
					if (valid) {
						
						
					}
				 })	
		},
		
		base64(url){
		      return new Promise((resolve, reject) => {
		        wx.getFileSystemManager().readFile({
		          filePath: url, //选择图片返回的相对路径
		          encoding: 'base64', //编码格式
		          success: res => {
		            resolve('data:image/' + ';base64,' + res.data)
					console.log(res)
					this.model.photo = res.data	
		          },
		          fail: res => reject(res.errMsg)
		        })
		      })
		},
		// 点击actionSheet回调
		actionSheetCallback(index) {
			uni.hideKeyboard();
			this.model.workType = this.actionSheetList[index].text;
		},
		// 选择职位类型回调
		selectConfirm(e) {
			this.model.goodsType = '';
			e.map((val, index) => {
				this.model.goodsType += this.model.goodsType == '' ? val.label : '-' + val.label;
			})
		},
		// 选择职位类型回调
		selectConfirm1(e) {
			this.model.wagesType = '';
			e.map((val, index) => {
				this.model.wagesType += this.model.wagesType == '' ? val.label : '-' + val.label;
			})
		},
		// 选择发布类型回调
		selectConfirm3(e) {
			let _this = this;
			this.public.publicType = '';
			e.map((val, index) => {
				this.public.publicType += this.public.publicType == '' ? val.label : '-' + val.label;
			})
			if(this.public.publicType=='求租发布'){
				this.showview = false
			}else{
				this.showview = true
			}
		},
		// 选择行业回调
		selectConfirm2(e){
			this.model.industry = '';
			e.map((val, index) => {
				this.model.industry += this.model.industry == '' ? val.label : '/' + val.label;
				
			})
		},
		// 选择楼层
		selectConfirm4(e) {
			this.model.loceng = '';
			e.map((val, index) => {
				this.model.loceng += this.model.loceng == '' ? val.label : '-' + val.label;
			})
		},
		// 
		selectConfirm5(e) {
			this.model.zuf = '';
			e.map((val, index) => {
				this.model.zuf += this.model.zuf == '' ? val.label : '-' + val.label;
			})
		},
		// 选择地区回调
		regionConfirm(e) {
			this.model.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
		},
		borderChange(index) {
			this.border = !index;
		},
		labelPositionChange(index) {
			this.labelPosition = index == 0 ? 'left' : 'top';
		},
		codeChange(text) {
			this.codeTips = text;
		},
		pupup(){
			this.show=true
		}
		
		
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	padding: 30rpx;
}

.title{
	text{
		color: #a0cfff;
	}
}
.company{
	text-align: center;
}
.public{
	// width: 100%;
	// height: 44px;
	// position: fixed;
	// bottom: 0rpx;
	
}
.upload{
	width: 30%;
	height: 160rpx;
	background-color: #F1F1F1;
}

</style>
