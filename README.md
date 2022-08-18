# cesium-demo1

这是一个 Cesium 练习的 Demo 

## Project setup
```
下载依赖：
npm install 或者使用 cnpm i
```

### Compiles and hot-reloads for development
```
运行Demo
npm run serve
```

### Compiles and minifies for production
```
打包
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 可拖动的甘特图使用 dhtmlx-gantt

### dhtmlxGanttDrag.vue 为可拖拽的甘特图

```
// package.json

"dhtmlx-gantt": "^6.3.7",
"gantt-elastic": "^1.0.12",
"gantt-elastic-header": "^0.1.11",

```

### 1. 下载 插件 依赖
```
// dhtmlx-gantt插件
npm install dhtmlx-gantt --save 

```

### 2.引入
```
import gantt from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";

```


### highcharts 不可拖拽

```
// package.json

"highcharts": "^10.2.0",
"highcharts-vue": "^1.4.0",

```

### 1. 下载 插件 依赖
```
npm install -S vue-highcharts
npm install -S highcharts  

```

### 2.引入
```
import highcharts from 'highcharts'
import highcharts3d from 'highcharts/highcharts-3d'
highcharts3d(highcharts);

```
