<template>
	<view class="page" v-if="companyId!='null'">
		<view class="wrap">
			<u-row gutter="16">
				<u-col span="10">
					<view class="demo-layout bg-purple">
						<text>{{company.companyName}}</text>
					</view>
				</u-col>
				<u-col span="2">
					<view class="demo-layout bg-purple-dark">
						<u-avatar :src="'http://192.168.3.77:8080/'+company.logoPicturePath" mode="square"></u-avatar>
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="address">
			<view class="title">
				<text>公司地址</text>
			</view>
			<view class="detailAddress">
				<u-icon name="map-fill" size="28"></u-icon>
				<text>{{company.companyAddress}}</text>
			</view>
		</view>
		<view class="intro">
			<view class="title">
				<text>公司简介</text>
			</view>
			<u-read-more ref="uReadMore" text-indent="0" show-height="200" font-size="25" close-text="查看全部">
				<u-parse :html="html" @load="parseLoaded" font-size="15"></u-parse>
			</u-read-more>
		</view>
		<view class="welfare">
			<view class="title">
				<text>公司福利</text>
			</view>
			<view class="welfares">
				<view class="fuli" v-for="(item,index) in welfarelist" :key="index">
					<view class="welfare-item">
						<text>{{item}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="company_picture">
			<text>公司环境视频与相册</text>
			<scroll-view scroll-x="true">
				<video class="video" object-fit="fill" id="demoVideo" :controls="true" :enable-progress-gesture="false"
				 :show-center-play-btn="disable" autoplay=false :src="'http://192.168.3.9:8080/'+company.companyVideo.videoPath">
				</video>
				<view class="item1" v-for="item in listimg" :key="item">
					<image :src="'http://192.168.3.77:8080/'+item.picturePath" mode="" @tap="_previewImage('http://192.168.3.77:8080/'+item.picturePath)" mode="heightFix;widthFix"></image>
				</view>
			</scroll-view>
		</view>
		<u-button size="default" @click="toUpdateCompany(company.companyId)">修改</u-button>
	</view>
	<view v-else>
		<u-empty text="你还没有创建自己的公司,请先创建公司" mode="list" margin-top=600></u-empty>
		<view class="create">
			<u-button type="primary" @click="toCreateCompany">点击前往创建公司</u-button>
		</view>
	</view>
</template>

<script>
	import {findCompany} from '../../util/company.js'
	export default {
		data() {
			return {
				company:null,
				html: ``,
				companyId:'',
				listimg: [],
				welfarelist:[]
			}
		},
		onLoad(options) {
			console.log(options)
			this.companyId = options.companyId
			this.getmyCompany(options.companyId)
		},
		methods: {
			// 查询我的公司
			async getmyCompany(companyId) {
				findCompany({
					"companyId":companyId
				}).then(res=>{
					console.log(res)
					this.company = res.data.data.companys[0]
					this.listimg = res.data.data.companys[0].companyPicture
					this.html = res.data.data.companys[0].companyIntroduction
					this.welfarelist = res.data.data.companys[0].companyWelfares
				}).catch(err=>{
					console.log(err)
				})
				
			},
			// 若还没有创建公司，先前往创建公司
			toCreateCompany(){
				uni.navigateTo({
					url:'/pages/CreateCompany/CreateCompany'
				})
			},
			// 跳转到修改公司信息
			toUpdateCompany(companyId){
				uni.navigateTo({
					url:'/pages/myCompany/UpdateCompany/UpdateCompany?companyId='+companyId
				})
			},
			parseLoaded() {
				this.$refs.uReadMore.init();
			},
			_previewImage(image) {
				var imgArr = [];
				imgArr.push(image);
				//预览图片
				uni.previewImage({
					urls: imgArr,
					current: imgArr[0]
				});
			},

		}
	}
</script>

<style lang="scss">
	.page video {
		width: 50%;
		height: 250rpx;
	}
    .title{
		font-size: 26rpx;
		font-weight: bold;
	}
	.wrap {
		padding: 10rpx;
		border: 1rpx solid #F1F1F1;
	}

	.u-row {
		margin: 20rpx 0;
	}

	.demo-layout {
		height: 90rpx;
		border-radius: 8rpx;
	}

	.bg-purple {
		background: #FFFFFF;
		margin-top: 15rpx;

		text {
			font-weight: bold;
			font-size: 35rpx;

		}

	}

	// 地址
	.address {
		padding: 15rpx;
		margin-top: 10rpx;
	}

	.detailAddress {
		margin-top: 10rpx;
		width: 700rpx;
		color: #C0C0C0;
	}

	// 简介
	.intro {
		padding: 15rpx;
		margin-top: 10rpx;
		border: 1rpx solid #F1F1F1;
	}

	.welfare {
		padding: 15rpx;
		margin-top: 10rpx;
		.welfares{
			display: flex;
			flex-wrap: wrap;
			.fuli{
				padding: 10px;
				.welfare-item{
					width: 90px;
					height: 30px;
					background-color: #F1F1F1;
					text-align: center;
					padding-top: 5px;
					border-radius: 5%;
				}
			}
		}
	}

	.company_picture {
		padding: 15rpx;

		image {
			height: 150rpx;
			width: 25%;
			margin-top: 10rpx;
		}
	}

	scroll-view {
		width: 100%;
		height: 300rpx;
		white-space: nowrap;
	}

	.item1,
	.item2,
	.item3 {
		display: inline-block;
		width: 50%;
		height: 100%;
		padding: 5rpx;

		image {
			width: 100%;
			height: 250rpx;

		}
	}
	.create{
		width: 80%;
		margin-left: 40px;
	}
</style>
