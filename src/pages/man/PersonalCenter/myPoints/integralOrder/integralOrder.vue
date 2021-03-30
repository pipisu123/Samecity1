<template>
	<view>
		<view>
			<u-tabs-swiper activeColor="#f29100" bar-width=90 ref="tabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		</view>
		<view v-if="current === 0">
			<view class="order-list" v-for="(item,index) in list1" :key="index">
				<view class="order-item">
					<text>{{item.body}}</text>
				</view>
				<view class="order-item1">
					<text v-if="item.status === 0">待付款</text>
					<text v-else>已付款</text>
				</view>
				<view class="order-item2">
					<text>{{item.createTime.split("T")[0]}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { findWeChatOrder } from '@/util/integral/integral.js'
	export default {
		data() {
			return {
				list: [{
					name: '全部'
				 },
				{
					name: '待付款'
				}, {
					name: '已完成'
				}],
				list1:[
					
				],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			};
		},
		onLoad() {
			findWeChatOrder({
				"status":1
			}).then(res=>{
				console.log(res)
				this.list1 = res.data.data
			}).catch(err=>{
				console.log(err)
			})
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
				this.current = index;
				if(index===1){
					
				}
			},
		}
	};
</script>

<style lang="scss">
page{
	background-color: #F1F1F1;
}
.order-list{
	width: 100%;
	height: 59px;
	display: flex;
	align-items: center;
	background-color: #F8F8F8;
	margin-top: 10rpx;
	border-radius: 5%;
	.order-item{
		flex: 1;
		color: #f29100;
		margin-left: 15rpx;
	}
	.order-item1{
		flex: 1;
		margin-left: 25rpx;
	}
}
</style>
