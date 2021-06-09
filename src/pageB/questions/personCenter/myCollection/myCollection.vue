<template>
	<view>
		<view class="head" style="display: flex;align-items: center;">
			<image src="https://thirdwx.qlogo.cn/mmopen/vi_32/YQIxj616l4vev5RicB60oquMVSTbNccMDAgSY5hPaoDAH4oGViad6kGGeJj75Q0ljAPtFMAUKB7DFxrpG6jEnEYw/132"
			 style="width: 80rpx;height: 80rpx;border-radius: 50rpx;" mode=""></image>
			<view class="" style="font-size: 28rpx;margin-left: 20rpx; font-weight: bold;">
				酒馆
			</view>
		</view>
		<view class="content">
			<view class="left">
				<image src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3228549874,2173006364&fm=26&gp=0.jpg" mode="" style="width: 70px;height: 60px;"></image>
				<view class="right">
					<text>喝三鹿充满了每次撒名称吃撒调查从</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
.head{
	padding: 15rpx;
}
.content{
	padding: 15rpx;
	border-bottom: 1px solid #F1F1F1;
	.left{
		display: flex;
		.right{
			background-color: #F1F1F1;
			width: 100%;
			padding: 15rpx;
		}
	}
}
</style>
