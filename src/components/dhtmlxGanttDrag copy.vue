<template>
  <div>
    <div class="container">
      <el-button @click="showPolygon(true)" :disabled="submissionFlag"
        >显示dhtmlx-gantt可拖拽的甘特图</el-button
      >
      <el-button @click="showPolygon(false)"
        >隐藏dhtmlx-gantt可拖拽的甘特图</el-button
      >
    </div>
    <!-- dhtmlx-gantt 甘特图 -->
    <div class="gantt-centent" v-show="ganttFlag">
      <div style="padding: 10px">
        <h2 style="text-align: center">我是Gantt echart哦～</h2>
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

// 引入模块
import gantt from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
// import 'dhtmlx-gantt/codebase/locale/locale_cn'  // 本地化

export default {
  name: "dhtmlxGanttDrag",
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
    this.ganttInitConfig()
  },
  methods: {
    showPolygon(val) {
      if (val) {
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
    //显示时间日期等。。。
    ganttInitConfig() {
      //日期格式化
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
      // 日期栏的高度 
      gantt.config.scale_height = 60; 

      gantt.init(this.$refs.gantt);
      gantt.parse(this.tasks);
      //左侧是否自适应
      gantt.config.autofit = true;
      //左侧宽
      gantt.config.grid_width = 500;
      //取消连线
      gantt.config.drag_links = false;
      //只读
      gantt.config.readonly = false;
      //右侧显示列名
      gantt.config.date_scale = "%Y-%m-%d";
      //自动调整图表坐标轴区间用于适配task的长度
      gantt.config.fit_tasks = true;
      //弹窗宽
      gantt.config.wide_form = false;
      //汉化
      gantt.locale = {
        date: {
          month_full: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
          ],
          month_short: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          day_full: [
            "星期日",
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
          ],
          day_short: ["日", "一", "二", "三", "四", "五", "六"],
        },
        labels: {
          dhx_cal_today_button: "今天",
          day_tab: "日",
          week_tab: "周",
          month_tab: "月",
          new_event: "新建日程",
          icon_save: "保存",
          icon_cancel: "关闭",
          icon_details: "详细",
          icon_edit: "编辑",
          icon_delete: "删除",
          confirm_closing: "请确认是否撤销修改!", //Your changes will be lost, are your sure?
          confirm_deleting: "是否删除计划?",
          section_description: "描述:",
          section_time: "时间范围:",
          section_type: "类型",
          section_text: "计划名称:",
          section_color: "颜色:",

          /* grid columns */

          column_text: "计划名称",
          column_start_date: "开始时间",
          column_duration: "持续时间",
          column_add: "",

          /* link confirmation */

          link: "关联",
          confirm_link_deleting: "将被删除",
          link_start: " (开始)",
          link_end: " (结束)",

          type_task: "任务",
          type_project: "项目",
          type_milestone: "里程碑",

          minutes: "分钟",
          hours: "小时",
          days: "天",
          weeks: "周",
          months: "月",
          years: "年",
        },
      };
      //左侧显示列名
      gantt.config.columns = [
        { name: "text", label: "计划名称", tree: true, width: "*" },
        { name: "start_date", label: "开始时间", align: "center" },
        { name: "end_date", label: "结束时间", align: "center" },
        {
          name: "progress",
          label: "进度",
          align: "center",
          template: function (obj) {
            return Math.floor(obj.progress * 100).toString() + "%";
          },
        },
        { name: "add", label: "" },
      ];
      
      //弹出层
      gantt.config.lightbox.sections = [
        {
          name: "text",
          height: 70,
          map_to: "text",
          type: "textarea",
          focus: true,
          width: 200,
        },
        {
          name: "time",
          height: 30,
          map_to: "auto",
          type: "time",
          time_format: ["%Y", "%m", "%d"],
        },
        {
          name: "color",
          height: 30,
          map_to: "color",
          type: "select",
          options: [
            { key: "#3db9d3", label: "蓝色" },
            { key: "#33cc33", label: "绿色" },
            { key: "#FF8247", label: "橙色" },
            { key: "#ff6633", label: "红色" },
          ],
        },
        {
          name: "description",
          height: 70,
          map_to: "description",
          type: "textarea",
        },
      ];

      //弹窗标题 计划名称
      gantt.templates.task_text = function (start, end, task) {
        return task.text;
      };
      // gantt.init(this.$refs.gantt);
      // gantt.parse(this.tasks);
      // let this_ = this;
      //添加后触发
      gantt.attachEvent("onAfterTaskAdd", function (id, item) {
        console.log("添加后触发");
        // this_.changeTask();
      });
      //移动进度后触发
      gantt.attachEvent("onAfterTaskDrag", function (id, mode, e) {
        console.log("移动进度后触发");
        // this_.changeTask();
      });
      //移动任务后触发
      gantt.attachEvent("onAfterTaskMove", function (id, parent, tindex) {
        console.log("移动任务后触发");
        // this_.changeTask();
      });
      //删除任务后触发
      gantt.attachEvent("onAfterTaskDelete", function (id, item) {
        console.log("删除任务后触发");
        // this_.changeTask();
      });
      //修改任务后触发
      gantt.attachEvent("onAfterTaskUpdate", function (id, item) {
        console.log("修改任务后触发");
        // this_.changeTask();
      });
      //保存验证
      gantt.attachEvent("onLightboxSave", function (id, item) {
        if (!item.text) {
          gantt.message({ type: "error", text: "请填写计划名称!" });
          return false;
        }
        return true;
      });
    },
    changeTask() {
      const taskCount = gantt.getTaskCount();
      let taskData = [];
      let openTask = [];
      for (let i = 0; i < taskCount; i++) {
        let taskOne = {};
        const obj = gantt.getTaskByIndex(i);
        //打开状态继续打开
        if (obj.$open == true) {
          openTask.push(obj.id);
        }
        //整理数据格式
        taskOne.id = obj.id;
        taskOne.text = obj.text;
        // taskOne.start_date = (obj.start_date).format("YYYY-MM-DD");
        // taskOne.end_date = (obj.end_date).format("YYYY-MM-DD");
        taskOne.duration = obj.duration;
        taskOne.progress = obj.progress;
        taskOne.description = obj.description;
        taskOne.color = obj.color;
        if (obj.parent) {
          taskOne.parent = obj.parent;
        }
        taskData.push(taskOne);
      }
      this.$props.tasks.data = taskData;
      //清空数据
      gantt.clearAll();
      //加载
      gantt.parse(this.$props.tasks);
      //遍历打开，使之前打开的父级继续打开
      openTask.forEach((id) => {
        gantt.open(id);
      });
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
/* dhtmlx-gantt 甘特图 */
.left-container {
  height: 200px;
  z-index: 2;
  background: rgba(17, 22, 24, 0.5);
}

/* 甘特图样式 */
/deep/ .gantt_task_line {
  background: pink !important;
}

/* 甘特图拖拽变色长方体 */
/deep/ .gantt_task_progress_wrapper{
  background: red !important;
}
/* 进度拖拉变色 */
/deep/ .gantt_task_progress{
  background: rgb(37, 13, 29) !important;
}


/* 全部变色 拖拉进度跟着全变变变 */
/deep/ .gantt_task_content {
  background: red !important;
}


/* 背景色 */
/deep/ .gantt_container,
.gantt_tooltip {
  background: none !important;
}
/deep/ .gantt_grid_scale {
  background: rgba(17, 22, 24, 0.5);
}
/deep/ .gantt_task_scale {
  background: rgba(17, 22, 24, 0.5);
}
/deep/ .gantt_task_vscroll {
  background: rgba(17, 22, 24, 0.5);
}
/deep/ .gantt_row {
  background: rgba(17, 22, 24, 0.5);
}
/deep/ .gantt_task_row {
  background: rgba(17, 22, 24, 0.5);
}

/* 点击后的样式 */
/deep/ .gantt_task_row.gantt_selected {
  background-color: pink;
}
/deep/ .gantt_grid_data .gantt_row.gantt_selected,
.gantt_grid_data .gantt_row.odd.gantt_selected {
  background-color: pink;
}
/* 鼠标经过 */
/deep/ .gantt_row.odd:hover {
  background-color: pink;
}
/deep/ .gantt_grid_data .gantt_row:hover {
  background-color: pink;
}
/* 右侧颜色 */
/deep/ .gantt_task .gantt_task_scale .gantt_scale_cell {
  color: white !important;
}
/* 左侧颜色 */
/deep/ .gantt_grid_data .gantt_cell {
  color: white !important;
}
/deep/ .gantt_grid_scale .gantt_grid_head_cell {
  color: white !important;
}
</style>