import Vue from "vue";
import Vuex from "vuex";
//可以统一使用
import { INCREMENT } from '@/store/mutations-types'

//1.安装插件
Vue.use(Vuex);

//2.创建对象
const moduleA = {
  state:{
    name:'zhangsan'
  },
  mutations:{
    updateName(state, payload){
      state.name = payload
    }
  },
  getters:{
    fullName(state){
      return state.name + '1111'
    },
    //使用fullName后面拼接，使用fullName。
    fullName2(state, getters){
      return getters.fullName + '2222'
    },
    //引入大的里面的 counter的使用方法
    fullName3(state,getters,rootState){
      return getters.fullName2 + rootState.counter
    }
  },
  actions:{
    //actions里的context是上下文，这个上下文就不再是store对象了
    aUpdateName(context){
      console.log(context)
      setTimeout(()=>{
        context.commit('updateName','wangwu')
      },1000)
      
    }
  },
  
}

const store = new Vuex.Store({
  state: {
    counter: 1000,
    students:[
      {id:10,name:'why',age:10},
      {id:11,name:'kobe',age:24},
      {id:12,name:'james',age:26},
      {id:13,name:'curry',age:16},
    ],
    //定义在state中的，都会被加入中响应式系统中，响应式会监听熟悉变化
    info:{
      name:'kobe',
      age:30,
      height:1.98,
    }
  },
  mutations: {
    //方法
    // increment(state) {
    //   state.counter++
    // },
    [INCREMENT](state) {
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
    updateInfo(state){
      // state.info['address'] = '洛杉矶' //增加新属性
      state.info.name = 'coderwhy' 
      // Vue.set(state.info,'address','洛杉矶')
      // Vue.delete(state.info,'age')

      // 错误代码，模拟异步,mutations里面不能进行异步操作
      // setTimeout(()=>{
      //   state.info.name = 'coderwhy'
      // },1000)
    },
  },
  actions: {
    //异步操作专用  context：上下文 --> store对象
    // aUpdateInfo(context, payload){
    //   setTimeout(()=>{
    //     context.commit('updateInfo')
    //     console.log(payload.message)
    //     payload.success()
    //     // console.log(payload)
    //   },1000)
    // },
    //做了个中转，dispatch可以返回Promise，使用Promise
    aUpdateInfo(context, payload){
      return new Promise((resolve,reject)=>{
        setTimeout(() => {
          context.commit('updateInfo');
          console.log(payload);

          resolve('1111')
        }, 1000)
      })
    }

  },
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
  //modules里的东西最终会自动放到了state中，所以使用 $store.state.a.name获取
  modules: {
    a: moduleA
  },
});

//3.导出store独享
export default store;


//练习小知识点
//对象的解构
const obj = {
  name:'why',
  age:18,
  height: 1.88,
  address:'洛杉矶',
}
// const name = obj.name;
//结构赋值
const {name,age,height} = obj;
console.log(name)
