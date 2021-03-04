/*
 * @Author       : jcbound
 * @Date         : 2021-01-30 14:34:56
 * @LastEditors  : jcbound
 * @LastEditTime : 2021-03-03 18:21:45
 * @Description  : 我添加了修改
 * @FilePath     : \vuetest\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
Vue.prototype.$axios = axios

Vue.use(VXETable)
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
