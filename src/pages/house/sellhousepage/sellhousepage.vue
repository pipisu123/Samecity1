<template>
	<view class="wrap">
		<u-swiper :list="list" mode="number" indicator-pos="bottomCenter" height=520 title=true effect3d-previous-margin=45></u-swiper>
		<view class="text" >
			<view class="u-font-36 $u-main-color" >
			<text>5万首付买准现房 学府美宅 世茂锦城 名额有限 先到先得</text>
			<view class="u-font-32">
			<text>价格：62万</text>
		</view>
		</view>
		</view>
		<sellnavi></sellnavi>
		
		<selltext></selltext>
		<bottomBar></bottomBar>
	</view>
</template>

<script>
	import sellnavi from '../sellhousepage/sellnavi.vue'
	import selltext from '../sellhousepage/selltext.vue'
	import bottomBar from '../sellhousepage/bottomBar.vue'
	export default {
		data() {
			return {
				list: [{
						image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2259615712,2151967703&fm=26&gp=0.jpg',
					},
					{
						image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1n.soufunimg.com%2Fzxb%2F2018_07%2F13%2F8%2F28%2Fpic%2F006011865500.jpg&refer=http%3A%2F%2Fimg1n.soufunimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614910009&t=3f98f53e93f4f33bdce0fb626d67efbf',	
					},
					{
						image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20161022%2Ffbbeadacc0734971ae7f77ea4dc5c7a5_th.jpg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614910009&t=32d556337c000b9aeb7049d10cad678c',
					}
				],
			}
		},
		components:{
			sellnavi,
			selltext,
			bottomBar
		
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 10rpx;
	}
	.tu-font-32{
		color: #303133;
	}
</style>