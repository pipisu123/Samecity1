<template>
	<view class="recommend">
		<view class="hot-recommend">
			<view class="left">
				<image class="hot-recommend-image" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2F00.minipic.eastday.com%2F20170308%2F20170308113153_8580c2031d77a8fcedaae6e34aa8780e_9.jpeg&refer=http%3A%2F%2F00.minipic.eastday.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613956992&t=7f67a5f244d1725157c45024da2842c5" mode="heightFix;widthFix"></image>
			</view>
			<view class="right">
				<image class="hot-recommend-image" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=734895668,3018529710&fm=26&gp=0.jpg" mode="heightFix;widthFix"></image>
				<image class="hot-recommend-image" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F59acb3af83afb.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613957563&t=e2251ed0c045b33ad946feda2dd32218" mode="heightFix;widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.hot-recommend {
		background-color: #FFFFFF;
		display: flex;
		padding: 10rpx 10rpx 0;
		.hot-recommend-image {
			width: 100%;
			height: 100%;
		}
		.left {
			flex: 3;
			height: 350upx;
			margin-right: 15upx;
		}
		.right {
			flex: 4;
			.hot-recommend-image {
				height: 170upx;
			}
		}
	}
</style>
