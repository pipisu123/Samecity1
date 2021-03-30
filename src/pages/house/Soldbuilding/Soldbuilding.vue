<template>
	<view>
	<view class="search">
		<u-search placeholder="请输入楼盘名称或地址"></u-search>
	</view>
		<soldpage></soldpage>
		<buildingpage></buildingpage>
	</view>
</template>

<script>
	import soldpage from '../Soldbuilding/soldpage.vue'
	import buildingpage from '../Soldbuilding/buildingpage.vue'
	export default {
		data() {
			return {
				
			}
		},
		components:{
			soldpage,
			buildingpage
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
