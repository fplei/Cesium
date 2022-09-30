<template>
<!-- 刘亦菲 -->
<transition name="fadeTitle">
    <div class="buildIntro rightTypeIntro" v-show="$parent.rightTypeTog">
        <div class="title">
            <p>{{$parent.setOption.analysisTitle}}</p>
            <span>{{$parent.setOption.analysisDw}}</span>
        </div>
        <div class="content">
            111111
        </div>
    </div>
</transition>
</template>

<script>
export default {
    name: "rightTypeIntro",
    components: {

    },
    mounted: function () {

    },
    destroyed: function () {

    },
    data() {
        return {

        };
    },
    props: {
        titleData: {
            type: String
        }
    },
    methods: {

    }
};
</script>

<style scoped>
/* 样式 */
.rightTypeIntro {
    top: 530px;
}
.buildIntro>.title>p{
    font-size: 20px;
    text-align: left;
    font-weight: 400;
    padding-left: 25px;
    line-height: 51px;
    float: left;
}
.buildIntro>.title>span{
    margin-top: 18px;
}
.buildIntro>.content {
    height: 340px;
    background: url("~@/assets/img/YQLL/introContentBg.png") center no-repeat;
    background-size: 100% 100%;
    margin: -2px 0 0 13px;
}

/* 标题 */
.fadeTitle-enter-active,
.fadeTitle-leave-active {
    transition: all .7s;
    transform: translateY(0);
    opacity: 1;
}

.fadeTitle-enter,
.fadeTitle-leave-to {
    transform: translateY(30px);
    opacity: 0;
}
</style>
