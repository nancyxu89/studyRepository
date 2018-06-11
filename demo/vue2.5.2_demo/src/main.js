import 'babel-polyfill'
import Vue from 'vue'
import router from './router'
import APP from './App'
import store from './store'
import './directives/authority'
import './filters'
import echarts from 'echarts'
import './validate.config'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  template: '<APP/>',
  components: {
    APP
  }
})
