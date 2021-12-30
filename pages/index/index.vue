<template>
	<view class="container">
		首页
		index
		<scroll-view scroll-y="true" >
			<view>
				<view class="" v-for="(item,index) in dataArr" :key="index">
					<text>{{item}}</text>
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
			this.getDataList()
		},
		methods: {
			getDataList(){
				
				let params = {
					location : 'beij',
					// key: '457760ae499840c78fa1f7f935d6cfc6'
				}
				
				this.$request('/v2/city/lookup','GTE', params).then(res => {
					console.log(res)
				})
				
				// let param = {
				// 	current: 1,
				// 	size: 10,
				// 	userId: null,  // 用户id 非必填  我发布的
				// 	commentId: null, // 用户id 非必填  我参与的
				// };
				// this.$request('/article/list','GTE', param).then(res => {
				// 	console.log(res)
				// })
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
