import Vue from 'vue'
import Vuex from 'vuex'
import user from './login/user'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    count:0
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  }
});
export default store
