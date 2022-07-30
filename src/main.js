import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'cesium/Widgets/widgets.css'
import ElementUI from 'element-ui'

import $ from 'jquery'
window.$ = $;


Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small', zIndex: 30000 });
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
