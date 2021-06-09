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
							<text>{{item.recruitmentTitle}}</text>
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
						<text class="update">发布：{{item.publishTime}}</text>
					</view>
				</u-col>
				<u-col span="8" text-align="right">
					<view class="demo-layout bg-purple-light">
						<!-- <u-button size="mini" @click="refresh">刷新</u-button> -->
						<u-icon name="eye" size=30 color="#999999"></u-icon>
						<text style="margin-left: 5rpx;">{{item.count}}</text>
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="detail">
			<view class="work">
				<view class="position">
					<text>职位：</text>
					<text>{{item.industry}}</text>
				</view>
			</view>
			<view class="work">
				<view class="">
					<text>要求：</text>
					<text>{{item.experience}}年经验</text>
				</view>
			</view>
			<view class="work">
				<view class="">
					<text>招聘人数：{{item.recruitmentNumber}}人</text>
				</view>
			</view>
			<view class="work">
				<view class="">
					<u-icon name="map" size=28></u-icon>
					<text style="color: #999999;">{{item.address}}</text>
				</view>
			</view>
		</view>
		<!-- 职位详情 -->
		<WorkIntroduce :item="item"></WorkIntroduce>
		<!-- 公司导航 -->
		<view style="font-size: 35rpx;font-weight: bold;padding: 10rpx;">公司信息</view>
		<Companybar :item="item" @itemClick="goCompany(item.companyId)"></Companybar>
		<map style="width: 100%;height: 300rpx;" :longitude="longitude" :latitude="latitude" :markers="markers" @tap="Navigation(item.companyName,item.address)"></map>
		<!-- 温馨提示 -->
		<WarningTip></WarningTip>
		<!-- 详情底部导航 -->
		<Bottombar @gochat="gochat" @Collect="Collect" @unCollect="unCollect" @Callphone="Callphone" :collection="collection"
		 :releaseUserId="releaseUserId" @Delivery="Delivery" :delivery="delivery" v-show="nowUserId != releaseUserId"></Bottombar>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import WorkIntroduce from './childComps/WorkIntroduce.vue';
	import Companybar from './childComps/Companybar.vue'
	import WarningTip from './childComps/WarningTip.vue'
	import notice from '../components/notice.vue'
	import Bottombar from './childComps/BottomBar.vue'
	import redbag from './childComps/red_bag.vue'

	import {
		findRecruitmentById
	} from '@/util/recruitment/position.js'
	import {
		collectRecruitment,
		UncollectRecruitment
	} from '@/util/recruitment/position.js'
	import {
		addDelivery
	} from '../../util/recruitment/delivery.js'
	export default {
		data() {
			return {
				longitude: '', //经度
				latitude: '', //纬度
				nowUserId: '', //当前用户id，用来判断该用户是否能投递简历，聊天，收藏等功能
				item: null,
				recruitmentId: '',
				phone: '',
				collectionRecruitmentId: '',
				collection: null,
				delivery: null,
				releaseUserId: '', //发布人id，和当前用户id做判断
				markers: [{
					longitude: '', //经度
					latitude: '', //纬度
					iconPath: '', //显示的图标
					title: '', //标注点名
				}]
				// count1:0
				// company_id: null
			}
		},
		components: {
			WorkIntroduce,
			Companybar,
			WarningTip,
			notice,
			Bottombar,
			redbag
		},
		onLoad(options) {
			console.log(options.id)
			this.nowUserId = this.$store.state.userid
			this.getDetail(options.recruitmentId, options.id)
		},
		created() {
			// this.refresh();

		},
		methods: {
			// 导航
			Navigation(companyName, address) {
				// console.log(that.Latitude)
				const Latitude = this.latitude;
				const longitude = this.longitude;
				uni.openLocation({
					latitude: Number(Latitude),
					longitude: Number(longitude),
					name: companyName,
					address: address
				});
			},
			// 收藏招聘
			Collect() {
				this.collection = 1;
				collectRecruitment({
					"recruitmentId": this.recruitmentId
				}).then(res => {
					console.log(res)
					this.$refs.uToast.show({
						title: '收藏成功',
						type: 'default',
					})
				}).catch(err => {
					console.log(err)
				})
			},
			// 取消收藏
			unCollect() {
				this.collection = 0;
				UncollectRecruitment({
					"recruitmentId": this.recruitmentId
				}).then(res => {
					console.log(res)
					this.$refs.uToast.show({
						title: '已取消收藏',
						type: 'default',
					})
				}).catch(err => {
					console.log(err)
				})
			},
			// 投递简历
			Delivery() {
				addDelivery({
					"recruitmentId": this.recruitmentId,
					"releaseUserId": this.releaseUserId,
				}).then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			},
			// 拨打电话
			Callphone() {
				uni.makePhoneCall({
					phoneNumber: this.phone
				});
			},
			// 跳转到聊天
			gochat(e) {
				const res = this.$myRequest({
					url: 'sys/message/addMessageUserList?toId=' + e,
					dataType: "json",
					header: {
						'content-type': 'application/json',
					},
					data: JSON.stringify({

					}),
					method: 'POST'
				})
				uni.navigateTo({
					url: '/pages/detail/chat/chat?e=' + e
				})
			},
			// 招聘详情
			async getDetail(recruitmentId, id) {
				console.log(recruitmentId)
				uni.showLoading({
					title: '正在加载...'
				})
				findRecruitmentById({
					"recruitmentId": recruitmentId,
				}).then(res => {
					console.log(res)
					uni.hideLoading()
					this.recruitmentId = res.data.data.user_Recruitments.recruitmentId;
					this.phone = res.data.data.user_Recruitments.phone;
					this.item = res.data.data.user_Recruitments;
					this.collection = res.data.data.user_Recruitments.collection;
					this.delivery = res.data.data.user_Recruitments.delivery;
					this.releaseUserId = res.data.data.user_Recruitments.id;
					this.longitude = res.data.data.user_Recruitments.longitude;
					this.latitude = res.data.data.user_Recruitments.latitude;
					this.markers[0].longitude = res.data.data.user_Recruitments.longitude;
					this.markers[0].latitude = res.data.data.user_Recruitments.latitude;
					console.log(this.markers[0].longitude)
				}).catch(err => {
					console.log(err)
				})

			},
			// 刷新
			refresh() {
				const res = this.$myRequest({
					url: 'refreshTime',
					dataType: "json",
					header: {
						'content-type': 'application/json',
					},
					data: JSON.stringify({
						"user_id": 1,
						"recruitment_id": 125
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
			goCompany(companyId) {
				uni.navigateTo({
					url: '/pages/companyDetail/companyDetail?companyId=' + companyId
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		height: 100%;
	}

	.content {
		height: calc(100% - 49px);
		margin-bottom: 49px;
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

		.title {
			font-size: 40rpx;
			font-weight: bold;
		}

		.update {
			font-size: 20rpx;
		}

	}

	.bg-purple-light {
		background: #FFFFFF;

	}

	.bg-purple-dark {
		background: #FFFFFF;

		text {
			color: #FF0000;
		}
	}

	.work {
		display: flex;
		padding: 10rpx;

		.position {
			display: flex;

			.icon {
				margin-left: 500rpx;
			}
		}
	}

	.detail {
		border-bottom: 10rpx solid #F1F1F1;
	}

	// 个体发布
	.personRecruitment {

		.head {
			display: flex;
			padding: 15rpx;

			.tit {
				font-weight: bold;
				font-size: 40rpx;
			}

			.type {
				background-color: #F1F1F1;
				font-size: 20rpx;
				border-radius: 25%;
				text-align: center;
				margin: 10rpx;
				width: 60rpx;
				height: 30rpx;
				margin-top: 20rpx;
			}

			.wages {
				color: #ff0000;
				margin-left: 500rpx;
			}
		}

		.date {
			display: flex;
			padding: 15rpx;
			font-size: 25rpx;
			color: #999999;

			.look {
				margin-left: 400rpx;
			}
		}

		.introdetail {
			padding: 15rpx;

			text {
				margin-top: 10rpx;
				font-size: 35rpx;
				word-break: break-all;
			}
		}
	}
</style>
