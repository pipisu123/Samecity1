<template>
	<view style="padding: 30rpx 30rpx ;box-sizing: border-box;">
		<view class="" style="display: flex;align-items: center;">
			<image :src="data.imgPath" style="width: 80rpx;height: 80rpx;border-radius: 50rpx;" mode=""></image>
			<view class="" style="font-size: 28rpx;margin-left: 20rpx;">
				{{data.userName}}
			</view>
		</view>
		<view class="" style="font-size: 30rpx;margin: 20rpx 0;">
			{{data.content}}
		</view>
		<view class="" style=" display: flex; flex-direction:column" v-for="(item,index) in data.pictures" :key="index">
			<image :src="item" style="width: 100%;margin-left: 10rpx;margin-bottom: 10rpx;" mode="widthFix" v-show="data.pictures[0]!=''"></image>
		</view>
		<view class="show-video" v-show="data.video!=''">
			<video :src="data.video" style="width: 100%;height: 200px;"></video>
		</view>
		<view class="" style="padding: 10rpx 10rpx;border-radius: 30rpx;background-color: #f7f7f7;width: 100rpx;text-align: center;font-size: 26rpx;margin-top: 10rpx;">
			问答
		</view>
		<view>
			<view class="" style="display: flex;justify-content: space-between;">
				<view class="" style="display: flex; ">
					<view class="" style="display: flex;align-items: center;">
						<u-icon name="zhuanfa" size="30"></u-icon>
						<view style="font-size: 26rpx;margin-left: 20rpx;">100</view>
					</view>
					<view class="" style="display: flex;align-items: center;margin-left: 50rpx;">
						<u-icon name="chat" size="30"></u-icon>
						<view style="font-size: 26rpx;margin-left: 20rpx;">2016</view>
					</view>
				</view>
				<view class="" style="display: flex;align-items: center;margin-left: 50rpx; ">
					<u-icon name="thumb-up" size="30"></u-icon>
					<view style="font-size: 26rpx;margin-left: 20rpx;">2016</view>
				</view>
			</view>
		</view>
		<view>
			<view class="comment" v-for="(res, index) in commentList" :key="index">
				<view class="left">
					<image :src="res.imgPath" mode="aspectFill"></image>
				</view>
				<view class="right">
					<view class="top">
						<view class="name" @click="getName(res.userName)">{{ res.userName }}</view>
						<view class="like" :class="{ highlight: res.likes_out }">
							<view class="num">{{ res.peaseCount }}</view>
							<u-icon v-if="!res.likes_out" name="thumb-up" :size="30" color="#9a9a9a" @click="getLike(index,res.commentMainId)"></u-icon>
							<u-icon v-if="res.likes_out" name="thumb-up-fill" :size="30" @click="getLike(index,res.commentMainId)"></u-icon>
						</view>
					</view>
					<view class="content" @click="goAnswer(res.commentContent,res.imgPath,res.userName,res.commentMainId,res.questionId,res.userId)">{{ res.commentContent }}</view>
					<view class="reply-box">
						<view class="item" v-for="(item, index) in res.commentMainShowVO" :key="index">
							<view class="info">
								<view>
									<image :src="item.imgPath" mode="aspectFill" style="width: 45rpx;height: 45rpx;border-radius: 50%;"></image>
								</view>
								<view class="username">{{ item.userName }}</view>
							</view>
							<view class="text">{{ item.commentContent }}</view>
						</view>
						<view class="all-reply" @tap="toAllReply" v-if="res.replyList != undefined">
							共{{ res.allReply }}条回复
							<u-icon class="more" name="arrow-right" :size="26"></u-icon>
						</view>
					</view>
					<view class="bottom">
						{{ res.createTime }}
						<view class="reply">回复</view>
					</view>
				</view>
			</view>
		</view>
		<view class="daoh">
			<u-search :show-action="false" action-text="" :animation="false" search-icon='' :placeholder="value" @click="click(data.questionId,data.userId)"
			 disabled=true></u-search>
			<view class="" style="display: flex;justify-content: space-between;">
				<view class="" style="display: flex;">
					<view class="" style="display: flex;align-items: center;">
						<u-icon name="zhuanfa" size="50"></u-icon>
					</view>
					<view class="" style="display: flex;align-items: center;margin-left: 50rpx;">
						<u-icon name="chat" size="50"></u-icon>
					</view>
				</view>
				<view class="" style="display: flex;align-items: center;margin-left: 50rpx;">
					<u-icon name="star" size="50"></u-icon>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		findCommentMain
	} from '@/util/questions/comment.js'
	import {
		thumbsUpCommentMain
	} from '@/util/questions/handleComment.js'
	export default {
		data() {
			return {
				keyword: '',
				commentList: [],
				data: null,
				value: '我也说几句...',
				page: 1,
				limit: 4,
				isLike: false,
			};
		},
		onLoad(options) {
			console.log(options.questionId)
			this.getCommentList(options.questionId)
			this.getComment(options.questionId)
		},
		methods: {
			// 回复评论
			goAnswer(commentContent, imgPath, userName, commentMainId, questionId, userId) {
				uni.navigateTo({
					url: '/pages/questions/questionSquare/allAnswer/allAnswer?commentContent=' + commentContent + '&imgPath=' +
						imgPath + '&userName=' + userName + '&commentMainId=' + commentMainId + '&questionId=' + questionId +
						'&questionId=' + questionId + '&userId=' + userId
				})
			},
			// 去评论
			click(questionId, userId) {
				console.log(questionId)
				uni.navigateTo({
					url: '/pages/questions/questionSquare/allComment/allComment?questionId=' + questionId + '&userId=' + userId
				})
			},
			// 获取评论列表
			getCommentList(questionId) {
				console.log(questionId)
				this.$myRequest({
					url: 'question/question/findQuestionById?questionId=' + questionId,
					method: "POST",
					data: {

					}
				}).then(res => { //这里是请求成功之后饭后的数据
					console.log(res)
					this.data = res.data.data
				}).catch(err => { //这里是失败   一般用不着
					console.log(err)
				})
			},
			// 跳转到全部回复
			toAllReply() {
				uni.navigateTo({
					url: '/pages/template/comment/reply'
				});
			},
			// 点赞
			getLike(index, commentMainId) {
				console.log(index)
				if (this.commentList[index].likes_out == true) {
					this.$refs.uToast.show({
						title: '不能重复点赞',
						type: 'default',
						url: '/pages/user/index'
					})
				} else {
					thumbsUpCommentMain({
						"commentMainId": commentMainId
					}).then(res => {
						console.log(res)
						if (res.data.code === 0) {
							this.commentList[index].likes_out = true;
							this.commentList[index].peaseCount++;
						} else {
							
						}
					}).catch(err => {
						console.log(err)
					})
				}
				// this.commentList[index].likes_out = !this.commentList[index].likes_out;
				// if (this.commentList[index].likes_out == true) {
				// 	this.commentList[index].peaseCount++;
				// 	console.log("点赞成功")
				// } else {
				// 	this.commentList[index].peaseCount--;
				// }
			},
			// 评论列表
			getComment(questionId) {
				findCommentMain({
					"questionId": questionId,
					"page": 1,
					"limit": 3,
				}).then(res => {
					console.log(res)
					this.commentList = res.data.data;
				}).catch(err => {
					console.log(err)
				})
			}
		}
	};
</script>
<style lang="scss" scoped>
	.daoh {
		width: 100%;
		background-color: #F1F1F1;
		padding: 40rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		position: fixed;
		left: 0rpx;
		// right: 20rpx;
		bottom: 0rpx;
	}

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
