<template>
  <div class="picking-container">
    <el-button @click="showPincking(true)" :disabled="submissionFlag"
      >增加3DTilesFeaturePicking</el-button
    >
    <el-button @click="showPincking(false)"
      >清除3DTilesFeaturePicking</el-button
    >
    <div id="cesiumContainer" class="fullSize"></div>
    <div id="loadingOverlay"><h1>Loading...</h1></div>
    <div id="toolbar"></div>
  </div>
</template>

<script>
var Cesium = require("cesium/Cesium");
import "cesium/Widgets/widgets.css";
import { featurePincking,removeFeaturePincking } from "../assets/js/3dTilesFeaturePicking";
export default {
    name: "tilesFeaturePicking",
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
  top: 70px;
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
</style>
