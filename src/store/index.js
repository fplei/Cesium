import Vue from "vue";
import Vuex from "vuex";

//1.安装插件
Vue.use(Vuex);

//2.创建对象
const store = new Vuex.Store({
  state: {
    counter: 1000,
    students:[
      {id:10,name:'why',age:10},
      {id:11,name:'kobe',age:24},
      {id:12,name:'james',age:26},
      {id:13,name:'curry',age:16},
    ]
  },
  mutations: {
    //方法
    increment(state) {
      state.counter++
    },
    decrement(state) {
      state.counter--
    },
    incrementCount(state,count){
      console.log(count)
      // state.counter += payload.count
      state.counter += count
    },
    addStudent(state,stu){
      state.students.push(stu)
    },
    
  },
  actions: {},
  getters: {
    //平方
    powerCounter(state){
      return state.counter * state.counter
    },
    //获取年龄大于20岁
    more20stu(state){
      return state.students.filter(s => s.age > 20)
    },
    //获取学生的个数
    more20stuLength(state,getters){
      return getters.more20stu.length
    },
    //获取age，自己传入的年龄
    moreAgeStu(state){
      return function (age) {
        return state.students.filter(s => s.age > age)
      }
      //简洁，阅读性差
      // return age => {
      //   return state.students.filter(s => s.age > age)
      // }
    }
  },
  modules: {},
});

//3.导出store独享
export default store;
