const request = async function(url, method, data, header) {
	return new Promise((resolve, reject) => {
		data['key'] = '457760ae499840c78fa1f7f935d6cfc6';
		// 发送请求
		uni.request({
			// url: 'https://spring.zjmx.com:8091' + url,
		    // url: 'https://geoapi.qweather.com/v2/city/lookup?location=beij&key=457760ae499840c78fa1f7f935d6cfc6', //仅为示例，并非真实接口地址。
		    url: 'https://geoapi.qweather.com' + url,
			method: method,
			data: data,
		    header: {
		        'Content-Type': header ? header['Content-Type'] : 'application/json', //自定义请求头信息
		    },
		    success: (res) => {
		        resolve(res)
		    },
			fail: (err) => {
				reject(err)
			}
		});
	})
}

export default request