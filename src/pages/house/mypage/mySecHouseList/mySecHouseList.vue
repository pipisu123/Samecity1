<template>
	<view>
		<view class="second-public" v-for="(item,index) in secondList" :key="index">
			<view class="second">
				<!-- 房源图片 -->
				<view class="">
					<image :src="item.img" mode="" style="height: 80px; width: 80px;" ></image>
				</view>
				<!-- 房源信息 -->
				<view class="house-info">
					<view class="title">
						<text>{{item.title}}</text>
					</view>
					<view class="address">
						<text>{{item.area}}</text>
						<view class="" style="margin-left: 25px;">
							<text>{{item.community}}</text>
						</view>
					</view>
					<view class="bottom-house">
						<view style="color: #ff0000;">
							<text>{{item.money}}万</text>
						</view>
						<text style="margin-left: 25rpx;">{{item.roomNum}}室</text>
						<text style="margin-left: 25rpx;">{{item.square}}㎡</text>
					</view>
				</view>
			</view>
			<!-- 置顶和下架房源 -->
			<view class="handle">
				<u-button size="mini">置顶</u-button>
				<u-button size="mini">上架</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import { getSecondHandList } from '@/util/house/secondHouse.js'
	export default {
		data() {
			return {
				secondList:[]
			}
		},
		onLoad() {
			getSecondHandList({
				"limit":10,
				"page":1,		
			}).then(res=>{
				console.log(res)
				this.secondList = res.data.data
			}).catch(err=>{
				console.log(err)
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.second-public{
	display: flex;
	padding: 5rpx;
	border-bottom: 2rpx solid #F1F1F1;
	.second{
		display: flex;
		width: 280px;
		.house-info{
			margin-left: 10rpx;
			.address{
				display: flex;
				font-size: 20rpx;
			}
			.title{
				font-size: 30rpx;
				font-weight: bold;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
				
			}
			.bottom-house{
				display: flex;
				margin-top: 10rpx;
			}
		}
		
	}
	.handle{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 30px;
	}
}
</style>
