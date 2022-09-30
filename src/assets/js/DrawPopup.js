import * as Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

export function addEntity(e) {
    let pinBuilder = new Cesium.PinBuilder()
        // debugger
    e.map(res => {
        let poin = viewer.entities.add({
            id: res.id,
            name: res.name,
            position: Cesium.Cartesian3.fromDegrees(res.position.x, res.position.y),
            billboard: {
                image: pinBuilder.fromText(res.text, Cesium.Color.ROYALBLUE, 48).toDataURL(),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            },
            monitoItems: {
                data: res
            },
        })
    })
    return e
}


//点击加载弹窗
export function leftDownAction(viewer) {
    
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    console.log(handler)
    handler.setInputAction(function(movement) {
        var picked = viewer.scene.pick(movement.position)
        if (Cesium.defined(picked) && picked.id.id) {
            Popupposition(picked)
            let id = picked.id.id
            let name = picked.id._name
            document.getElementById('title').innerHTML = name
            let monitoItems = picked.id.monitoItems
            document.getElementById('state').innerHTML = monitoItems.data.state
            document.getElementById('type').innerHTML = monitoItems.data.type
        } else {
            return
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}
// leftDownAction()

export function Popupposition(e) {
    let data = e.id.monitoItems.data
        //经纬度转为世界坐标
    let gisPosition = Cesium.Cartesian3.fromDegrees(
        data.position.x,
        data.position.y,
        0
    );
    document.getElementById('stateShow').style.display = 'block' //弹出信息框
        //实时更新位置
    viewer.scene.postRender.addEventListener(() => {
        //转化为屏幕坐标
        var windowPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, gisPosition);
        document.getElementById('stateShow').style.left = (windowPosition.x - 150) + 'px'
        document.getElementById('stateShow').style.top = (windowPosition.y - 220) + 'px'

        //解决滚动不隐藏问题
        const camerPosition = viewer.camera.position;
        let height = viewer.scene.globe.ellipsoid.cartesianToCartographic(camerPosition).height;
        height += viewer.scene.globe.ellipsoid.maximumRadius;
        if ((!(Cesium.Cartesian3.distance(camerPosition, gisPosition) > height)) && viewer.camera.positionCartographic.height < 50000000) {
            document.getElementById('stateShow').style.display = "block"
        } else {
            document.getElementById('stateShow').style.display = "none"
        }

    })
}

export function closeClick() {
    document.getElementById('stateShow').style.display = "none"
}

