<template>
	<view>
		<view class="search">
			<u-search placeholder="请输入租商铺"></u-search>
		</view>
		<top></top>
		<page></page>
	</view>
</template>

<script>
	import  top from '../shop/top.vue'
	 import page from '../shop/page.vue'
	export default {
		data() {
			return {
				
			}
		},
		components:{
			top,
			page,
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
