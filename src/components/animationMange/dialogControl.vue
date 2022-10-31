<template>
  <div class="dialogControl">
    <h2>----------------Vuex学习-----------------</h2>
    <h2>{{$store.state.counter}}</h2>
    <el-button @click="addition">+</el-button>
    <el-button @click="subtraction">-</el-button>
    {{$store.state.add}}
  </div>
</template>

<script>
import Bus from "@/bus";
export default {
  data() {
    return {
      // dialogShow: false,
    };
  },
  mounted() {
    let that = this;
    Bus.$on("dialogCountCode", () => {
      // that.dialogShow = true;
    });
  },
  methods: {
    addition(){
      this.$store.commit('increment');
    },
    subtraction(){
      this.$store.commit('decrement');
    }
  },
};
</script>

<style scoped>
.dialogControl {
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
}
</style>