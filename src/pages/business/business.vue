<template>
	<view class="container">
		<button @click="button">aa</button>
	</view>
</template>

<script>
	import QQMapWX from '@/lib/qqmap-wx-jssdk.min.js'
	export default {
		data() {
			return {
				city:null,
			}
		},
		onShow() {
			let qqmapsdk = new QQMapWX({
			  key: 'WNCBZ-HOJ3Q-CYC5R-GQM7C-VZDJH-EUBO6'
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
					// let that =this;
					// let city1 = '';
					// let _this = this;
					qqmapsdk.reverseGeocoder({
						location:{
							latitude: res.latitude,
							longitude: res.longitude
						},
						success(res){
							let that = this;
							console.log("res",res);
						    let	city = res.result.address_component.city.slice(0,2)
							that.$store.commit('newCityFun',city)
						}
					})
				}
			})
		},
		methods: {
			button(){
				console.log(this.city)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>