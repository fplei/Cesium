import Vue from 'vue'
import VueRouter from 'vue-router'
import cesiumHome from "@/views/cesiumHome";

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
      {
          path: '/',
          name: 'cesiumHome',
          component: cesiumHome
      },
  ]
})