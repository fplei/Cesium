import {INCREMENT} from "./mutations-types"
export default  {
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
  }