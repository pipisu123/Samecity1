<template>
	<view class="wrap">
		<u-swiper :list="list" height=300></u-swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						image: 'https://pic6.ajkimg.com/loupan/e0a2d2244a237490de151921f6b87cff?imageMogr2/format/jpg/thumbnail/5000x5000',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://pic4.ajkimg.com/display/xinfang/e6c2fa8b87ce9c2a6f5d3953bc513243/403x335n.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://pic1.ajkimg.com/display/xinfang/f686a993d15717f5b8425c689a6686ee/190x130n.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 40rpx;
	}
</style>