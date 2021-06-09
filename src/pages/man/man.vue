<template>
	<view>
		<!-- 招聘首页 -->
		<template v-if="show">
			<!-- 搜索栏 -->
			<view class="search">
				<u-search placeholder="请输入职位或公司名称" v-model="value" @custom="custom"></u-search>
			</view>
			<!-- <view class="top">
				<Recruitment></Recruitment>
			</view> -->
			<!-- 轮播图 -->
			<view class="top">
				<view class="wrap">
					<u-swiper :list="list" effect3d="true" height=320 title=true effect3d-previous-margin=35 @click="click"></u-swiper>
				</view>
			</view>
			<!-- 广告通知 -->
			<notice></notice>
			<!-- 条件选择招聘列表 -->
			<!-- <RecruitmentBar @cityChange="cityChange" @wagesChange="wagesChange" @worktype="worktype" @industryselect="industryselect"></RecruitmentBar> -->
			<jobSelect ref="jobSelect" :listData="listData" @confirem="confiremJob"></jobSelect>
			<view class="center-bar">
				<Dropdown :itemArr="itemArr" :listArr="listArr" @subItemClick="subItemClick" @itemClick="itemClick" @SelectMore="SelectMore"></Dropdown>
			</view>
			<!-- 招聘发布列表 -->
			<view>
				<view v-if="list1.length ===0">
					<u-empty text="暂无数据" mode="search" margin-top=200></u-empty>
				</view>
				<Recruitmentlist :list1="list1" @itemClick="goDetail"></Recruitmentlist>
			</view>
		</template>

		<!-- 招聘人才库 -->
		<template v-else-if="show1">
			<view>
				<!-- 轮播图 -->
				<view class="talent-swiper">
					<view class="wrap">
						<u-swiper :list="list" effect3d="true" height=320 title=true effect3d-previous-margin=35 @click="click"></u-swiper>
					</view>
				</view>
				<jobSelect ref="jobSelect" :listData="listData" @confirem="confiremJob"></jobSelect>
				<view class="center-bar">
					<Dropdown :itemArr="itemArr" :listArr="listArr" @subItemClick="subItemClick" @itemClick="itemClick" @SelectMore="SelectMore"></Dropdown>
				</view>
				<!-- 个人简历列表 -->
				<ResumeList></ResumeList>
			</view>
		</template>
		<!-- 招聘发布 -->
		<template v-else-if="show2">
			<view>
				<Public></Public>
			</view>
		</template>
		<!-- 招聘职位 -->
		<template v-else-if="show3">
			<view class="ss">
				<Position></Position>
			</view>
		</template>
		<!-- 招聘个人中心 -->
		<template v-else-if="show4">
			<view class="me">
				<me></me>
			</view>
		</template>
		<!-- 底部导航栏 -->
		<Bottombar @Clickitem="Clickitem"></Bottombar>
		<u-toast ref="uToast" />
	</view>

</template>

<script>
	// import Recruitment from './childComps/Recruitment.vue';
	import notice from '../components/notice.vue'
	// import RecruitmentBar from './childComps/RecruitmentBar.vue'
	import Recruitmentlist from './childComps/Recruitmentlist.vue'
	import Dropdown from '@/common/Components/dropdown-screen.vue'
	import jobSelect from '@/common/yunmiao-jobSelect/yunmiao-jobSelect.vue'
	import Bottombar from './childComps/Bottombar.vue'
	import me from './PersonalCenter/me.vue'
	import ResumeList from './Talentpool/ResumeList.vue'
	import Position from '@/common/Chat/chatList.vue'
	import Public from '@/pages/PubRecruitment/PubRecruitment.vue'

	import {
		findAdvertisement
	} from '../../util/advertisement/advertisement.js'
	const industryselect = require('@/lib/industry.json')
	const CHINA_REGIONS = require('@/lib/regions.json')

	import {
		recruitmentList
	} from '../../util/recruitment.js'

	export default {
		data() {
			return {
				// 测试
				listData: industryselect,
				// isShowMore:false,
				all: CHINA_REGIONS,
				listArr: ['区域', '薪资', '类型'],
				itemArr: [
					[{
							name: '不限',
							value: 1,
						},
						{
							name: '1000以下',
							value: 2,
						},
						{
							name: '1000-2000',
							value: 3,
						},
						{
							name: '2000-3000',
							value: 4,
						},
						{
							name: '3000-5000',
							value: 5,
						},
						{
							name: '5000-8000',
							value: 6,
						},
						{
							name: '8000-12000',
							value: 7,
						},
						{
							name: '12000-20000',
							value: 8,
						},
						{
							name: '20000-25000',
							value: 9,
						},
						{
							name: '25000',
							value: 10,
						},
					],
					[{
							name: '兼职',
							value: 1,
						},
						{
							name: '全职',
							value: 2,
						},
						{
							name: '实习',
							value: 2,
						},
					],
				],
				currentIndex: '',
				// 测试
				ClickIndex: 0,
				value: '',
				list: [],
				list1: [],
				show: true,
				show1: false,
				show2: false,
				show3: false,
				show4: false,
				company: '',
				city: '',
				wages: '',
				work_types: '',
				page: 1,
				limit: 5,
				hasMore: true,
				status: 'nomore',
				showLoad: false

			}
		},
		components: {
			notice,
			// RecruitmentBar,
			jobSelect,
			Recruitmentlist,
			Bottombar,
			ResumeList,
			me,
			Position,
			Public,
			Dropdown,
		},
		onShow() {
			console.log(this.$store.state.province)
		},
		onLoad() {
			this.getRecruitmentlist();
			this.getadverDetail();
			this.$store.dispatch('getCity')
			let city = this.all.filter(item => {
				return item.name === uni.getStorageSync('province');
			})
			let area = city[0].childs.filter(item => {
				return item.name === '茂名市';
			})
			this.itemArr.unshift(area[0].childs)
			console.log(this.itemArr)
			// this.cityChange();
			// this.wagesChange()
		},
		created() {

		},
		// 下拉刷新
		onPullDownRefresh() {
			this.getRecruitmentlist()
		},
		watch: {
			// 这里的演示为证明通过v-model绑定值，它是双向绑定的，意味着您无需监听change事件
			// 也能知道value值当前的内容
			value(val) {
				// console.log(val);
			}
		},
		onReachBottom() {
			if (this.hasMore&&this.ClickIndex ===0) {
				this.page += 1;
				recruitmentList({
					"str": this.value,
					"address": this.city,
					"wages": this.wages,
					"industry": this.industry,
					"work_types": this.work_types,
					"page": this.page,
					"limit": this.limit,
				}).then(res => {
					uni.hideLoading()
					console.log(res)
					if (res.data.code === 20000) {
						if (res.data.data.user_Recruitments.length === 0) {
							this.hasMore = false;
							uni.showToast({
								title: "没有数据了",
								icon: "none"
							});
							return;
						}
						this.list1 = this.list1.concat(res.data.data.user_Recruitments)
						// this.list1 = [...this.list1, ...res.data.data.user_Recruitments];
					} else {

					}
				}).catch(err => {
					console.log(err)

				})
			} else {
				console.log("这是第二页")
			}
		},
		methods: {
			// 测试
			SelectMore() {
				this.$refs.jobSelect.show()
			},
			// 选择行业回调
			confiremJob(e) {
				this.city = '';
				this.wages = '';
				this.industry = e;
				this.work_types = '';
				this.page = 1;
				this.getRecruitmentlist()
			},
			// 下拉那个菜单
			itemClick(index) {
				this.currentIndex = index
			},
			// 选下拉回调
			subItemClick(e) {
				console.log(e)
				if (this.currentIndex === 0) {
					// 根据区域来查询
					this.city = e.name;
					this.wages = '';
					this.industry = '';
					this.work_types = '';
					this.page = 1;
					this.getRecruitmentlist()
				} else if (this.currentIndex === 1) {
					this.wages = e.name;
					this.city = '';
					this.industry = '';
					this.work_types = '';
					this.page = 1;
					this.getRecruitmentlist()
				} else if (this.currentIndex === 2) {
					this.wages = '';
					this.city = '';
					this.industry = '';
					this.work_types = e.name;
					this.page = 1;
					this.getRecruitmentlist()
				}
			},
			// 搜索招聘
			custom(value) {
				console.log(value)
				// this.value = '',
				recruitmentList({
					"str": this.value
				}).then(res => {
					console.log(res)
					this.list1 = res.data.data.user_Recruitments
				}).catch(err => {
					console.log(err)

				})
			},
			// 跳转到招聘详情
			goDetail(recruitmentId, id) {
				uni.navigateTo({
					url: '/pages/detail/detail?recruitmentId=' + recruitmentId + '&id=' + id
				})
			},
			// 查询广告
			getadverDetail() {
				findAdvertisement({
					"module": 'recruitment'
				}).then(res => {
					console.log(res)
					this.list = res.data.data.advertisements
				}).catch(err => {
					console.log(err)
				})
			},
			// 点击广告跳转到外部链接
			click(index) {
				let url = encodeURIComponent(this.list[index].advertisementPath)
				console.log(url)
				uni.navigateTo({
					url: '/pages/index/advertisementUrl/advertisementUrl?url=' + url
				})
			},
			Clickitem(index) {
				console.log(index)
				this.ClickIndex = index;
				switch (index) {
					case 0:
						this.show = true;
						this.show1 = false;
						this.show2 = false;
						this.show3 = false;
						this.show4 = false;
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
			// 查询招聘列表
			getRecruitmentlist() {
				uni.showLoading({
					title: '正在加载...'
				})
				recruitmentList({
					"str": this.value,
					"address": this.city,
					"wages": this.wages,
					"industry": this.industry,
					"work_types": this.work_types,
					"page": this.page,
					"limit": this.limit,
				}).then(res => {
					uni.hideLoading()
					console.log(res)
					if (res.data.code === 20000) {
						this.list1 = res.data.data.user_Recruitments;
					} else {
						this.$refs.uToast.show({
							title: '加载失败',
							type: 'error',
							duration: 2000
						})
					}
					if (res.data.code === 4010002) {
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}
				}).catch(err => {
					console.log(err)

				})

			}

		}
	}
</script>

<style lang="scss" scoped>
	.search {
		background-color: #5785E5;
		padding-bottom: 10rpx;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9;
	}

	.top {
		margin-top: 90rpx;
	}

	.button {
		margin-top: 600rpx;
		text-align: center;
	}
	.center-bar{
		position: -webkit-sticky;
		position: sticky;
		top: var(--window-top);
		z-index: 999;
		border-bottom: 2rpx solid #F1F1F1;
	}
	.talent-swiper {
		margin-top: 15rpx;
	}

	scroll-view {
		height: 900rpx;
	}
</style>
