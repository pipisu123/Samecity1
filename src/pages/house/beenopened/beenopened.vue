<template>
	<view>
	<view class="address">
			<view>
				<u-icon name="map"></u-icon>
			</view>
			<text>茂名</text>
		</view>
		<view class="seach">
			<u-search placeholder="请输入工作或房屋信息"></u-search>
		</view>
	
		<beenopenedlayout></beenopenedlayout>
		<beenopenedpage></beenopenedpage>
	</view>
</template>

<script>
	import beenopenedlayout from '../beenopened/beenopenedlayout.vue'
	import beenopenedpage from '../beenopened/beenopenedpage.vue'
	export default {
		data() {
			return {
				
			}
		},
		components:{
		beenopenedlayout,
		beenopenedpage
		},
		onLoad() {
					uni.getLocation({
					    type: 'wgs84',
					    success: function (res) {
					        console.log('国家：' + res.address.country);
					        console.log('省份：' + res.address.province);
							console.log('城市' + res.address.city);
							console.log('区（县）：' + res.address.district);
							
					    }
					});
				},

		methods: {
		
		}
	}
</script>

<style lang="scss">
	.searchbar{
		    display: flex;
			border-color: #fff;
		    position: fixed;
		     left: 0;
		     right: 0;
		     top: 0;
			 width: 100%;
		     z-index: 9;
			 background-color: #5785E5;
		     padding-bottom: 10rpx;
			 .address{
				 display: flex;
				 margin-top: 10rpx;
			 }
			 .seach{
				 width: 88%;
			 }
		}

</style>
