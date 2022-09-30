<template>
  <div class="mapview-container">
    <div id="cesiumContainer"></div>
    <polygon-line-parts :viewer="mapViewer"></polygon-line-parts>
    <entity-cluster :viewer="mapViewer"></entity-cluster>
    <tiles-feature-picking :viewer="mapViewer"></tiles-feature-picking>
    <pick-event :viewer="mapViewer"></pick-event>
    <!-- 不可拖拽甘特图 -->
    <gantt-chart-drag :viewer="mapViewer" />
    <!-- 可拖拽甘特图 -->
    <dhtmlx-gantt-drag :viewer="mapViewer" />
    <map-control :viewer="mapViewer" />
    <ul class="tabUl">
      <li class="b-r" @click="listFn($event, 'animationControl')">动画</li>
      <li class="b-r" @click="listFn($event, 'measurementControl')">三维标点测距VS标点测面</li>
    </ul>
    <components :is="viewShow" :viewer="mapViewer" />
    <!-- <seting-control /> -->
    <draw-circle :viewer="mapViewer" />
    <draw-line :viewer="mapViewer" />
    <draw-polygons :viewer="mapViewer"/>
    <draw-rect :viewer="mapViewer" />
    <draw-popup :viewer="mapViewer" />
  </div>
</template>

<script>
import polygonLineParts from "@/components/polygonLineParts.vue";
import entityCluster from "@/components/entityCluster.vue";
import tilesFeaturePicking from "@/components/3DTilesFeaturePicking.vue";
import pickEvent from "@/components/pickEvent.vue";
// 不可拖拽甘特图
import ganttChartDrag from "@/components/ganttChartDrag.vue";
// highcharts-可拖拽甘特图
import dhtmlxGanttDrag from "@/components/dhtmlxGanttDrag.vue";
//动画切换效果
import animationControl from "@/components/animationMange/animationControl.vue";
import measurementControl from "@/components/animationMange/measurementControl.vue"

// 二三维切换
import mapControl from "@/components/mapControl.vue";

import DrawCircle from "@/components/DrawCircle";
import DrawLine from "@/components/DrawLine";
import DrawPolygons from "@/components/DrawPolygons";
import DrawRect from "@/components/DrawRect";
import DrawPopup from "@/components/DrawPopup";

export default {
  name: "cesiumHome",
  data() {
    return {
      mapViewer: null,
      viewShow: null,
    };
  },
  components: {
    polygonLineParts,
    entityCluster,
    tilesFeaturePicking,
    pickEvent,
    ganttChartDrag,
    dhtmlxGanttDrag,
    mapControl,
    animationControl,
    measurementControl,
    DrawCircle,
    DrawLine,
    DrawPolygons,
    DrawRect,
    DrawPopup,
  },
  mounted() {
    this.initCesium();
    this.mapViewer = this.viewer;
    console.log(this.mapViewer);
  },
  methods: {
    //初始化球体参数，传值
    initCesium() {
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkYmQwM2EyZC03YzIwLTQxMTUtODE1MS0zNTljYTJiMTYxMmYiLCJpZCI6NDA4NDUsImlhdCI6MTYwOTI5NzE1MX0.a4YvI1mTMoI6fMuW43norCQQnhkNAcR797yrvIrwB5g";
      this.viewer = new Cesium.Viewer("cesiumContainer", {
        animation: false, // 是否创建动画小器件，左下角仪表
        timeline: false, // 是否显示时间轴
        fullscreenButton: true, // 是否显示全屏按钮
        geocoder: false, // 是否显示geocoder小器件，右上角查询按钮
        homeButton: true, //一键回城
        skyAtmosphere: false, // 大气层
        infoBox: false, // 是否显示信息框
        navigationHelpButton: false, // 是否显示右上角的帮助按钮
        sceneModePicker: false, // 是否显示3D/2D选择器
        baseLayerPicker: false, // 是否显示图层选择器,
        selectionIndicator: false, // 是否显示选取指示器组件
        showRenderLoopErrors: false,
        shouldAnimate: true,
        //----------------
        // 添加ArcGIS在线影像底图
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          subdomains: ['0', '1', '2', '3'],
          tilingScheme: new Cesium.WebMercatorTilingScheme()
        })
        //----------------
      });
      //----------------
      // 若浏览器不支持pickPosition，显示报错信息
      if (!this.viewer.scene.pickPositionSupported) {
        window.alert('This browser does not support pickPosition.')
      }
      // 载入OSM建筑物
      // const osmBuildings = this.viewer.scene.primitives.add(Cesium.createOsmBuildings()) // eslint-disable-line no-unused-vars
      // 初始化镜头
      this.viewer.camera.lookAt(
        Cesium.Cartesian3.fromDegrees(-122.2058, 46.1955, 1000.0),
        new Cesium.Cartesian3(5000.0, 5000.0, 5000.0)
      )
      this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
      //----------------

      
      this.viewer._cesiumWidget._creditContainer.style.display = "none";
      // 去锯齿，使文字清晰
      this.viewer.scene.postProcessStages.fxaa.enabled = false;
      // const viewer = defaultInitCesium("cesiumContainer", "tianDitu", true, "3D")
    },
    // tab切换
    listFn(ev, type) {
      var that = this;
      $(ev.target).addClass("active").siblings().removeClass("active");

      switch (type) {
        case "animationControl":
          this.viewShow = animationControl;
          break;
        case "measurementControl":
          this.viewShow = measurementControl;
          // this.$router.push("./");
          break;
        default:
          this.viewShow = AnimatePath;
          break;
      }
    },
  },
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
.tabUl {
  width: 220px;
  height: 30px;
  text-align: center;
  margin-top: 7px;
  position: absolute;
  left: 350px;
  right: 0;
  z-index: 20;
  font-size: 12px;
}
.tabUl > li {
  background: red;
  float: left;
  line-height: 30px;
  padding: 0 10px;
  cursor: default;
  background-size: 115px;
  color: #00ffff;
  cursor: pointer;
  border-radius: 3px;
  margin: 0 2px;
}

.tabUl > li.active {
  background: pink;
  float: left;
  line-height: 30px;
  padding: 0 10px;
  cursor: default;
  background-size: 115px;
  color: #fff;
}
.tabUl .b-r {
  background: rgba(17, 22, 24, 0.5);
  border: 1px solid rgba(56, 215, 227, 0.5);
  float: left;
  line-height: 30px;
  padding: 0 10px;
  cursor: default;
  background-size: 115px;
  color: #00ffff;
  cursor: pointer;
}
.tabUl .b-r.active {
  background: #00ffff;
  float: left;
  line-height: 30px;
  padding: 0 10px;
  cursor: default;
  background-size: 115px;
  color: #fff;
  cursor: pointer;
}
</style>