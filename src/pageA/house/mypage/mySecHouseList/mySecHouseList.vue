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
									<text>{{item.title}}</text>
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
									<text>{{item.money}}万</text>
								</view>
							</view>
						</view>
						<view class="left">
							<view v-if="item.auditState === 1" style="color: #F76260;margin-top: 25px;">
								<text>审核中...</text>
							</view>
							<view v-else-if="item.auditState === 2&&item.online === 0"><u-button size="mini" @click="online(item.id)" type="success">上架</u-button></view>
							<view v-else-if="item.auditState === 2&&item.online === 1" class="left">
								<view><u-button size="mini" @click="downline(item.id)"  type="error">下架</u-button></view>
								<view style="margin-top: 10px;"><u-button size="mini" @click="Top(item.id)" :disabled="item.isTop === 1" type="warning">置顶</u-button></view>
							</view>
							<view v-if="item.auditState === 3" style="color: #F76260;">
								<text>未通过</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-swipe-action>
		<u-toast ref="uToast" />
	</view>
	<view v-else>
		<u-empty text="暂无您的发布" mode="list" margin-top=600></u-empty>
	</view>
</template>

<script>
	import { getSecondHandList } from '@/util/house/secondHouse.js'
	// import { deleteHouseByHouseId } from '../../../util/house/housecommon.js'
	import {
		doReleaseOnlineTrue,
		isTopHouseByHouseId,
		doReleaseOnlineFalse
	} from '@/util/house/housecommon.js'
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
		this.getSecondList()
		},
		methods: {
			// 上架房源
			online(id){
				uni.showLoading({
					title:'上架中...'
				})
				doReleaseOnlineTrue({
					"houseId": id,
					"houseType": 2,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						setTimeout(() => {
							this.getSecondList();
							uni.hideLoading()
							this.$refs.uToast.show({
								title: '上架成功',
								type: 'success',
							})
						}, 1500);
					} else {
						this.$refs.uToast.show({
							title: '系统错误',
							type: 'error',
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 下架房源
			downline(id) {
				uni.showLoading({
					title:'下架中...'
				})
				doReleaseOnlineFalse({
					"houseId": id,
					"houseType": 2,
					"identityType": 1,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						setTimeout(() => {
							this.getSecondList()
							uni.hideLoading()
							this.$refs.uToast.show({
								title: '下架成功',
								type: 'success',
							})
						}, 1500);
					} else {
						this.$refs.uToast.show({
							title: '系统错误',
							type: 'error',
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 置顶房源
			Top(id) {
				uni.showLoading({
				})
				isTopHouseByHouseId({
					"houseId": id,
					"houseType": 2,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						setTimeout(() => {
							this.getSecondList()
							uni.hideLoading()
							this.$refs.uToast.show({
								title: '置顶成功',
								type: 'success',
							})
						}, 1500);
					} else {
						this.$refs.uToast.show({
							title: '置顶失败，系统错误',
							type: 'error',
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 查询出租房源
			getSecondList(){
				getSecondHandList({
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
					url: 'house/common/deleteHouseByHouseId?houseId='+id+'&houseType='+ 2,
					method: "PUT",
					data:{
						
					} 							
				}).then(res => {
					console.log(res)
					uni.hideLoading()
					this.getSecondList()
				}).catch(err => {
					console.log(err)
				})
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
