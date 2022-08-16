# cesium-demo1

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

### highchartsDrag.vue 为甘特图
### 1. 下载 插件 依赖
```
npm install -S vue-highcharts
npm install -S highcharts  
```

```
// dhtmlx-gantt插件
npm install dhtmlx-gantt --save 
```

### 2.引入
```
import highcharts from 'highcharts'
import highcharts3d from 'highcharts/highcharts-3d'
highcharts3d(highcharts);
```

