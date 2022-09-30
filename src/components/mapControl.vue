<template>
    <div class="container">
        <div class="changeBox">
            <div @click="switch2D3D('2d')">
                <img src="@/assets/img/23D/2dchange.png" alt="">
            </div>
            <div @click="switch2D3D('3d')">
                <img src="@/assets/img/23D/3dchange.png" alt="">
            </div>
        </div>
        <div class="dataControl">
            <!--  -->

        </div>
    </div>
</template>

<script>
    export default {
        name:"mapControl",
        props: ["viewer"],
        components: {
        },
        data(){
            return {

            }
        },
        
        mounted(){

        },
        methods:{
            switch2D3D(type){
                if(type == "2d"){
                    console.log("2d")
                    this.viewer.scene.morphTo2D(1);//二维
                }else{
                    console.log("3d")
                    this.viewer.scene.morphTo3D(1);//三维
                }
            }
        }
    }
</script>

<style scoped>
.dataControl{
  /* background-color: rgba(26, 53, 58, 0.827451); */
  position: absolute;
  left: 50%;
  top: 10%;
  transform: translate(-50%, -50%);
  width: 65%;
  padding: 0px 15px;
  box-sizing: border-box;
}
.changeBox{
    position: absolute;
    bottom: 30px;
    left: 15px;
}
.changeBox:hover div:first-child{
    transition: all 1s;
    transform: translate(110px,10px);
}
.changeBox div {
    width: 119px;
    background: url("~@/assets/img/23D/2d3dBg.png");
}
.changeBox div:first-child{
    position: absolute;
    left: 10px;
    bottom: 10px;
    z-index: 1;
    transition: all 1s ease;
}
.changeBox div:first-child::after {
    content: "2D";
    color: #fff;
    font-weight: 900;
    position: absolute;
    right: 10px;
    font-size: 20px;
}

.changeBox div:last-child::before {
    content: "3D";
    color: #fff;
    font-weight: 900;
    position: absolute;
    right: 10px;
    font-size: 20px;
}
.changeBox img {
    padding: 2px;
    cursor: pointer;
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
</style>