import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import moduleA from "./modules/moduleA";
 

//1.安装插件
Vue.use(Vuex);

//2.创建对象

const state = {
  counter: 1000,
  students: [
    { id: 10, name: "why", age: 10 },
    { id: 11, name: "kobe", age: 24 },
    { id: 12, name: "james", age: 26 },
    { id: 13, name: "curry", age: 16 },
  ],
  //定义在state中的，都会被加入中响应式系统中，响应式会监听熟悉变化
  info: {
    name: "kobe",
    age: 30,
    height: 1.98,
  },
};
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  //modules里的东西最终会自动放到了state中，所以使用 $store.state.a.name获取
  modules: {
    a: moduleA,
  },
});

//3.导出store独享
export default store;






//练习小知识点
//对象的解构
const obj = {
  name: "why",
  age: 18,
  height: 1.88,
  address: "洛杉矶",
};
// const name = obj.name;
//结构赋值
const { name, age, height } = obj;
console.log(name);
