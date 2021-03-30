<template>
	<view>
		<mark-slide-list :list="list" :button="buttonList" :border="true" @click="clickMethod" @change="changeMethod" ></mark-slide-list>
	</view>
</template>

<script>
	import markSlideList from './childComps/mark-slide-list.vue'
	
	import { getMessageUserList } from '../../../util/chat/chat.js'
	export default {
		data() {
			return {
				list : [],
				buttonList: [
					{
						title: '分享',
						background: '#c4c7cd'
					},
					{
						title: '删除',
						background: '#ff3b32'
					}
				]
			}
		},
		components:{
			markSlideList
		},
		created() {
			uni.showLoading({
				title:'加载消息中...'
			})
			getMessageUserList({
				
			}).then(res=>{
				console.log(res)
				if(res.data.code === 0){
					uni.hideLoading()
					this.list = res.data.data
				}
				console.log(this.list)
			}).catch(err=>{
				console.log(err)
			})
		},
		onLoad() {
			
		},
		methods: {
			 changeMethod(data, button, index){
			                console.log('滑动按钮回调', data)
			                console.log('滑动按钮回调', button)
			            },
			            clickMethod(e){
			                console.log(e)
							const res = this.$myRequest({
								url:'sys/message/addMessageUserList?toId='+e,
								dataType: "json",
								header: {
								        'content-type': 'application/json', 
								        },
								data:JSON.stringify({ 
								  
								}),
								method: 'POST'
							})
							uni.navigateTo({
								url:'/pages/detail/chat/chat?e='+e
							})
			            }
		}
	}
</script>

<style>

</style>
