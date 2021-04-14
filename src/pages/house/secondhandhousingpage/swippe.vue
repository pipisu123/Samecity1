<template>
    <view class="uni-padding-wrap">
    			<view class="page-section swiper">
    				<view class="page-section-spacing">
    					<swiper @change="onSlideChangeEnd" class="swiper" indicator-dots="#000000" :autoplay="autoplay" interval="10000" duration="500" style="height: 250px;">
    						<swiper-item style="z-index: 1;" >
    							<view class="">
    								<video @fullscreenchange="event" loop :muted="muted"  autoplay style="width: 100%;" :src="video" controls></video>
    							</view>
    						</swiper-item>
    						<swiper-item style="z-index: 1;" v-for="(item,index) in imgLists" :key="index">
    							<view class="swiper-item uni-bg-green">
								<view class="swiper-item uni-bg-green">
									<image :src="item" mode="" style="width: 100%;"></image>
								</view>
								</view>
    						</swiper-item>
    					</swiper>
    				</view>
    			</view>
    		</view>
</template>

<script>
	export default {
		props: {
			imgLists: {
				type: Array,
				default: null
			},
			video: {
				type: String,
				default: null
			}
		},
	    data() {
	        return {
				muted:false,
				vido:0,
	            background: ['color1', 'color2', 'color3'],
	            indicatorDots: true,
	            autoplay: false,
	            interval: 2000,
	            duration: 500
	        }
	    },
	    methods: {
	        changeIndicatorDots(e) {
	            this.indicatorDots = !this.indicatorDots
	        },
	        changeAutoplay(e) {
	            this.autoplay = !this.autoplay
	        },
	        intervalChange(e) {
	            this.interval = e.target.value
	        },
	        durationChange(e) {
	            this.duration = e.target.value
	        },
			onSlideChangeEnd: function(swiper) {
							// console.log(swiper.detail.current);
							this.vido=swiper.detail.current
						},
			event(fullScreen, direction){
							let self=this
							// console.log(fullScreen.detail.fullScreen)
							if(fullScreen.detail.fullScreen==false){
								self.autoplay=true
								self.muted=true
							}else{
								self.autoplay=false
								self.muted=false
							}
							
						console.log(self.autoplay+"22222")
						console.log(self.muted+"11111111")
							
						},
	    }
	}
</script>

<style lang="scss" scoped>
</style>
