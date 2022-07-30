var Cesium = require("cesium/Cesium");
let latitude;
let longitude;
let paramObj;
let cartesian2;
let handler;
let carto2;
let cartesian;



let infoboxContainer;
let canvasHeight;
let windowPosition;
export function pickEvent(viewer) {
  //获取当前点击的位置坐标
  handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction((movement)=> {
    console.log(movement)
    /* var windowPosition = viewer.camera.getPickRay(movement.position);
       var cartesianCoordinates = viewer.scene.globe.pick(windowPosition, viewer.scene);
       var cartoCoordinates = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesianCoordinates); */
    cartesian2 = viewer.camera.pickEllipsoid(
      movement.position,
      viewer.scene.globe.ellipsoid
    );
    console.log(cartesian2)
    carto2 = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian2);
    console.log(carto2)
    latitude = (carto2.latitude * 180) / Math.PI;
    longitude = (carto2.longitude * 180) / Math.PI;
    console.log(latitude,longitude)
    //alert("纬度:"+latitude+","+"经度:"+longitude);
    cartesian = viewer.scene.pickPosition(movement.position);
    console.log(cartesian)
    //弹窗 参数
    paramObj = {
      id: "trackPopUpContent",
      HTMLdiv:
        '<div class="leaflet-popup-content-wrapper" style="background:#FFF;">' +
        '<div id="trackPopUpLink" class="leaflet-popup-content" style="max-width:300px;max-height:500px"><h5>纬度:' +
        latitude +
        ",<br>经度:" +
        longitude +
        "</h5></div>" +
        "</div>",
      Offset: {
        x: 0,
        y: 0,
      },
      coordinate: cartesian, //笛卡尔坐标参数
      lineStyle: {
        Linewidth: 3,
        Lineheight: 25,
        Linebackground: "#409EFF",
      },
      CircleStyle: {
        Circleradius: 8,
        Circlecolor: "#409EFF",
      },
      heighthidenum: 1000, //高度隐藏值
    };
    console.log(paramObj)
    //固定弹窗 位置
    // PopupCoordinatePositioning(paramObj);
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

export function PopupCoordinatePositioning(viewer,paramObj){
  viewer.scene.postRender.addEventListener(() =>{ // 每一帧都去计算气泡的正确位置
    if (Popups.length > 0) {
        for (var i = 0; i < Popups.length; i++) {
            infoboxContainer = document.getElementById(Popups[i].PopupsID); //morphComplete
            if (infoboxContainer != null) {
                //var infoboxContainer = document.getElementById("bubble");//morphComplete
                if (Popups[i].scenePosition) {
                    canvasHeight = viewer.scene.canvas.height;
                    windowPosition = new Cesium.Cartesian2();
                    Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, Popups[i].scenePosition, windowPosition);
                    infoboxContainer.style.bottom = (canvasHeight - windowPosition.y + Popups[i].paramObj.Offset.y) + 'px';
                    infoboxContainer.style.left = (windowPosition.x + -(infoboxContainer.scrollWidth / 2)) + 'px';
                }
            }
        }
    }

});
}
