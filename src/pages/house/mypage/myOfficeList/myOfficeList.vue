<template>
	<view>
		<u-subsection :list="list1" :current="curNow" @change="sectionChange"></u-subsection>
		<view v-if="curNow === 0">
			<view v-if="list.length!=0">
				<u-swipe-action :show="item.show" :index="index" @click="click(index,item.id)" @open="open" v-for="(item,index) in list"
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
											<text>{{item.square}}㎡</text>
											<text>{{item.estateName}}</text>
										</view>
										<view class="info">
											<text>{{item.identityType}}|</text>
											<text>{{item.officeType}}</text>
										</view>
										<view class="price">
											<text>{{item.money}}{{item.moneyUnit}}</text>
										</view>
									</view>
								</view>
								<view class="left">
									<view v-if="item.auditState === 1" style="color: #F76260;margin-top: 25px;">
										<text>审核中...</text>
									</view>
									<view v-else-if="item.auditState === 2&&item.online === 0"><button size="mini" @click="online(item.id)">上架</button></view>
									<view v-else-if="item.auditState === 2&&item.online === 1" class="left">
										<view><button size="mini" @click="downline(item.id)">下架</button></view>
										<view style="margin-top: 10px;"><button size="mini" @click="Top(item.id)" :disabled="item.isTop === 1">置顶</button></view>
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
		<view v-else>
			<view v-if="list.length!=0">
				<u-swipe-action :show="item.show" :index="index" @click="click(index,item.id)" @open="open" v-for="(item,index) in secondHouseList"
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
											<text>出售|{{item.title}}</text>
										</view>
										<view class="room">
											<text>{{item.square}}㎡</text>
											<text>{{item.estateName}}</text>
										</view>
										<view class="info">
											<text>{{item.identityType}}|</text>
											<text>{{item.officeType}}</text>
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
									<view v-else-if="item.auditState === 2&&item.online === 0"><button size="mini" @click="online(item.id)">上架</button></view>
									<view v-else-if="item.auditState === 2&&item.online === 1" class="left">
										<view><button size="mini" @click="downline(item.id)">下架</button></view>
										<view style="margin-top: 10px;"><button size="mini" @click="Top(item.id)" :disabled="item.isTop === 1">置顶</button></view>
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
	import { getOfficeLeaseList,getOfficeSecondHandList } from '@/util/house/office.js'
	export default {
		data() {
			return {
				list1: [
					{
						name: '写字楼出租'
					}, 
					{
						name: '写字楼出售'
					}, 
				],
				curNow: 0,
				disabled: false,
				btnWidth: 180,
				show: false,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				list: [],
				secondHouseList:[]
			}
		},
		onLoad() {
			this.getOfficeLeaseList();
			this.getOfficeSecondList();
		},
		methods: {
			sectionChange(index) {
				this.curNow = index;
				if(index === 0){
					this.getOfficeLeaseList()
				}else if(index === 1){
					this.getOfficeSecondList()
				}
			},
			// 获取办公楼出租列表
			getOfficeLeaseList(){
				getOfficeLeaseList({
					"page":1,
					"limit":10,
				}).then(res=>{
					console.log(res)
					if(res.data.code === 0){
						this.list = res.data.data
					}else{
						console.log("获取列表失败")
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 获取办公楼出售列表
			getOfficeSecondList(){
				getOfficeSecondHandList({
					"page":1,
					"limit":10,
				}).then(res=>{
					console.log(res)
					if(res.data.code === 0){
						this.secondHouseList = res.data.data
					}else{
						console.log("获取列表失败")
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 删除列表
			click(index, id) {
				uni.showLoading({
					title: '删除中...'
				})
				this.$myRequest({
					url: '/house/common/deleteHouseByHouseId?houseId=' + id + '&houseType=' + 1,
					method: "PUT",
					data: {}
				}).then(res => {
					console.log(res)
					uni.hideLoading()
					this.getrentList()
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
