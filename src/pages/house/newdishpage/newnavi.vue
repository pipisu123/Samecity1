<template>
	<view class="wrap">
		<u-line color="blue" />
			
			<!-- /* 等同于 */ -->
			<u-line color="blue"></u-line>
			<u-line class="dotted"></u-line>
		<u-row gutter="16">
			<u-col span="5">
				<view class="demo-layout bg-purple">
					<text>住宅：8500/㎡</text>
				</view>
			</u-col>
			<u-col span="5">
				<view class="demo-layout bg-purple-light">
					<text>户型：1/3/4室</text>
				</view>
			</u-col>
			<u-col span="5">
				<view class="demo-layout bg-purple-dark">
					<text>建面：45-224㎡</text>
				</view>
			</u-col>
			<u-col span="5">
				<view class="demo-layout bg-purple-dark">
					<text>开盘：2018-11-24</text>
				</view>
			</u-col>
			<u-col span="10">
				<view class="demo-layout bg-purple-right" @click="gomap">
					<text>地址：茂南区-茂南江东北路288号</text>
				</view>
			</u-col>
			<!-- <u-col span="10">
				<view class="demo-layout bg-purple-right">
					<text>楼盘测评：茂名保利东湾位于小东江傍，一江七园环绕外瞰小东江，同心岛公园，钟鼓公园，奥利匹克公园等七个大公园，社区内有35000㎡的“星际探索”园林，集阳光草坪，亲子乐园
					萌宠乐园等一体乐园社区，还建设有约6000㎡的人工湖，生活休闲配套较为完善，可满足业主生活，休闲，运动的需求
					</text>
				</view>
			</u-col> -->
			</u-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gomap(){
					uni.navigateTo({
						url:'/pages/house/map/map'
					})
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.wrap {
		padding: 0rpx;
	}

	.u-row {
		margin: 40rpx 0;
	}

	.demo-layout {
		height: 80rpx;
		border-radius: 8rpx;
	}

	// .bg-purple {
	// 	background: #d3dce6;
	// }

	// .bg-purple-light {
	// 	background: #e5e9f2;
	// }

	// .bg-purple-dark {
	// 	background: #99a9bf;
	// }
</style>
