<template>
  <div>
    <div class="container">
      <el-button @click="showPolygon(true)" :disabled="submissionFlag"
        >显示highcharts可拖拽的甘特图</el-button
      >
      <el-button @click="showPolygon(false)">隐藏highcharts可拖拽的甘特图</el-button>
    </div>
    <!-- highcharts 甘特图 -->
    <div class="gantt-centent" v-show="ganttFlag">
      <div style="padding: 10px">
        <h2 style="text-align: center">Gantt echart</h2>
        <div class="app-container">
          <div ref="gantt" class="left-container" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var Cesium = require("cesium/Cesium");
import "cesium/Widgets/widgets.css";
// 没有用到
// import { Gantt } from "@/assets/js/highchartsGantt";
//引入Highcharts 
import Highcharts from "highcharts";
import xrange from "highcharts/modules/xrange";
xrange(Highcharts);
// 引入模块
import gantt from "dhtmlx-gantt"; 
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
// import 'dhtmlx-gantt/codebase/locale/locale_cn'  // 本地化

export default {
  name: "highchartsDrag",
  props: ["viewer"],
  data() {
    return {
      // 设置按钮的 disabled
      submissionFlag: false,
      // 显示隐藏 Div
      ganttFlag: false,
      tasks: {
        data: [
          {
            id: 1,
            text: "Task #1",
            start_date: "2020-12-15",
            personName: "张总",
            duration: 3,
            progress: 0.6,
            color: "#6BC172",
          },
          {
            id: 2,
            text: "Task #2",
            start_date: "2020-12-18",
            personName: "李总",
            duration: 6,
            progress: 0.4,
            color: "#6BC172",
          },
          {
            id: 3,
            text: "Task #2-1",
            start_date: "2020-12-18",
            personName: "赵总",
            duration: 3,
            progress: 0.2,
            parent: 2,
          },
          {
            id: 4,
            text: "Task #2-2",
            start_date: "2020-12-21",
            personName: "赵总",
            duration: 3,
            progress: 0,
            parent: 2,
          },
        ],
        links: [
          {
            id: 1,
            source: 1,
            target: 2,
            type: "0",
          },
        ],
      },
    };
  },

  mounted() {
    // this.updateData();
    console.log(Highcharts);
    Highcharts.setOptions({});
    //hightcharts
    gantt.config.xml_date = "%Y-%m-%d";
    // 在时间线上增加一行年份显示
    gantt.config.subscales = [
      {
        unit: "year",
        step: 1,
        date: "%Y",
      },
    ];
    // 初始化
    gantt.init(this.$refs.gantt);
    // 数据解析
    gantt.parse(this.tasks);
  },
  methods: {
    showPolygon(val) {
      if (val) {
        // Gantt();
        // this.init();
        this.ganttFlag = true;
        // 判断只点击一次，如果用户点击过 置为 disabled
        if (this.viewer.length != 0) {
          this.submissionFlag = true;
        } else {
          this.submissionFlag = false;
        }
      } else {
        this.ganttFlag = false;
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
  top: 195px;
  display: flex;
  align-items: center;
  justify-items: center;
  display: block;
}
.gantt-centent {
  /* height: 300px; */
  /* width: 100%; */
  /* display: flex;
  flex-direction: column; */
  /* height: calc(100vh - 2px); */
  width: 100%;
  position: absolute;
  bottom: 10px;
  background: rgba(17, 22, 24, 0.5);
  border: 1px solid rgba(56, 215, 227, 0.5);
  color: white;
  border-radius: 3px;
  font-size: 12px;
}

/* highcharts 甘特图 */
.left-container {
  height: 600px;
}
</style>