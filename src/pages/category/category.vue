<template>
	<u-select v-model="show" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				list: []
			}
		},
		onLoad() {
			this.getlist()
		},
		methods: {
			getlist() {
				for (let i = 0; i < 100; i++) {
					let ob = {
						label: i+'层',
						children: []
					}
					this.list.push(ob)
					for (let j = i; j < 100; j++) {
						let ob1 = {
							label: '共'+j+'层',
						}
						this.list[i].children.push(ob1)
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">

</style>
