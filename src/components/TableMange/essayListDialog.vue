<template>
  <div class="dialog-container">
    <div class="dialog-content">
      <div class="content">
        <div>body: -- {{dataListId.body}}</div>
        <div>id: -- {{dataListId.id}}</div>
        <div>title: -- {{dataListId.title}}</div>
        <div>userId: -- {{dataListId.userId}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { server } from "@/network/Import/index";

export default {
  name: "essayListDialog",
  components: {},
  props: ["essayId"],
  data() {
    return {
      dataListId:[],
    };
  },
  computed: {
    
  },
  watch: {},
  created() {
    
  },
  mounted() {
    this.reqDataListById();
    console.log(this.essayId)
  },
  unmounted() {},
  methods: {
    reqDataListById() {
      let params = {
        id: this.essayId,
      };
      console.log(params);
      server
        .reqDataListById(params)
        .then((response) => {
          console.log(response)
          this.dataListId = response;
          console.log(this.dataListId);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-container {
  z-index: 300;
  .dialog-content {
    width: 100%;
    
    
    .content {
      .select-box {
        display: flex;
      }
    }
   
  }
}
</style>
