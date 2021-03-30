<template>
	<view class="Resume">
		<!-- 中间导航 -->
		<tabBar @cityChange="cityChange" @wagesChange="wagesChange" @worktype="worktype" @selectsex="selectsex"></tabBar>
		<view class="resumelist" v-for="(item,index) in list" :key="index" @click="ResumeDetail(item.resumeId)">
			<u-avatar :src="item.src" size=100 show-sex=true :sex-icon="item.sex"></u-avatar>
			<view class="right">
				<view class="title">
					<text class="name">{{item.resumeName}}</text>
				</view>
				<view class="base">
					<view class="">
						<text>{{item.age}}岁-</text>
					</view>
					<view class="">
						<text>{{item.maxDegree}}-</text>
					</view>
					<view class="">
						<text>{{item.workCity}}</text>
					</view>
					<view class="">
						<text>{{workCity}}</text>
					</view>
				</view>
				<view class="work">
					<text>职位：{{item.industry}}</text>
					<view class="worktype">
						<text>{{item.workType}}</text>
					</view>
				</view>
				<view class="wages">
					<text>期望工资：{{item.compensation}}</text>
				</view>
			</view>
			<view class="time">
				<text>{{item.time.split("T")[0]}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import tabBar from './tabBar/tabBar.vue'
	
	import {resumeList} from '../../../util/resume.js'
	export default {
		data() {
			return {
				list:[],
				wages:'',
				work_types:'',
				city:'',
				sex:'',
				page:0
			}
		},
		created() {
		this.getResumelist()	
		},
		components:{
			tabBar
		},
		methods: {
			// 根据性别来查询
			async selectsex(data){
				// console.log(data)
				if(data=='男'){
					data = "man"
				}else{
					data = "woman"
				}
				resumeList({
				"sex": data,
				"wages": this.wages,
				"work_type":this.work_types,
				"work_city":this.work_city,
				"paging":{
					"page":this.page
				}
				}).then(res=>{
					console.log(res)
					this.list = res.data.data.resumes;
					for(var i=0;i<this.list.length;i++){
							if(this.list[i].sex == '男'){
								 this.list[i].sex = "man"
								
							}else{
								 this.list[i].sex = "woman"
							    }
							}
							 
				}).catch(err=>{
					console.log(err)
				})
				// const res = await this.$myRequest({
				// 	url:'findResume',
				// 	dataType: "json",
				// 	header: {
				// 	        'content-type': 'application/json', 
				// 	        },
				// 	data:JSON.stringify({ 
				// 		"sex": data,
				// 		"wages": this.wages,
				// 		"work_type":this.work_types,
				// 		"work_city":this.work_city,
				// 		"paging":{
				// 			"page":this.page
				// 		}
				// 	}),
				// 	method: 'POST'
				// })
				// console.log(res)
				// console.log(data)
				// this.list = res.data.data.resumes;
				// for(var i=0;i<this.list.length;i++){
				// 		if(this.list[i].sex == '男'){
				// 			 this.list[i].sex = "man"
							
				// 		}else{
				// 			 this.list[i].sex = "woman"
							
				// 		}
				// 		}
				this.sex = data
			},
			// 根据城市查询招聘列表
			async cityChange(data){
				resumeList({
				"work_city": data,
				"wages": this.wages,
				"paging":{
					"page":this.page
				}
				}).then(res=>{
					console.log(res)
					this.list = res.data.data.resumes;
					for(var i=0;i<this.list.length;i++){
							if(this.list[i].sex == '男'){
								 this.list[i].sex = "man"
								
							}else{
								 this.list[i].sex = "woman"
								
							}
							}
							 this.city = data
				}).catch(err=>{
					console.log(err)
				})
				
			},
			// 根据工资来查询
			async wagesChange(data){
				resumeList({
				"compensation": data,
				"work_city":this.city,
				"work_types":this.work_types,
				"paging":{
					"page":this.page
				}
				}).then(res=>{
					console.log(res)
					this.list = res.data.data.resumes;
					for(var i=0;i<this.list.length;i++){
							if(this.list[i].sex == '男'){
								 this.list[i].sex = "man"
								
							}else{
								 this.list[i].sex = "woman"
								
							}
							}
							this.wages = data
				}).catch(err=>{
					console.log(err)
				})
				
			},
			// 根据工作类型查询简历
			async worktype(data){
				resumeList({
				"compensation": this.wages,
				"work_city":this.city,
				"work_type":data,
				"paging":{
					"page":this.page
				}
				}).then(res=>{
					console.log(res)
					this.list = res.data.data.resumes;
					for(var i=0;i<this.list.length;i++){
							if(this.list[i].sex == '男'){
								 this.list[i].sex = "man"
								
							}else{
								 this.list[i].sex = "woman"
								
							}
							}
							this.work_types = data
				}).catch(err=>{
					console.log(err)
				})
				
			},
			// 查询简历列表
			async getResumelist(){
				uni.showLoading({
					title:'加载中...'
				})
				resumeList({
					"paging":{
						"page":0
					}
				}).then(res=>{
					console.log(res)
					 this.list = res.data.data.resumes;
					 if(res.data.code === 20000){
						 uni.hideLoading()
					 }
					 for(var i=0;i<this.list.length;i++){
					 		if(this.list[i].sex == '男'){
					 			 this.list[i].sex = "man"
					 			
					 		}else{
					 			 this.list[i].sex = "woman"
					 			
					 		}
							}
				}).catch(err=>{
					console.log(err)
				})
				
				},
			ResumeDetail(resumeId){
				uni.navigateTo({
					url:'/pages/ResumeDeatil/ResumeDeatil?resumeId='+resumeId
				})
			}
		}
	}
</script>

<style lang="scss">
.Resume{
	.resumelist{
		display: flex;
		padding: 20rpx 20rpx;
		border-bottom: 2rpx solid #F1F1F1;
		.right{
			margin-left: 15rpx;
			margin-right: 40rpx;
			view{
					font-size: 25rpx;
					
			}
			.title{
				display: flex;
				.name{
					width: 300rpx;
					font-weight: bold;
					font-size: 30rpx;
				}
				
			}
			.base{
				display: flex;
				view{
					margin: 0rpx 5rpx 0rpx;
				}
				
			}
			}
			.work{
				display: flex;
				.worktype{
					margin-left: 15rpx;
					font-size: 20rpx;
					color: #999999;
				}
			}
			.wages{
				color: #FF0000;
			}
			.time{
				font-size: 25rpx;
			}
	}
}

</style>
