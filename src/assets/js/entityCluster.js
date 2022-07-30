var Cesium = require("cesium/Cesium");
import billboard from "../img/billboard.png";
let dataSource = null;
let removeListener;
let pixelRange;
let minimumClusterSize;
let enabled;
let customDataSource;
export function entityCluster(viewer) {
  customDataSource = new Cesium.CustomDataSource("customDataSource");
  console.log(customDataSource);
  for (let i = 0; i < 250; i++) {
    let entity = new Cesium.Entity();
    console.log(entity);
    entity.position = Cesium.Cartesian3.fromDegrees(
      Cesium.Math.randomBetween(-180, 180),
      Cesium.Math.randomBetween(-75, 75)
    );
    console.log(entity.position);
    entity.billboard = new Cesium.BillboardGraphics();

    entity.billboard.image = billboard;
    entity.billboard.color = Cesium.Color.fromRandom().withAlpha(0.8);
    customDataSource.entities.add(entity);
    console.log(entity.billboard);
  }
  viewer.dataSources.add(customDataSource);
  // console.log(viewer.dataSources.add(customDataSource))
  dataSource = customDataSource;
  pixelRange = 5;
  minimumClusterSize = 3;
  enabled = true;
  removeListener = null;
  //开启数据源实体聚合
  dataSource.clustering.enabled = enabled;
  //扩展屏幕空间边框的像素范围
  dataSource.clustering.pixelRange = pixelRange;
  //群集的屏幕空间对象的最小数量
  dataSource.clustering.minimumClusterSize = minimumClusterSize;
}

//添加聚合
export function customStyle() {
  let removeListener = null;
  if (Cesium.defined(removeListener)) {
    removeListener();
    removeListener = undefined;
  } else {
    removeListener = dataSource.clustering.clusterEvent.addEventListener(
      function (clusteredEntities, cluster) {
        cluster.label.show = true;
        cluster.label.text = clusteredEntities.length.toString();
        cluster.label.pixelOffset = new Cesium.Cartesian2(-5, 5);
        cluster.label.font = "18px sans-serif";
        cluster.label.style = Cesium.LabelStyle.FILL_AND_OUTLINE;
        cluster.label.fillColor = Cesium.Color.RED;
        cluster.label.outlineColor = Cesium.Color.BLACK;
        cluster.label.outlineWidth = 2;
        cluster.billboard.show = true;
        cluster.billboard.id = cluster.label.id;
        cluster.billboard.image = billboard;
      }
    );
  }
  // 强制聚合使用新的样式
  let pixelRange = dataSource.clustering.pixelRange;
  dataSource.clustering.pixelRange = 0;
  dataSource.clustering.pixelRange = pixelRange;
}

//清除 dataSources
export function clearEntityCluster(viewer){
  viewer.dataSources.remove(customDataSource);
}