<template>
	<view>
		<view v-if="commentList.length!=0">
			<view class="comment" v-for="(res, index) in commentList" :key="index" >
				<view class="left">
					<image :src="res.imgPath" mode="aspectFill"></image>
				</view>
				<view class="right">
					<view class="top">
						<view class="name" @click="getName(res.userName)">{{ res.userName }}</view>
						<view class="like" :class="{ highlight: res.isLike }">
							<view class="num">{{ res.peaseCount }}</view>
							<u-icon v-if="!res.isLike" name="thumb-up" :size="30" color="#9a9a9a" @click="getLike(index)"></u-icon>
							<u-icon v-if="res.isLike" name="thumb-up-fill" :size="30" @click="getLike(index)"></u-icon>
						</view>
					</view>
					<view class="content">{{ res.commentContent }}</view>
					<view class="reply-box">
						<view class="item" v-for="(item, index) in res.replyList" :key="item.index">
							<view class="username">{{ item.name }}</view>
							<view class="text">{{ item.contentStr }}</view>
						</view>
						<view class="all-reply" @tap="toAllReply" v-if="res.replyList != undefined">
							共{{ res.allReply }}条回复
							<u-icon class="more" name="arrow-right" :size="26"></u-icon>
						</view>
					</view>
					<view class="bottom">
						{{ res.createTime }}
						<view class="reply" @click="getName(res.userName)">回复</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<u-empty text="暂无评论" mode="list" margin-top=600></u-empty>
		</view>
		<view class="box-2">
			<view class="flex_col">
				<view class="send-image">
					<u-icon name="photo" size="48"></u-icon>
				</view>
				<view class="flex_grow">
					<input type="text" class="content" v-model="content" :placeholder="placeholder" placeholder-style="color:#DDD;"
					 :cursor-spacing="6">
				</view>
				<button class="send" @tap="send">发送</button>
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
	export default {
		data() {
			return {
				keyword: '',
				commentList: [],
				data: null,
				value: '我也说几句...',
				userid: '',
				username: '',
				avatar: '',
				content: '',
				questionId: '',
				placeholder:'说说你的看法...'
			};
		},
		onLoad(options) {
			// this.getComment();
			this.getallComment(options.questionId);
			this.questionId = options.questionId;
			this.userid = this.$store.state.userid;
			this.username = this.$store.state.username;
			this.avatar = this.$store.state.avatar;
			console.log(this.avatar)
		},
		methods: {
			// 回复别人
			getName(userName){
				this.placeholder = '回复：'+userName
			},
			// 获取所有评论列表
			getallComment(questionId) {
				findCommentMain({
					"questionId": questionId
				}).then(res => {
					console.log(res)
					this.commentList = res.data.data
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
			send() {
				addCommentMain({
					"commentContent": this.content,
					"questionId": this.questionId,
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
			// 评论列表
			// getComment() {
			// 	this.commentList = [{
			// 		id: 1,
			// 		name: '叶轻眉',
			// 		date: '12-25 18:58',
			// 		contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
			// 		url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
			// 		allReply: 12,
			// 		likeNum: 33,
			// 		isLike: false,
			// 		replyList: [{
			// 				name: 'uview',
			// 				contentStr: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
			// 			},
			// 			{
			// 				name: '粘粘',
			// 				contentStr: '今天吃什么，明天吃什么，晚上吃什么，我只是一只小猫咪为什么要烦恼这么多'
			// 			}
			// 		]
			// 	}];
			// }
		}
	};
</script>

<style lang="scss">
	@import "../../../../lib/global.scss";

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

					.username {
						font-size: 24rpx;
						color: #999999;
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
