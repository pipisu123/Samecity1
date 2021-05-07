<template>
	<view class="search-box">
		<view style="display: flex;">
			<input type="text" :value="text" @input="searchInput" class="u-search-input" placeholder="请输入小区名称"/>
			<view style="padding-top: 20rpx;" @click="cancel">取消</view>
		</view>
		<view v-for="(item,index) in searchArr" :key="index" class="u-search-list" @click="selectIndex( searchKey ? item[searchKey] : item,value)" v-show="show">
			{{ searchKey ? item[searchKey] : item}}
		</view>
	</view>
</template>

<script>
	export default {
		name: 'uSearch',
		computed: {
			searchArr (){
				var that = this;
				var newArr = []
				var len = that.dictArr.length
				if(!that.searchKey){
					for (var i=0;i<len;i++) {
						if(that.dictArr[i].label.indexOf(that.searchModel)>-1){
							newArr.push(that.dictArr[i].label)
							that.value = that.dictArr[i].value
						}
					}
				}else{
					for (var i=0;i<len;i++) {
						if(that.dictArr[i].label[that.searchKey].indexOf(that.searchModel)>-1){
							newArr.push(that.dictArr[i].label)
							that.value = that.dictArr[i].value
						}
					}	
				}
				return newArr
			}
		},
		props: {
			"dictArr": {
				type: Array,
				default () {
					return []
				}
			},
			"searchKey": {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				searchModel: '',
				show:false,
				value:'',
				text:''
			}
		},
		created(){
			
		},
		mounted() {
			
		},
		methods: {
			// 取消
			cancel(){
				this.$emit('cancel')
			},
			// 
			searchInput(e){
				this.$emit('getValue',e.detail.value)
				this.searchModel = e.detail.value
				this.show = true
				if(e.detail.value===''){
					this.show = false
				}
			},
			getSearchInputValue(){
				return this.searchModel
				
			},
			selectIndex(val,value){
				this.$emit('selectIndexValue', val);
				this.text = val
				this.show = false
				this.$emit('getid',value)
			}
		}
	}
</script>

<style>
	.u-search-input{
		width: 80%;
		margin: 10rpx 30rpx 0 30rpx;
		padding: 10rpx 10rpx;
		height: 40rpx;
		border-radius: 24rpx;
		border: 1px solid #CCCCCC;
		border-bottom: 2rpx solid #F1F1F1;
	}
	.u-search-list{
		margin: 20rpx 30rpx;
		height: 35px;
		/* padding: 11px 20rpx; */
		border-radius: 10rpx;
		background: #FFFFFF;
		box-shadow:0px 5px 5px 0px rgba(0, 0, 0, 0.05);
	}
</style>
