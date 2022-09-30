<template>
  <div class="picking-container">
    <el-button @click="showPincking(true)" :disabled="submissionFlag"
      >增加3DTilesFeaturePicking</el-button
    >
    <el-button @click="showPincking(false)"
      >清除3DTilesFeaturePicking</el-button
    >
  </div>
</template>

<script>
var Cesium = require("cesium/Cesium");
import "cesium/Widgets/widgets.css";
import { featurePincking,removeFeaturePincking } from "@/assets/js/3dTilesFeaturePicking";
export default {
  props: ["viewer"],
  data() {
    return {
      submissionFlag: false,
    };
  },
  mounted() {
  },
  methods: {
    showPincking(val) {
      if (val) {
        featurePincking(this.viewer);
        this.viewer.zoomTo(this.viewer);

        // 判断只点击一次，如果用户点击过 置为 disabled
        if (this.viewer.length != 0) {
          this.submissionFlag = true;
        } else {
          this.submissionFlag = false;
        }
      } else {
        this.submissionFlag = false
        removeFeaturePincking(this.viewer)
      }
    },
  },
};
</script>

<style scoped>
.picking-container{
  position: absolute;
  left: 10px;
  top: 80px;
  display: flex;
  align-items: center;
  justify-items: center;
}


.cesium-infoBox-defaultTable{
  width: 500px;
  height: 500px;
  position: absolute;
  top: 10px;
  right: 10px;
  background: pink;
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
/deep/ .el-button:focus, .el-button:hover{
  background: #00ffff;
  color: #fff;
}
/deep/ .el-button:active {
  color: #fff;
  border: none !important;
  cursor: pointer;
}
</style>
