<template>
	<view class="">
		<view class="person" v-if="showsearch">
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
				 label="公司" prop="company">
					<u-input :border="border" placeholder="请输入公司名称" v-model="model.company" type="select" @click="addCompany"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="上传头像" prop="photo" label-width="150">
					<u-upload width="160" height="160" action="#" ref="uUpload" :auto-upload="true" @on-choose-complete="uploadImage"
					 max-count=1 :max-size="1 * 1024 * 1024"></u-upload>
				</u-form-item>
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '16rpx'}" label-width="130" :label-position="labelPosition"
				 label="经纪人姓名" prop="name">
					<u-input :border="border" placeholder="请输入姓名" v-model="model.name" type="text"></u-input>
				</u-form-item>
			</u-form>
			<view style="margin-top: 100px;padding: 40px;">
				<u-button type="primary">立即注册</u-button>
			</view>
		</view>
		<!-- 显示搜索 -->
		<view class="" v-else>
			<uSearch :dictArr="wArr" @selectIndexValue="getVal" ref="usearch" @getValue="getValue" @getid="getid" @cancel="cancel"></uSearch>
			<view class="bottom-nav">
				<u-button type="primary" @click="ToaddCompany">添加公司</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import uSearch from './userzero-search.vue'
	export default {
		data() {
			return {
				model: {
					company: '',
					name: '',
				},
				showsearch:true,
				border: true,
				labelPosition: 'top',
				errorType: ['message'],
				wArr:[
					'saksk','你哈','你好呀','是的1','是的2','是的3','是的4','是的5','是的6','是的7','是的8',
				],
				rules: {
					company: [{
						required: true,
						message: '请输入工资',
						trigger: 'blur',
					}],
					name: [{
						required: true,
						message: '请输入工资',
						trigger: 'blur',
					}],
				},
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		components:{
			uSearch
		},
		methods: {
			addCompany() {
				this.showsearch = false
			},
			// 前往添加公司
			ToaddCompany(){
				uni.navigateTo({
					url:'../addCompany/addCompany'
				})
			},
			// 取消
			cancel(){
				this.showsearch = true
			},
			// 
			getValue(e){
				console.log(e)
			}
		}
	}
</script>

<style lang="scss">
	.person {
		margin-left: 20rpx;
	}
	.bottom-nav{
		height: 45px;
		background: #FFFFFF;
		border-top: 3rpx solid #F1F1F1;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		text-align: center;
	}
</style>
