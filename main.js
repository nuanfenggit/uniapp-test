
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import request from 'static/js/request.js'
import uView from 'uview-ui'

Vue.use(uView)
Vue.config.productionTip = false
Vue.prototype.$request = request

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif