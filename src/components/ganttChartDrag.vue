<template>
  <div>
    <div class="container">
      <el-button @click="showPolygon(true)" :disabled="submissionFlag"
        >显示不可拖拽的甘特图</el-button
      >
      <el-button @click="showPolygon(false)">隐藏不可拖拽的甘特图</el-button>
    </div>
    <!-- 甘特图 -->
    <!-- 简易版 甘特图 （不可拖拽） -->
    <!-- <div class="gantt-centent" v-show="ganttFlag">
      <div id="chart1"></div>
      <div id="buttonGroup" class="button-row">
        <button id="btnShowDialog">
          <i class="fa fa-plus"></i>
          Add task
        </button>
        <button id="btnRemoveSelected" disabled="disabled">
          <i class="fa fa-remove"></i>
          Remove selected
        </button>
      </div>
      <div id="addTaskDialog" class="hidden overlay">
        <div class="popup">
          <h3>Add task</h3>
          <label>Task name <input id="inputName" type="text" /></label>
          <label
            >Department
            <select id="selectDepartment">
              <option value="0">Tech</option>
              <option value="1">Marketing</option>
              <option value="2">Sales</option>
            </select>
          </label>
          <label
            >Dependency
            <select id="selectDependency">
            </select>
          </label>
          <label>
            Milestone
            <input id="chkMilestone" type="checkbox" />
          </label>
          <div class="button-row">
            <button id="btnAddTask">Add</button>
            <button id="btnCancelAddTask">Cancel</button>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div> -->

    <div class="gantt-centent" v-show="ganttFlag">
      <gantt-elastic
        :options="options"
        :tasks="tasks"
        @tasks-changed="tasksUpdate"
        @options-changed="optionsUpdate"
        @dynamic-style-changed="styleUpdate"
      >
        <gantt-header slot="header"></gantt-header>
      </gantt-elastic>
      <div class="q-mt-md" />
      <button @click="addTask" icon="mdi-plus" label="Add task"></button>
    </div>
  </div>
</template>

<script>
var Cesium = require("cesium/Cesium");
import "cesium/Widgets/widgets.css";
import { getDate } from "@/assets/js/ganttChartDrag";

import Highcharts from "highcharts";
import xrange from "highcharts/modules/xrange";
xrange(Highcharts);

import GanttElastic from "gantt-elastic";
import GanttHeader from "gantt-elastic-header";
import dayjs from "dayjs";

let tasks = [
  {
    id: 1,
    label: "大任务1",
    user: '<a href="https://www.google.com/search?q=John+Doe" target="_blank" style="color:#0077c0;">John Doe</a>',
    start: getDate(-24 * 5),
    duration: 15 * 24 * 60 * 60 * 1000,
    percent: 85,
    type: "project",
    //collapsed: true,
  },
  {
    id: 2,
    label: "With great power comes great responsibility",
    user: '<a href="https://www.google.com/search?q=Peter+Parker" target="_blank" style="color:#0077c0;">Peter Parker</a>',
    parentId: 1,
    start: getDate(-24 * 4),
    duration: 4 * 24 * 60 * 60 * 1000,
    percent: 50,
    type: "milestone",
    collapsed: true,
    style: {
      base: {
        fill: "#1EBC61",
        stroke: "#0EAC51",
      },
    },
  },
  {
    id: 3,
    label: "Courage is being scared to death, but saddling up anyway.",
    user: '<a href="https://www.google.com/search?q=John+Wayne" target="_blank" style="color:#0077c0;">John Wayne</a>',
    parentId: 2,
    start: getDate(-24 * 3),
    duration: 2 * 24 * 60 * 60 * 1000,
    percent: 100,
    type: "task",
  },
  {
    id: 4,
    label: "Put that toy AWAY!",
    user: '<a href="https://www.google.com/search?q=Clark+Kent" target="_blank" style="color:#0077c0;">Clark Kent</a>',
    start: getDate(-24 * 2),
    duration: 2 * 24 * 60 * 60 * 1000,
    percent: 50,
    type: "task",
    dependentOn: [3],
  },
  {
    id: 5,
    label:
      "One billion, gajillion, fafillion... shabadylu...mil...shabady......uh, Yen.",
    user: '<a href="https://www.google.com/search?q=Austin+Powers" target="_blank" style="color:#0077c0;">Austin Powers</a>',
    parentId: 4,
    start: getDate(0),
    duration: 2 * 24 * 60 * 60 * 1000,
    percent: 10,
    type: "milestone",
    style: {
      base: {
        fill: "#0287D0",
        stroke: "#0077C0",
      },
    },
  },
  {
    id: 6,
    label: "Butch Mario and the Luigi Kid",
    user: '<a href="https://www.google.com/search?q=Mario+Bros" target="_blank" style="color:#0077c0;">Mario Bros</a>',
    parentId: 5,
    start: getDate(24),
    duration: 1 * 24 * 60 * 60 * 1000,
    percent: 50,
    type: "task",
    collapsed: true,
    style: {
      base: {
        fill: "#8E44AD",
        stroke: "#7E349D",
      },
    },
  },
  {
    id: 7,
    label: "Devon, the old man wanted me, it was his dying request",
    user: '<a href="https://www.google.com/search?q=Knight+Rider" target="_blank" style="color:#0077c0;">Knight Rider</a>',
    parentId: 2,
    dependentOn: [6],
    start: getDate(24 * 2),
    duration: 4 * 60 * 60 * 1000,
    percent: 20,
    type: "task",
    collapsed: true,
  },
  {
    id: 8,
    label: "Hey, Baby! Anybody ever tell you I have beautiful eyes?",
    user: '<a href="https://www.google.com/search?q=Johhny+Bravo" target="_blank" style="color:#0077c0;">Johhny Bravo</a>',
    parentId: 7,
    dependentOn: [7],
    start: getDate(24 * 3),
    duration: 1 * 24 * 60 * 60 * 1000,
    percent: 0,
    type: "task",
  },
  {
    id: 9,
    label:
      "This better be important, woman. You are interrupting my very delicate calculations.",
    user: '<a href="https://www.google.com/search?q=Dexter\'s+Laboratory" target="_blank" style="color:#0077c0;">Dexter\'s Laboratory</a>',
    parentId: 8,
    dependentOn: [8, 7],
    start: getDate(24 * 4),
    duration: 4 * 60 * 60 * 1000,
    percent: 20,
    type: "task",
    style: {
      base: {
        fill: "#8E44AD",
        stroke: "#7E349D",
      },
    },
  },
  {
    id: 10,
    label: "current task",
    user: '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
    start: getDate(24 * 5),
    duration: 24 * 60 * 60 * 1000,
    percent: 0,
    type: "task",
  },
  {
    id: 11,
    label: "test task",
    user: '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
    start: getDate(24 * 6),
    duration: 24 * 60 * 60 * 1000,
    percent: 0,
    type: "task",
  },
  {
    id: 12,
    label: "test task",
    user: '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
    start: getDate(24 * 7),
    duration: 24 * 60 * 60 * 1000,
    percent: 0,
    type: "task",
    parentId: 11,
  },
  {
    id: 13,
    label: "test task",
    user: '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
    start: getDate(24 * 8),
    duration: 24 * 60 * 60 * 1000,
    percent: 0,
    type: "task",
  },
  {
    id: 14,
    label: "test task",
    user: '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
    start: getDate(24 * 9),
    duration: 24 * 60 * 60 * 1000,
    percent: 0,
    type: "task",
  },
  {
    id: 15,
    label: "test task",
    user: '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
    start: getDate(24 * 16),
    duration: 24 * 60 * 60 * 1000,
    percent: 0,
    type: "task",
  },
];
let options = {
  taskMapping: {
    progress: "percent",
  },
  maxRows: 100,
  maxHeight: 500,
  title: {
    label: "Your project title as html (link or whatever...)",
    html: false,
  },
  row: {
    height: 24,
  },
  calendar: {
    hour: {
      display: true,
    },
  },
  chart: {
    progress: {
      bar: false,
    },
    expander: {
      display: true,
    },
  },
  taskList: {
    expander: {
      straight: false,
    },
    columns: [
      {
        id: 1,
        label: "ID",
        value: "id",
        width: 40,
      },
      {
        id: 2,
        label: "Description",
        value: "label",
        width: 200,
        expander: true,
        html: true,
        events: {
          click({ data, column }) {
            alert("description clicked!\n" + data.label);
          },
        },
      },
      {
        id: 3,
        label: "Assigned to",
        value: "user",
        width: 130,
        html: true,
      },
      {
        id: 3,
        label: "Start",
        value: (task) => dayjs(task.start).format("YYYY-MM-DD"),
        width: 78,
      },
      {
        id: 4,
        label: "Type",
        value: "type",
        width: 68,
      },
      {
        id: 5,
        label: "%",
        value: "progress",
        width: 35,
        style: {
          "task-list-header-label": {
            "text-align": "center",
            width: "100%",
          },
          "task-list-item-value-container": {
            "text-align": "center",
            width: "100%",
          },
        },
      },
    ],
  },
  locale: {
    name: "en",
    Now: "Now",
    "X-Scale": "Zoom-X",
    "Y-Scale": "Zoom-Y",
    "Task list width": "Task list",
    "Before/After": "Expand",
    "Display task list": "Task list",
  },
};

export default {
  name: "ganttChartDrag",
  props: ["viewer"],
  components: {
    GanttElastic,
    GanttHeader,
  },
  // components: { Test, TestLeft, TestTimeline, TestMarkline },
  data() {
    return {
      // 设置按钮的 disabled
      submissionFlag: false,
      ganttFlag: false,

      tasks,
      options,
      dynamicStyle: {},
      lastId: 16,
    };
  },

  mounted() {
    // this.updateData();
    console.log(Highcharts);
    Highcharts.setOptions({});
  },
  methods: {
    addTask() {
      this.tasks.push({
        id: this.lastId++,
        label:
          '<a href="https://images.pexels.com/photos/423364/pexels-photo-423364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" target="_blank" style="color:#0077c0;">Yeaahh! you have added a task bro!</a>',
        user: '<a href="https://images.pexels.com/photos/423364/pexels-photo-423364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" target="_blank" style="color:#0077c0;">Awesome!</a>',
        start: getDate(24 * 3),
        duration: 1 * 24 * 60 * 60 * 1000,
        percent: 50,
        type: "project",
      });
    },
    tasksUpdate(tasks) {
      this.tasks = tasks;
    },
    optionsUpdate(options) {
      this.options = options;
    },
    styleUpdate(style) {
      this.dynamicStyle = style;
    },

    showPolygon(val) {
      if (val) {
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
    //简易版 甘特图 （不可拖拽）
    // init() {
    //   setTimeout(function () {
    //     Highcharts.chart("chart1", {
    //       chart: {
    //         type: "xrange",
    //       },
    //       title: {
    //         text: "简易甘特图",
    //       },
    //       xAxis: {
    //         type: "datetime",
    //         dateTimeLabelFormats: {
    //           week: "%Y/%m/%d",
    //         },
    //       },

    //       yAxis: {
    //         title: {
    //           text: "",
    //         },
    //         categories: ["制作产品原型", "开发", "测试"],
    //         reversed: true,
    //       },
    //       tooltip: {
    //         dateTimeLabelFormats: {
    //           day: "%Y/%m/%d",
    //         },
    //       },
    //       series: [
    //         {
    //           name: "项目1",
    //           // pointPadding: 0,
    //           // groupPadding: 0,
    //           borderColor: "gray",
    //           pointWidth: 20,
    //           data: [
    //             {
    //               x: Date.UTC(2014, 10, 21),
    //               x2: Date.UTC(2014, 11, 2),
    //               y: 0,
    //               partialFill: 0.25,
    //             },
    //             {
    //               x: Date.UTC(2014, 11, 2),
    //               x2: Date.UTC(2014, 11, 5),
    //               y: 1,
    //             },
    //             {
    //               x: Date.UTC(2014, 11, 8),
    //               x2: Date.UTC(2014, 11, 9),
    //               y: 2,
    //             },
    //             {
    //               x: Date.UTC(2014, 11, 9),
    //               x2: Date.UTC(2014, 11, 19),
    //               y: 1,
    //             },
    //             {
    //               x: Date.UTC(2014, 11, 10),
    //               x2: Date.UTC(2014, 11, 23),
    //               y: 2,
    //             },
    //           ],
    //           dataLabels: {
    //             enabled: true,
    //           },
    //         },
    //       ],
    //     });
    //   });
    // },
  },
};
</script>
<style scoped>
.container {
  position: absolute;
  left: 10px;
  top: 155px;
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

/* 甘特图 */

label {
  margin-left: 10px;
}
input {
  width: 40px;
  height: 20px;
  vertical-align: middle;
}
input[type="range"] {
  width: 100px;
}
.top-bar {
  height: 40px;
}

.container-main {
  height: calc(100% - 58px);
  display: flex;
  flex-direction: column;
  flex: 1;
}

.main-footer {
  /* height: 30px; */
}

.el-slider {
  width: 100px;
}

/* 新的甘特图 */
</style>