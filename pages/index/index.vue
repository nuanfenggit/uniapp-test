<template>
	<view class="container">
		<scroll-view scroll-y="true" >
			<view class="box">
				<view class="boxItem" v-for="(item,index) in dataArr" :key="index" @click="toPage(index)">
					<view class="imgBox" :class="(index+1) % 2 === 0 ? 'bg1': 'bg2'">
						<image src="../../static/images/order.png" mode="aspectFit"></image>
					</view>
					<view>{{item}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataArr: [
					'城市',
					'天气',
					'灾害',
					'空气'
				]
			}
		},
		onShow(){
			// this.getDataList()
		},
		methods: {
			getDataList(){
				// let params = {
				// 	number: 5,
				// 	range: 'cn'
				// }
				// this.$request('/v2/city/top','GTE', params).then(res => {
				// 	console.log(res)
				// })
				
				// let param = {
				// 	current: 1,
				// 	size: 10,
				// 	userId: null,  // 用户id 非必填  我发布的
				// 	commentId: null, // 用户id 非必填  我参与的
				// };
				// this.$request('/article/list','GTE', param).then(res => {
				// 	console.log(res)
				// })
			},
			toPage(){
				uni.navigateTo({
					url: '/pages/list/list',
				});
			},
		}
	}
</script>

<style lang="less">
	.container {
		padding: 10px;
		font-size: 14px;
		.box{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.boxItem{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				border: 1px solid #cecece;
				background-image: Linear-gradient(#a7a7a7, #d0d0d0);
				// height: 100px;
				// line-height: 100px;
				width:30%;
				margin: 10px 0;
				border-radius: 20px;
				padding:10px 0
			}
			.imgBox{
				display: block;
				font-size: 15px;
				color: #2c3e50;
				
				padding: 10px;
				box-shadow: 0 0px 7px 1px rgba(0, 0, 0, 0.16);
				height: 50px;
				width: 50px;
				border-radius: 25px;
				box-sizing: content-box;
				
				image {
					height: 51px;
					width: 40px;
					margin-left:5px;
				}
			}
			.bg1{
				background-color: #9acefe;
			}
			.bg2{
				background-color: #aaaaff;
			}
			.bg3{
				background-color: #9acefe;
			}
		}
	}
</style>
