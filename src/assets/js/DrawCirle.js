/**绘制圆 */
import * as Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";
export default class DrawCirleUtils {
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
      callback(positions);
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  }

  //画圆
  drawCircle(_callBack) {
    let _self = this;
    _self.viewer.scene.globe.depthTestAgainstTerrain = true;
    _self.circle = {
      points: [],
      rect: null,
      entity: null,
      r: 1,
    };
    var tempPosition;
    let cartographic1;
    let p;
    let tempLon;
    let tempLat;
    var ShapeEventHandler = new Cesium.ScreenSpaceEventHandler(
      _self.viewer.scene.canvas
    );
    ShapeEventHandler.setInputAction(function (click) {
      tempPosition = _self.getPointFromWindowPoint(click.position); //选择的点在球面上
      if (tempPosition) {
        function callBackPos() {
          if (_self.circle.points.length == 0) {
            return;
          }
          const minlon = Cesium.Math.toDegrees(
            _self.circle.points[0].longitude
          );
          const minlat = Cesium.Math.toDegrees(_self.circle.points[0].latitude);
          const maxlon = Cesium.Math.toDegrees(
            _self.circle.points[1].longitude
          );
          const maxlat = Cesium.Math.toDegrees(_self.circle.points[1].latitude);
          const r = _self.getFlatternDistance(minlat, minlon, maxlat, maxlon);
          if (r) {
            return r;
          }
          return 1;
        }
        if (_self.circle.points.length == 0) {
          p = click.position;
          console.log(p)
          cartographic1 =
            Cesium.Ellipsoid.WGS84.cartesianToCartographic(tempPosition);
          _self.circle.points.push(
            _self.viewer.scene.globe.ellipsoid.cartesianToCartographic(
              tempPosition
            )
          );
          _self.circle.points.push(
            _self.viewer.scene.globe.ellipsoid.cartesianToCartographic(
              tempPosition
            )
          );
          tempLon = Cesium.Math.toDegrees(cartographic1.longitude);
          tempLat = Cesium.Math.toDegrees(cartographic1.latitude); //移除所有实体Entity // _self.viewer.entities.removeAll()
          _self.circle.entity = _self.viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(tempLon, tempLat),
            ellipse: {
              semiMinorAxis: new Cesium.CallbackProperty(callBackPos, false),
              semiMajorAxis: new Cesium.CallbackProperty(callBackPos, false), //条形材质
              material: Cesium.Color.RED.withAlpha(0.3),
            },
          });
        } else {
          ShapeEventHandler.removeInputAction(
            Cesium.ScreenSpaceEventType.MOUSE_MOVE
          );
          ShapeEventHandler.removeInputAction(
            Cesium.ScreenSpaceEventType.LEFT_CLICK
          );
          var tempCircle = new Cesium.CircleOutlineGeometry({
            center: Cesium.Cartesian3.fromDegrees(tempLon, tempLat),
            radius: callBackPos(),
            granularity: Math.PI / 2,
          });
          var geometry =
            Cesium.CircleOutlineGeometry.createGeometry(tempCircle);
          var float64ArrayPositionsIn = geometry.attributes.position.values;
          var positionsIn = [].slice.call(float64ArrayPositionsIn);
          //   _callBack(positionsIn);
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    ShapeEventHandler.setInputAction(function (movement) {
      if (_self.circle.points.length == 0) {
        return;
      }
      var moveEndPosition = _self.getPointFromWindowPoint(movement.endPosition);
      console.log("moveEndPosition:", _self.circle.points); //选择的点在球面上
      if (moveEndPosition) {
        _self.circle.points.pop();
        _self.circle.points.push(
          _self.viewer.scene.globe.ellipsoid.cartesianToCartographic(
            moveEndPosition
          )
        );
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
  //   //笛卡尔坐标系转WGS84坐标系
  //   Cartesian3_to_WGS84(point) {
  //     var cartesian33 = new Cesium.Cartesian3(point.x, point.y, point.z);
  //     var cartographic = Cesium.Cartographic.fromCartesian(cartesian33);
  //     var lat = Cesium.Math.toDegrees(cartographic.latitude);
  //     var lng = Cesium.Math.toDegrees(cartographic.longitude);
  //     var alt = cartographic.height; // return { // lat: lat, // lng: lng, // alt: alt // }
  //     return [lng, lat];
  //   }
  //   //WGS84坐标系转笛卡尔坐标系
  //   WGS84_to_Cartesian3(point) {
  //     var car33 = Cesium.Cartesian3.fromDegrees(point.lng, point.lat, point.alt);
  //     var x = car33.x;
  //     var y = car33.y;
  //     var z = car33.z;
  //     return {
  //       x: x,
  //       y: y,
  //       z: z,
  //     };
  //   }
  //计算两点间距离
  getFlatternDistance(lat1, lng1, lat2, lng2) {
    var EARTH_RADIUS = 6378137.0; //单位M
    var PI = Math.PI;

    function getRad(d) {
      return (d * PI) / 180.0;
    }
    var f = getRad((lat1 + lat2) / 2);
    var g = getRad((lat1 - lat2) / 2);
    var l = getRad((lng1 - lng2) / 2);

    var sg = Math.sin(g);
    var sl = Math.sin(l);
    var sf = Math.sin(f);

    var s, c, w, r, d, h1, h2;
    var a = EARTH_RADIUS;
    var fl = 1 / 298.257;

    sg = sg * sg;
    sl = sl * sl;
    sf = sf * sf;

    s = sg * (1 - sl) + (1 - sf) * sl;
    c = (1 - sg) * (1 - sl) + sf * sl;

    w = Math.atan(Math.sqrt(s / c));
    r = Math.sqrt(s * c) / w;
    d = 2 * w * a;
    h1 = (3 * r - 1) / 2 / c;
    h2 = (3 * r + 1) / 2 / s;

    return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
  }
  
  /**
   * 根据类型绘制对象
   * @param type point、polyline、polygon、rectangle
   */
  
  /**
   * 清除实体
   */
  clearDrawEntities() {
    let viewer = this.viewer;
    this.tempEntities = []; // 清除之前的实体
    const entitys = viewer.entities._entities._array;
    let length = entitys.length; // 倒叙遍历防止实体减少之后entitys[f]不存在
    for (let f = length - 1; f >= 0; f--) {
      if (
        entitys[f]._name &&
        (entitys[f]._name === "点几何对象" ||
          entitys[f]._name === "线几何对象" ||
          entitys[f]._name === "面几何对象" ||
          entitys[f]._name === "矩形几何对象")
      ) {
        viewer.entities.remove(entitys[f]);
      }
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
  flyToPromise(promise) {
    this.viewer.flyTo(promise, {
      offset: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-90),
        range: 0,
      },
    });
  }
  // -----------end 地图操作------------- //
}
