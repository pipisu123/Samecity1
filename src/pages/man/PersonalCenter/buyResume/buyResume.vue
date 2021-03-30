<template>
	<view>
		<view class="resumelist" v-for="(item,index) in buyresume" :key="index">
			<u-avatar src="https://thirdwx.qlogo.cn/mmopen/vi_32/YQIxj616l4vev5RicB60oquMVSTbNccMDAgSY5hPaoDAH4oGViad6kGGeJj75Q0ljAPtFMAUKB7DFxrpG6jEnEYw/132" size=100 show-sex=true sex-icon="man"></u-avatar>
			<view class="right">
				<view class="title">
					<text class="name">{{item.resume.resumeName}}</text>
				</view>
				<view class="base">
					<view class="">
						<text>{{item.resume.age}}岁-</text>
					</view>
					<view class="">
						<text>{{item.resume.maxDegree}}-</text>
					</view>
					<view class="">
						<text>茂南区</text>
					</view>
				</view>
				<view class="work">
					<text>职位：{{item.resume.industry}}</text>
					<view class="worktype">
						<text>{{item.resume.workType}}</text>
					</view>
				</view>
				<view class="wages">
					<text>期望工资：{{item.resume.compensation}}</text>
				</view>
			</view>
			<view class="phone">
				<u-button type="success" size="mini" @click="callPhone(item.resume.phone)">拨打电话</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import { findBuyResume } from '../../../../util/resume.js'
	export default {
		data() {
			return {
				buyresume:[],
				
			}
		},
		onLoad() {
			findBuyResume({
				
			}).then(res=>{
				console.log(res)
				this.buyresume = res.data.data.buyResumes
			}).catch(err=>{
				console.log(err)
			})
		},
		methods: {
			callPhone(phone){
				uni.makePhoneCall({
				    phoneNumber: phone 
				});
			}
		}
	}
</script>

<style lang="scss">
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
			.phone{
				padding: 20px;
				margin-left: 40px;
			}
	}
</style>
