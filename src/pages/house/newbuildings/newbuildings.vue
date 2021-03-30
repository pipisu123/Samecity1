<template>
	<view>
	<view class="search">
		<u-search placeholder="请输入楼盘名称或地址"></u-search>
	</view>
		<building></building>
		<newbuildingpage></newbuildingpage>
	</view>
</template>

<script>
	import building from '../newbuildings/building.vue'
	import newbuildingpage from '../newbuildings/newbuildingpage.vue'
	export default {
		data() {
			return {
				
			}
		},
		components:{
			building,
			newbuildingpage
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
 
</style>
