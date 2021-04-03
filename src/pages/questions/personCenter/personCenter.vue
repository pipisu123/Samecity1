<template>
	<view class="content">
		<view class="background">
			<view class=""  style="display: flex;align-items: center; padding: 20px;">
					<image src="https://thirdwx.qlogo.cn/mmopen/vi_32/YQIxj616l4vev5RicB60oquMVSTbNccMDAgSY5hPaoDAH4oGViad6kGGeJj75Q0ljAPtFMAUKB7DFxrpG6jEnEYw/132" style="width: 100rpx;height: 100rpx;border-radius: 50rpx;" mode=""></image>
				<view class="" style="font-size: 28rpx;margin-left: 20rpx;">
					酒馆
				</view>
			</view>
		</view>
		<view class="cell" v-for="(item,index) in list" :key="index">
			<view class="cell-left">
				<image class="cell_icon" :src="item.icon"></image>
				<text class="cell-text">{{item.text}}</text>
			</view>
			<view class="cell-right">
				<image class="right-arrow" :src="item.ricon"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						text:'我的收藏',
						icon:'../../../static/5.png',
						ricon:'../../../static/right-arrow.png'
					},
					{
						text:'我的问题',
						icon:'../../../static/5.png',
						ricon:'../../../static/right-arrow.png'
					},
					{
						text:'我的回答',
						icon:'../../../static/5.png',
						ricon:'../../../static/right-arrow.png'
					},
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.background{
		width: 100%;
		height: 120px;
		background-color: #5785E5;
	}
	.cell {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #ccc;
		height: 59px;
		align-items: center;
		justify-content: space-between;
	}
	
	// .cell:active {
	// 	color: white;
	// 	box-shadow: 1upx 1upx 35upx #ccc;
	// }
	
	.cell-left {
		display: flex;
		align-items: center;
		margin-left: 15upx;
	}
	
	.cell-text {
		margin-left: 25upx;
	}
	
	.cell-right {
		margin-right: 45upx;
		height: 28upx;
	}
	
	.cell_icon {
		width: 60upx;
		height: 60upx;
		height: 60upx;
	}
	
	.right-arrow {
		color: #aaa;
		width: 15upx;
		height: 28upx;
	}
</style>
