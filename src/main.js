/*
 * @Date         : 2020-04-30 10:23:16
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-04-30 10:47:06
 * @FilePath     : \kaoshi\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局引用公共函数
import WR from './assets/js/wr.js'
Vue.prototype.WR = WR

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
