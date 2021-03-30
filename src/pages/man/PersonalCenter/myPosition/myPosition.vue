<template>
  <view class="wrap">
  	<view class="u-tabs-box">
  		<u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750" bar-width=100></u-tabs-swiper>
  	</view>
	<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
		<swiper-item class="swiper-item">
			<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
					<view class="news" v-if="list1.length!=0">
						<view class="new-items" v-for="(item,index) in list1" :key="index" @click="goDetail(item.recruitment_id)">
							<!-- <image src="https://seopic.699pic.com/photo/50056/2286.jpg_wh1200.jpg" mode=""></image> -->
							<image src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1050564413,3771618612&fm=26&gp=0.jpg" mode=""
							 v-if="item.poster_path=='默认海报路径'"></image>
							<image :src="'http://192.168.101.24:8080/'+item.poster_path" mode="" v-else></image>
							
							<view class="right">
								<view class="title">
									 <text>{{item.recruitment_title}}</text>
									 <text class="worktype">{{item.work_types}}</text>
								</view>
								<view class="industry">
									<text>职位：{{item.work_name}}</text>	
								</view>
								<view>{{item.address}}</view>
								<view class="wages">薪资：{{item.wages}}</view>
								<view>公司：{{item.company.company_name}}</view>
							</view>
							<view>
								<view class="topping">
									<u-button size="mini" @click="Topping(item.recruitment_id)">置顶</u-button>
								</view>
							</view>
						</view>
					</view> 
				<u-empty text="暂无您的职位" mode="list" v-else></u-empty>
				</scroll-view>
		</swiper-item>
		<swiper-item class="swiper-item">
			<scroll-view scroll-y style="height: 100%;width: 100%;">
				<view class="news" v-if="list1.length!=0">
					<view class="new-items" v-for="(item,index) in list1" :key="index" @click="goDetail(item.recruitment_id)">
						<!-- <image src="https://seopic.699pic.com/photo/50056/2286.jpg_wh1200.jpg" mode=""></image> -->
						<image :src="'http://192.168.101.24:8080/'+item.poster_path" mode=""></image>
						<view class="right">
							<view class="title">
								 <text>{{item.recruitment_title}}</text>
								 <text class="worktype">{{item.work_types}}</text>
							</view>
							<view class="industry">
								<text>职位：{{item.work_name}}</text>	
							</view>
							<view>{{item.address}}</view>
							<view class="wages">薪资：{{item.wages}}</view>
							<view>公司：{{item.company.company_name}}</view>
						</view>
						<view>
							<view class="topping">
						      <u-button size="mini" @click="Topping(item.recruitment_id)">置顶</u-button>
							</view>
						</view>
					</view>
				</view> 
			<u-empty text="暂无您的职位" mode="list" v-else></u-empty>
				</scroll-view>
		</swiper-item>
		<swiper-item class="swiper-item">
			<scroll-view scroll-y style="height: 100%;width: 100%;">
				<view class="news" v-if="list1.length!=0">
					<view class="new-items" v-for="(item,index) in list1" :key="index" @click="goDetail(item.recruitment_id)">
						<!-- <image src="https://seopic.699pic.com/photo/50056/2286.jpg_wh1200.jpg" mode=""></image> -->
						<image :src="'http://192.168.101.24:8080/'+item.poster_path" mode=""></image>
						<view class="right">
							<view class="title">
								 <text>{{item.recruitment_title}}</text>
								 <text class="worktype">{{item.work_types}}</text>
							</view>
							<view class="industry">
								<text>职位：{{item.work_name}}</text>	
							</view>
							<view>{{item.address}}</view>
							<view class="wages">薪资：{{item.wages}}</view>
							<view>公司：{{item.company.company_name}}</view>
						</view>
						<view>
							<view class="topping">
							<u-button size="mini" @click="Topping(item.recruitment_id)">置顶</u-button>
							</view>
						</view>
					</view>
				</view> 
				<u-empty text="暂无您的职位" mode="list" v-else></u-empty>
				</scroll-view>
		</swiper-item>
		<swiper-item class="swiper-item">
			<scroll-view scroll-y style="height: 100%;width: 100%;" >
				<view class="news" v-if="list1.length!=0">
					<view class="new-items" v-for="(item,index) in list1" :key="index" @click="goDetail(item.recruitment_id)">
						<!-- <image src="https://seopic.699pic.com/photo/50056/2286.jpg_wh1200.jpg" mode=""></image> -->
						<image :src="'http://192.168.101.24:8080/'+item.poster_path" mode=""></image>
						<view class="right">
							<view class="title">
								 <text>{{item.recruitment_title}}</text>
								 <text class="worktype">{{item.work_types}}</text>
							</view>
							<view class="industry">
								<text>职位：{{item.work_name}}</text>	
							</view>
							<view>{{item.address}}</view>
							<view class="wages">薪资：{{item.wages}}</view>
							<view>公司：{{item.company.company_name}}</view>
						</view>
						<view>
							<view class="topping">
								<u-button size="mini" @click="Topping(item.recruitment_id)">置顶</u-button>
							</view>
						</view>
					</view>
				</view> 
				<u-empty text="暂无您的职位" mode="list" v-else></u-empty>
				</scroll-view>
		</swiper-item>
		</swiper>
		<u-toast ref="uToast" />
		<u-picker v-model="show" mode="selector" title="请选择置顶天数"  :range="selector" @confirm="confirm"></u-picker>
  </view>
</template>

<script>
	import {addTopping,recruitmentList} from '../../../../util/recruitment.js'
    export default {
        data() {
            return {
				list1:[],
				list: [
					{
						name: '全部职位'
					},
					{
						name: '全职职位'
					},
					{
						name: '兼职职位'
					},
					{
						name: '实习职位'
					},
				],
				options2: [{
								label: '去冰',
								value: 1,
							},
							{
								label: '加冰',
								value: 2,
							},
						],
				selector:[
					'1', '2', '3', '4', '5', '6', '7'
				],
				input:'',
				recruitment_id:'',
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				src:null,
				page:0,
				count:'',
				show:false,
				}
        },
		components:{
			
		},
		onLoad() {
			// this.Topping()
		},
		created() {
			this.getWorkname()
		},
        methods: {
			confirm(e) {
				 this.input = '';
				 this.input = this.selector[e[0]];
				 uni.showLoading({
				 	title:'置顶中...'
				 })
				addTopping({
					"recruitment_id":this.recruitment_id,
					"topping_time":this.input,
				}).then(res=>{
					console.log(res)
					if(res.data.code === 20000){
						uni.hideLoading()
						uni.showToast({
							title:`已经置顶${e[0]}天`
						})
					}else{
						this.$refs.uToast.show({
							title: '置顶失败,',
							type: 'error',
							})
						}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 置顶职位
			Topping(recruitment_id){
				this.show = true
				this.recruitment_id = recruitment_id
			},
			// 跳转到详情
			goDetail(recruitment_id){
				uni.navigateTo({
					url: '/pages/detail/detail?recruitment_id='+recruitment_id
				})
				console.log(recruitment_id)
				
			},
			// 查询我的所有职位
			async getWorkname(){
				recruitmentList({
					"user_id": "8040423884719751168",
					"paging":{
						"page":0
					}
				}).then(res=>{
					console.log(res)
					this.count = res.data.paging.count
					this.list1 = res.data.data.user_Recruitments
				}).catch(err=>{
					console.log(err)
				})
				
			},
			// 触底刷新
			reachBottom() {
				this.page++
				console.log(this.page)
				 uni.showNavigationBarLoading();//显示加载动画
				// 查询招聘列表
				recruitmentList({
					"paging":{
						"count":this.count,
						"page": this.page
					}
				}).then(res=>{
					console.log(res)
					if (res.data.code===20001) {//没有数据
							uni.hideNavigationBarLoading();//关闭加载动画
							return false;
								}
						this.list1 = this.list1.concat(res.data.data.user_Recruitments);//将数据拼接在一起			
						uni.hideNavigationBarLoading();//关闭加载动画
				}).catch(err=>{
					console.log(err)
				})
			},
          // tab栏切换
          change(index) {
          	this.swiperCurrent = index;
          	// console.log(index)
			if(index===0){
				this.getWorkname()
			}
			if(index===1){
				recruitmentList({
				"user_id": "8040423884719751168",
				"work_types":"全职",
				"paging":{
					"page":this.page
				}
				}).then(res=>{
					console.log(res)
					this.list1 = res.data.data.user_Recruitments
				}).catch(err=>{
					console.log(err)
				})
				
			}
			if(index===2){
				recruitmentList({
				"user_id":"8040423884719751168",
				"work_types":"兼职",
				"paging":{
					"page":this.page
				}
				}).then(res=>{
					console.log(res)
					this.list1 = res.data.data.user_Recruitments
				}).catch(err=>{
					console.log(err)
				})
				
			}
			if(index===3){
				recruitmentList({
				"user_id":"8040423884719751168",
				"work_types":"实习",
				"paging":{
					"page":this.page
				}
				}).then(res=>{
					console.log(res)
					this.list1 = res.data.data.user_Recruitments
				}).catch(err=>{
					console.log(err)
				})
				
			}
          },
          transition({ detail: { dx } }) {
          	this.$refs.tabs.setDx(dx);
          },
          animationfinish({ detail: { current } }) {
          	this.$refs.tabs.setFinishCurrent(current);
          	this.swiperCurrent = current;
          	this.current = current;
          }
        }
    }
</script>

<style lang="scss">

.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper-box {
	flex: 1;
	background-color: #f2f2f2;
}
.swiper-item {
	height: 100%;
}
.u-tabs-box{
	position: fixed;
	width: 100%;
	left: 0;
	right: 0;
	top: 0;
	z-index: 9;
}
.button{
	margin-top: 500rpx;
}
// 招聘列表
.news{
	margin-top: 90rpx;
	.new-items{
		display: flex;
		padding: 15rpx 20rpx;
		border-bottom: 2rpx solid #FFFFFF;
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
.avatar{
	
}
.info{
	margin-top: 15rpx;
	.time{
		font-size: 20rpx;
	}
}
.wages{
	color: #FF0000;
}

</style>