<template>
  <div class="container">
    <el-button @click="showPolygon(true)" :disabled="submissionFlag"
      >增加polygon</el-button
    >
    <el-button @click="showPolygon(false)">清除polygo</el-button>
  </div>
</template>

<script>
var Cesium = require("cesium/Cesium");
import "cesium/Widgets/widgets.css";
import { polygon } from "@/assets/js/polygon";


export default {
  name: "polygonLineParts",
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
        let positions = new Cesium.Cartesian3.fromDegreesArray([
          -99.0, 30.0, -85.0, 30.0, -85.0, 40.0, -99.0, 40.0,
        ]);
        polygon(this.viewer, positions);
        this.viewer.zoomTo(this.viewer);
        console.log(this.viewer);

        // 判断只点击一次，如果用户点击过 置为 disabled
        if (this.viewer.length != 0) {
          this.submissionFlag = true;
        } else {
          this.submissionFlag = false;
        }
      } else {
        // 获取实体的ID
        let polygon = this.viewer.entities.getById("polygon");
        this.viewer.entities.remove(polygon); //按 id来清除实体
        
        // 如果已经清除实体，将展示实体按钮变为能点击状态
        this.submissionFlag = false;
      }
    },
  },
};
</script>
<style scoped>
.container {
  position: absolute;
  left: 10px;
  top: 10px;
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
  cursor: pointer;
} 
button[disabled]{
  background: rgba(24,59,70,0.35);
  border: 1px solid #133031;
}

</style>
