<template>
	<view v-if="list.length!=0">
		<u-swipe-action :show="item.show" :index="index" @click="click(index,item.id)" @open="open" v-for="(item,index) in list" :key="index"
		 :options="options">
			<view class="item u-border-bottom">
				<image mode="" :src="item.img" style="height: 80px; width: 80px;" />
				<!--   <image mode="" src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3753706363,1631718189&fm=26&gp=0.jpg"  style="height: 80px; width: 80px;"/> -->
				<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="title-wrap">
					<view class="content">
						<view class="right">
							<view class="itemlist">
								<view class="item-title">
									<text>{{item.leaseType}}|{{item.title}}</text>
								</view>
								<view class="room">
									<text>{{item.roomNum}}室.</text>
									<text>{{item.square}}㎡</text>
									<text>|{{item.orientation}}|</text>
									<text>{{item.community}}</text>
								</view>
								<view class="info">
									<text>{{item.identityType}}|</text>
									<text>南北通透|</text>
									<text>{{item.elevator}}</text>
								</view>
								<view class="price">
									<text>{{item.money}}元/月</text>
								</view>
							</view>
						</view>
						<view class="left">
							<button size="mini">上架</button>
							<button size="mini">置顶</button>
						</view>
					</view>
				</view>
			</view>
		</u-swipe-action>
	</view>
	<view v-else>
		<u-empty text="暂无您的发布" mode="list" margin-top=600></u-empty>
	</view>
</template>

<script>
	import { getLeaseList } from '../../../util/house/release.js'
	// import { deleteHouseByHouseId } from '../../../util/house/housecommon.js'
	export default {
		data() {
			return {
				disabled: false,
				btnWidth: 180,
				show: false,
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],
				list: []
			};
		},
		onLoad() {
		this.getrentList()
		},
		methods: {
			// 查询出租房源
			getrentList(){
				getLeaseList({
					"limit":10,
					"page":1
				}).then(res=>{
					console.log(res)
					this.list = res.data.data
				}).catch(err=>{
					console.log(err)
				})
			},
			click(index,id) {
				uni.showLoading({
					title:'删除中...'
				})
				this.$myRequest({
					url: '/house/common/deleteHouseByHouseId?houseId='+id+'&houseType='+ 1,
					method: "PUT",
					data:{
						
					} 
									
				}).then(res => {
					console.log(res)
					uni.hideLoading()
					this.getrentList()
				}).catch(err => {
					console.log(err)
				})
				// deleteHouseByHouseId({
				// 	houseId:id,
				// 	houseType:1
				// }).then(res=>{
				// 	console.log(res)
					
				// }).catch(err=>{
				// 	console.log(err)
				// })
				console.log(id)
				console.log(index)
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.list[index].show = true;
								this.list.map((val, idx) => {
									if(index != idx) this.list[idx].show = false;
								})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.item {
		display: flex;
		padding: 20rpx;
	}

	.content {
		display: flex;
		.left {
			display: flex;
			justify-content: space-between;
			flex-direction: column;

		}

		.right {
			width: 410rpx;
			margin-left: 10rpx;
			.itemlist{
				
				.item-title{
					font-size: 30rpx;
					font-weight: bold;
					overflow:hidden;
					text-overflow:ellipsis;
					white-space:nowrap;
				}
				.price{
					 color: #ff0000;
					 margin-top: 15rpx;
				}
			}
		}
	}

	// image {

	// 	flex: 0 0 120rpx;
	// 	height: 120rpx;
	// 	margin-right: 20rpx;
	// 	border-radius: 12rpx;
	// }

	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}
</style>
