<template>
  <!-- 刘亦菲 -->
  <div class="buildIntro">
    <div class="title buildTitle" @click="pickBuild">
      <p>{{ titleData }}</p>
      <span v-show="$parent.buildContentTog">{{
        $parent.setOption.buildType
      }}</span>
    </div>
    <div class="content" v-show="$parent.buildContentTog">abc22222</div>
  </div>
</template>

<script>
export default {
  name: "buildIntro",
  components: {},
  mounted: function () {},
  destroyed: function () {},
  data() {
    return {};
  },
  props: {
    titleData: {
      type: String,
    },
  },
  methods: {
    pickBuild() {
      this.$parent.buildContentTog = !this.$parent.buildContentTog;
    },
  },
};
</script>

<style scoped>
/* 样式 */
.buildIntro > .title > p {
  font-size: 25px;
  text-shadow: 1px 0px 0 #fff;
  text-align: center;
  letter-spacing: 3px;
  line-height: 51px;
  transition: 1s;
  margin: 0;
  padding: 0;
}
.buildIntro > .title > span {
  margin: 0 0 0 40px;
  line-height: 56px;
  font-size: 16px;
}
.buildIntro > .title > p.active {
  float: left;
  padding-left: 25px;
  margin-top: -13px;
}
.buildIntro > .content {
  width: 230px;
  height: 300px;
  /* background: url("~@/assets/img/YQLL/introContentBg.png") center no-repeat; */
  background-color: rgba(26, 53, 58, 0.5);
  border: 1px solid rgba(56, 215, 227, 0.5);
  color: white;
  background-size: 100% 100%;
  /* margin: -2px 0 0 13px; */
}

/* 标题 */
.fadeTitle-enter-active,
.fadeTitle-leave-active {
  transition: all 0.7s;
  transform: translateY(0);
  opacity: 1;
}

.fadeTitle-enter,
.fadeTitle-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>
