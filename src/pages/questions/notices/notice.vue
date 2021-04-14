<template>
	<view class="notice">
		<view class="cell" v-for="(item,index) in list" :key="index" @click="goNavbar(index)">
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
						text:'@我的',
						icon:'../../../static/5.png',
						ricon:'../../../static/right-arrow.png'
					},
					{
						text:'点赞',
						icon:'../../../static/5.png',
						ricon:'../../../static/right-arrow.png'
					},
					
				]
			}
		},
		methods: {
			goNavbar(index){
				if(index===0){
					uni.navigateTo({
						url:'/pages/questions/notices/replyMe/replyMe'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
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
