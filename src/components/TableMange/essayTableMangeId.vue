<template>
  <div class="essayTableMange-container">
    <div class="content">
      <ul>
        <li>{{ dataListId.body }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
import { server } from "@/network/Import/index";
import Bus from "@/bus"
export default {
  name:"essayTableMangeId",
  props: ["viewer"],
  data() {
    return {
      dataListId: [],
      assayId:"",
    };
  },
  mounted() {
    Bus.$on("essayId", (val)=> {
      console.log(val.id)
      this.assayId = val.id
      this.reqDataListById();
    })
  },
  methods: {
    reqDataListById() {
      const params = {
        id:this.assayId
      };
      server.reqDataListById(params).then((response) => {
        this.dataListId = response;
        console.log(this.dataListId);
      }).catch((error) => {
        console.log(error);
      });
    },
  },
};
</script>
<style scoped>
</style>