<template>
	<view class="wrap">
		<u-swiper :list="list" mode="number" indicator-pos="bottomCenter" height=520 title=true effect3d-previous-margin=45></u-swiper>
		<view class="text" >
			<view class="u-font-36  $u-main-color" >
			<text>出售|茂名保利东湾</text>
			<view class="u-font-20">
			<text>别名：保利东江小区</text>
		</view>
		</view>
		<!-- <view class="scroll"></view> -->
		</view>
		<newlayout></newlayout>
		<newnavi></newnavi>
		<bbar></bbar>
		<map></map>
		<tex></tex>	
	</view>
</template>

<script>
	import newlayout from '../newdishpage/newlayout.vue'
	import newnavi from '../newdishpage/newnavi.vue'
	import bbar from '../newdishpage/bbar.vue'
	import tex from '../newdishpage/tex.vue'
	// import steps from '../newdishpage/steps.vue'
	export default {
		data() {
			return {
				list: [{
						image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.ajkimg.com%2Fdisplay%2Fxfnew%2F8ffd2b955cba8b8bef85fd4ae2879eaf%2F800x600.jpg&refer=http%3A%2F%2Fpic4.ajkimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614735792&t=a211b25e6711014c592754ca92eea01f',
					},
					{
						image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ft-img.51f.com%2Fxf%2Fxw%2F13aeabc9-394d-40f8-90a6-d67f3409cd95.png&refer=http%3A%2F%2Ft-img.51f.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614735894&t=a54f7791efa3736de0f2f9b8e7f06941',	
					},
					{
						image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20171127%2F8eeab3d22e544a2595bdf2b0cbc5a44d.gif&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614735991&t=5d66f80aa72fb25fb88ae2fdab8b75a1',
					},
					// {
					// 	view: 'https://ips.ifeng.com/video19.ifeng.com/video09/2020/04/13/p35201349-102-9987636-170125.mp4?reqtype=tsl&vid=916cdba8-12a6-4b6b-aeac-c0581b7be4f9&uid=XkIThl&from=v_Free&pver=vHTML5Player_v2.0.0&sver=&se=&cat=&ptype=&platform=pc&sourceType=h5&dt=1612168000597&gid=MVkNgXdcs3RV&sign=5b420c802d58e453b8e376d5bf16b040&tm=1612168000597',
					// },
					// {
					//    video id="myvideo" src="https://ips.ifeng.com/video19.ifeng.com/video09/2020/04/13/p35201349-102-9987636-170125.mp4?reqtype=tsl&vid=916cdba8-12a6-4b6b-aeac-c0581b7be4f9&uid=XkIThl&from=v_Free&pver=vHTML5Player_v2.0.0&sver=&se=&cat=&ptype=&platform=pc&sourceType=h5&dt=1612168000597&gid=MVkNgXdcs3RV&sign=5b420c802d58e453b8e376d5bf16b040&tm=1612168000597" aucoplay="autoplay" controls="controls" loop="loop" 	
					// },
				],
			}
		},
		components:{
		    newlayout,
			newnavi,
			bbar,
			tex
			// steps
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 10rpx;
	}
	.scroll{
		height: 300rpx;
		width: 100%;
		overflow-y: scroll;
	}
</style>