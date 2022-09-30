/**绘制线 */
import * as Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";
export default class DrawLineUtils {
  /**
   * 构造函数-经纬度坐标传值
   * @param {三维视图实例} _viewer
   */
  constructor(_viewer) {
    //三维视图实例
    this.viewer = _viewer;  
  }
  // -----------start draw-------------   
  //第一种 
  //画点
  drawPoint(callback) {
    var _this = this; //坐标存储
    var positions = [];

    var handler = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas); //单击鼠标左键画点

    handler.setInputAction(function (movement) {
      var cartesian = _this.viewer.scene.camera.pickEllipsoid(
        movement.position,
        _this.viewer.scene.globe.ellipsoid
      );
      positions.push(cartesian);
      _this.viewer.entities.add({
        id: "Point",
        position: cartesian,
        point: {
          color: Cesium.Color.SKYBLUE,
          pixelSize: 10,
          outlineColor: Cesium.Color.YELLOW,
          outlineWidth: 3,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
      });
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK); //单击鼠标右键结束画点

    handler.setInputAction(function (movement) {
      handler.destroy();
    //   callback(positions);
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  }

  // 画线
  drawLineString(callback) {
    var _this = this;
    var PolyLinePrimitive = (function () {
      function _(positions) {
        this.options = {
          polyline: {
            show: true,
            positions: [],
            material: Cesium.Color.RED,
            width: 3,
          },
        };
        this.positions = positions;
        this._init();
      }

      _.prototype._init = function () {
        var _self = this;
        var _update = function () {
          return _self.positions;
        }; //实时更新polyline.positions
        this.options.polyline.positions = new Cesium.CallbackProperty(
          _update,
          false
        );
        _this.viewer.entities.add(this.options);
      };
      return _;
    })();

    var handler = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
    var positions = [];
    var poly = undefined; //鼠标左键单击画点
    handler.setInputAction(function (movement) {
      var cartesian = _this.viewer.scene.camera.pickEllipsoid(
        movement.position,
        _this.viewer.scene.globe.ellipsoid
      );
      if (positions.length == 0) {
        positions.push(cartesian.clone());
      }
      positions.push(cartesian);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK); //鼠标移动
    handler.setInputAction(function (movement) {
      var cartesian = _this.viewer.scene.camera.pickEllipsoid(
        movement.endPosition,
        _this.viewer.scene.globe.ellipsoid
      );
      if (positions.length >= 2) {
        if (!Cesium.defined(poly)) {
          poly = new PolyLinePrimitive(positions);
        } else {
          if (cartesian != undefined) {
            positions.pop();
            cartesian.y += 1 + Math.random();
            positions.push(cartesian);
          }
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE); //单击鼠标右键结束画线
    handler.setInputAction(function (movement) {
      handler.destroy();
    //   callback(positions);
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  } 

  
  //初始化将三维球定位到中国
  flyToInit() {
    var fly = this.viewer.scene.camera.flyTo({
      destination: new Cesium.Cartesian3.fromDegrees(
        106.26667,
        38.46667,
        6000000.0
      ),
      orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-90), // 视角
        roll: Cesium.Math.toRadians(0),
      },
      duration: 3.0,
    });
    return fly;
  }
  //根据目标定位
//   flyToPromise(promise) {
//     this.viewer.flyTo(promise, {
//       offset: {
//         heading: Cesium.Math.toRadians(0.0),
//         pitch: Cesium.Math.toRadians(-90),
//         range: 0,
//       },
//     });
//   }
  // -----------end 地图操作------------- //
}
