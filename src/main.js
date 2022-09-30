import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'cesium/Widgets/widgets.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import cookies from "js-cookie";
import Bus from '@/bus.js'
Vue.use(Bus)
Vue.prototype.$Bus = Bus

import HighchartsVue from 'highcharts-vue'
Vue.use(HighchartsVue)
Vue.use(cookies);
import $ from 'jquery'
window.$ = $;


Vue.config.productionTip = false
Vue.use(ElementUI);
// Vue.use(ElementUI, { size: 'small', zIndex: 30000 });
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
