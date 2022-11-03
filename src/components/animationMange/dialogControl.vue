//用于Vuex学习 练习使用
<template>
  <div class="dialogControl">
    <h2>-----------App内容：modules中的内容-----------</h2>
    <h3>{{$store.state.a.name}}</h3>
    <el-button size="mini" @click="updateName">修改名字</el-button>
    <h3>{{$store.getters.fullName}}</h3>
    <h3>{{$store.getters.fullName2}}</h3>
    <h3>{{$store.getters.fullName3}}</h3>
    <el-button size="mini" @click="asyncUpdateName">异步修改名字</el-button>

    <h2>-----------App内容：info对象的内容是否是响应式-----------</h2>
    <h3>{{$store.state.info}}</h3>
    <el-button size="mini" @click="updateInfo">修改信息</el-button>

    <h2>----------------Vuex学习-----------------</h2>
    <h3>{{$store.state.counter}}</h3>
    <el-button size="mini" @click="addition">+</el-button>
    <el-button size="mini" @click="subtraction">-</el-button>
    <el-button size="mini" @click="addCount(5)">+5</el-button>
    <el-button size="mini" @click="addCount(10)">+10</el-button>
    <el-button size="mini" @click="addStudent">添加学生</el-button>

    <h2>-----------App内容：getters相关信息-----------</h2>
    <h3>{{$store.getters.powerCounter}}</h3>
    <p>{{$store.getters.more20stu}}</p>
    <h3>{{$store.getters.more20stuLength}}</h3>
    <p>{{$store.getters.moreAgeStu(12)}}</p>

    
    <h2>-----------Hello Vuex内容-----------</h2>
    <hello-vuex />
    <!-- <hello-vuex :counter="counter" /> -->
  </div>
</template>

<script>
import HelloVuex from './HelloVuex.vue'
import {INCREMENT} from '@/store/mutations-types'
import Bus from "@/bus";
export default {
  name:'dialogControl',
  components:{
    HelloVuex,
  },
  data() {
    return {
      // dialogShow: false,
      students:[
        {id:10,name:'why',age:10},
        {id:11,name:'kobe',age:24},
        {id:12,name:'james',age:26},
        {id:13,name:'curry',age:16},
      ]
    };
  },
  computed:{
    // more20stu(){
    //   // return this.$store.students.filter(s =>{
    //   //   return s.age >= 20
    //   // })
    //   return this.$store.students.filter(s => s.age > 20)
    // }
  },
  mounted() {
    let that = this;
    Bus.$on("dialogCountCode", () => {
      // that.dialogShow = true;
    });
  },
  methods: {
    addition(){
      // this.$store.commit('increment');
      this.$store.commit(INCREMENT);
    },
    subtraction(){
      this.$store.commit('decrement');
    },
    addCount(count){
      //1.普通的提交封装
      // this.$store.commit('incrementCount',count)

      //2.特殊的提交封装
      this.$store.commit({
        type:'incrementCount',
        count
      })
    },
    addStudent(){
      const stu = {id:14,name:'alan',age:28}
      this.$store.commit('addStudent',stu)
    },
    updateInfo(){
      // 为了让经过 actions异步, 不能这么写了
      // this.$store.commit('updateInfo')
      // this.$store.dispatch('aUpdateInfo','我是payload')
      //传其他参数就麻烦了
      // this.$store.dispatch('aUpdateInfo', () => {
      //   console.log('里面已经完成了')
      // })
      //传入个大的对象  携带的和回调的写在一起了，不够优雅
      // this.$store.dispatch('aUpdateInfo', {
      //   message: '我是携带的信息',
      //   success:()=>{
      //     console.log('里面已经完成了')
      //   }
      // })

      //回到最初了 使用 promise 返回数据，就可以在then里写东西了
      this.$store
      .dispatch('aUpdateInfo','我是携带的信息')
      .then( res => {
        console.log('里面完成了提交');
        console.log(res);
      })
    },
    updateName(){
      //提交也是commit()
      this.$store.commit('updateName','lisi')
    },
    asyncUpdateName(){
      this.$store.dispatch('aUpdateName')
    }
  },
};
</script>

<style scoped>
.dialogControl {
  width: 680px;
  position: absolute;
  right: 0; 
  top: 30px;
  padding: 5px;
  transform: translate(-10%, 30px);
  /* width: 200px; */
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.63);
  border-radius: 8px;
  border: 1px solid #00a9e5;
  z-index: 10;
  color: #fff;
  font-size: 12px;
  max-height: 500px;
  overflow-y: scroll;
}
</style>