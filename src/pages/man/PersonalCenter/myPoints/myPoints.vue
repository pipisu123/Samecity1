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
				<view class="wrap">
					<u-row gutter="16">
					<u-col span="6" @click="payMoney">
						<view class="demo-layout bg-purple">
							<text>1000积分/1元</text>
						</view>
					</u-col>
					<u-col span="6" @click="payMoney1">
						<view class="demo-layout bg-purple-light">
							<text>5000积分/5元</text>
						</view>
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="6" @click="payMoney2">
						<view class="demo-layout bg-purple">
							<text>10000积分/10元</text>
						</view>
					</u-col>
					<u-col span="6" @click="payMoney3">
						<view class="demo-layout bg-purple-light">
							<text>20000积分/20元</text>
						</view>
					</u-col>
				</u-row>
				</view>
				<view class="integral-input">
				    <u-form-item :label-style="{color: '#FFFFFF'}" label-width="130" :label-position="labelPosition" label="金钱:" prop="count">
				    	<view class="ts-input">
				    		<u-input :border="border" placeholder="请输入多少元" v-model="model.price" type="text" ></u-input>
				    	</view>
				    </u-form-item>
				</view>
				<view class="buy">
					<u-button type="warning" @click="buyIntegral">立即购买</u-button>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { buyIntegral } from '../../../../util/integral/integral.js'
	export default {
		data() {
			return {
				model:{
					price:'',
				}
			}
		},
		onLoad() {

		},
		components: {

		},
		methods: {
			payMoney(){
				this.model.price = 1;
				this.buyIntegral()
			},
			payMoney1(){
				this.model.price = 5;
				this.buyIntegral()
			},
			payMoney2(){
				this.model.price = 10;
				this.buyIntegral()
			},
			payMoney3(){
				this.model.price = 20;
				this.buyIntegral()
			},
			// 跳转到积分订单
			goOrder(){
				console.log("======")
				uni.navigateTo({
					url:'/pages/man/PersonalCenter/myPoints/integralOrder/integralOrder'
				})
			},
			// 购买积分
			buyIntegral(){
				if(this.model.price>100){
					this.$refs.uToast.show({
							title: '金额不能超过100',
							type: 'error',
					})
				}else if(this.model.price === ''){
					this.$refs.uToast.show({
							title: '金额不能空',
							type: 'error',
					})
				}else{
					buyIntegral({
						"totalFee":this.model.price
					}).then(res=>{
						let data = res.data.data
						console.log(res)
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
									uni.showToast({
										title:'付款成功'
									})
									uni.navigateTo({
										url:'/pages/man/PersonalCenter/me'
									})
							    },
							    fail: function (err) {
							        console.log('fail:' + JSON.stringify(err));
							    }
							});
						}
					}).catch(err=>{
						console.log(err)
					})
				}
				
				// console.log("=======")
				
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
						padding-top: 25rpx;
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
