<template>
  <div>
    <div class="container">
      <el-button @click="showPincking(true)" :disabled="submissionFlag"
        >增加pickEvent</el-button
      >
      <el-button @click="showPincking(false)">清除pickEvent</el-button>
    </div>
  </div>
</template>

<script>
var Cesium = require("cesium/Cesium");
import "cesium/Widgets/widgets.css";
import {  } from "@/assets/js/pickEvent";
export default {
  props: ["viewer"],
  data() {
    return {
      submissionFlag: false,
      
    };
  },
  mounted() {
    console.log(this.viewer);
  },
  methods: {
    showPincking(val) {
      if (val) {
        
        this.viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300000.0),
          id:1,
          point:{
            pixelSize:20,
            color:Cesium.Color.fromCssColorString("#ee0000"),
            outlineColor:Cesium.Color.fromCssColorString("#fff"),
            outlineWidth:2,
            show:true
          },
          label:{
            //文本，支持显式换行符 “\n”
            text:"测试名字",
            //字体样式，以CSS语法指定字体
            font:"14pt Source Han Sans CN",
            //字体颜色
            fillColor:Cesium.Color.BLACK,
            //背景颜色
            backgroundColor:Cesium.Color.AQUA,
            //是否显示背景颜色
            showBackground:true,
            //字体边框
            outline:true,
            //字体边框颜色
            outlineColor:Cesium.Color.WHITE,
            //字体边框尺寸
            outlineWidth:10,
            //应用于图像的统一比例，比例大于会 1.0放大标签，而比例小于会 1.0缩小标签
            scale:2,
            //设置样式：FLL：填写标签的文字，但不要勾勒轮廓；OUTLlNE：概述标签文字，但不要填写，FlLL_AND_OUTLlNE：填写并概述标签文字
            style:Cesium.LabelStyle.FlLL_AND_OUTLlNE,
            //相对于坐标的水平位置
            verticalOrigin:Cesium.VerticalOrigin.CENTER,
            //相对于坐标的水平位置
            horizontalOrigin:Cesium.HorizontalOrigin.LEFT,
            //该属性指定标签在屏幕空间中距此标签原点的像素偏移量
            pixelOffset:new Cesium.Cartesian2(10,0),
            //是否显示
            show:true,
          },
          billboard:{
            //图像地址，URL或canvas属性
            // image:"../assets/img/Lovely.png",
            image:require("../assets/img/Lovely.png"),
            //设置颜色和透明度
            color:Cesium.Color.WHITE.withAlpha(0.8),
            //高度（以像素为单位）
            height:80,
            //宽度（以像素为单位）
            width:80,
            //逆时针旋转
            rotation:0,
            //大小是否以米为单位
            sizelnMeters:false,
            //相对于坐标垂直位置
            verticalOrigin:Cesium.HorizontalOrigin.LEFT,
            //该属性指定标签在屏幕空间中距此标签原点的像素偏移量
            pixelOffset:new Cesium.Cartesian2(100,-15),
            scale:1.0,
            show:true,
          }
        })
        // this.viewer.entities.add(that.entity);
        // pickEventFun(this.viewer);
        // PopupCoordinatePositioning(this.viewer);
        // changeairtype(this.viewer)
        this.viewer.zoomTo(this.viewer);
        // this.addScreenSpaceEventHandler();
      } else {
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
  top: 115px;
  display: flex;
  align-items: center;
  justify-items: center;
}
</style>
