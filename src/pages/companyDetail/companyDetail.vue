<template>
	<view class="companyDetail">
		<view class="wrap">
			<u-row gutter="16">
				<u-col span="10">
					<view class="demo-layout bg-purple">
						<text>{{list.company_name}}</text>
					</view>
				</u-col>
				<u-col span="2">
					<view class="demo-layout bg-purple-dark">
						<u-avatar :src="'http://192.168.101.24:8080/'+list.logo_picture_path" mode="square"></u-avatar>
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="address">
			<view class="tit">
				<text>公司地址</text>
			</view>
			<view class="detailAddress">
				<text>{{list.company_address}}</text>
			</view>
		</view>
		<view class="intro">
			<text>公司简介</text>
			<u-read-more ref="uReadMore" text-indent="0" show-height="200" font-size="25" close-text="查看全部" color="#C0C0C0">
				<u-parse :html="list.company_introduction" @load="parseLoaded" font-size="15"></u-parse>
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
			<text>公司相册</text>
			<scroll-view scroll-x="true">
				<view class="item1">
					<image src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3512557436,3609543414&fm=26&gp=0.jpg" mode=""></image>
				</view>
				<view class="item2">
					<image src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=566496445,288264743&fm=26&gp=0.jpg" mode=""></image>
				</view>
				<view class="item3">
					<image src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3512557436,3609543414&fm=26&gp=0.jpg" mode=""></image>
				</view>
			</scroll-view>
		</view>
		<comment></comment>
	</view>
</template>

<script>
	import comment from './childComps/comment.vue'
	
	import {findCompany} from '../../util/company.js'
	export default {
		data() {
			return {
				img: [
					'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3512557436,3609543414&fm=26&gp=0.jpg',
					'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=566496445,288264743&fm=26&gp=0.jpg',
				],
				list: null,
				welfarelist:[]
			}
		},
		components: {
			comment
		},
		onLoad(options) {
			console.log(options)
			this.goCompany(options.company_id)
		},
		methods: {
			parseLoaded() {
				this.$refs.uReadMore.init();
			},
			async goCompany(company_id) {
				findCompany({
					"company_id": company_id
				}).then(res=>{
					console.log(res)
					this.list = res.data.data.companys[0]
					this.welfarelist = res.data.data.companys[0].company_welfares
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
		margin-top: 15rpx;
		text {
			font-weight: bold;
			font-size: 35rpx;
		}

	}

	.address {
		padding: 15rpx;
		margin-top: 10rpx;
	}

	.detailAddress {
		margin-top: 10rpx;

		color: #C0C0C0;
	}

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
</style>
