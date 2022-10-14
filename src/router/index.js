import Vue from 'vue'
import VueRouter from 'vue-router'
import cesiumHome from "@/views/cesiumHome";
import login from "@/views/Login/login"

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
      {
          path: '/',
          name: 'cesiumHome',
          component: cesiumHome
      },
      {
        path: '/login',
        name: 'login',
        component: login
    },
  ]
})