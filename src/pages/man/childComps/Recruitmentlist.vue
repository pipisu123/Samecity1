<template>
	<view class="recruitment">
		<view class="recruitment-items" v-for="(item,index) in list1" :key="index" @click="goDetail(item.recruitment_id,item.user_id)">
			<image src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1050564413,3771618612&fm=26&gp=0.jpg" mode=""
			 v-if="item.poster_path=='默认海报路径'"></image>
			<image :src="'http://192.168.101.24:8080/'+item.poster_path" mode="" v-else></image>
			<view class="personRecruitment" v-if="item.poster_path=='默认海报路径'">
				<view class="persontitle">
					<text>{{item.introduction}}</text>
				</view>
				<view class="address">
					<u-icon name="map" color="#2979ff" size="28"></u-icon>
					<text>{{item.address}}</text>
				</view>
				<view class="phone">
					<u-icon name="phone" color="#00F000" size="28"></u-icon>
					<text>{{item.phone}}</text>
				</view>
			</view>
			<view class="right" v-else>
				<view class="title">
					<text>{{item.recruitment_title}}</text>
					<text class="worktype">{{item.work_types}}</text>
				</view>
				<view class="industry">
					<text>职位：{{item.industry}}.{{item.work_name}}</text>
				</view>
				<view>{{item.address}}</view>
				<view class="wages">薪资：{{item.wages}}</view>
				<view>公司：{{item.company.company_name}}</view>
			</view>
			<view>
				<view class="avatar">
					<u-avatar :src="item.user.imgpath" size=55 show-level=true></u-avatar>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list1: {
				type: Array,
				default: null
			}
		},
		data() {
			return {
				pic: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				scrollTop: 0,
				token: '',
				"userid":'',
				"username":'',
				wechatname:''
			}
		},
		onLoad() {
			
		},
		created() {
			this.src = this.$store.state.avatar
			this.token = this.$store.state.token
			console.log(this.token)
			const token = uni.getStorageSync('token')
			console.log(token)
			this.userid = this.$store.state.userid
			console.log(this.userid)
			this.username = this.$store.state.username
			console.log(this.username)
			this.wechatname = this.$store.state.wechatname
			console.log(this.wechatname)
		},
		methods: {
			goDetail(recruitment_id,user_id) {
				this.$emit('itemClick', recruitment_id,user_id)
			}
		}
	}
</script>

<style lang="scss">
	.recruitment {
		.recruitment-items {
			display: flex;
			padding: 15rpx 20rpx;
			border-bottom: 2rpx solid #F1F1F1;

			image {
				min-width: 30rpx;
				max-width: 200rpx;
				min-height: 30rpx;
				max-height: 160rpx;
			}

			.right {
				width: 400rpx;
				margin-left: 15rpx;
				margin-right: 40rpx;

				view {
					font-size: 23rpx;
				}

				.title {
					font-weight: bold;
					font-size: 28rpx;
					display: flex;

					.worktype {
						margin-left: 30rpx;
						color: #999999;
						font-size: 20rpx;
						padding: 3px;
					}

				}
			}

		}
	}

	.avatar {}

	.info {
		margin-top: 15rpx;

		.time {
			font-size: 20rpx;
		}
	}

	.wages {
		color: #FF0000;
	}

	// 个体信息
	.personRecruitment {
		width: 400rpx;
		margin-left: 15rpx;
		margin-right: 40rpx;
		.address{
			overflow:hidden;
			text-overflow:ellipsis;
			white-space:nowrap;
		}
		.persontitle {
			font-weight: bold;
			overflow: hidden;
			/*超出隐藏*/
			display: -webkit-box;
			/*设置为弹性盒子*/
			-webkit-line-clamp: 2;
			/*最多显示x行*/
			text-overflow: ellipsis;
			/*超出显示为省略号*/
			-webkit-box-orient: vertical;
		}
	}
</style>
