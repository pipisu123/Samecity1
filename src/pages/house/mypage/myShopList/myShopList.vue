<template>
	<view>
		<u-subsection :list="list" :current="curNow" @change="sectionChange"></u-subsection>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '商铺出租'
					},
					{
						name: '商铺出售'
					},
					{
						name: '商铺转租'
					},
					{
						name: '商铺转让'
					},
				],
				curNow: 0
			}
		},
		methods: {
			sectionChange(index) {
				this.curNow = index;
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
