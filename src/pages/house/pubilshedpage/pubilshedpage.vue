<template>
	<view>
		<swippe></swippe>
		<view class="news">
			<view class="new-items" @click="godetail(recruitment1)">
				<!-- <image src="https://seopic.699pic.com/photo/50056/2286.jpg_wh1200.jpg" mode=""></image> -->
				<image :src="recruitment1.photourl" mode=""></image>
				<view class="right">
					<view class="title">
						 <text>{{recruitment1.name}}</text>
						 <text class="worktype">{{recruitment1.workTypes}}</text>
					</view>
					<view class="industry">
						<text>类型：{{recruitment1.goodsType}}</text>	
					</view>
					<view>{{recruitment1.region}}</view>
					<view class="wages">装修：{{recruitment1.wagesType}}</view>
					<view>房型：{{recruitment1.industry}}</view>
				</view>
				<view>
					<view class="avatar">
						<u-avatar :src="src" size=55  show-level=true ></u-avatar>
					</view>
				</view>
			</view>
			<view class="new-items" v-for="item in list" :key="item">
				<!-- <image src="https://seopic.699pic.com/photo/50056/2286.jpg_wh1200.jpg" mode=""></image> -->
				<image :src="item.src" mode=""></image>
				<view class="right">
					<view class="title">
						 <text>茂名</text>
						 <text class="worktype">房型</text>
					</view>
					<view class="industry">
						<text>类型：房屋</text>	
					</view>
					<view>广东省-茂名-茂南区</view>
					<view class="wages">房型:</view>
				</view>
				<view>
					<view class="avatar">
						<u-avatar :src="src" size=55  show-level=true ></u-avatar>
					</view>
				</view>
			</view>
		</view>
		<u-alert-tips @close="close" :closeAble="closeAble" :show="show1" @click="toCreate"
				:type="type" :title="title" :description="description" :showIcon="showIcon">
		</u-alert-tips>
	</view>
</template>

<script>
	import swippe from '../../house/bar/swippe.vue'
	export default {
		data() {
			return {
				description:'点击查看房源详情即可发布，赶紧去不发布吧',
				title: '温馨提示',
				show1: true,
				closeAble: true,
				showIcon: true,
				type: 'success',
				recruitment1:{
					name: '',
					workType: '',
					phone:'',
					wechat:'',
					wagesType: '',
					worktime: '',
					goodsType: '',
					intro: '',
					region: '',
					photo:'',
					lasttime: '',
					count: '',
					industry:'',
					show: false,
					photourl:''
				},
				list:[
					{
						src:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1351506984,3275166143&fm=26&gp=0.jpg',
					},
					{
						src:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.to8to.com%2Fcase%2F1703%2F15%2F20170315_f6f77d031c94f61b41b86r6cu0l1h1us_sp.jpg&refer=http%3A%2F%2Fpic2.to8to.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616660388&t=613c4ff0ab4aa7dcfdfccc13fa391cc5',
					},
					{
						src:'https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/space/pic/item/1ad5ad6eddc451da961af857b6fd5266d1163299.jpg',
					}
				]
			}
		},
		components:{
			swippe
		},
		onLoad(options) {
			const recruitment = JSON.parse(decodeURIComponent(options.recruitment));
			this.recruitment1.name = recruitment.name
			this.recruitment1.workType = recruitment.workType
			this.recruitment1.phone = recruitment.phone
			this.recruitment1.wechat = recruitment.wechat
			this.recruitment1.wagesType = recruitment.wagesType
			this.recruitment1.worktime = recruitment.worktime
			this.recruitment1.goodsType = recruitment.goodsType
			this.recruitment1.intro = recruitment.intro
			this.recruitment1.count = recruitment.count
			this.recruitment1.photourl = recruitment.photourl
			this.recruitment1.region = recruitment.region
			this.recruitment1.photo = recruitment.photo
			this.recruitment1.industry = recruitment.industry
			console.log(recruitment)
		},
		methods: {
			godetail(recruitment1){
				uni.navigateTo({
						url:'/pages/house/pubilshedpage/releasedpage'
				})
			}
		}
	}
</script>

<style lang="scss">
.news{
		.new-items{
			display: flex;
			padding: 15rpx 20rpx;
			border-bottom: 2rpx solid #F1F1F1;
			image{
				min-width: 30rpx;
				max-width: 200rpx;
				min-height:30rpx;
				max-height: 160rpx;
			}
			.right{
				width: 400rpx;
				margin-left: 15rpx;
				margin-right: 40rpx;
				view{
						font-size: 23rpx;
				}
				.title{
					font-weight: bold;
					font-size: 28rpx;
						display: flex;
						.worktype{
							margin-left: 30rpx;
							color: #999999;
							font-size: 20rpx;
							padding: 3px;
						}
					
				}
			}
			
		}
	}
</style>
