<template>
	<view>
		<view class="comment">
			<view class="left">
				<image :src="comment.imgPath" mode="aspectFill"></image>
			</view>
			<view class="right">
				<view class="top">
					<view class="name">{{ comment.userName }}</view>
					<view class="like" :class="{ highlight: res.isLike }">
						<view class="num">{{ res.peaseCount }}</view>
						<u-icon v-if="!res.isLike" name="thumb-up" :size="30" color="#9a9a9a" @click="getLike(index)"></u-icon>
						<u-icon v-if="res.isLike" name="thumb-up-fill" :size="30" @click="getLike(index)"></u-icon>
					</view>
				</view>
				<view class="content">{{ comment.commentContent }}</view>
			</view>
		</view>
		<view class="center">

		</view>
		<view class="">
			<text>全部回复</text>
		</view>
		<view class="all-reply" v-for="(res, index) in replyList" :key="index" @click="getName(res.userName,res.commentMainId,res.userId,index)">
			<view class="comment">
				<view class="left">
					<image :src="res.imgPath" mode="aspectFill"></image>
				</view>
				<view class="right">
					<view class="top">
						<view class="name">{{res.userName}}</view>
					</view>
					<view class="content">{{res.commentContent}}</view>
					<view class="bottom">
						{{res.createTime}}
					</view>
				</view>
			</view>
		</view>
		<view class="box-2">
			<view class="flex_col">
				<view class="send-image">
					<u-icon name="photo" size="48"></u-icon>
				</view>
				<view class="flex_grow">
					<input type="text" class="content" v-model="content" :placeholder="'回复:'+comment.userName" placeholder-style="color:#DDD;"
					 :cursor-spacing="6">
				</view>
				<button class="send" @tap="send">发送</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		findCommentReply
	} from '@/util/questions/reply.js'
	import {
		addCommentReply
	} from '@/util/questions/reply.js'
	export default {
		data() {
			return {
				comment: {},
				replyList: [],
				content: '',
				userName: '',
				userId: '',
				replyIndex: '',
				username:'',
				avatar:''
			}
		},
		onLoad(options) {
			console.log(options)
			this.comment = options
			this.username = this.$store.state.username;
			this.avatar = this.$store.state.avatar;
			findCommentReply({
				"commentMainId": this.comment.commentMainId
			}).then(res => {
				console.log(res)
				this.replyList = res.data.data
			}).catch(err => {
				console.log(err)
			})
		},
		methods: {
			getName(userName, commentMainId, userId, index) {
				this.comment.userName = userName;
				this.userName = userName;
				this.comment.commentMainId = commentMainId;
				this.comment.userId = userId;
				this.replyIndex = index;
			},
			// 发送回复
			send() {
				addCommentReply({
					"commentContent": this.content,
					"commentMainId": this.comment.commentMainId,
					"questionId": this.comment.questionId,
					"replyUserId": this.comment.userId,
				}).then(res => {
					console.log(res)
					if(res.data.code === 0){
						var myDate = new Date()
						var mytime=myDate.toLocaleTimeString() 
						let replydata = {
							imgPath:this.avatar,
							userName:this.username,
							commentContent:this.content,
							createTime: mytime,
						}
						this.replyList.push(replydata)
					}else{
						uni.showToast({
							title:'回复失败'
						})
					}
				}).catch(err => {
					console.log(err)
				})
			}

		}
	}
</script>

<style lang="scss">
	@import "../../../../lib/global.scss";

	page {
		background-color: #FFFFFF;
	}

	.box-2 {
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

		>view {
			padding: 0 20rpx;
			height: 100rpx;
		}

		.content {
			background-color: #fff;
			height: 64rpx;
			padding: 0 20rpx;
			border-radius: 32rpx;
			font-size: 28rpx;
		}

		.send {
			background-color: #42b983;
			color: #fff;
			height: 64rpx;
			margin-left: 20rpx;
			border-radius: 32rpx;
			padding: 0;
			width: 120rpx;
			line-height: 62rpx;

			&:active {
				background-color: #5fc496;
			}
		}
	}

	// 
	.comment {
		display: flex;
		padding: 30rpx;
		border-bottom: solid 2rpx $u-border-color;

		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}

		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.name {
					color: #5677fc;
				}

				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26rpx;

					.num {
						margin-right: 4rpx;
						color: #9a9a9a;
					}
				}

				.highlight {
					color: #5677fc;

					.num {
						color: #5677fc;
					}
				}
			}

			.content {
				margin-bottom: 10rpx;
			}

			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 12rpx;

				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;

					.info {
						display: flex;

						.username {
							font-size: 18rpx;
							padding: 10rpx;
							color: #999999;
						}
					}

					.text {
						font-size: 22rpx;
					}
				}

				.all-reply {
					padding: 20rpx;
					display: flex;
					color: #5677fc;
					align-items: center;

					.more {
						margin-left: 6rpx;
					}
				}
			}

			.bottom {
				margin-top: 20rpx;
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;

				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}
			}
		}
	}

	.center {
		border-bottom: solid 10rpx $u-border-color;
	}
</style>
