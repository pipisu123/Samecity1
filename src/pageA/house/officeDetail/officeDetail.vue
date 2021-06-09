<template>
	<view style="margin-bottom: 49px;">
		<view class="">
			<imgsBanner :imgList='imgList' :currentImg='currentImg' :video="video"></imgsBanner>
		</view>
		<u-modal ref="uModal" v-model="show" :show-cancel-button="true"  :async-close="asyncClose" title="提示"
		 @confirm="confirm(detail.phone)" :content="'是否拨打'+detail.phone" confirm-text="确定">
		</u-modal>
		<view class="wrap">
			<view class="text">
				<view class="house-title">
					<text>{{detail.title}}</text>
				</view>
			</view>
			<view class="layout">
				<view style="line-height: 20px;" v-if="detail.sendType === 4">
					<view style="color: #F76260;" >{{detail.price}}万</view>
					<view style="font-size: 25rpx;margin-left: 10rpx;">售价</view>
				</view>
				<view style="line-height: 20px;" v-else>
					<view style="color: #F76260;" >{{detail.price}}{{detail.moneyUnits}}</view>
					<view style="font-size: 25rpx;margin-left: 10rpx;">租金</view>
				</view>
				<view style="line-height: 20px;" v-show="detail.sendType === 3">
					<view style="color: #F76260;" v-if="detail.deposit===1&&detail.payment===1">押一付一</view>
					<view style="color: #F76260;" v-else-if="detail.deposit===1&&detail.payment===2">押一付二</view>
					<view style="color: #F76260;" v-else-if="detail.deposit===2&&detail.payment===2">押二付二</view>
					<view style="color: #F76260;" v-else-if="detail.deposit===2&&detail.payment===1">押二付一</view>
					<view style="color: #F76260;" v-else-if="detail.deposit===1&&detail.payment===3">押一付三</view>
					<view style="color: #F76260;" v-else-if="detail.deposit===3&&detail.payment===1">押三付一</view>
					<view style="color: #F76260;" v-else-if="detail.deposit===2&&detail.payment===3">押二付三</view>
					<view style="color: #F76260;" v-else-if="detail.payment===6">半年付</view>
					<view style="color: #F76260;" v-else-if="detail.payment===12">年付</view>
					<view style="font-size: 25rpx;margin-left: 20rpx;">押金</view>
				</view>
				<view style="line-height: 20px;">
					<view style="color: #F76260;">{{detail.square}}㎡</view>
					<view style="font-size: 25rpx;">面积</view>
				</view>
			</view>
			<view class="layout1">
				<view style="line-height: 10px;display: flex;">
					<view style="color: #C9C9C9;">类型</view>
					<view style="font-size: 25rpx;margin-left: 10rpx;">{{detail.officeTypes}}</view>
				</view>
				<view style="line-height: 10px;display: flex;">
					<view style="color: #C9C9C9;">注册</view>
					<view style="font-size: 25rpx;margin-left: 20rpx;" v-if="detail.isRegisterCompany === 1">可注册</view>
					<view style="font-size: 25rpx;margin-left: 20rpx;" v-if="detail.isRegisterCompany === 2">不可注册</view>
				</view>
			</view>
			<view class="layout1">
				<view style="line-height: 10px;display: flex;">
					<view style="color: #C9C9C9;">楼层</view>
					<view style="font-size: 25rpx;margin-left: 10rpx;">
						<text v-if="detail.floorType === 1">单层/</text>
						<text v-else>独栋/</text>
						<text>{{detail.floors[0]}}</text>
						<text v-show="detail.floorType === 1">{{detail.floors[1]}}</text>
					</view>
				</view>
				<view style="line-height: 10px;display: flex;">
					<view style="color: #C9C9C9;">注册</view>
					<view style="font-size: 25rpx;margin-left: 20rpx;" v-if="detail.isRegisterCompany === 1">可注册</view>
					<view style="font-size: 25rpx;margin-left: 20rpx;" v-if="detail.isRegisterCompany === 2">不可注册</view>
				</view>
			</view>
			<view class="layout1">
				<view style="line-height: 10px;display: flex;">
					<view style="color: #C9C9C9;">分割</view>
					<view style="font-size: 25rpx;margin-left: 20rpx;" v-if="detail.isPartition === 1">可分割</view>
					<view style="font-size: 25rpx;margin-left: 20rpx;" v-if="detail.isPartition === 2">不可分割</view>
				</view>
				<view style="line-height: 10px;display: flex;">
					<view style="color: #C9C9C9;">使用率</view>
					<view style="font-size: 25rpx;margin-left: 20rpx;">{{detail.houseEfficient}}%</view>
				</view>
			</view>
			<view class="layout1">
				<view style="line-height: 10px;display: flex;">
					<view style="color: #C9C9C9;">装修</view>
					<view style="font-size: 25rpx;margin-left: 10rpx;">{{detail.decorations}}</view>
				</view>
				<view style="line-height: 10px;display: flex;">
					<view style="color: #C9C9C9;">分割</view>
					<view style="font-size: 25rpx;margin-left: 20rpx;" v-if="detail.isPartition === 1">可分割</view>
					<view style="font-size: 25rpx;margin-left: 20rpx;" v-if="detail.isPartition === 2">不可分割</view>
				</view>
			</view>
			<view class="layout1">
				<view style="line-height: 10px;display: flex;">
					<view style="color: #C9C9C9;">物业费</view>
					<view style="font-size: 25rpx;margin-left: 10rpx;">{{detail.propertyFees}}</view>
				</view>
			</view>
			<view class="layout">
				<view style="line-height: 20px;">
					<view style="line-height: 20px;border-style: solid;border: 3rpx solid #999999;">{{detail.decorations}}</view>
				</view>
				<view style="line-height: 20px;">
					<view style="line-height: 20px;border-style: solid;border: 3rpx solid #999999;" v-if="detail.isRegisterCompany === 1">可注册</view>
					<view style="line-height: 20px;border-style: solid;border: 3rpx solid #999999;" v-if="detail.isRegisterCompany === 2">不可注册</view>
				</view>
				<view style="line-height: 20px;">
					<view style="line-height: 20px;border-style: solid;border: 3rpx solid #999999;">纯写字楼</view>
				</view>
			</view>
		</view>
		<!-- 经纪人或房东信息 -->
		<view class="house-person">
			<view class="title">
				<text>经纪人信息</text>
			</view>
			<view class="person-info">
				<view class="person-avatar">
					<u-avatar :src="detail.imgPath"></u-avatar>
				</view>
				<view class="right">
					<text>{{detail.username}}</text>
					<view class="company">
						<text>{{detail.companyName}}</text>
					</view>
				</view>
			</view>
			<view class="content">
				<view style="font-size: 30rpx;font-weight: bold;">
					<text>房源亮点</text>
				</view>
				<view style="font-size: 25rpx;">
					<text>{{detail.sellingPoint}}</text>
				</view>
			</view>
			<view style="margin-top: 50rpx;">
				<view style="font-size: 30rpx;font-weight: bold;">
					<text>服务介绍</text>
				</view>
				<view style="font-size: 25rpx;">
					<text>{{detail.service}}</text>
				</view>
			</view>
			<view style="margin-top: 30rpx;">
				<view style="font-size: 30rpx;font-weight: bold;">
					<text>配套设施</text>
				</view>
				<view style="display: flex;justify-content: space-between;flex-wrap: wrap;">
					<view style="display: flex;margin-top: 20rpx;" v-for="(item,index) in detail.facility" :key="index">
						<u-icon name="checkbox-mark" size="25"></u-icon>
						<view>{{item}}</view>
					</view>
				</view>
			</view>
			<view>
				<view style="font-size: 40rpx;font-weight: bold;margin-top: 20rpx;">
					<text>{{detail.estateName}}</text>
				</view>
				<view class="house-map">
					<map class="map1" :longitude="markers[0].longitude" :latitude="markers[0].latitude" :markers="markers"></map>
				</view>
			</view>
		</view>
		<Bottombar @unCollect="unCollect(detail.id,detail.sendType)" :isFavorites="isFavorites" @Collect="Collect(detail.id,detail.sendType)" @gochat="gochat(detail.userId)" @toCall="toCall" @tap="Navigation(detail.estateName)"></Bottombar>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import imgsBanner from '@/pageA/house/common/imgsBanner-tag.vue'
	import Bottombar from '../common/bottomBar.vue'
	import {
		getOfficeDetails
	} from '@/util/house/office.js'
	import {
		addFavorites,
		deleteFavorites
	} from '@/util/house/common.js'
	import { addMessageUserList } from '@/util/house/chat.js'
	export default {
		data() {
			return {
				detail: {},
				isFavorites: '',
				video:'',
				show: false,
				markers: [{
					longitude: '',//经度
					latitude: '',//纬度
					iconPath: '',//显示的图标
					title:'',//标注点名
				}],
				imgList: [],
				currentImg: 0, //当前默认选中
			}
		},



		onLoad(options) {
			console.log(options.id)
			this.getDetails(options.id)
		},
		components: {
			imgsBanner,
			Bottombar
		},
		methods: {
			// 导航
			Navigation(estateName) {
				// console.log(that.Latitude)
				const Latitude = this.markers[0].latitude;
				const longitude = this.markers[0].longitude;
				uni.openLocation({
					latitude: Number(Latitude),
					longitude: Number(longitude),
					name: estateName,
					address: "广东省茂名市茂南区光华南路128号"
				});
			},
			// 取消收藏
			unCollect(id,sendType) {
				this.isFavorites = false
				deleteFavorites({
					"houseId": id,
					"houseType": sendType,
				}).then(res => {
					console.log(res)
					if(res.data.code === 0){
						this.$refs.uToast.show({
							title: '取消收藏',
							type: 'default',
						})
					}else{
						this.$refs.uToast.show({
							title: '取消失败，请重试',
							type: 'error',
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 打电话
			toCall(){
				this.show = true
			},
			confirm(phone){
				uni.makePhoneCall({
				    phoneNumber: phone 
				});
			},
			// 收藏
			Collect(id,sendType) {
				this.isFavorites = true
				console.log(sendType)
				addFavorites({
					"houseId": id,
					"houseType": sendType,
				}).then(res => {
					console.log(res)
					if(res.data.code === 0){
						this.$refs.uToast.show({
							title: '收藏成功',
							type: 'default',
						})
					}else{
						this.$refs.uToast.show({
							title: '收藏失败，请重试',
							type: 'error',
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			gochat(e){
				addMessageUserList({
					"toId": e,
				}).then(res=>{
					console.log(res)
					uni.navigateTo({
						url:'/pages/detail/chat/chat?e='+e
					})
				}).catch(err=>{
					console.log(err)
				})
			},
			getDetails(id) {
				console.log(id)
				getOfficeDetails({
					"houseId": id,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						this.imgList = res.data.data.imgLists;
						this.detail = res.data.data;
						this.markers[0].longitude = res.data.data.lng;
						this.markers[0].latitude = res.data.data.lat;
						this.video = res.data.data.video;
						this.isFavorites = res.data.data.isFavorites;
					} else {

					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 10rpx;
		// margin-bottom: 49px;
		border-bottom: 5px solid #F1F1F1;
	}

	.title {
		font-size: 40rpx;
		font-weight: bold;
	}

	// 房屋价格
	.text {
		padding: 15px;
		border-bottom: 2rpx solid #F1F1F1;

		.house-title {
			font-size: 36rpx;
			font-weight: bold;
		}
	}

	.layout {
		display: flex;
		justify-content: space-around;
		margin-top: 20rpx;
		width: 95%;
	}

	.layout1 {
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
		width: 90%;
		padding: 20rpx;
	}

	// 经纪人信息
	.house-person {
		padding: 15px;
		border-bottom: 2rpx solid #F1F1F1;

		.person-info {
			padding: 10px;
			display: flex;

			.right {
				margin-left: 10px;

				.company {
					color: #999999;
					margin-top: 10rpx;
				}
			}
		}
	}

	.house-map {
		width: 92%;
		margin-left: 20px;
		margin-top: 15rpx;
	}
</style>
