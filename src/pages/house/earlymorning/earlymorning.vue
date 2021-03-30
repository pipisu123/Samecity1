<template>
	<view>
	<view class="search">
		<u-search placeholder="请输入楼盘名称或地址"></u-search>
	</view>
		<earlypage></earlypage>
		<early></early>
	</view>
</template>

<script>
	import earlypage from '../earlymorning/earlypage.vue'
	import early from '../earlymorning/early.vue'
	export default {
		data() {
			return {
				
			}
		},
		components:{
			earlypage,
			early
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
