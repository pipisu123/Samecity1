<template>
	<view>
	<view class="search">
		<u-search placeholder="请输入楼盘名称或地址"></u-search>
	</view>
		<lowpage></lowpage>
		<lowpricepage></lowpricepage>
	</view>
</template>

<script>
	import lowpage from '../lowprice/lowpage.vue'
	import lowpricepage  from '../lowprice/lowpricepage.vue'
	export default {
		data() {
			return {
				
			}
		},
		components:{
			lowpage,
			lowpricepage
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
