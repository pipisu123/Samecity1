<template>
	<view>
		<web-view :src="url" :progress="false"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'',
				title:''
			}
		},
		 onLoad(res) {
					console.log(res.url)
		            this.url = decodeURIComponent(res.url);
					console.log(this.url)
		        },
				onReady(){
		            uni.setNavigationBarTitle({
		                title:this.title
		            })
		        },
		methods: {
			
		}
	}
</script>

<style>

</style>
