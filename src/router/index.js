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

// router.afterEach((to, from, next) => {
//   window.scrollTo(0, 0);
// });

// router.beforeEach((to, from, next) => {
//   let token = Cookies.get("Cesium-token")
//   if (to.path == '/login' || token) {
//       next()
//   } else {
//       // vm.toast('登录过期，请重新登陆')
//       setTimeout(() => {
//           next({
//               path: '/login'
//           })
//       }, 500);
//   }
// })