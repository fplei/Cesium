<template>
  <div class="container">
    <!-- 设置页面 -->
     <!-- 练习 -->
    <!-- 左上按钮 -->
    <transition name="fadeLeftButton">
      <div class="leftButton" v-show="buttonTog" @click="leftButtonFn">
        <img src="@/assets/img/YQLL/leftTopIcon.png" alt="" />
      </div>
    </transition>
    <!-- 左上select -->
    <transition name="fadeSelectBox">
      <div class="selectBox" v-show="selectBoxTog">
        <p @click="selectTitleFn">喜欢的明星排行榜</p>
        <ul>
          <transition
            v-for="(list, key) in listData"
            :key="key"
            :name="'fadeSelectLi' + key"
          >
            <li v-show="selectBoxUlTog" @click="listFn(list)">{{ list }}</li>
          </transition>
        </ul>
      </div>
    </transition>
    <!-- 中心信息简介-->
    <transition name="fadeTitle">
      <buildIntro v-show="coreTog" :titleData="activeCore" :viewer="mapViewer" />
    </transition>
    <!-- 公用右侧按钮 -->
    <rightBtn :viewer="mapViewer"/>
    <!-- 右侧详细信息 -->
    <rightTypeIntro :viewer="mapViewer"/>
    
    <!-- 用来练习的组件 -->
    <div>
    </div>

  </div>
</template>

<script>
import buildIntro from "./animationContents/buildIntro.vue";
import rightBtn from "./animationContents/rightBtn";
import rightTypeIntro from "./animationContents/rightTypeIntro";

export default {
  name: "animationControl",
  props: ["viewer"],
  components: {
    buildIntro,
    rightBtn,
    rightTypeIntro,
  },
  mounted() {
    this.buttonTog = true;
    this.mapViewer = this.viewer;
    console.log(this.mapViewer);
    console.log(this.viewer)
  },
  destroy() {},
  data() {
    return {
      listData: [
        "刘亦菲",
        "周杰伦",
        "吴岱林",
        "毛不易",
        "鹿晗",
        "肖战",
        "王一博",
      ],
      buttonTog: false, //控制select按钮
      selectBoxTog: false, //select title
      selectBoxUlTog: false, //select option
      coreTog: false, //简介与右侧按钮
      activeCore: "123", //选中的人

      buildContentTog: false, //人介绍内容
      rightTypeTog: false, //类型详细信息
      setOption: {
        activeBuild: "1", //选中的楼
        buildType: "家住楼层", //选中的楼类型
        analysisTitle: "", //分析的标题
        analysisDw: "123", //分析的单位
        analysisType: "2", //分析的类型
      },
      mapViewer: null,
    };
  },

  watch: {
    selectBoxTog(val) {
      if (!val) {
          this.selectBoxUlTog = false;
      }
    },
    // 人内容
    coreTog(val) {
      if (!val) {
        this.buildContentTog = false;
        this.rightTypeTog = false;
      }
    },
    // 大楼内容显示隐藏监听
    buildContentTog(val) {
      // title变化
      if (val) {
        $(".buildTitle>p").addClass("active");
      } else {
        $(".buildTitle>p").removeClass("active");
      }
    },
  },
  methods: {
    listFn(type) {
      // 中心传title值
      this.activeCore = type;
      // 显示右侧按钮
      this.coreTog = true;
      $(".rightBtnUl li").removeClass("active");
      // 隐藏select
      this.selectBoxTog = false;
      // 隐藏中心介绍与类型信息
      this.buildContentTog = false;
      this.rightTypeTog = false;
      switch (type) {
        case "刘亦菲":
          break;

        default:
          break;
      }
    },
    // 收起全部select
    leftButtonFn() {
      this.selectBoxTog = !this.selectBoxTog;
    },
    // 收起select
    selectTitleFn() {
      this.selectBoxUlTog = !this.selectBoxUlTog;
    },
  },
};
</script>

<style scoped>
.container {
  background-color: rgba(26, 53, 58, 0.827451);
  position: absolute;
  /* left: 50%;
  top: 42%; */
  right: 260px;
  top: -75px;
  transform: translate(-50%, -50%);
  /* width: 65%;
  height: 500px; */
  padding: 0px 15px;
  box-sizing: border-box;
  z-index: 10;
}

.leftButton {
  width: 56px;
  height: 52px;
  /* background: url("~@/assets/img/YQLL/leftTopBg.png") center no-repeat; */
  background: rgba(17, 22, 24, 0.5);
  border: 1px solid rgba(56, 215, 227,0.5);
  border-radius: 5px;
  color: white;
  background-size: 100% 100%;
  position: fixed;
  top: 83px;
  left: 26px;
  z-index: 10;
  cursor: pointer;
}

.leftButton img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-44%, -50%);
}

.selectBox {
  position: fixed;
  top: 81px;
  left: 83px;
  z-index: 20;
  cursor: pointer;
}

.selectBox > p {
  width: 205px;
  height: 53px;
  line-height: 53px;
  text-align: center;
  /* background: url("~@/assets/img/YQLL/selectTitleBg.png") center no-repeat; */
  background: rgba(17, 22, 24, 0.5);
  border: 1px solid rgba(56, 215, 227,0.5);
  background-size: 100% 100%;
  font-size: 18px;
  color: #fff;
}

.selectBox li {
  width: 197px;
  height: 37px;
  /* background: url("~@/assets/img/YQLL/selectBg.png") center no-repeat; */
  background: rgba(24, 35, 39, 0.5);
  border: 1px solid rgba(56, 215, 227,0.5);
  margin: 2px 0;
  background-size: 100% 100%;
  line-height: 37px;
  padding-left: 10px;
  font-size: 18px;
  letter-spacing: 2px;
  color: #fff;
}

.selectBox li:hover {
  /* color: #07c8ce; */
  color: white;
  text-shadow: 0 1px 0 #fff;
}

/* 左上按钮 */
.fadeLeftButton-enter-active,
.fadeLeftButton-leave-active {
  transition: all 1s;
  transform: translateX(0) rotate(0);
}

.fadeLeftButton-enter,
.fadeLeftButton-leave-to {
  transform: translateX(-60px) rotate(-720deg);
}
/* select框 */
.fadeSelectBox-enter-active,
.fadeSelectBox-leave-active {
  transition: all 1s;
  transform: translateY(0);
  opacity: 1;
}

.fadeSelectBox-enter,
.fadeSelectBox-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
/* option中心 */
.fadeSelectLi0-enter-active,
.fadeSelectLi0-leave-active,
.fadeSelectLi1-enter-active,
.fadeSelectLi1-leave-active,
.fadeSelectLi2-enter-active,
.fadeSelectLi2-leave-active,
.fadeSelectLi3-enter-active,
.fadeSelectLi3-leave-active,
.fadeSelectLi4-enter-active,
.fadeSelectLi4-leave-active,
.fadeSelectLi5-enter-active,
.fadeSelectLi5-leave-active,
.fadeSelectLi6-enter-active,
.fadeSelectLi6-leave-active {
  transform: translateY(0);
  opacity: 1;
}

.fadeSelectLi0-enter,
.fadeSelectLi0-leave-to,
.fadeSelectLi1-enter,
.fadeSelectLi1-leave-to,
.fadeSelectLi2-enter,
.fadeSelectLi2-leave-to,
.fadeSelectLi3-enter,
.fadeSelectLi3-leave-to,
.fadeSelectLi4-enter,
.fadeSelectLi4-leave-to,
.fadeSelectLi5-enter,
.fadeSelectLi5-leave-to,
.fadeSelectLi6-enter,
.fadeSelectLi6-leave-to {
  transform: translateY(-15px);
  opacity: 0;
}

.fadeSelectLi0-enter-active,
.fadeSelectLi0-leave-active {
  transition: all 0.4s;
}

.fadeSelectLi1-enter-active,
.fadeSelectLi1-leave-active {
  transition: all 0.8s;
}

.fadeSelectLi2-enter-active,
.fadeSelectLi2-leave-active {
  transition: all 1.2s;
}

.fadeSelectLi3-enter-active,
.fadeSelectLi3-leave-active {
  transition: all 1.6s;
}

.fadeSelectLi4-enter-active,
.fadeSelectLi4-leave-active {
  transition: all 2s;
}

.fadeSelectLi5-enter-active,
.fadeSelectLi5-leave-active {
  transition: all 2.4s;
}

.fadeSelectLi6-enter-active,
.fadeSelectLi6-leave-active {
  transition: all 2.8s;
}
</style>