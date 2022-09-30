<template>
    <!-- 右侧公用按钮 -->
    <div>
        <ul class="rightBtnUl">
            <transition v-for="(list, key) in buttonData" :key="key" :name="'listAnimate' + key">
                <li v-show="$parent.coreTog" :title="list.title"
                    @click="buttonFn($event, list.title, list.introTitle, list.dw)">
                    <img :src="list.imgUrl" alt="" />
                </li>
            </transition>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "rightBtn",
        props: ["viewer"],
        components: {},
        mounted: function () {
            this.handler = null;
        },
        destroyed: function () {
            this.clear();
        },
        data() {
            return {
                buttonData: [
                    {
                        title: "返回",
                        imgUrl: require("@/assets/img/YQLL/rightBtnImg1.png")
                    },
                    {
                        title: "用电",
                        introTitle: "用电分层统计",
                        dw: "（kwh）",
                        imgUrl: require("@/assets/img/YQLL/rightBtnImg2.png")
                    },
                    {
                        title: "用水",
                        introTitle: "用水分层统计",
                        dw: "（吨）",
                        imgUrl: require("@/assets/img/YQLL/rightBtnImg3.png")
                    },
                    
                ],
                divPoint: null,
                handler: null
            };
        },
        
        methods: {
            buttonFn(ev, title, introTitle, dw) {
                var that = this;
                $(ev.currentTarget)
                    .addClass("active")
                    .siblings()
                    .removeClass("active");
                this.$parent.setOption.analysisTitle = introTitle;
                this.$parent.setOption.analysisDw = dw;
                if (!that.handler) {
                    that.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
                }
                switch (title) {
                    case "返回":
                        this.$parent.coreTog = false;
                        break;
                    case "用电":
                        console.log(this.viewer,"传过来的 viewer ")
                        that.handler.setInputAction(function (movement) {
                            // debugger
                            console.log(movement.position,"用电")
                            // var position = this.viewer.scene.pickPosition(movement.position);
                            // console.log(position)
                            
                        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
                        break;
                    case "用水":
                        that.handler.setInputAction(function (movement) {
                            // var position = this.viewer.scene.pickPosition(movement.position);
                             console.log(movement,"用水")
                        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
                        break;
                    default:
                        //查详细信息
                        this.$parent.analysisFn(title);
                        this.clear();
                        break;
                }
            },
            clear: function () {
                if (this.divPoint) {
                    this.divPoint.destroy();
                    this.divPoint = null;
                    this.handler.destroy();
                    this.handler = null;
                }
            }
        }
    };
</script>

<style scoped>
    .rightBtnUl {
        position: fixed;
        z-index: 10;
        /* top: 50%;
        right: 20px; */
        transform: translateY(-50%);
        top: 600px;
        left: 200px;
    }

    .rightBtnUl>li {
        margin-bottom: 20px;
        width: 56px;
        height: 56px;
        /* background: url('~@/assets/img/YQLL/rightBtnBg.png') center no-repeat; */
        background: rgba(24, 35, 39, 0.5);
        border: 1px solid rgba(56, 215, 227,0.5);
        border-radius: 50%;
        background-size: 100% 100%;
        position: relative;
        cursor: pointer;
    }

    .rightBtnUl>li.active {
        /* background: url("~@/assets/img/YQLL/rightBtnBgActive.png") center no-repeat; */
        background: #00ffff;
        border: 1px solid rgba(56, 215, 227,0.5);
        border-radius: 50%;
        background-size: 100% 100%;
    }

    .rightBtnUl>li>img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .rightBtnUl>li:last-child {
        margin: 0;
    }

    /* transition效果 */
    .listAnimate0-enter-active,
    .listAnimate0-leave-active,
    .listAnimate1-enter-active,
    .listAnimate1-leave-active,
    .listAnimate2-enter-active,
    .listAnimate2-leave-active,
    .listAnimate3-enter-active,
    .listAnimate3-leave-active,
    .listAnimate4-enter-active,
    .listAnimate4-leave-active {
        transform: translateX(0) rotate(0);
        opacity: 1;
    }

    .listAnimate0-enter,
    .listAnimate0-leave-to,
    .listAnimate1-enter,
    .listAnimate1-leave-to,
    .listAnimate2-enter,
    .listAnimate2-leave-to,
    .listAnimate3-enter,
    .listAnimate3-leave-to,
    .listAnimate4-enter,
    .listAnimate4-leave-to {
        transform: translateX(80px) rotate(720deg);
        opacity: 0;
    }

    .listAnimate0-enter-active,
    .listAnimate0-leave-active {
        transition: all 0.3s;
    }

    .listAnimate1-enter-active,
    .listAnimate1-leave-active {
        transition: all 0.6s;
    }

    .listAnimate2-enter-active,
    .listAnimate2-leave-active {
        transition: all 0.9s;
    }

    .listAnimate3-enter-active,
    .listAnimate3-leave-active {
        transition: all 1.2s;
    }

    .listAnimate4-enter-active,
    .listAnimate4-leave-active {
        transition: all 1.5s;
    }
</style>