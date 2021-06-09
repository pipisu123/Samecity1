<template>
	<view>
		<view v-for="(item,index) in EstateList" :key="index">
			<view class="Estate-list">
				<view>
					<view style="font-size: 30rpx;font-weight: bold;">{{item.label}}</view>
					<view style="font-size: 25rpx;color: #999999;">{{item.city}}</view>
					<view style="display: flex;margin-top: 10rpx;">
						<u-icon name="map" size=25></u-icon>
						<text>{{item.address}}</text>
					</view>
				</view>
				<view>
					<text style="color: #DD524D;" v-if="item.auditState === 1">审核中...</text>
					<text style="color: #4CD964;" v-if="item.auditState === 2">已通过</text>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { findAllEstateByUserId } from '@/util/house/estate.js'
	export default {
		data() {
			return {
				EstateList:[]
			}
		},
		onLoad() {
			this.getAllEstate();
		},
		methods: {
			getAllEstate(){
				uni.showLoading({})
				findAllEstateByUserId({
					
				}).then(res=>{
					console.log(res)
					if(res.data.code === 0){
						setTimeout(() => {
							uni.hideLoading()
							this.EstateList = res.data.data
						}, 500);
					}else{
						this.$refs.uToast.show({
							title: '系统错误',
							type: 'error',
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.Estate-list{
	display: flex;
	justify-content: space-between;
	border-bottom: 2rpx solid #F1F1F1;
}
</style>
