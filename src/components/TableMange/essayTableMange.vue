<template>
  <div class="essayTableMange-container">
    <div class="content">
      <button @click="addEssay">添加文章</button>
      <ul v-for="(item, index) in dataList" :key="index">
        <li @click="onDialogVisible(item.id)">{{ item.title }}</li>
      </ul>
    </div>
    <!-- 弹出窗 -->
    <div class="popup">
      <el-dialog
        :visible.sync="dialogVisible"
        width="490px"
        title="根据文章ID获取文章数据"
        :before-close="handleClose"
        :destroy-on-close="true"
      >
        <essay-list-dialog ref="essayListDialog" :essayId="essayId" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
import { server } from "@/network/Import/index";
import essayListDialog from "./essayListDialog.vue";
import Bus from "@/bus";
export default {
  name: "essayTableMange",
  components: {
    essayListDialog,
  },
  props: ["viewer"],
  data() {
    return {
      dataList: [],
      dataListId: [],
      essayId: null,
      dialogVisible: false,
    };
  },
  mounted() {
    this.reqDataList();
  },
  methods: {
    //关闭
    handleClose(done) {
      done();
    },
    reqDataList() {
      server
        .reqDataList()
        .then((response) => {
          this.$message.success("成功！");
          this.dataList = response;
          this.dataList.forEach((item) => {
            this.essayId = item.id;
            // console.log(this.essayId);
            Bus.$emit("essayId", this.essayId);
          });
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("失败！");
        });
    },
    onDialogVisible(val) {
      this.essayId = val;
      this.dialogVisible = true;
    },
    //添加文章
    addEssay(){
      this.reqUpdateEssay()
    },
    reqUpdateEssay() {
      server
        .reqUpdateEssay()
        .then((response) => {
          this.$message.success("成功！");
          this.dataList = response;
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("失败！");
        });
    },
  },
};
</script>
<style scoped>
.essayTableMange-container ul li {
}
.popup .el-dialog__body{
  padding: 0 20px 20px 20px !important;
}
</style>