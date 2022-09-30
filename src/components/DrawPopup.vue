<template>
  <div>
    <div class="container" id="container">
      <el-button @click="showPolygon(true)" :disabled="submissionFlag"
        >Popup</el-button
      >
      <el-button @click="showPolygon(false)">隐藏绘制矩形</el-button>
    </div>
    <div id="cesiumContainer" class="fullSize">
      <div class="state" id="stateShow">
          <div class="box">
              <div class="box-wrap">
                  <div class="close" onclick="closeClick">X</div>
                  <div class="area">
                      <div class="area-title fontColor" id="title"></div>
                  </div>
                  <div class="content">
                      <div class="data-li">
                          <div class="data-label textColor">状态：</div>
                          <div class="data-value">
                              <span class="label-num yellowColor" id="state"></span>
                          </div>
                      </div>
                      <div class="data-li">
                          <div class="data-label textColor">类型：</div>
                          <div class="data-value">
                              <span class="label-num yellowColor" id="type"></span>
                              <!-- <span class="label-unit textColor">m³/s</span> -->
                          </div>
                      </div>
                  </div>
              </div>
            </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
var Cesium = require("cesium/Cesium");
import "cesium/Widgets/widgets.css";
// import { addEntity, leftDownAction } from "@/assets/js/DrawPopup";

export default {
  name: "DrawPopup",
  props: ["viewer"],

  data() {
    return {
      // 设置按钮的 disabled
      submissionFlag: false,
      poin: [
        {
          id: "12321321",
          name: "颍红测试点",
          type: "固定枪机",
          state: "在线",
          position: {
            x: 116.4568,
            y: 39.8926,
          },
          text: "1",
        },
        {
          id: "43244324",
          name: "解放修理厂门口",
          type: "固定枪机",
          state: "在线",
          position: {
            x: 116.4568,
            y: 39.8944,
          },
          text: "2",
        },
        {
          id: "43764324",
          name: "新华路加油站",
          type: "固定枪机",
          state: "在线",
          position: {
            x: 116.4566,
            y: 39.8923,
          },
          text: "3",
        },
        {
          id: "437543345",
          name: "康佳大药房",
          type: "固定枪机",
          state: "在线",
          position: {
            x: 116.4513,
            y: 39.8923,
          },
          text: "4",
        },
      ],
    };
  },

  mounted() {},
  methods: {
    showPolygon(val) {
      if (val) {
        this.init();
        //加载点
        // addEntity(this.poin.id, this.viewer)
        // leftDownAction(this.viewer);
        this.addEntity();
        // 判断只点击一次，如果用户点击过 置为 disabled
        if (this.viewer.length != 0) {
          this.submissionFlag = true;
        } else {
          this.submissionFlag = false;
        }
      } else {
        // 如果已经清除实体，将展示实体按钮变为能点击状态
        this.submissionFlag = false;
      }
    },
    //加载点
    addEntity() {
      let viewer = this.viewer
      let pinBuilder = new Cesium.PinBuilder();
      this.poin.map((res) => {
        console.log(res.id);
        let poin = this.viewer.entities.add({
          id: res.id,
          name: res.name,
          position: Cesium.Cartesian3.fromDegrees(
            res.position.x,
            res.position.y
          ),
          billboard: {
            image: pinBuilder
              .fromText(res.text, Cesium.Color.ROYALBLUE, 48)
              .toDataURL(),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          },
          monitoItems: {
            data: res,
          },
        });
      });
      var handler = new Cesium.ScreenSpaceEventHandler(
        this.viewer.scene.canvas
      );
      console.log(handler);
      handler.setInputAction(function (movement) {
        console.log(movement.position)
        // var picked = this.viewer.scene.pick(movement.position);
        var picked = viewer.scene.pickPosition(movement.position);
        console.log(picked)
        if (Cesium.defined(picked) && picked.id.id) {
          this.Popupposition(picked);
          let id = picked.id.id;
          let name = picked.id._name;
          document.getElementById("title").innerHTML = name;
          let monitoItems = picked.id.monitoItems;
          document.getElementById("state").innerHTML = monitoItems.data.state;
          document.getElementById("type").innerHTML = monitoItems.data.type;
        } else {
          return;
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    Popupposition(e) {
      
      let data = e.id.monitoItems.data;
      //经纬度转为世界坐标
      let gisPosition = Cesium.Cartesian3.fromDegrees(
        data.position.x,
        data.position.y,
        0
      );
      document.getElementById("stateShow").style.display = "block"; //弹出信息框
      //实时更新位置
      this.viewer.scene.postRender.addEventListener(() => {
        //转化为屏幕坐标
        var windowPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
          this.viewer.scene,
          gisPosition
        );
        console.log(windowPosition)
        document.getElementById("stateShow").style.left =
          windowPosition.x - 150 + "px";
        document.getElementById("stateShow").style.top =
          windowPosition.y - 220 + "px";

        //解决滚动不隐藏问题
        const camerPosition = this.viewer.camera.position;
        let height =
          this.viewer.scene.globe.ellipsoid.cartesianToCartographic(
            camerPosition
          ).height;
        height += this.viewer.scene.globe.ellipsoid.maximumRadius;
        if (
          
          !(Cesium.Cartesian3.distance(camerPosition, gisPosition) > height) &&
          this.viewer.camera.positionCartographic.height < 50000000
        ) {
          
          document.getElementById("stateShow").style.display = "block";
        } else {
          document.getElementById("stateShow").style.display = "none";
        }
      });
    },
    init() {
      this.viewer.camera.setView({
        // fromDegrees()方法，将经纬度和高程转换为世界坐标
        destination: {
          x: -2182971.083593166,
          y: 4388278.203560757,
          z: 4068871.884137431,
        },
        orientation: {
          // 指向
          heading: 0.7195577085964127,
          // 视角
          pitch: -0.7397293873082695,
          roll: 0.002953934254479762,
        },
      });

      //添加影像
      var imageryProvider = new Cesium.ArcGisMapServerImageryProvider({
        url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
        name: "arcgis影像服务",
      });
      this.viewer.imageryLayers.addImageryProvider(imageryProvider);
    },
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  left: 10px;
  top: 380px;
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
/*--------------------------气泡弹窗Start---------------------------*/
/*leaflet风格气泡窗口样式模板*/
.trackPopUp {
  display: none;
  color: rgb(255, 255, 255);
  height: 50px;
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
  width: 300px;
  height: 80px;
  max-height: 200px;
  overflow-y: auto;
  height: 133px;
  padding: 1px;
  text-align: left;
  border-radius: 12px;
  /* background-image: url("../images/pop/popbackground.png"); */
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