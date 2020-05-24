import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import VueLazyload from "vue-lazyload";
import store from "./store";
import Toast from './components/common/toast'



Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.use(Toast)

Vue.use(VueLazyload,{
  loading:require('../src/assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
