var Cesium = require("cesium/Cesium");
let positionsColor = new Cesium.Cartesian3.fromDegreesArray([
  -99.0, 30.0, 
  -85.0, 30.0, 
  -85.0, 40.0, 
  -99.0, 40.0,
]);
export function polygon(viewer,positions) {
  let poly = {
    name: "Blue polygon with holes",
    id:"polygon",
    polygon: {
      hierarchy: {
        //定义多边形及其孔的线性环的层次结构
        positions: positions,
        holes: [
          {
            positions: Cesium.Cartesian3.fromDegreesArray([
              -97.0, 31.0, -97.0, 39.0, -87.0, 39.0, -87.0, 31.0,
            ]),
            holes: [
              {
                positions: Cesium.Cartesian3.fromDegreesArray([
                  -95.0, 33.0, -89.0, 33.0, -89.0, 37.0, -95.0, 37.0,
                ]),
                holes: [
                  {
                    positions: Cesium.Cartesian3.fromDegreesArray([
                      -93.0, 34.0, -91.0, 34.0, -91.0, 36.0, -93.0, 36.0,
                    ]),
                  },
                ],
              },
            ],
          },
        ],
      },
      material: Cesium.Color.BLUE.withAlpha(0.8),
      height: 0,
      outline: true,
      closeTop: true, //对于拉伸的图形关闭顶部
      closeBottom: true, //对于拉伸的图形关闭底部
      extrudedHeight: 1000000,
      extrudedHeightReference: Cesium.HeightReference.CLAMP_TO_EDGE, //对于拉伸的图形贴地，RELATIVE_TO_GROUND 位于地形之上
    },
    
  };
  //   poly.polygon.positions = positions;
  viewer.entities.add(poly);
}
// 清除
export function clearPolygon(viewer){
  viewer.entities.remove();

}


 