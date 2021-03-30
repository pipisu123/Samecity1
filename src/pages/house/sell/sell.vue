<template>
	<view>

	<view class="search">
		<u-search placeholder="请输入房屋信息"></u-search>
	</view>
	<Dropdown></Dropdown>
	<sellpage></sellpage>
	</view>
</template>

<script>
	import Dropdown from '../sellhousepage/Dropdown.vue'
	import sellpage from '../sell/sellpage.vue'
	export default {
		data() {
			return {
				
			}
		},

		components:{
			Dropdown,
			sellpage,
			
		},

		methods: {
			
		},
	}
</script>

<style>

</style>
