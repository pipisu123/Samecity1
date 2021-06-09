<template>
	<view class="search-box">
		<view style="display: flex;">
			<input type="text" :value="text" @input="searchInput" class="u-search-input" placeholder="请输入楼盘名称"/>
			<view style="padding-top: 20rpx;" @click="cancel">取消</view>
		</view>
		<view v-for="(item,index) in searchArr" :key="index" class="u-search-list" @click="selectIndex( searchKey ? item[searchKey] : item,value)" v-show="show">
			{{ searchKey ? item[searchKey] : item.lable}}
			<view style="font-size: 25rpx;color: #D1D1D1;">{{ searchKey ? item[searchKey] : item.address}}</view>
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
							let ob = {
								lable:that.dictArr[i].label,
								address:that.dictArr[i].address,
								value: that.dictArr[i].value,
							}
							newArr.push(ob)
							// newArr.push(that.dictArr[i].address)
							that.value = that.dictArr[i].value
							that.address = that.dictArr[i].address
						}
					}
				}else{
					for (var i=0;i<len;i++) {
						if(that.dictArr[i].label[that.searchKey].indexOf(that.searchModel)>-1){
							let ob = {
								lable:that.dictArr[i].label,
								address:that.dictArr[i].address,
								value: that.dictArr[i].value,
							}
							// newArr.push(that.dictArr[i].address)
							that.value = that.dictArr[i].value
							that.address = that.dictArr[i].address
						}
					}	
				}
				return newArr
			},
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
		onShow() {
			
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
				console.log(val)
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
		height: 45px;
		/* padding: 11px 20rpx; */
		border-radius: 10rpx;
		background: #FFFFFF;
		box-shadow:0px 5px 5px 0px rgba(0, 0, 0, 0.05);
	}
</style>
