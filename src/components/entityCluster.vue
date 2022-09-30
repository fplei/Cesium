<template>
  <div class="container">
    <el-button
      @click="showPolygon(true)"
      :disabled="submissionFlag"
      >增加entityCluster</el-button
    >
    <el-button @click="showPolygon(false)">清除entityCluster</el-button>
  </div>
</template>

<script>
var Cesium = require("cesium/Cesium");
import "cesium/Widgets/widgets.css";
import { entityCluster,customStyle,clearEntityCluster } from "@/assets/js/entityCluster";
export default {
  name: "entityCluster",
  props: ["viewer"],
  data() {
    return {
      // 设置按钮的 disabled
      submissionFlag: false,
    };
  },
  mounted() {},
  methods: {
    showPolygon(val) {
      if (val) {
        entityCluster(this.viewer);
        this.viewer.zoomTo(this.viewer);
        console.log(this.viewer);
         
        customStyle(this.viewer);
        //-------------------
        // 判断只点击一次，如果用户点击过 置为 disabled
        if (this.viewer.length != 0) {
          this.submissionFlag = true;
        } else {
          this.submissionFlag = false;
        }
      } else {
        this.submissionFlag = false;
        // 删除全部
        // this.viewer.entities.removeAll();
        clearEntityCluster(this.viewer)

      }
    },
  },
};
</script>
<style scoped>
.container {
  position: absolute;
  left: 10px;
  top: 45px;
  display: flex;
  align-items: center;
  justify-items: center;
}
.el-button {
  margin-right: 10px;
  padding: 5px 10px;
  background: rgba(17, 22, 24, 0.5);
  border: 1px solid rgba(56, 215, 227, 0.5);
  color: white;
  border-radius: 3px;
  font-size: 12px;
} 
button[disabled]{
  background: rgba(24,59,70,0.35);
  border: 1px solid #133031;
}

</style>
