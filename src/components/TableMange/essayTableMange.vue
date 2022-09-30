<template>
  <div class="essayTableMange-container">
    <div class="content">
      <ul v-for="(item, index) in dataList" :key="index">
        <li @click="dialogVisible = true">{{ item.title }}</li>
      </ul>
    </div>
    <!-- 弹出窗 -->
    <div class="popup">
      <el-dialog
        :visible.sync="dialogVisible"
        width="490px"
        title="list练习使用"
        :before-close="handleClose"
        :destroy-on-close="true"
      >
        <essay-list-dialog  ref="essayListDialog"/>
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
      essayId: [],
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
          console.log(response);
          this.dataList = response;
          this.dataList.forEach((item) => {
            this.essayId = item;
            console.log(this.essayId);
            Bus.$emit("essayId", this.essayId);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // closeDiolog(val, isRefresh) {
    //   this.dialogVisible = val;
    //   if (isRefresh) {
    //     // this.reqStorageGlance();
    //     // this.$refs.tableStoragemange.reqStorageSpaceList();
    //   }
    // },
    updateData() {
      this.dialogVisible = false;
    },
  },
};
</script>
<style scoped>
.essayTableMange-container ul li {
}
</style>