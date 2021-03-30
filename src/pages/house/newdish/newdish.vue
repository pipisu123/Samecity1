<template>
	<view>
	<view class="search">
		<u-search placeholder="请输入楼盘名称或地址"></u-search>
	</view>
	<Grid></Grid>
	<layout></layout>
	<newrentout></newrentout>
	<newpage></newpage>
	</view>
</template>

<script>
	import Grid from '../newdish/Grid.vue'
	import layout from '../newdish/layout.vue'
	import newrentout from '../newdish/newrentout.vue'
	import newpage from '../newdish/newpage.vue'
	export default {
		data() {
			return {
				
			}
		},
		components:{
			Grid,
			layout,
			newrentout,
			newpage
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
