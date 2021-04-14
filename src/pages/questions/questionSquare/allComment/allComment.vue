<template>
	<view>
		<view>
			<view class="comment" v-for="(res, index) in commentList" :key="index">
				<view class="left">
					<image :src="res.imgPath" mode="aspectFill"></image>
				</view>
				<view class="right">
					<view class="top">
						<view class="name" @click="getName(res.userName,res.commentMainId,res.userId,index)">{{ res.userName }}</view>
						<view class="like" :class="{ highlight: res.isLike }">
							<view class="num">{{ res.peaseCount }}</view>
							<u-icon v-if="!res.isLike" name="thumb-up" :size="30" color="#9a9a9a" @click="getLike(index)"></u-icon>
							<u-icon v-if="res.isLike" name="thumb-up-fill" :size="30" @click="getLike(index)"></u-icon>
						</view>
					</view>
					<view class="content">{{ res.commentContent }}</view>
					<view class="reply-box" @tap="toAllReply(res.commentContent,res.imgPath,res.userName,res.commentMainId,res.questionId,res.userId)">
						<view class="item" v-for="(item, index1) in res.commentMainShowVO" :key="index1">
							<view class="info">
								<view>
									<image :src="item.imgPath" mode="aspectFill" style="width: 45rpx;height: 45rpx;border-radius: 50%;"></image>
								</view>
								<view class="username">{{ item.userName }}</view>
							</view>
							<view class="text">{{item.commentContent}}</view>
						</view>
						<view class="all-reply" v-if="res.commentMainShowVO.length != 0&res.commentReplyCount!=undefined">
							共{{ res.commentReplyCount }}条回复
							<u-icon class="more" name="arrow-right" :size="26"></u-icon>
						</view>
					</view>
					<view class="bottom">
						{{ res.createTime }}
						<view class="reply" @click="getName(res.userName,res.commentMainId,res.userId,index)">回复</view>
					</view>
				</view>	
			</view>
		</view>
		<!-- 评论 -->
		<view class="box-2" v-if="showReply">
			<view class="flex_col">
				<view class="send-image">
					<u-icon name="photo" size="48"></u-icon>
				</view>
				<view class="flex_grow">
					<input type="text" class="content" v-model="content" placeholder="说说你的看法..." placeholder-style="color:#DDD;"
					 :cursor-spacing="6">
				</view>
				<button class="send" @tap="send">发送</button>
			</view>
		</view>
		<!-- 回复 -->
		<view class="box-2" v-else>
			<view class="flex_col">
				<view class="send-image">
					<u-icon name="photo" size="48"></u-icon>
				</view>
				<view class="flex_grow">
					<input type="text" class="content" v-model="content" :placeholder="placeholder" placeholder-style="color:#DDD;"
					 :cursor-spacing="6">
				</view>
				<button class="send" @tap="sendReply">发送</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		findCommentMain
	} from '@/util/questions/comment.js'
	import {
		addCommentMain
	} from '@/util/questions/comment.js'
	import {
		addCommentReply
	} from '@/util/questions/reply.js'
	export default {
		data() {
			return {
				keyword: '',
				commentList: [],
				replyList: [],
				data: {},
				value: '我也说几句...',
				userid: '', //当前人的userId
				publicUserId:'', //发布问题人的ID
				username: '',
				avatar: '',
				content: '',
				replyIndex: '',
				questionId: '',
				replyUserId: '',
				commentMainId: '',
				placeholder: '',
				showReply: true
			};
		},
		onLoad(options) {
			// this.getComment();
			this.getallComment(options.questionId);
			this.questionId = options.questionId;
			this.publicUserId = options.userId;
			this.userid = this.$store.state.userid;
			this.username = this.$store.state.username;
			this.avatar = this.$store.state.avatar;
			console.log(this.avatar)
		},
		methods: {
			toAllReply(commentContent, imgPath, userName, commentMainId, questionId, userId) {
				uni.navigateTo({
					url: '/pages/questions/questionSquare/allAnswer/allAnswer?commentContent=' + commentContent + '&imgPath=' +
						imgPath + '&userName=' + userName + '&commentMainId=' + commentMainId + '&questionId=' + questionId +
						'&questionId=' + questionId + '&userId=' + userId
				})
			},
			// 回复别人
			sendReply() {
				console.log("这是回复")
				console.log(this.replyIndex)
				addCommentReply({
					"commentContent": this.content,
					"commentMainId": this.commentMainId,
					"questionId": this.questionId,
					"replyUserId": this.replyUserId,
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						let replydata = {
							imgPath: this.avatar,
							userName: this.username,
							commentContent: this.content,
						}
						this.commentList[this.replyIndex].commentMainShowVO.push(replydata)
					} else {
						uni.showToast({
							title: '发送失败'
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getName(userName, commentMainId, userId, index) {
				console.log(index)
				this.replyIndex = index;
				this.commentMainId = commentMainId;
				this.replyUserId = userId;
				this.showReply = false;
				this.placeholder = '回复：' + userName;
			},
			// 获取所有评论列表
			getallComment(questionId) {
				findCommentMain({
					"questionId": questionId
				}).then(res => {
					console.log(res)
					this.commentList = res.data.data;
				}).catch(err => {
					console.log(err)
				})
			},
			// 点赞
			getLike(index) {
				this.commentList[index].isLike = !this.commentList[index].isLike;
				if (this.commentList[index].isLike == true) {
					this.commentList[index].likeNum++;
				} else {
					this.commentList[index].likeNum--;
				}
			},
			// 发表评论
			send() {
				addCommentMain({
					"commentContent": this.content,
					"questionId": this.questionId,
					"userId": this.publicUserId,
				}).then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
				let data = {
					// id:5,
					userName: this.username,
					createTime: new Date().getTime(),
					commentContent: this.content,
					imgPath: this.avatar,
				}
				this.commentList.push(data)
			},
		}
	};
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
</style>
