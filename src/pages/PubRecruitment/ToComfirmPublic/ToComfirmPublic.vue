<template>
	<view class="content">
		<view class="wrap">
			<u-row gutter="16">
				<u-col span="7">
					<view class="demo-layout bg-purple">
						<view class="title">
							<text>{{recruitment2.name}}</text>
						</view>
					</view>
				</u-col>
				
				<u-col span="5" text-align="right">
					<view class="demo-layout bg-purple-dark">
						<text>{{recruitment2.wagesType}}</text>
					</view>
				</u-col>
			</u-row>
			<u-row gutter="16" justify="space-between">
				<u-col span="4">
					<view class="demo-layout bg-purple">
						<text class="update">更新：2021-01-10</text>
					</view>
				</u-col>
				<u-col span="8" text-align="right">
					<view class="demo-layout bg-purple-light">	
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="detail">
			<view class="work">
				<view class="">
					<text>职位：</text>
					<text>{{recruitment2.industry}}.{{recruitment2.goodsType}}</text>
				</view>
			</view>
			<view class="work">
				<view class="">
					<text>要求：</text>
					<text>{{recruitment2.worktime}}经验</text>
				</view>
			</view>
			<view class="work">
				<view class="">
					<text>人数：{{recruitment2.count}}</text>
				</view>
			</view>
			<view class="work">
				<view class="">
					<text>地区：</text>
					<text>{{recruitment2.region}}</text>
				</view>
			</view>
		</view>
		<!-- 职位详情 -->
		<view class="content">
			<view class="nav">
				<text>职位详情</text>
			</view>
			<u-read-more ref="uReadMore" text-indent="0" show-height="200" font-size="25" close-text="查看全部">
					<u-parse :html="recruitment2.intro" @load="parseLoaded"></u-parse>
			</u-read-more>
		</view>
		<map class="map" :longitude="longitude" :latitude="latitude"></map>	
		<!-- 温馨提示 -->
		<WarningTip></WarningTip>
		<u-button @click="create" type="primary">立即发布</u-button>
		<u-modal ref="uModal" v-model="show" :show-cancel-button="true"
			:show-title="showTitle" :async-close="asyncClose"
			@confirm="confirm" :content="content" confirm-text="去创建公司"
		>
		</u-modal>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import WarningTip from '../../detail/childComps/WarningTip.vue'
	
	import { addRecruitment } from '../../../util/recruitment.js'
	import { findRecruitmentUser } from '../../../util/recruitment/personCenter.js'
	export default {
		data() {
			return {
				show:false,
				content:'您还没有创建公司，请先创建公司',
				showTitle: true,
				companyId:'',
				recruitment2:{
					name: '',
					workType: '',
					phone:'',
					wechat:'',
					wagesType: '',
					worktime: '',
					goodsType: '',
					intro: '',
					region: '',
					photo:'',
					lasttime: '',
					count: '',
					show: false,
					photourl:'',
					industry:''
				},
				longitude:110.922477,
				latitude: 21.666885,
			}
		},
		onLoad(options) {
			const recruitment = JSON.parse(decodeURIComponent(options.recruitment1));
			this.recruitment2.name = recruitment.name
			this.recruitment2.workType = recruitment.workType
			this.recruitment2.phone = recruitment.phone
			this.recruitment2.wechat = recruitment.wechat
			this.recruitment2.wagesType = recruitment.wagesType
			this.recruitment2.worktime = recruitment.worktime
			this.recruitment2.goodsType = recruitment.goodsType
			this.recruitment2.intro = recruitment.intro
			this.recruitment2.count = recruitment.count
			this.recruitment2.photo = recruitment.photo
			this.recruitment2.photourl = recruitment.photourl
			this.recruitment2.region = recruitment.region
			this.recruitment2.industry = recruitment.industry
			console.log(recruitment)
		},
		components:{
			WarningTip
		},
		methods: {
			// 文本
			parseLoaded() {
							this.$refs.uReadMore.init();
						},
		    // 确认
			confirm(){
				setTimeout(() => {
					this.show = false;
				}, 2000)
				uni.navigateTo({
					url:'/pages/CreateCompany/CreateCompany'
				})
			},
			// 创建招聘
			create(){
				findRecruitmentUser({
					
				}).then(res=>{
					console.log(res)
					this.companyId = res.data.data.recruitmentUserVO.companyId
					if(res.data.data.recruitmentUserVO.companyId === '0'){
						this.show = true
						console.log("还没有创建公司")
					    }else{
						   uni.showLoading({
						   	title:'发布中...'
						   })
						   addRecruitment(
						   {
						    // "user_id": "8040423884719751168",
						    "company_id": this.companyId,
						    "recruitment_title":this.recruitment2.name,
						    "work_types":this.recruitment2.workType,
						    "work_name":this.recruitment2.goodsType,
						    "experience":this.recruitment2.worktime,
						    "address":this.recruitment2.region,
						    "introduction": this.recruitment2.intro,
						    "max_degree":this.recruitment2.worktime,
						    "wages": this.recruitment2.wagesType,
						    "poster":{
						   	"picture_file": this.recruitment2.photo
						    },
						    "industry":this.recruitment2.industry,
						    "phone": this.recruitment2.phone,
						    "wechat": this.recruitment2.wechat,
						   "recruitment_number": this.recruitment2.count
						   }
						   ).then(res=>{
						   	console.log(res)
						   	if(res.data.code===20000){
						   		uni.hideLoading()
						   		uni.reLaunch({
						   			url:'/pages/man/man'
						   		})
						   	}else{
						   		uni.showToast({
						   			title:'发布失败'
						   		})
						   	}
						   }).catch(err=>{
						   	console.log(err)
						   })
					}
				}).catch(err=>{
					console.log(err)
				})
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap {
		padding: 10rpx;
		border-bottom: 4rpx solid #F1F1F1;
	}

	.u-row {
		margin: 40rpx 0;
	}

	.demo-layout {
		height: 80rpx;
		border-radius: 8rpx;
		
	}

	.bg-purple {
		background: #FFFFFF;
		.title{
			font-size: 40rpx;
			font-weight: bold;
		}
		.update{
			font-size: 20rpx;
		}
		
	}

	.bg-purple-light {
		background: #FFFFFF;
		
	}

	.bg-purple-dark {
		background:  #FFFFFF;
		text{
			color: #FF0000;
		}
	}
	.work{
		display: flex;
		padding: 10rpx;
	}
	.detail{
		border-bottom: 10rpx solid #F1F1F1;
	}
	.map{
		width:98%;
		height: 400rpx;
		padding: 15rpx;
		margin-left: 10rpx;
		border-radius: 25%;
	}
	.bottom{
		width: 100%;
		height: 44px;
		position: fixed;
		bottom: 0rpx;
		border-top: 5rpx solid #F1F1F1;
	}
	// 职位详情
	.content{
		border-bottom: 10rpx solid #F1F1F1;
		padding: 10rpx;
	}
	.nav{
		border-bottom: 1rpx solid #F1F1F1;
		padding: 10rpx;
	}
</style>
