<template>
  <div>
    <div class="container">
      <el-button @click="showPolygon(true)" :disabled="submissionFlag"
        >左键绘制圆</el-button
      >
      <el-button @click="showPolygon(false)">隐藏绘制圆</el-button>
    </div>
  </div>
</template>

<script>
var Cesium = require("cesium/Cesium");
import "cesium/Widgets/widgets.css";
import Vue from 'vue';
import DrawCirleUtils from "@/assets/js/DrawCirle";
Vue.prototype.DrawCirleUtils = DrawCirleUtils;
export default {
  name: "DrawCircle",
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
        this.drawCirleUtils = new this.DrawCirleUtils(this.viewer);
        this.drawCirleUtils.drawCircle(this.viewer)
        
        //将三维球定位到中国
     　　this.drawCirleUtils.flyToInit();
        // 判断只点击一次，如果用户点击过 置为 disabled
        // if (this.viewer.length != 0) {
        //   this.submissionFlag = true;
        // } else {
        //   this.submissionFlag = false;
        // }
      } else {
        // 如果已经清除实体，将展示实体按钮变为能点击状态
        this.submissionFlag = false;
        // this.drawCirleUtils.drawCircle().clearDrawEntities();
        
      }
    },
    
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  left: 10px;
  top: 235px;
  display: flex;
  align-items: center;
  justify-items: center;
  display: block;
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