<template>
	<view class="container">
		<view class="title">热门城市Top{{dataList.length}}</view>
		<u-tabs name="name" :list="dataList" :is-scroll="true" :current="current" @change="changeTab" inactive-color="#606266" active-color="#55aa00"></u-tabs>
		
		<!-- <u-tabs-swiper ref="tabs" :list="dataList" :is-scroll="true"></u-tabs-swiper> -->
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="(item, index) in dataList" :key="index">
				<scroll-view scroll-y style="height: 800rpx;width: 100%;" @scrolltolower="onreachBottom">
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
				current: 0,
				locationId: "",
				swiperCurrent: 0, 
			}
		},
		onShow(){
			this.getDataList()
		},
		methods:{
			getDataList(){
				let params = {
					number:10,
					range: 'cn'
				}
				this.$request('/v2/city/top','GTE', params).then(res => {
					if(res.data.code == '200'){
						this.dataList = res.data.topCityList;
						this.locationId = this.dataList[0].id;
						this.getCityInfo()
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
			changeTab(tab){
				this.current = tab.index
				this.locationId = tab.id
				this.getCityInfo()
			},
			// tabs通知swiper切换
			tabsChange(index) {
				return
				// this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				return
				// let dx = e.detail.dx;
				// this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				return 
				// let current = e.detail.current;
				// this.$refs.uTabs.setFinishCurrent(current);
				// this.swiperCurrent = current;
				// this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				
			}
		}
	}
</script>

<style scoped lang="less">
	.container{
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 10px;
		background-color: #f5f5f5;
		.title{
			text-align: center;
			font-weight: bold;
			font-size: 20px;
			color: #333;
		}
		.tabItem{
			line-height: 40px;
			font-size: 14px;
			border-bottom: 1px solid #f3f3f3;
		}
		.itemTxt{
			color: #3C9CFF;
		}
	}
</style>
