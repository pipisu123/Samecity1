<template>
	<view class="container">
		
	</view>
</template>

<script>
	import QQMapWX from '../../lib/qqmap-wx-jssdk.min.js'
	export default {
		data() {
			return {
				
			}
		},
		onShow() {
			let qqmapsdk = new QQMapWX({
			  key: 'GN7BZ-5CG6X-BC64A-TLNSK-4QAZ7-2MBZ7'
			});
			uni.authorize({
				scope: 'scope.userLocation',
				success(){},
				fail(res){
					console.log(res);
				}
			})
			//获取经纬度坐标
			uni.getLocation({
				type:'gcj02',
				success(res){
					console.log('res.latitude',res.latitude,'res.longitude',res.longitude);
					qqmapsdk.reverseGeocoder({
						location:{
							latitude: res.latitude,
							longitude: res.longitude
						},
						success(res){
							console.log("res",res);
						}
					})
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	
</style>