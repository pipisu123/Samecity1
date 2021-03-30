<template>
	<view class="news" v-if="Deliverylist.length !=0">
		<view class="new-items" v-for="(item,index) in Deliverylist" :key="index" @click="goDetail(item.recruitment.recruitment_id)">
			<image :src="'http://192.168.101.24:8080/'+item.recruitment.poster_path" mode=""></image>
			<view class="right">
				<view class="title">
					<text>{{item.recruitment.recruitment_title}}</text>
					<text class="worktype">{{item.recruitment.work_types}}</text>
				</view>
				<view class="industry">
					<text>职位：{{item.recruitment.industry}}.{{item.recruitment.work_name}}</text>
				</view>
				<view>{{item.recruitment.address}}</view>
				<view class="wages">薪资：{{item.recruitment.wages}}</view>
				<view>公司：{{item.company.company_name}}</view>
			</view>
			<view>
				<view class="handle" v-if="item.handle === 2">
					<text>{{item.handleStr}}</text>
				</view>
				<view class="agreehandle" v-else-if="item.handle === 1">
					<text>{{item.handleStr}}</text>
				</view>
				<view class="rejecthandle" v-else>
					<text>{{item.handleStr}}</text>
				</view>
			</view>
		</view>
	</view>
	<view v-else>
		<u-empty text="暂无简历投递" mode="list" margin-top=600></u-empty>
	</view>
</template>

<script>
	import { findDelivery } from '../../../../util/recruitment/delivery.js'
	export default {
		data() {
			return {
				Deliverylist:[]
			}
		},
		onLoad() {
			this.getDeliveryList()
		},
		methods: {
			// 跳转到详情
			goDetail(recruitment_id){
				uni.navigateTo({
					url:'/pages/detail/detail?recruitment_id=' + recruitment_id
				})
			},
			// 查询我的投递列表
			getDeliveryList(){
				uni.showLoading({
					title:'正在加载中...'
				})
				findDelivery({
					
				 }).then(res=>{
					console.log(res)
					uni.hideLoading()
					uni.showToast({
						title:'加载完成'
					})
					this.Deliverylist = res.data.data.deliveryVOs
				  }).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss">
.news {
		.new-items {
			display: flex;
			padding: 15rpx 20rpx;
			border-bottom: 2rpx solid #F1F1F1;

			image {
				min-width: 30rpx;
				max-width: 200rpx;
				min-height: 30rpx;
				max-height: 160rpx;
			}

			.right {
				width: 390rpx;
				margin-left: 15rpx;
				margin-right: 40rpx;

				view {
					font-size: 23rpx;
				}

				.title {
					font-weight: bold;
					font-size: 28rpx;
					display: flex;

					.worktype {
						margin-left: 30rpx;
						color: #999999;
						font-size: 20rpx;
						padding: 3px;
					}

				}
			}

		}
	}

    .handle{
		font-size: 23rpx;
		color: #ff0000;
	}
    .agreehandle{
		font-size: 23rpx;
		color: #008000;
	}
	.rejecthandle{
		font-size: 23rpx;
		color: #ff0000;
	}
	.info {
		margin-top: 15rpx;

		.time {
			font-size: 20rpx;
		}
	}

	.wages {
		color: #FF0000;
	}

</style>
