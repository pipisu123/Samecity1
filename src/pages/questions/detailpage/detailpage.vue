<template>
	<view style="padding: 30rpx 30rpx ;box-sizing: border-box;">
		<view class="" style="display: flex;align-items: center;">
			<image :src="data.imgPath"
			 style="width: 80rpx;height: 80rpx;border-radius: 50rpx;" mode=""></image>
			<view class="" style="font-size: 28rpx;margin-left: 20rpx;">
				{{data.userName}}
			</view>
		</view>
		<view class="" style="font-size: 30rpx;margin: 20rpx 0;">
			{{data.content}}
		</view>
		<view class="" style=" display: flex; flex-direction:column" v-for="(item,index) in data.pictures" :key="index">
			<image :src="item" style="width: 100%;margin-left: 10rpx;margin-bottom: 10rpx;"
			 mode="widthFix" v-show="data.pictures[0]!=''"></image>
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
			<view class="comment" v-for="(res, index) in commentList" :key="res.id" @click="goAnswer">
				<view class="left"><image :src="res.url" mode="aspectFill"></image></view>
				<view class="right">
					<view class="top">
						<view class="name" @click="getName(res.name)">{{ res.name }}</view>
						<view class="like" :class="{ highlight: res.isLike }">
							<view class="num">{{ res.likeNum }}</view>
							<u-icon v-if="!res.isLike" name="thumb-up" :size="30" color="#9a9a9a" @click="getLike(index)"></u-icon>
							<u-icon v-if="res.isLike" name="thumb-up-fill" :size="30" @click="getLike(index)"></u-icon>
						</view>
					</view>
					<view class="content">{{ res.contentText }}</view>
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
						{{ res.date }}
						<view class="reply">回复</view>
					</view>
				</view>
			</view>
		</view>
		<view class="daoh">
        <u-search :show-action="false" action-text="" :animation="false" search-icon='' :placeholder="value" @click ="click" disabled=true></u-search>
		<view class=""style="display: flex;justify-content: space-between;">
			<view class="" style="display: flex;">
				<view class="" style="display: flex;align-items: center;">
					<u-icon name="zhuanfa"  size="50"></u-icon>
				</view>
				<view class="" style="display: flex;align-items: center;margin-left: 50rpx;">
					<u-icon name="chat"  size="50"></u-icon>
				</view>
			</view>
			<view class="" style="display: flex;align-items: center;margin-left: 50rpx;">
				<u-icon name="star"  size="50"></u-icon>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			keyword: '',
			commentList: [],
			data:null,
			value: '我也说几句...'
		};
	},
	onLoad(options) {
		this.getComment();
		console.log(options.questionId)
		this.getCommentList(options.questionId)
	},
	methods: {
		// 回复评论
		goAnswer(){
			uni.navigateTo({
				url:'/pages/questions/questionSquare/allAnswer/allAnswer'
			})
		},
		// 去评论
		click(){
			uni.navigateTo({
				url:'/pages/questions/questionSquare/allComment/allComment'
			})
		},
		// 获取评论列表
		getCommentList(questionId){
			console.log(questionId)
			this.$myRequest({
				url: 'question/question/findQuestionById?questionId='+questionId,   
				method: "POST",
				data:{
					
				}
			}).then(res => {//这里是请求成功之后饭后的数据
				console.log(res)
				this.data = res.data.data
			}).catch(err => {//这里是失败   一般用不着
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
		getLike(index) {
			this.commentList[index].isLike = !this.commentList[index].isLike;
			if (this.commentList[index].isLike == true) {
				this.commentList[index].likeNum++;
			} else {
				this.commentList[index].likeNum--;
			}
		},
		// 评论列表
		getComment() {
			this.commentList = [
				{
					id: 1,
					name: '叶轻眉',
					date: '12-25 18:58',
					contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
					url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
					allReply: 12,
					likeNum: 33,
					isLike: false,
					replyList: [
						{
							name: 'uview',
							contentStr: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
						},
						{
							name: '粘粘',
							contentStr: '今天吃什么，明天吃什么，晚上吃什么，我只是一只小猫咪为什么要烦恼这么多'
						}
					]
				},
				{
					id: 2,
					name: '叶轻眉1',
					date: '01-25 13:58',
					contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
					allReply: 0,
					likeNum: 11,
					isLike: false,
					url: 'https://cdn.uviewui.com/uview/template/niannian.jpg',
				},
				{
					id: 3,
					name: '叶轻眉2',
					date: '03-25 13:58',
					contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
					allReply: 0,
					likeNum: 21,
					isLike: false,
					allReply: 2,
					url: '../../../static/logo.png',
					replyList: [
						{
							name: 'uview',
							contentStr: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
						},
						{
							name: '豆包',
							contentStr: '想吃冰糖葫芦粘豆包，但没钱5555.........'
						}
					]
				},
				{
					id: 4,
					name: '叶轻眉3',
					date: '06-20 13:58',
					contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
					url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
					allReply: 0,
					likeNum: 150,
					isLike: false
				}
			];
		}
	}
};
</script>
<style lang="scss" scoped>
	.daoh{
		width: 100%;
		background-color: #FFFFFF;
		padding: 40rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		position:fixed;
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
