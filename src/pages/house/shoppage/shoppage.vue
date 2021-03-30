<template>
	<view class="wrap">
		<u-swiper :list="list" mode="number" indicator-pos="bottomCenter" height=520 title=true effect3d-previous-margin=45></u-swiper>
		<view class="text" >
			<view class="u-font-36  $u-main-color" >
			<text>出租|人民广场文创街</text>
			<view class="u-font-30">
			<text>价格：5000/月</text>
		</view>
		</view>
		</view>
		<navi></navi>
		<page></page>
	     <tails></tails>
		 <bar></bar>
	</view>
</template>

<script>
	import navi from '../shoppage/navi.vue'
	import page from '../shoppage/page.vue'
	import tails from '../shoppage/tails.vue'
	import Bar from '../shoppage/Bar.vue'
	export default {
		data() {
			return {
				list: [{
						image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=358072952,2209139666&fm=26&gp=0.jpg',
					},
					{
						image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2817904840,1476431498&fm=26&gp=0.jpg',	
					},
					{
						image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1853007495,3398606694&fm=26&gp=0.jpg',
					}
				],
			}
		},
		components:{
			navi,
			page,
		   tails,
		   Bar
		
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 10rpx;
	}
</style>