<template>
	<view>
		<view class="tips color_fff size_12 align_c" :class="{ 'show':ajax.loading }" @tap="getHistoryMsg">{{ajax.loadText}}</view>
		<view class="box-1" id="list-box">
			<view class="talk-list">
				<view v-for="(item,index) in talkList" :key="index" :id="`msg-${item.id}`">
					<view class="item flex_col" :class=" item.from.id == userId ? 'push':'pull' ">
						<image :src="item.from.imgpath" mode="aspectFill" class="pic"></image>
						<view class="content" v-if="item.msgType === 1">{{item.msg}}</view>
						<view class="show-image" v-else-if="item.msgType === 2">
							<image :src="item.msg" mode="" style="width: 200rpx; height: 200rpx;" @tap="_previewImage(item.msg)"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="box-2">
			<view class="flex_col">
				<view class="send-image">
					<u-icon name="photo" size="48" @click="click"></u-icon>
				</view>
				<view class="flex_grow">
					<input type="text" class="content" v-model="content" placeholder="请输入聊天内容" placeholder-style="color:#DDD;" :cursor-spacing="6">
				</view>
				<button class="send" @tap="send">发送</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { queryMessageList } from '../../../util/chat/chat.js'
	import { findRecruitmentUser } from '../../../util/recruitment/personCenter.js'
	export default {
		data() {
			return {
				talkList:[],
				ajax:{
					rows:30,	//每页数量
					page:1,	//页码
					flag:true,	// 请求开关
					loading:true,	// 加载中
					loadText:'正在获取消息'
				},
				list:[],
				content:'',  //信息内容
				allcontent:'',
				receiveId:'',
				userId:'' , //当前用户id
				imgpath:'',  //当前用户头像
				// 收到消息内容
				sendcontent:'',
				image:'',  //图片路径
				
				socketTask: null,
				// 确保websocket是打开状态
				is_open_socket: false
			}
		},
		onLoad(options) {
			
			// 进入这个页面的时候创建websocket连接【整个页面随时使用】
			this.connectSocketInit();
			this.receiveId = options.e;
			// 进入页面前查询个人信息
			findRecruitmentUser({
				
			}).then(res=>{
				console.log(res)
				this.imgpath = res.data.data.recruitmentUserVO.imgpath
				this.userId =res.data.data.recruitmentUserVO.userId
				console.log(this.userId)
			}).catch(err=>{
				console.log(err)
			})
		
		},
		beforeDestroy() {
			this.closeSocket();
		},
		mounted() {
			this.$nextTick(()=>{
				this.getHistoryMsg();
			});
		},
		onPageScroll(e){
			if(e.scrollTop<5){
				this.getHistoryMsg();
			}
		},
		methods: {
			
			// 进入这个页面的时候创建websocket连接【整个页面随时使用】
			connectSocketInit() {
				// 创建一个this.socketTask对象【发送、接收、关闭socket都由这个对象操作】
				this.socketTask = uni.connectSocket({
					// 【非常重要】必须确保你的服务器是成功的,如果是手机测试千万别使用ws://127.0.0.1:9099【特别容易犯的错误】
					url: "ws://" + '192.168.3.77:8080/ws/'+ uni.getStorageSync('token'),
					success(data) {
						console.log("websocket连接成功");
					},
				});
			 
				// 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则会失败】
				this.socketTask.onOpen((res) => {
					console.log("WebSocket连接正常打开中...！");
					this.is_open_socket = true;
					// 注：只有连接正常打开中 ，才能正常收到消息
					this.socketTask.onMessage((res) => {
						console.log("收到服务器内容：" + res.data);
						var jsonObj = JSON.parse(res.data);
						this.sendcontent = jsonObj
						console.log(jsonObj)
						let data = {
							"id":new Date().getTime(),
							"msg": this.sendcontent.msg,
							"type":2,
							"msgType":1,
							"from":{
								"id":this.sendcontent.from.id,
								"imgpath":this.sendcontent.from.imgpath,
							}
						}
						this.talkList.push(data);
					});
				})
				// 这里仅是事件监听【如果socket关闭了会执行】
				this.socketTask.onClose(() => {
					console.log("已经被关闭了")
				})
			},
			// 关闭websocket【离开这个页面的时候执行关闭】
			closeSocket() {
				this.socketTask.close({
					success(res) {
						this.is_open_socket = false;
						console.log("关闭成功", res)
					},
					fail(err) {
						console.log("关闭失败", err)
					}
				})
			},
			// 获取历史消息
			getHistoryMsg(){
				if(!this.ajax.flag){
					return; //
				}
				
				// 此处用到 ES7 的 async/await 知识，为使代码更加优美。不懂的请自行学习。
				let get = async ()=>{
					this.hideLoadTips();
					this.ajax.flag = false;
					await this.joinHistoryMsg()
					let data = this.list;
					
					console.log('----- 模拟数据格式，供参考 -----');
					console.log(data);	// 查看请求返回的数据结构 
					
					// 获取待滚动元素选择器，解决插入数据后，滚动条定位时使用
					let selector = '';
										
					if(this.ajax.page>1){
						// 非第一页，则取历史消息数据的第一条信息元素
						selector = `#msg-${this.talkList[0].id}`;
					}else{
						// 第一页，则取当前消息数据的最后一条信息元素
						selector = `#msg-${data[data.length-1].id}`;
					}
					
					// 将获取到的消息数据合并到消息数组中
					this.talkList = [...data,...this.talkList];	
					
					// 数据挂载后执行，不懂的请自行阅读 Vue.js 文档对 Vue.nextTick 函数说明。
					this.$nextTick(()=>{
						// 设置当前滚动的位置
						this.setPageScrollTo(selector);
						
						this.hideLoadTips(true);
												
						if(data.length < this.ajax.rows){
							// 当前消息数据条数小于请求要求条数时，则无更多消息，不再允许请求。
							// 可在此处编写无更多消息数据时的逻辑
						}else{
							this.ajax.page ++;
							
							// 延迟 200ms ，以保证设置窗口滚动已完成
							setTimeout(()=>{
								this.ajax.flag = true;
							},200)
						}
						
					})
				}
				get();
			},
			// 拼接历史记录消息，正式项目可替换为请求历史记录接口
			joinHistoryMsg(){
				console.log("========")
				queryMessageList({
					"limit":this.ajax.rows,
					"page": this.ajax.page,
					"toId": this.receiveId
				}).then(res=>{
					console.log(res)
					this.list = res.data.data
				}).catch(err=>{
					console.log(err)
				})
				let join = ()=>{
					let arr = [];
					
					//通过当前页码及页数，模拟数据内容
					let startIndex = (this.ajax.page-1) * this.ajax.rows;
					let endIndex = startIndex + this.ajax.rows;
					for(let i = startIndex; i < endIndex; i++){
						arr.push({
							"id":i,	// 消息的ID
							"content":`这是历史记录的第${i+1}条消息`,	// 消息内容
							"type":Math.random() > 0.5 ? 1 : 0	,// 此为消息类别，设 1 为发出去的消息，0 为收到对方的消息,
							"pic":"/static/logo.png"	// 头像
						})
					}
					
					/*
						颠倒数组中元素的顺序。将最新的数据排在本次接口返回数据的最后面。
						后端接口按 消息的时间降序查找出当前页的数据后，再将本页数据按消息时间降序排序返回。
						这是数据的重点，因为页面滚动条和上拉加载历史的问题。
					 */
					arr.reverse();
					
					return arr;
				}
				
				// 此处用到 ES6 的 Promise 知识，不懂的请自行学习。
				return new Promise((done,fail)=>{
					// 无数据请求接口，由 setTimeout 模拟，正式项目替换为 ajax 即可。
					setTimeout(()=>{
						let data = join();
						done(data);
					},1500);
				})
			},
			// 设置页面滚动位置
			setPageScrollTo(selector){
				let view = uni.createSelectorQuery().in(this).select(selector);
				view.boundingClientRect((res) => {
					uni.pageScrollTo({
					    scrollTop:res.top - 30,	// -30 为多显示出大半个消息的高度，示意上面还有信息。
					    duration: 0
					});
				}).exec();
			},
			// 隐藏加载提示
			hideLoadTips(flag){
				if(flag){
					this.ajax.loadText = '消息获取成功';
					setTimeout(()=>{
						this.ajax.loading = false;
					},300);
				}else{
					this.ajax.loading = true;
					this.ajax.loadText = '正在获取消息';
				}
			},
			// 选择发送的图片
			click(){
				let that = this;
				uni.chooseImage({
				    count: 6, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
				        console.log(res.tempFilePaths[0]);
						uni.uploadFile({
							url: 'http://192.168.3.77:8080/sys/uploadImgFile', 
							header: {
								"authorization":uni.getStorageSync('token'),
								'Accept': 'application/json',
							},
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData: {
								
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
								var jsonObj1 = JSON.parse(uploadFileRes.data);
								console.log(jsonObj1);
								that.image = jsonObj1.data
								console.log(that.image);
								// JSON对象转化为JSON字符串
								var jsonObj = {
								    "msg": that.image,
								    "toId": that.receiveId,
								    "msgType": 2
								};
								var jsonStr = JSON.stringify(jsonObj);
								that.allcontent = jsonStr
									// websocket的服务器的原理是:发送一次消息,同时返回一组数据【否则服务器会进去死循环崩溃】
								that.socketTask.send({
									data: that.allcontent,
									async success() {
										console.log("消息发送成功");
										
									},
								});
								// 将图片push进消息列表数组
								uni.showLoading({
									title:'正在发送'
								})
								
								setTimeout(()=>{
									uni.hideLoading();
									// 将当前发送信息 添加到消息列表。
									let data = {
										"id":new Date().getTime(),
										"msg": that.image,
										"type":2,
										"msgType":2,
										"from":{
											"id":that.userId,
											"imgpath":that.imgpath
										}
									}
									that.talkList.push(data);  //将当前用户的内容加进聊天列表
									console.log(data)
									console.log(that.talkList)
									that.$nextTick(()=>{
										// 清空内容框中的内容
										that.content = '';
										uni.pageScrollTo({
										    scrollTop: 999999,	// 设置一个超大值，以保证滚动条滚动到底部
										    duration: 0
										});
									})
								},1500);
							}
						});
				    }
				});
				
			},
			// 点击预览图片
			_previewImage(msg) {
				var imgArr = [];
				imgArr.push(msg);
				//预览图片
				uni.previewImage({
					urls: imgArr,
					current: imgArr[0]
				});
			},
			// 发送信息
			send(){
				if(!this.content){
					uni.showToast({
						title:'请输入有效的内容',
						icon:'none'
					})
					return;
				}else{
					// JSON对象转化为JSON字符串
					var jsonObj = {
					    "msg": this.content,
					    "toId": this.receiveId,
					    "msgType": 1
					};
					var jsonStr = JSON.stringify(jsonObj);
					this.allcontent = jsonStr
						// websocket的服务器的原理是:发送一次消息,同时返回一组数据【否则服务器会进去死循环崩溃】
						this.socketTask.send({
							data: this.allcontent,
							async success() {
								console.log("消息发送成功");
								
							},
						});
				}
				uni.showLoading({
					title:'正在发送'
				})
				
				setTimeout(()=>{
					uni.hideLoading();
					// 将当前发送信息 添加到消息列表。
					let data = {
						"id":new Date().getTime(),
						"msg":this.content,
						"type":2,
						"msgType":1,
						"from":{
							"id":this.userId,
							"imgpath":this.imgpath
						}
					}
					this.talkList.push(data);  //将当前用户的内容加进聊天列表
					console.log(data)
					console.log(this.talkList)
					this.$nextTick(()=>{
						// 清空内容框中的内容
						this.content = '';
						uni.pageScrollTo({
						    scrollTop: 999999,	// 设置一个超大值，以保证滚动条滚动到底部
						    duration: 0
						});
					})
				},1500);
			}
		}
	}
</script>

<style lang="scss">
	@import "../../../lib/global.scss";
	page{
		background-color: #F3F3F3;
		font-size: 28rpx;
	}
	
	/* 加载数据提示 */
	.tips{
		position: fixed;
		left: 0;
		top:var(--window-top);
		width: 100%;
		z-index: 9;
		background-color: rgba(0,0,0,0.15);
		height: 72rpx;
		line-height: 72rpx;
		transform:translateY(-80rpx);
		transition: transform 0.3s ease-in-out 0s;
		
		&.show{
			transform:translateY(0);
		}
	}
	
	.box-1{
		width: 100%;
		height: auto;
		padding-bottom: 100rpx;
		box-sizing: content-box;
		
		/* 兼容iPhoneX */
		margin-bottom: 0;  
		margin-bottom: constant(safe-area-inset-bottom);  
		margin-bottom: env(safe-area-inset-bottom);  
	}
	.box-2{
		position: fixed;
		left: 0;
		width: 100%;
		bottom: 0;
		height: auto;
		z-index: 2;
		border-top: #e5e5e5 solid 1px;
		box-sizing: content-box;
		background-color: #F3F3F3;
		
		/* 兼容iPhoneX */
		padding-bottom: 0;  
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);  
		
		>view{
			padding: 0 20rpx;
			height: 100rpx;
		}
		
		.content{
			background-color: #fff;
			height: 64rpx;
			padding: 0 20rpx;
			border-radius: 32rpx;
			font-size: 28rpx;
		}
		
		.send{
			background-color: #42b983;
			color: #fff;
			height: 64rpx;
			margin-left: 20rpx;
			border-radius: 32rpx;
			padding: 0;
			width: 120rpx;
			line-height: 62rpx;
			
			&:active{
				background-color: #5fc496;
			}
		}
	}
	.show-image{
		margin-right: 25rpx;
	}
	.talk-list{
		padding-bottom: 20rpx;
		
		/* 消息项，基础类 */
		.item{
			padding: 20rpx 20rpx 0 20rpx;
			align-items:flex-start;
			align-content:flex-start;
			color: #333;
			
			.pic{
				width: 92rpx;
				height: 92rpx;
				border-radius: 50%;
				border: #fff solid 1px;
			}
			
			.content{
				padding: 20rpx;
				border-radius: 4px;
				max-width: 500rpx;
				word-break: break-all;
				line-height: 52rpx;
				position: relative;
			}
			
			/* 收到的消息 */
			&.pull{
				.content{
					margin-left: 32rpx;
					background-color: #fff;
					
					&::after{
						content: '';
						display: block;
						width: 0;
						height: 0;
						border-top: 16rpx solid transparent;
						border-bottom: 16rpx solid transparent;
						border-right: 20rpx solid #fff;
						position: absolute;
						top: 30rpx;
						left: -18rpx;
					}
				}
			}
			
			/* 发出的消息 */
			&.push{
				/* 主轴为水平方向，起点在右端。使不修改DOM结构，也能改变元素排列顺序 */
				flex-direction: row-reverse;
				
				.content{
					margin-right: 32rpx;
					background-color: #a0e959;
					
					&::after{
						content: '';
						display: block;
						width: 0;
						height: 0;
						border-top: 16rpx solid transparent;
						border-bottom: 16rpx solid transparent;
						border-left: 20rpx solid #a0e959;
						position: absolute;
						top: 30rpx;
						right: -18rpx;
					}
				}
			}
		}
	}
</style>