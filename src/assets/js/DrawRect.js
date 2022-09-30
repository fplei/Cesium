/**绘制矩形 */
import * as Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";
export default class DrawRectUtils {
  /**
   * 构造函数-经纬度坐标传值
   * @param {三维视图实例} _viewer
   */
  constructor(_viewer) {
    //三维视图实例
    this.viewer = _viewer;  
  }
  // -----------start draw-------------   
  //画矩形
  drawRect(callback) {
    let _self = this;
    let pointsArr = [];
    _self.shape = {
      points: [],
      rect: null,
      entity: null,
    };
    var tempPosition;
    var handle = new Cesium.ScreenSpaceEventHandler(_self.viewer.scene.canvas); //鼠标左键单击画点
    handle.setInputAction(function (click) {
      tempPosition = _self.getPointFromWindowPoint(click.position); //选择的点在球面上

      if (tempPosition) {
        var cartesian = _self.viewer.scene.camera.pickEllipsoid(
          click.position,
          _self.viewer.scene.globe.ellipsoid
        );
        _self.viewer.entities.add({
          name: "Point",
          position: cartesian,
          point: {
            color: Cesium.Color.WHEAT,
            pixelSize: 5,
            outlineWidth: 3,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 规定贴地
          },
        });
        pointsArr.push(tempPosition);
        if (_self.shape.points.length == 0) {
          _self.shape.points.push(
            _self.viewer.scene.globe.ellipsoid.cartesianToCartographic(
              tempPosition
            )
          );
          _self.shape.rect = Cesium.Rectangle.fromCartographicArray(
            _self.shape.points
          );
          _self.shape.rect.east += 0.000001;
          _self.shape.rect.north += 0.000001;
          _self.shape.entity = _self.viewer.entities.add({
            name: "矩形",
            rectangle: {
              coordinates: _self.shape.rect,
              material: Cesium.Color.RED.withAlpha(0.4),
              outline: true,
              outlineWidth: 2,
              outlineColor: Cesium.Color.RED,
              height: 999,
            },
          });
          _self.bufferEntity = _self.shape.entity;
        } else {
          handle.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
          handle.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        //   callback(pointsArr);
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK); //鼠标移动
    handle.setInputAction(function (movement) {
      if (_self.shape.points.length == 0) {
        return;
      }
      var moveEndPosition = _self.getPointFromWindowPoint(movement.endPosition); //选择的点在球面上
      if (moveEndPosition) {
        pointsArr[1] = moveEndPosition;
        _self.shape.points[1] =
          _self.viewer.scene.globe.ellipsoid.cartesianToCartographic(
            moveEndPosition
          );
        _self.shape.rect = Cesium.Rectangle.fromCartographicArray(
          _self.shape.points
        );
        if (_self.shape.rect.west == _self.shape.rect.east)
          _self.shape.rect.east += 0.000001;
        if (_self.shape.rect.south == _self.shape.rect.north)
          _self.shape.rect.north += 0.000001;
        _self.shape.entity.rectangle.coordinates = _self.shape.rect;
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }
  getPointFromWindowPoint(point) {
    if (
      this.viewer.scene.terrainProvider.constructor.name ==
      "EllipsoidTerrainProvider"
    ) {
      return this.viewer.camera.pickEllipsoid(
        point,
        this.viewer.scene.globe.ellipsoid
      );
    } else {
      var ray = this.viewer.scene.camera.getPickRay(point);
      return this.viewer.scene.globe.pick(ray, this.viewer.scene);
    }
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
