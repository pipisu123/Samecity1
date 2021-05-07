<template>
	<view class="wrap">
		<swippe :imgLists="imgLists" :video="video"></swippe>
		<view class="text">
			<view class="house-title">
				<text>{{data.leaseType}}|</text>
				<text>{{data.title}}</text>
			</view>
			<view class="content">
				<view class="house-money">
					<text>{{data.money}}元/月</text>
				</view>
				<view class="house-pay">
					<text v-if="data.deposit===1&&data.payment===1">押一付一</text>
					<text v-else-if="data.deposit===1&&data.payment===2">押一付二</text>
					<text v-else-if="data.deposit===2&&data.payment===1">押二付一</text>
					<text v-else-if="data.deposit===2&&data.payment===2">押二付二</text>
					<text v-else-if="data.deposit===1&&data.payment===3">押一付三</text>
					<text v-else-if="data.deposit===3&&data.payment===1">押三付一</text>
					<text v-else-if="data.deposit===2&&data.payment===3">押二付三</text>
					<text v-else-if="data.deposit===6">半年付</text>
					<text v-else-if="data.deposit===12">年付</text>
				</view>
			</view>
		</view>
		<view class="house-info">
			<u-row gutter="16">
				<u-col span="4">
					<view class="demo-layout bg-purple">
						<view class="square">
							<text>{{data.square}}㎡</text>
						</view>
						<view class="color">
							<text>面积</text>
						</view>
					</view>
				</u-col>
				<u-col span="4">
					<view class="demo-layout">
						<view class="square">
							<text>{{data.roomNum}}室</text>
							<text>{{data.hallNum}}厅</text>
							<text>{{data.bathroomNum}}卫</text>
						</view>
						<view class="color">
							<text>房型</text>
						</view>
					</view>
				</u-col>
				<u-col span="4">
					<view class="demo-layout">
						<view class="square">
							<text>{{data.orientation}}</text>
						</view>
						<view class="color">
							<text>朝向</text>
						</view>
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="house-base">
			<view class="left">
				<view class="">
					<text>装修：{{data.decoration}}</text>
				</view>
				<view class="">
					<text>类型：{{data.houseType}}</text>
				</view>
				<view class="">
					<text>看房：{{data.canLookTime}}</text>
				</view>
			</view>
			<view class="right">
				<view class="">
					<text>楼层：{{data.floor}}/{{data.floorNum}}层</text>
				</view>
				<view class="">
					<text>电梯：{{data.elevator}}</text>
				</view>
			</view>
		</view>
		<view class="content1">
			<view class="bar">
				<u-row gutter="16">
					<u-col span="4">
						<view class="demo-layout bg-purple-light">
							<text>{{data.elevator}}</text>
						</view>
					</u-col>
					<u-col span="4">
						<view class="demo-layout bg-purple-light">
							<text>{{data.decoration}}</text>
						</view>
					</u-col>
					<u-col span="4">
						<view class="demo-layout bg-purple-light">
							<text>有阳台</text>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
		<!-- 房屋地图 -->
		<view class="map">
			<view class="map-title">
				{{data.community}}
			</view>
			<view class="house-map">
				<map class="map1" :longitude="longitude" :latitude="Latitude" :markers="markers"></map>
			</view>
		</view>
		<!-- 房屋设施 -->
		<view class="house-facilities">
			<view class="tit">
				<text>房屋设施</text>
			</view>
			<view class="facilities">
				<view class="facilities-item" v-for="(item,index) in list" :key="index">
					<u-icon name="checkmark"></u-icon>
					<text>{{item}}</text>
				</view>
			</view>
		</view>
		<!-- 经纪人信息 -->
		<view class="house-person">
			<view class="title">
				<text v-if="data.identityType === 1">房东信息</text>
				<text v-else>经纪人信息</text>
			</view>
			<view class="person-info">
				<view class="person-avatar">
					<u-avatar :src="data.imgPath"></u-avatar>
				</view>
				<view class="right">
				    <text>{{data.username}}</text>
					<view class="company">
						<text>茂名联想科技有限公司</text>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="">
					<text>{{data.generalize}}</text>
				</view>
			</view>
		</view>
		<Bar></Bar>
	</view>
</template>

<script>
	import swippe from '../bar/swippe.vue'
	import Bar from '../detailpage/Bar.vue'
	
	import { getLeaseDetails } from '../../../util/house/release.js'
	export default {
		data() {
			return {
				src:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2771526584,1093075756&fm=26&gp=0.jpg',
				data:null,
				Latitude:'',  //经度
				longitude:'',  //纬度
				markers: [{
					longitude: '',//经度
					latitude: '',//纬度
					iconPath: '',//显示的图标
					title:'',//标注点名
				}],
				imgLists:[],
				video: '',
				list: []
			}
		},
		onLoad(options) {
			console.log(options.id)
			this.houseDetail(options.id)
		},
		components: {
			swippe,
			Bar,
		},
		methods: {
			houseDetail(id){
				getLeaseDetails({
					"houseId":id
				}).then(res=>{
					console.log(res)
					this.data = res.data.data;
					this.Latitude = res.data.data.lat;
					this.longitude = res.data.data.lng;
					this.markers[0].longitude = res.data.data.lng;
					this.markers[0].latitude = res.data.data.lat;
					this.list = res.data.data.appliance;
					this.imgLists = res.data.data.imgLists;
					this.video = res.data.data.video;
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 10rpx;
		margin-bottom: 49px;
	}
    .title{
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

		.content {
			display: flex;
			margin-top: 10px;

			.house-money {
				font-size: 45rpx;
				color: #E55630;
			}

			.house-pay {
				font-size: 25rpx;
				color: #6E9095;
				margin-top: 8px;
				margin-left: 10px;
			}
		}
	}

	// 房屋面积等信息
	.house-info {
		padding: 15px;
		border-bottom: 2rpx solid #F1F1F1;

		.u-row {
			margin: 40rpx 0;
		}

		.demo-layout {
			height: 80rpx;
			border-radius: 8rpx;
			text-align: center;

			.square {
				font-size: 30rpx;
				font-weight: bold;
			}

			.color {
				font-size: 20rpx;
				color: #999999;
			}
		}

		.bg-purple {
			background: #FFFFFF;
		}

		.bg-purple-light {
			background: #82B1D1;
		}
	}

	// 
	.house-base {
		padding: 15px;
		display: flex;

		.left {
			padding-top: 5px;
		}

		.right {
			margin-left: 85px;
			padding-top: 5px;
		}
	}

	// 
	.content1 {
		padding: 15px;
		border-bottom: 2rpx solid #F1F1F1;

		.bar {
			width: 75%;

			.u-row {
				margin: 40rpx 0;
			}

			.demo-layout {
				height: 60rpx;
				width: 120rpx;
				border-radius: 10rpx;
				text-align: center;
			}

			.bg-purple-light {
				background: #82B1D1;
			}
		}
	}

	// 地图
	.map {
		border-radius: 25rpx;
        border-bottom: 2rpx solid #F1F1F1;
		.map-title {
			padding: 15px;
			font-size: 40rpx;
			font-weight: bold;
		}

		.house-map {
			width: 90%;
			margin-left: 10px;
		}

		.map1 {
			width: 100%;
			padding: 10px;
		}
	}

	// 房屋设施
	.house-facilities {
		padding: 15px;
		border-bottom: 2rpx solid #F1F1F1;
		.tit {
			font-size: 40rpx;
			font-weight: bold;
		}

		.facilities {
			display: flex;
			flex-wrap: wrap;
			width: 90%;
			margin-left: 10px;
			.facilities-item{
				width: 150rpx;
				padding: 5px;
			}
		}
	}
// 经纪人信息
.house-person{
	padding: 15px;
	border-bottom: 2rpx solid #F1F1F1;
	.person-info{
		padding: 10px;
		display: flex;
		.right{
			margin-left: 10px;
			.company{
				color: #999999;
				margin-top: 10rpx;
			}
		}
	}
}
</style>
