<template>
	<view class="container">
		<view class="title">热门城市Top{{dataList.length}}</view>
		<u-tabs class="utabs" name="name" :list="dataList" :is-scroll="true" :current="current" @change="changeTab" inactive-color="#606266" active-color="#55aa00"></u-tabs>
		
		<swiper class="swiper"  :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item"  v-for="(item, index) in dataList" :key="index">
				<scroll-view scroll-y class="scrollView" refresher-enabled :refresher-triggered="refreshTrigger"
				 @scrolltolower="onreachBottom" @refresherrefresh="refresherrefresh" :refresher-threshold="65">
					<view class="box" @click="toDetail(item)">
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
					
					<u-empty text="暂无相关内容" mode="list" v-if="dataList.length == 0"></u-empty>
					<view class="loadingWarp" v-if="showLoading">
						<!-- <text>loading...</text> -->
						<!-- <u-loading mode="circle"></u-loading> -->
						<!-- <u-loading size="70" color="#3498db"></u-loading> -->
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				dataList: [],
				newDataList: [],
				list: [{
						name: '待收货'
					}, {
						name: '待付款'
					}, {
						name: '待评价',
						count: 5
				}],
				cityInfo: {},
				weatherInfo: {},
				current: 0,
				locationId: "",
				swiperCurrent: 0, 
				refreshTrigger: false,
				timer: null,
				showLoading: false,
			}
		},
		watch:{
			'swiperCurrent':function() {  //监听页面滚动
				this.getDataList();
			},
		},
		onShow(){
			this.getDataList()
		},
		methods:{
			getDataList(){
				this.showLoading = true;
				let params = {
					number:10,
					range: 'cn'
				}
				this.$request('/v2/city/top','GTE', params).then(res => {
					if(res.data.code == '200'){
						this.dataList = res.data.topCityList;
						this.locationId = this.dataList[this.current].id;
						this.getCityInfo()
						this.getWeatherInfo()
						this.refreshTrigger = false;
						this.showLoading = false;
					}
				})
			},
			getNewDataList(){
				this.newDataList = this.dataList && this.dataList.map((value)=>{
					return 	{name: value.name}
				})
			},
			getCityInfo(){
				let params = {
					location: this.locationId,
				}
				this.$request('/v2/city/lookup','GTE', params).then(res => {
					if(res.data.code == '200'){
						this.cityInfo = res.data.location[0];
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
			toDetail(item){
				uni.navigateTo({
					url: "/pages/listDetail/listDetail?id="+this.locationId,
				})
			},
			changeTab(tab){
				this.current = tab.index
				this.swiperCurrent = tab.index
				this.locationId = tab.id
				this.getCityInfo()
				this.getWeatherInfo()
			},
			// tabs通知swiper切换
			// tabsChange(index) {
			// 	this.swiperCurrent = index;
			// },
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				
			},
			// scroll-view 下拉刷新
			refresherrefresh() {
				this.refreshTrigger = true;
				// this.pages.pageNum = 1;
				if(this.timer) {
					clearTimeout(this.timer);
					this.timer = setTimeout(()=>{
						this.getDataList();
					},200)
					return
				}
				this.timer = setTimeout(()=>{
					console.log(11)
					this.getDataList();
				},200)
			},
		}
	}
</script>

<style scoped lang="less">
	.container{
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 10px;
		background-color: #f5f5f5;
		
		.utabs {
			border-bottom: 1px solid #e7e7e7;
		}
		.title{
			text-align: center;
			font-weight: bold;
			font-size: 20px;
			color: #333;
		}
		
		
	}
	
	.swiper {
		flex: 1;
		flex-direction: column;
	}
	
	.scrollView {
		height: 100%;
		width: 100%;
		box-sizing: border-box;
	}
	
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
	.loadingWarp {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 50;
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		background-color: rgba(255,255,255,0.1);
		transition: all 0.5s ease-in-out;
	}
</style>
