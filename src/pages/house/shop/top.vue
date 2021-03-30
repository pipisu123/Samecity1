<template>
	<view class="">
		<u-dropdown ref="uDropdown" @open="open" @close="close">
			<u-dropdown-item v-model="value1" title="区域" :options="options1" @change="change"></u-dropdown-item>
			<u-dropdown-item v-model="value2" title="租金" :options="options2"></u-dropdown-item>
		<u-dropdown-item v-model="value3" title="面积" :options="options3"></u-dropdown-item>
		<u-dropdown-item v-model="value4" title="属性" :options="options4"></u-dropdown-item>
		</u-dropdown>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value1: 1,
				value2: 2,
				value3: 3,
				value4: 4,
				options1: [{
						label: '全茂名',
						value: 1,
					},
					{
						label: '电白县',
						value: 2,
					},
					{
						label: '高州县',
						value: 2,
					},
					{
						label: '茂南区',
						value: 2,
					},
					{
						label: '化州县',
						value: 2,
					},
					{
						label: '信宜县',
						value: 2,
					},
					
				],
				options2: [
					{
						label: '不限',
						value: 1,
					},
					{
						label: '5000/月以下',
						value: 2,
					},
					{
						label: '5000-8000/月',
						value: 3,
					},
					{
						label: '8000-10000/月',
						value: 4,
					},
					{
						label: '1-1.5万/月',
						value: 5,
					},
				],
				options3: [
					{
						label: '不限',
						value: 1,
					},
					{
						label: '20㎡以下',
						value: 2,
					},
					{
						label: '20-50㎡',
						value: 3,
					},
					{
						label: '50-100㎡',
						value: 4,
					},
					{
						label: '100-200㎡',
						value: 5,
					},
					{
						label: '200-500㎡',
						value: 6,
					},
					{
						label: '500-1000㎡',
						value: 7,
					},
					
				],
				options4: [{
						label: '个人',
						value: 1,
					},
					{
						label: '中介',
						value: 2,
					},
					]
			}
		},
		methods: {
			open(index) {
				// 展开某个下来菜单时，先关闭原来的其他菜单的高亮
				// 同时内部会自动给当前展开项进行高亮
				this.$refs.uDropdown.highlight();
			},
			close(index) {
				// 关闭的时候，给当前项加上高亮
				// 当然，您也可以通过监听dropdown-item的@change事件进行处理
				this.$refs.uDropdown.highlight(index);
			},
			change() {
				// 更多的细节，如有需要请自行根据业务逻辑进行处理
				// this.$refs.uDropdown.highlight(xxx);
			}
		}
	}
</script>