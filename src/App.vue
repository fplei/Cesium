<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name:"App",
  data(){
    return {

    }
  }
}
</script>

<style>

*{
  margin: 0;
  padding: 0;
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

/*leaflet风格气泡窗口样式模板*/
.trackPopUp {
  display: none;
  color: rgb(255, 255, 255);
  background: red;
  
}

.leaflet-popup {
  position: absolute;
}

.leaflet-popup-close-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 4px 0 0;
  text-align: center;
  font: 25px/25px Tahoma, Verdana, sans-serif;
  color: rgb(255, 255, 255);
  text-decoration: none;
  font-weight: bold;
  background: transparent;
}

.leaflet-popup-content-wrapper {
  max-height: 200px;
  overflow-y: auto;
  height: 133px;
  padding: 1px;
  text-align: left;
  border-radius: 12px;
  background: red;
}

.leaflet-popup-content {
  margin: 5px 20px;
  line-height: 1.4;
}
.leaflet-popup-content div {
  text-align: center;
}

.leaflet-popup-content div {
  font-size: 18px;
}

.leaflet-popup-content table {
  margin-top: 15px;
}

.leaflet-popup-content table tr {
  height: 25px;
}
/*--------------------------气泡弹窗END---------------------------*/
</style>
