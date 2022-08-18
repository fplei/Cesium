<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name:"App",
  data(){
    return {

    }
  }
}
</script>

<style>

*{
  margin: 0;
  padding: 0;
}
.el-button {
  margin-right: 10px;
  padding: 5px 10px;
  background: rgba(17, 22, 24, 0.5);
  border: 1px solid rgba(56, 215, 227, 0.5);
  color: white;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
} 
button[disabled]{
  background: rgba(24,59,70,0.35);
  border: 1px solid #133031;
}

</style>
