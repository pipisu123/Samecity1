<template>
	<view>
		<!-- 返回到首页 -->
		<template v-if="show">
			<view class="">
				
			</view>
		</template>

		<!-- 问题广场 -->
		<template v-else-if="show1">
			<view>
				<view class="">
					<queSquare></queSquare>
				</view>
			</view>
		</template>
		<!-- 问题发布 -->
		<template v-else-if="show2">
			<view>
				<qusetionPub></qusetionPub>
			</view>
		</template>
		<!-- 通知信息 -->
		<template v-else-if="show3">
			<view class="ss">
				第四页
			</view>
		</template>
		<!-- 问题个人中心 -->
		<template v-else-if="show4">
			<view class="me">
				第五页
			</view>
		</template>

		<!-- 底部导航栏 -->
		<Bottombar @Clickitem="Clickitem"></Bottombar>
	</view>

</template>

<script>
	import Bottombar from '../questions/bottombar.vue'
	import queSquare from './questionSquare/questionSquare.vue'
	import qusetionPub from './questionPub/qustionPub.vue'
	export default {
		data() {
			return {
				show: false,
				show1: true,
				show2: false,
				show3: false,
				show4: false,
			}
		},
		components: {
		   Bottombar,
		   queSquare,
		   qusetionPub
		},
		onLoad() {
			
		},
		created() {

		},
		
		watch: {
			// 这里的演示为证明通过v-model绑定值，它是双向绑定的，意味着您无需监听change事件
			// 也能知道value值当前的内容
			value(val) {
				// console.log(val);
			}
		},
		methods: {
			
			Clickitem(index) {
				console.log(index)
				switch (index) {
					case 0:
						this.show = true;
						this.show1 = false;
						this.show2 = false;
						this.show3 = false;
						this.show4 = false;
						this.callback();
						break;
					case 1:
						this.show = false;
						this.show1 = true;
						this.show2 = false;
						this.show3 = false;
						this.show4 = false;
						break;
					case 2:
						this.show = false;
						this.show1 = false;
						this.show2 = true;
						this.show3 = false;
						this.show4 = false;
						break;
					case 3:
						this.show = false;
						this.show1 = false;
						this.show2 = false;
						this.show3 = true;
						this.show4 = false;
						break;
					case 4:
						this.show = false;
						this.show1 = false;
						this.show2 = false;
						this.show3 = false;
						this.show4 = true;
						break;
				}
			},
			// 返回到首页
			callback(){
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	
</style>
