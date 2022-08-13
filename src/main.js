import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import {VueJsonp} from 'vue-jsonp'
import axios from 'axios';
import VueRouter from 'vue-router'


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueJsonp)
Vue.use(VueRouter)
// Vue.prototype.$router = VueRouter
Vue.prototype.$axios = axios

// axios.defaults.baseURL = '/api'

new Vue({
  render: h => h(App),
  
}).$mount('#app')
