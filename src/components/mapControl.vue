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
                }else{
                    console.log("3d")
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
  z-index: 10;
}
.changeBox{
    position: absolute;
    bottom: 30px;
    left: 15px;
    z-index: 10;
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
}

</style>