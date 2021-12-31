<template>
	<view class="">
		<!-- <u-line color="red" /> -->
		<!-- <u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs> -->
		<scroll-view class="">
			list
		</scroll-view>
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
				current: 0,
			}
		},
		onShow(){
			console.log(this.$u)
			this.getDataList()
		},
		methods:{
			getDataList(){
				let params = {
					number: 5,
					range: 'cn'
				}
				this.$request('/v2/city/top','GTE', params).then(res => {
					if(res.data.code == '200'){
						this.dataList = res.data.topCityList;
						this.getNewDataList()
					}
				})
			},
			getNewDataList(){
				this.newDataList = this.dataList && this.dataList.map((value)=>{
					return 	{name: value.name}
				})
				console.log(this.newDataList)
			},
			change(){
				
			}
		}
	}
</script>

<style>
	
</style>
