<template>
  <view>
     <view>
         <view class="defa" :class="{'active': rSelect.indexOf()!=-1}" @tap="tapInfo()">
			 <u-icon name="star"></u-icon>
             <text>收藏</text>
         </view>
		 <u-toast ref="uToast" />
     </view>
  </view>
</template>

<script>
export default {
 data(){
   return{
       rSelect:[]
  }
},
methods:{
	tapInfo(e) {
		if (this.rSelect.indexOf(e) == -1) {
			this.rSelect.push(e);//选中添加到数组里
			this.$refs.uToast.show({
				title: '收藏成功',
				type: 'default',
				// url: '/pages/user/index'
				})
			console.log("收藏成功")
		} else {
			this.rSelect.splice(this.rSelect.indexOf(e), 1); //取消
			this.$refs.uToast.show({
				title: '已取消收藏',
				type: 'default',
				// url: '/pages/user/index'
				})
				console.log("取消收藏")
		}
		
	}
},
}
</script>

<style scoped lang="scss">
.defa{
	width: 100rpx;
	height: 50rpx;
	margin-right: 10rpx;
	border-radius: 25px;
	border: 1px solid #C0C0C0;
}
.active{
	width: 100rpx;
	height: 50rpx;
	color: white;
	border: 1px solid #e5e5e5;
	background-color: #ff5d00;
}
</style>