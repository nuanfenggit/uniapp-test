<template>
	<view class="">
		<view class="box">
			<view class="tabItem">
				<text class="itemText">{{cityInfo.name}}</text>
			</view>
			<view class="tabItem">
				<text>locationId：</text>
				<text class="itemTxt">{{locationId}}</text>
			</view>
			<view class="tabItem">
				<text>地理位置：</text>
				<text class="itemTxt">{{cityInfo.adm1}}-</text>
				<text class="itemTxt">{{cityInfo.adm2}}-</text>
				<text class="itemTxt">{{cityInfo.name}}</text>
			</view>
			<view class="tabItem">
				<text>（天气情况报告）</text>
			</view>
			<view class="tabItem">
				<text>时间：</text>
				<text class="itemTxt">{{weatherInfo.obsTime}}</text>
			</view>
			<view class="tabItem">
				<text>温度：</text>
				<text class="itemTxt">{{weatherInfo.temp}} °C</text>
			</view>
			<view class="tabItem">
				<text>天气状态：</text>
				<text class="itemTxt">{{weatherInfo.text}}</text>
			</view>
			<view class="tabItem">
				<text>风向状态：</text>
				<text class="itemTxt">{{weatherInfo.windDir}}</text>
			</view>
		</view>
		<view class="footer">
			<u-button class="btn" type="primary" size="medium" :ripple="true" ripple-bg-color="#909399" @click="backIndex()">返回首页</u-button>
			<u-button class="btn" type="primary" @click="backBefore()">返回上一页navigateBack</u-button>
			<u-button class="btn" type="primary" @click="backBefore2()">返回上一页(delta)</u-button>
			<u-button class="btn" type="primary" @click="backBefore3()">返回上一页(redict)</u-button>
		</view>
	</view>
</template>

<script>
	export default{
		name:'listDetail',
		data(){
			return {
				locationId: '',
				cityInfo: {},
				weatherInfo: {}
			}
		},
		created(){
		},
		onLoad(options){
			this.locationId = options.id;
			this.getCityInfo()
			this.getWeatherInfo()
		},
		methods:{
			getCityInfo(){
				let params = {
					location: this.locationId,
				}
				this.$request('/v2/city/lookup','GTE', params).then(res => {
					if(res.data.code == '200'){
						this.cityInfo = res.data.location[0];
						uni.setNavigationBarTitle({
						　　title: this.cityInfo.name
						})
					}
					
				})
			},
			getWeatherInfo(){
				let params = {
					location: this.locationId,
				}
				this.$request('/v7/weather/now','GTE', params).then(res => {
					if(res.data.code == '200'){
						this.weatherInfo = res.data.now;
					}
				})
			},
			backIndex(){
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			backBefore(){
				uni.navigateTo({
					url: "/pages/list/list"
				})
			},
			backBefore2(){
				uni.navigateBack({
					delta: 2
				})
			},
			backBefore3(){
				uni.redirectTo({
					url: "/pages/list/list"
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.box{
		// min-height: 200rpx;
	}
	.tabItem{
		line-height: 40px;
		font-size: 14px;
		border-bottom: 1px solid #f3f3f3;
	}
	.itemText{
		font-size: 20px;
		font-weight: bold;
		color: blue;
		text-align: center;
		margin: 10px auto
	}
	.itemTxt{
		color: #3C9CFF;
	}
	.btn{
		width:140px;
		height: 40px;
		padding:10px;
		margin: 10px auto;
	}
</style>
