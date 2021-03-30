<template>
	<view class="integral">
		<view class="integral-middle">
			<view class="content">
				<view class="integral-use" >
					<text>当前可用积分：</text>
					<text>2000</text>
				</view>
				<view class="integral-detail" @click="goOrder">
					<text>积分订单></text>
				</view>
			</view>
		</view>
		<view class="buy-integral">
			<view class="buy-head">
				<text>购买积分</text>
			</view>
			<view class="buy-middle">
				<view class="wrap" v-for="(item,index) in list" :key="item">
					<u-row gutter="16">
					<u-col span="6" >
						<view class="demo-layout bg-purple">
							<image :src="item.src" mode="" style="width: 40rpx; height: 40rpx; padding-top: 15rpx;"></image>
							<text>{{item.integral}}</text>
						</view>
					</u-col>
					<u-col span="6">
						<view class="demo-layout bg-purple-light">
							<image :src="item.src" mode="" style="width: 40rpx; height: 40rpx; padding-top: 15rpx;"></image>
							<text>{{item.integral}}</text>
						</view>
					</u-col>
				</u-row>
				<!-- <u-row gutter="16">
					<u-col span="6">
						<view class="demo-layout bg-purple">
							<image src="../../../../static/loan.png" mode="" style="width: 40rpx; height: 40rpx; padding-top: 15rpx;"></image>
							<text>10000积分</text>
						</view>
					</u-col>
					<u-col span="6">
						<view class="demo-layout bg-purple-light">
							<image src="../../../../static/loan.png" mode="" style="width: 40rpx; height: 40rpx; padding-top: 15rpx;"></image>
							<text>20000积分</text>
						</view>
					</u-col>
				</u-row> -->
				</view>
				<view class="integral-input">
				    <u-form-item :label-style="{color: '#FFFFFF'}" label-width="130" :label-position="labelPosition" label="金钱:" prop="count">
				    	<view class="ts-input">
				    		<u-input :border="border" placeholder="请输入多少元" v-model="model.count" type="text" ></u-input>
				    	</view>
				    </u-form-item>
				</view>
				<view class="buy">
					<u-button type="warning" @click="buyIntegral">立即购买</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import { buyIntegral } from '../../../../util/integral/integral.js'
	export default {
		data() {
			return {
				list: [
					{
						integral: '100积分',
						src:'../../../../static/loan.png'
					},
					{
						integral: '1000积分',
						src:'../../../../static/loan.png'
					}
				]
			}
		},
		onLoad() {

		},
		components: {

		},
		methods: {
			// 跳转到积分订单
			goOrder(){
				console.log("======")
				uni.navigateTo({
					url:'/pages/man/PersonalCenter/myPoints/integralOrder/integralOrder'
				})
			},
			// 购买积分
			buyIntegral(){
				buyIntegral({
					"totalFee":0.01
				}).then(res=>{
					let data = res.data.data
					if(res.data.code === 0){
						uni.requestPayment({
						    provider: 'wxpay',
						    timeStamp: data.timeStamp.toString(),
						    nonceStr: data.nonceStr,
						    package: data.package,
						    signType: data.signType,
						    paySign: data.paySign,
						    success: function (res) {
						        console.log('success:' + JSON.stringify(res));
						    },
						    fail: function (err) {
						        console.log('fail:' + JSON.stringify(err));
						    }
						});
					}
				}).catch(err=>{
					console.log(err)
				})
				// console.log("=======")
				// uni.requestPayment({
				//     provider: 'wxpay',
				//     timeStamp: String(Date.now()),
				//     nonceStr: 'A1B2C3D4E5',
				//     package: 'prepay_id=wx20180101abcdefg',
				//     signType: 'MD5',
				//     paySign: '',
				//     success: function (res) {
				//         console.log('success:' + JSON.stringify(res));
				//     },
				//     fail: function (err) {
				//         console.log('fail:' + JSON.stringify(err));
				//     }
				// });
			}
		}
	}
</script>

<style lang="scss">
	.integral {
		.integral-middle {
			width: 100%;
			height: 90px;
			align-items: center;
			position: relative;
			background-color: #5785E5;
			.content {
				.integral-use {
					padding: 25rpx;
					color: #FFC223;
					font-size: 30rpx;
				}
				.integral-detail {
					margin-left: 25rpx;
					text-align: center;
					width: 100px;
					height: 25px;
					padding-top: 5rpx;
					border-radius: 80upx;
					background-color: #FFFFFF;
					text{
						color: #E68D4E;
					}
				}
			}
		}
		// 购买积分
		.buy-integral {
			// border-top: 15rpx solid #F1F1F1;
			background-color: #D7BC85;
			height: 650px;
			.buy-head {
				padding: 20px;
			}
			.buy-middle {
				width: 90%;
				height: 450px;
				margin-left: 20px;
				border-radius: 15upx;
				position: relative;
				background: url(https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1964355142,616379727&fm=26&gp=0.jpg);
				.wrap {
						padding: 24rpx;
					}
				    
					.u-row {
						margin: 40rpx 0;
					}
				
					.demo-layout {
						height: 80rpx;
						border-radius: 8rpx;
						text-align: center;
					}
				
					.bg-purple {
						background: #e5e9f2;
					}
				
					.bg-purple-light {
						background: #e5e9f2;
					}
				
					.bg-purple-dark {
						background: #99a9bf;
					}
			}
			.integral-input{
				padding: 40px;
				.ts-input{
					width: 90%;
					height: 40px;
					background-color: #FFFFFF;
				}
			}
			.buy{
				width: 60%;
				margin-left: 70px;
				margin-top: 20px;
			}
		}
	}
</style>
