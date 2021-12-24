<template>
	<view class="container">
		<view class="">
			<button type="primary" size="mini" @click="goto('/pages/login/login')">注册/登录</button>
		</view>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {
			goto(url){
				uni.navigateTo({
					url: url
				})
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
