<template>
	<view class="news">
		<view class="new-items" @click="goDetail(item.id)" v-for="(item,index) in houselist" :key="index">
			<image :src="item.img" mode=""></image>
			<view class="right">
				<view class="title">
					<!-- <text class="worktype">{{item.title}}</text> -->
					<view class="worktype">
						<u-parse :html="item.title" :tag-style="style"></u-parse>
					</view>
					<!-- <text class="worktype">双山二路花园小区 4室2厅2卫</text> -->
				</view>
				<view class="industry" style="display: flex;">
					<text>{{item.roomNum}}室.{{item.square}}㎡|{{item.orientation}}|</text>
					<u-parse :html="item.community" :tag-style="style"></u-parse>
				</view>
				
				<view class="wags">
					{{item.identityType}}|{{item.elevator}}
					</view>
				<view class="money">{{item.money}}万</view>
			</view>
			<view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			houselist: {
				type: Array,
				default: null
			}
		},
		data() {
			return {
				src: null,
				pic: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				scrollTop:0,
				style:{
					title: 'font-size: 30rpx'
				},
			}
		},
		onLoad() {

		},
		created() {
			this.src = this.$store.state.avatar
		},
		methods: {
			goDetail(id){
				uni.navigateTo({
					url:'/pages/house/secondhandhousingpage/secondhandhousingpage?id='+id
				})
		}
	}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 2rpx;
	}
	
	.u-row {
		margin: 40rpx 0;
	}
	
	.demo-layout {
		height: 30rpx;
		border-radius: 8rpx;
	}
	
	.bg-purple {
		background: #a0cfff;
		 text-align: center;
		 padding: 2rpx;
	}
	
	.bg-purple-light {
		background: #a0cfff; 
	    text-align: center;
		padding: 2rpx;
		
	}
	
	.bg-purple-dark {
		background: #a0cfff;
		 text-align: center;
		 padding: 2rpx;
	}
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
				width: 100%;
				margin-left: 15rpx;
				margin-right: 40rpx;

				view {
					font-size: 23rpx;
				}

				.title {
					font-weight: bold;
					font-size: 28rpx;
					display: flex;
					flex-wrap: wrap;
					.worktype {
						font-size: 28rpx;
						overflow:hidden;
						display: -webkit-box;
						/*设置为弹性盒子*/
						-webkit-line-clamp: 2;
						/*最多显示x行*/
						text-overflow: ellipsis;
						/*超出显示为省略号*/
						-webkit-box-orient: vertical;
					}

				}
				.money{
					color: #ff0000;
					font-weight: bold;
					font-size: 25rpx;
				}
			}

		}
	}

	.avatar {}

	.info {
		margin-top: 15rpx;

		.time {
			font-size: 20rpx;
		}
	}

	
</style>
