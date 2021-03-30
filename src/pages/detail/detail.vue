<template>
	<!-- 个体发布详情 -->
	<!-- <view class="personRecruitment" v-if="item.poster_path ==='默认海报路径'">
		<view class="head">
			<view class="tit">
				<text>招聘</text>
			</view>
			<view class="type">
				<text>全职</text>
			</view>
			<view class="wages">
				<text>面议</text>
			</view>
		</view>
		<view class="date">
			<text>2021-01-18日发布</text>
			<view class="look">
				<text>20人浏览</text>
			</view>
		</view>
		<notice></notice>
		<view class="introdetail">
			<view>
				<text>招聘详情</text>
			</view>
			<text>{{item.introduction}}</text>
		</view>
		<u-button type="success">
			<u-icon name="phone"></u-icon>
			拨打电话</u-button>
	</view> -->
	<!-- 企业发布详情-->
	<view class="content" style="height: 100%;">
		<redbag></redbag>
		<view class="wrap">
			<u-row gutter="16">
				<u-col span="7">
					<view class="demo-layout bg-purple">
						<view class="title">
							<text>{{item.recruitment_title}}</text>
						</view>
					</view>
				</u-col>
				
				<u-col span="5" text-align="right">
					<view class="demo-layout bg-purple-dark">
						<text>{{item.wages}}</text>
					</view>
				</u-col>
			</u-row>
			<u-row gutter="16" justify="space-between">
				<u-col span="4">
					<view class="demo-layout bg-purple">
						<text class="update">发布：{{item.publish_time.split("T")[0]}}</text>
					</view>
				</u-col>
				<u-col span="8" text-align="right">
					<view class="demo-layout bg-purple-light">	
					    <u-button size="mini" @click="refresh">刷新</u-button>
						<text>浏览：{{item.count}}</text>
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="detail">
			<view class="work">
				<view class="position">
					<text>职位：</text>
					<text>Java程序员</text>
				</view>
			</view>
			<view class="work">
				<view class="">
					<text>要求：</text>
					<text>{{item.experience}}经验</text>
				</view>
			</view>
			<view class="work">
				<view class="">
					<text>人数：{{item.recruitment_number}}</text>
				</view>
			</view>
			<view class="work">
				<view class="">
					<text>地区：</text>
					<text>{{item.address}}</text>
				</view>
			</view>
		</view>
		<!-- 职位详情 -->
		<WorkIntroduce :item="item"></WorkIntroduce>
		<!-- 公司导航 -->
		<Companybar :item="item" @itemClick="goCompany()"></Companybar>
		<map class="map" :longitude="longitude" :latitude="latitude" :markers="markers"></map>	
		<!-- 温馨提示 -->
		<WarningTip></WarningTip>
		<!-- 详情底部导航 -->
		<Bottombar @gochat="gochat" @Collect="Collect"
		 @UnCollect="UnCollect"
		 @Callphone="Callphone"
		  :collectId="collectId"
		  :releaseUserId="releaseUserId"
		  @UnCollect1="UnCollect1"
		  @Delivery="Delivery"
		  :DeliveryId="DeliveryId" v-show="nowUserId != releaseUserId"></Bottombar>
	</view>
	
</template>

<script>
	import WorkIntroduce from './childComps/WorkIntroduce.vue';
	import Companybar from './childComps/Companybar.vue'
	import WarningTip from './childComps/WarningTip.vue'
	import notice from '../components/notice.vue'
	import Bottombar from './childComps/BottomBar.vue'
	import redbag from './childComps/red_bag.vue'
	
	import {recruitmentList} from '../../util/recruitment.js'
	import { collectRecruitment, UncollectRecruitment } from '../../util/collection.js'
	import {addDelivery} from '../../util/recruitment/delivery.js'
	export default {
		data() {
			return {
				longitude: '',//经度
				latitude: '',//纬度
				nowUserId:'',  //当前用户id，用来判断该用户是否能投递简历，聊天，收藏等功能
				item:null,
				recruitmentId:'',
				phone:'',
				collectionRecruitmentId:'',
				collectId:'',
				DeliveryId:'',
				releaseUserId:'',  //发布人id，和当前用户id做判断
				markers: [{
					longitude: '',//经度
					latitude: '',//纬度
					iconPath: '',    //显示的图标
					title:'',//标注点名
				}]
				// count1:0
				// company_id: null
			}
		},
		components:{
			WorkIntroduce,
			Companybar,
			WarningTip,
			notice,
			Bottombar,
			redbag
		},
		onLoad(options) {
			console.log(options.user_id)
			this.nowUserId = this.$store.state.userid
			uni.showModal({
				title:'恭喜获得10积分'
			})
			this.getDetail(options.recruitment_id,options.user_id)
		},
		created() {
			// this.refresh();
			
		},
		methods: {
			// 收藏招聘
			Collect(){
				collectRecruitment({
					"recruitmentId": this.recruitmentId
				}).then(res=>{
					uni.showToast({
						title:'收藏成功'
					})
					console.log(res)
					this.collectionRecruitmentId = res.data.data.collectionRecruitmentId
				}).catch(err=>{
					console.log(err)
				})
			},
			// 取消收藏
			UnCollect(){
				console.log(this.collectionRecruitmentId)
				UncollectRecruitment({
					"collectionRecruitmentId": this.collectionRecruitmentId
				}).then(res=>{
					uni.showToast({
						title:'取消收藏'
					})
					console.log(res)
				}).catch(err=>{
					console.log(err)
				})
			},
			// 第二次进来取消收藏
			UnCollect1(){
				console.log(this.collectId)
				UncollectRecruitment({
					"collectionRecruitmentId": this.collectId
				}).then(res=>{
					uni.showToast({
						title:'取消收藏'
					})
					console.log(res)
				}).catch(err=>{
					console.log(err)
				})
			},
			// 投递简历
			Delivery(){
				addDelivery({
					"recruitmentId": this.recruitmentId,
					"releaseUserId": this.releaseUserId,
				}).then(res=>{
					console.log(res)
				}).catch(err=>{
					console.log(err)
				})
			},
			// 拨打电话
			Callphone(){
				uni.makePhoneCall({
				    phoneNumber: this.phone 
				});
			},
			// 跳转到聊天
			gochat(e){
					const res = this.$myRequest({
						url:'sys/message/addMessageUserList?toId='+e,
						dataType: "json",
						header: {
						        'content-type': 'application/json', 
						        },
						data:JSON.stringify({ 
						  
						}),
						method: 'POST'
					})
				uni.navigateTo({
					url:'/pages/detail/chat/chat?e='+e
				})
			},
			// 招聘详情
		   async getDetail(recruitment_id,user_id){

			   uni.showLoading({
			   	title:'正在加载...'
			   })
			   recruitmentList({
				"recruitment_id":recruitment_id,
				"paging":{
					"page":0
				}
			   }).then(res=>{
				   console.log(res)
				   uni.hideLoading()
				   this.recruitmentId = res.data.data.user_Recruitments[0].recruitment_id;
				   this.phone = res.data.data.user_Recruitments[0].phone;
				   this.item = res.data.data.user_Recruitments[0];
				   this.collectId = res.data.data.user_Recruitments[0].collectionRecruitmentId;
				   this.DeliveryId = res.data.data.user_Recruitments[0].deliveryId;
				   this.releaseUserId = res.data.data.user_Recruitments[0].user.id;
				   this.longitude = res.data.data.user_Recruitments[0].company.longitude;
				   this.latitude = res.data.data.user_Recruitments[0].company.latitude;
				   this.markers[0].longitude = res.data.data.user_Recruitments[0].company.longitude;
				   this.markers[0].latitude = res.data.data.user_Recruitments[0].company.latitude;
				   console.log(this.markers[0].longitude)
			   }).catch(err=>{
				   console.log(err)
			   })
			   
			},
			// 刷新
			refresh(){
				const res = this.$myRequest({
					url:'refreshTime',
					dataType: "json",
					header: {
					        'content-type': 'application/json', 
					        },
					data:JSON.stringify({ 
					    "user_id":1,
						"recruitment_id":125
					}),
					method: 'POST'
				})
			},
			// // 置顶
			// top(){
			// 	const res = this.$myRequest({
			// 		url:'addTopping',
			// 		dataType: "json",
			// 		header: {
			// 		        'content-type': 'application/json', 
			// 		        },
			// 		data:JSON.stringify({ 
			// 		    "user_id":1,
			// 			"recruitment_id":125
			// 		}),
			// 		method: 'POST'
			// 	})
			// },
			goCompany(company_id){
				uni.navigateTo({
					url:'/pages/companyDetail/companyDetail?company_id='+company_id
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	page{
		height:100%;
	}
	.content{
		height: calc(100% - 49px);
	}
	// 企业发布
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
		.position{
			display: flex;
			.icon{
				margin-left: 500rpx;
			}
		}
	}
	.detail{
		border-bottom: 10rpx solid #F1F1F1;
	}
	.map{
		width:100%;
		height: 400rpx;
		margin-left: 10rpx;
		border-radius: 25%;
	}
	// 个体发布
	.personRecruitment{
		
		.head{
			display: flex;
			padding: 15rpx;
			.tit{
				font-weight: bold;
				font-size: 40rpx;
			}
			.type{
				background-color: #F1F1F1;
				font-size: 20rpx;
				border-radius: 25%;
				text-align: center;
				margin: 10rpx;
				width: 60rpx;
				height: 30rpx;
				margin-top: 20rpx;
			}
			.wages{
				color: #ff0000;
				margin-left: 500rpx;
			}
		}
		.date{
			display: flex;
			padding: 15rpx;
			font-size: 25rpx;
			color: #999999;
			.look{
				margin-left: 400rpx;
			}
		}
		.introdetail{
			padding: 15rpx;
			text{
				margin-top: 10rpx;
				font-size: 35rpx;
				word-break:break-all;
			}
		}
	}
</style>
