<template>
	<view class="wrap">
			<u-swiper :list="list" mode="number" indicator-pos="bottomCenter" height=520 title=true effect3d-previous-margin=45></u-swiper>	
		<view class="text" >
			<view class="u-font-36 $u-main-color" >
			<text>出售|双山二路花园小区电梯房首次出租,精装修拎包入住</text>
			<view class="u-font-30">
			<text>价格：208万</text>
		</view>
		</view>
		</view>
		
		<banner></banner>
		<navi></navi>
		<ttex></ttex>
		<banne></banne>	
	</view>
</template>

<script>
	
	import banner from '../secondhandhousingpage/banner.vue'
	import navi from '../secondhandhousingpage/navi.vue'
	import ttex from '../secondhandhousingpage/ttex.vue'
	import banne from '../secondhandhousingpage/banne.vue'
	export default {
		data() {
			return {
				list: [{
						image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2864513444,1848901627&fm=15&gp=0.jpg',
					},
					{
						image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3828707957,3725865696&fm=26&gp=0.jpg.jpg',	
					},
					{
						image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimgmall.tg.com.cn%2F9dc740ca7fbfa95c98a893d4de40de96.jpg&refer=http%3A%2F%2Fimgmall.tg.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614413866&t=90439acb456c437117aaa09ec2915516',
					}
				],
				
			}
		},
		components:{
		
			banner,
			navi,
			ttex,
			banne
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