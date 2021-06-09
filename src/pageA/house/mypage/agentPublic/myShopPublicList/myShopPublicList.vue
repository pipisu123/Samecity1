<template>
	<view>
		<u-subsection :list="list" :current="curNow" @change="sectionChange"></u-subsection>
		<view v-if="curNow === 0">
			<view v-if="list1.length!=0">
				<u-swipe-action :show="item.show" :index="index" @click="click(index,item.id)" @open="open" v-for="(item,index) in list1"
				 :key="index" :options="options">
					<view class="item u-border-bottom">
						<image mode="" :src="item.img" style="height: 80px; width: 80px;" />
						<!--   <image mode="" src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3753706363,1631718189&fm=26&gp=0.jpg"  style="height: 80px; width: 80px;"/> -->
						<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
						<view class="title-wrap">
							<view class="content">
								<view class="right">
									<view class="itemlist">
										<view class="item-title">
											<text>出租|{{item.title}}</text>
										</view>
										<view class="room">
											<text style="font-size: 25rpx;color: #999999;">{{item.area}}</text>
											<text style="margin-left: 20rpx;font-size: 25rpx;color: #999999;">{{item.estateName}}</text>
										</view>
										<view style="display: flex;justify-content: space-between;width: 60%;">
											<view>
												<u-tag :text="item.identityType" :closeable="closeable" size="mini"></u-tag>
											</view>
											<view>
												<u-tag :text="item.shopType" :closeable="closeable" size="mini"></u-tag>
											</view>
										</view>
										<view class="price">
											<text style="color: #ff0000;">{{item.money}}{{item.moneyUnit}}</text>
											<text style="margin-left: 15rpx;font-size: 25rpx;">{{item.square}}㎡</text>
										</view>
									</view>
								</view>
								<view class="left">
									<view v-if="item.auditState === 1" style="color: #F76260;margin-top: 25px;">
										<text>审核中...</text>
									</view>
									<view v-else-if="item.auditState === 2&&item.online === 0"><u-button size="mini" @click="online(item.id)" type="success">上架</u-button></view>
									<view v-else-if="item.auditState === 2&&item.online === 1" class="left">
										<view><u-button size="mini" @click="downline(item.id)" type="error">下架</u-button></view>
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
		</view>
		<!-- 个人商铺出售发布列表 -->
		<view v-if="curNow === 1">
			<view v-if="list2.length!=0">
				<u-swipe-action :show="item.show" :index="index" @click="click(index,item.id)" @open="open" v-for="(item,index) in list2"
				 :key="index" :options="options">
					<view class="item u-border-bottom">
						<image mode="" :src="item.img" style="height: 80px; width: 80px;" />
						<!--   <image mode="" src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3753706363,1631718189&fm=26&gp=0.jpg"  style="height: 80px; width: 80px;"/> -->
						<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
						<view class="title-wrap">
							<view class="content">
								<view class="right">
									<view class="itemlist">
										<view class="item-title">
											<text>出租|{{item.title}}</text>
										</view>
										<view class="room">
											<text style="font-size: 25rpx;color: #999999;">{{item.area}}</text>
											<text style="margin-left: 20rpx;font-size: 25rpx;color: #999999;">{{item.estateName}}</text>
										</view>
										<view style="display: flex;justify-content: space-between;width: 60%;">
											<view>
												<u-tag :text="item.identityType" :closeable="closeable" size="mini"></u-tag>
											</view>
											<view>
												<u-tag :text="item.shopType" :closeable="closeable" size="mini"></u-tag>
											</view>
										</view>
										<view class="price">
											<text style="color: #ff0000;">{{item.money}}万</text>
											<text style="margin-left: 15rpx;font-size: 25rpx;">{{item.square}}㎡</text>
										</view>
									</view>
								</view>
								<view class="left">
									<view v-if="item.auditState === 1" style="color: #F76260;margin-top: 25px;">
										<text>审核中...</text>
									</view>
									<view v-else-if="item.auditState === 2&&item.online === 0"><u-button size="mini" @click="online1(item.id)" type="success">上架</u-button></view>
									<view v-else-if="item.auditState === 2&&item.online === 1" class="left">
										<view><u-button size="mini" @click="downline1(item.id)" type="error">下架</u-button></view>
										<view style="margin-top: 10px;"><u-button size="mini" @click="Top1(item.id)" :disabled="item.isTop === 1" type="warning">置顶</u-button></view>
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
		</view>
		<!-- 商铺转让列表 -->
		<view v-if="curNow === 2">
			<view v-if="list3.length!=0">
				<u-swipe-action :show="item.show" :index="index" @click="click(index,item.id)" @open="open" v-for="(item,index) in list3"
				 :key="index" :options="options">
					<view class="item u-border-bottom">
						<image mode="" :src="item.img" style="height: 80px; width: 80px;" />
						<!--   <image mode="" src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3753706363,1631718189&fm=26&gp=0.jpg"  style="height: 80px; width: 80px;"/> -->
						<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
						<view class="title-wrap">
							<view class="content">
								<view class="right">
									<view class="itemlist">
										<view class="item-title">
											<text>出租|{{item.title}}</text>
										</view>
										<view class="room">
											<text style="font-size: 25rpx;color: #999999;">{{item.area}}</text>
											<text style="margin-left: 20rpx;font-size: 25rpx;color: #999999;">{{item.estateName}}</text>
										</view>
										<view style="display: flex;justify-content: space-between;width: 60%;">
											<view>
												<u-tag :text="item.identityType" :closeable="closeable" size="mini"></u-tag>
											</view>
											<view>
												<u-tag :text="item.shopType" :closeable="closeable" size="mini"></u-tag>
											</view>
										</view>
										<view class="price">
											<text style="color: #ff0000;">{{item.money}}{{item.moneyUnit}}</text>
											<text style="margin-left: 15rpx;font-size: 25rpx;">{{item.square}}㎡</text>
										</view>
									</view>
								</view>
								<view class="left">
									<view v-if="item.auditState === 1" style="color: #F76260;margin-top: 25px;">
										<text>审核中...</text>
									</view>
									<view v-else-if="item.auditState === 2&&item.online === 0"><u-button size="mini" @click="online2(item.id)" type="success">上架</u-button></view>
									<view v-else-if="item.auditState === 2&&item.online === 1" class="left">
										<view><u-button size="mini" @click="downline2(item.id)" type="error">下架</u-button></view>
										<view style="margin-top: 10px;"><u-button size="mini" @click="Top2(item.id)" :disabled="item.isTop === 1" type="warning">置顶</u-button></view>
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
		</view>
	</view>
</template>

<script>
	import {
		getShopLeaseListByBroker,
		getShopSecondHandListByBroker,
		getShopSubletListByBroker
	} from '@/util/house/shop.js'
	import {
		doReleaseOnlineTrue,
		isTopHouseByHouseId,
		doReleaseOnlineFalse
	} from '@/util/house/housecommon.js'
	export default {
		data() {
			return {
				list: [{
						name: '商铺出租'
					},
					{
						name: '商铺出售'
					},
					{
						name: '商铺转租'
					},
				],
				curNow: 0,
				list1: [],
				list2: [],
				list3: [],
				disabled: false,
				btnWidth: 180,
				show: false,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
			}
		},
		onLoad() {
			this.getstart();
		},
		methods: {
			// 上架出租房源
			online(id){
				uni.showLoading({
					title:'上架中...'
				})
				doReleaseOnlineTrue({
					"houseId": id,
					"houseType": 5,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						setTimeout(() => {
							this.getstart()
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
			// 上架出售房源 
			online1(id){
				uni.showLoading({
					title:'上架中...'
				})
				doReleaseOnlineTrue({
					"houseId": id,
					"houseType": 6,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						setTimeout(() => {
							this.getshopSell()
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
			online2(id){
				uni.showLoading({
					title:'上架中...'
				})
				doReleaseOnlineTrue({
					"houseId": id,
					"houseType": 7,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						setTimeout(() => {
							this.getshopChange()
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
			// 下架商铺
			downline(id){
				uni.showLoading({
					title:'下架中...'
				})
				doReleaseOnlineFalse({
					"houseId": id,
					"houseType": 5,
					"identityType":1,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						setTimeout(() => {
							this.getstart()
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
			
			downline1(id){
				uni.showLoading({
					title:'下架中...'
				})
				doReleaseOnlineFalse({
					"houseId": id,
					"houseType": 6,
					"identityType":1,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						setTimeout(() => {
							this.getshopSell()
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
			downline2(id){
				uni.showLoading({
					title:'下架中...'
				})
				doReleaseOnlineFalse({
					"houseId": id,
					"houseType": 7,
					"identityType":1,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						setTimeout(() => {
							this.getshopChange()
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
			// 置顶商铺
			Top(id) {
				uni.showLoading({
				})
				isTopHouseByHouseId({
					"houseId": id,
					"houseType": 5,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						setTimeout(() => {
							this.getstart()
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
			// 顶办公楼出售
			Top1(id) {
				uni.showLoading({
				})
				isTopHouseByHouseId({
					"houseId": id,
					"houseType": 6,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						setTimeout(() => {
							this.getshopSell()
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
			Top2(id) {
				uni.showLoading({
				})
				isTopHouseByHouseId({
					"houseId": id,
					"houseType": 7,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						setTimeout(() => {
							this.getshopChange()
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
			// 删除列表
			click(index, id) {
				uni.showLoading({
					title: '删除中...'
				})
				this.$myRequest({
					url: '/house/common/deleteHouseByHouseId?houseId=' + id + '&houseType=' + 5,
					method: "PUT",
					data: {}
				}).then(res => {
					console.log(res)
					uni.hideLoading();
					this.getstart();
				}).catch(err => {
					console.log(err)
				})
				console.log(id)
				console.log(index)
			},
			// 切换
			sectionChange(index) {
				this.curNow = index;
				console.log(index)
				if (index === 0) {
					this.getstart();
				} else if (index === 1) {
					this.getshopSell();
				} else if (index === 2) {
					this.getshopChange();
				}
			},
			// 获取商铺出租
			getstart() {
				getShopLeaseListByBroker({
					"page": 1,
					"limit": 10,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						this.list1 = res.data.data;
					} else {
						console.log("获取失败")
					}
				}).catch(error => {
					console.log(err)
				})
			},
			// 获取商铺出售
			getshopSell(){
				getShopSecondHandListByBroker({
					"page": 1,
					"limit": 10,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						this.list2 = res.data.data;
					} else {
						console.log("获取失败")
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 获取商铺转租
			getshopChange(){
				getShopSubletListByBroker({
					"page": 1,
					"limit": 10,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						this.list3 = res.data.data;
					} else {
						console.log("获取失败")
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				})
			}
		}
	}
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

			.itemlist {

				.item-title {
					font-size: 30rpx;
					font-weight: bold;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.price {
					margin-top: 15rpx;
					display: flex;
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
