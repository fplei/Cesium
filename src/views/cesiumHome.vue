<template>
  <div class="mapview-container">
    <div id="cesiumContainer"></div>
    <polygon-line-parts :viewer="mapViewer"></polygon-line-parts>
    <entity-cluster :viewer="mapViewer"></entity-cluster>
    <tiles-feature-picking :viewer="mapViewer"></tiles-feature-picking>
    <pick-event :viewer="mapViewer"></pick-event>
    <gantt-chart-drag :viewer="mapViewer" />
    <highcharts-drag :viewer="mapViewer" />
  </div>
</template>

<script>
import polygonLineParts from "@/components/polygonLineParts.vue"
import entityCluster from "@/components/entityCluster.vue"
import tilesFeaturePicking from "@/components/3DTilesFeaturePicking.vue"
import pickEvent from "@/components/pickEvent.vue"
// 甘特图
import ganttChartDrag from "@/components/ganttChartDrag.vue"

import highchartsDrag from "@/components/highchartsDrag.vue"

export default {
  name: "cesiumHome",
  data(){
    return {
      mapViewer: null,
    }
  },
  components:{
    polygonLineParts,
    entityCluster,
    tilesFeaturePicking,
    pickEvent,
    ganttChartDrag,
    highchartsDrag
  },
  mounted() {
    this.initCesium()
    this.mapViewer = this.viewer;
    console.log(this.mapViewer)

    
  },
  methods:{
    initCesium(){
      Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkYmQwM2EyZC03YzIwLTQxMTUtODE1MS0zNTljYTJiMTYxMmYiLCJpZCI6NDA4NDUsImlhdCI6MTYwOTI5NzE1MX0.a4YvI1mTMoI6fMuW43norCQQnhkNAcR797yrvIrwB5g";
      this.viewer = new Cesium.Viewer("cesiumContainer",{
        animation: false, // 是否创建动画小器件，左下角仪表
        timeline: false, // 是否显示时间轴
        fullscreenButton: true, // 是否显示全屏按钮
        geocoder: false, // 是否显示geocoder小器件，右上角查询按钮
        homeButton: true, //一键回城
        skyAtmosphere: false, // 大气层
        infoBox: false, // 是否显示信息框
        navigationHelpButton: false, // 是否显示右上角的帮助按钮
        sceneModePicker: true, // 是否显示3D/2D选择器
        baseLayerPicker: true, // 是否显示图层选择器,
        selectionIndicator: false, // 是否显示选取指示器组件
        showRenderLoopErrors: false,
        shouldAnimate: true,
      });
      this.viewer._cesiumWidget._creditContainer.style.display = "none";
      // 去锯齿，使文字清晰
      this.viewer.scene.postProcessStages.fxaa.enabled = false;
      // const viewer = defaultInitCesium("cesiumContainer", "tianDitu", true, "3D")
    }
  }
};
</script>

<style scoped>
@import url(../assets/css/cesiumStyle.css);
#cesiumContainer {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

</style>