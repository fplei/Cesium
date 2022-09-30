<template>
    <div class="update-container">
        <div>
            2222
        </div>
    </div>
</template>

<script>
import { server } from "@/network/Import/index";
export default {
    name:"updateEssayTableMange",
    data(){
        return {

        }
    },
    mounted(){
        this.reqUpdateEssay()
    },
    methods:{
        reqUpdateEssay(){
            server.reqUpdateEssay().then((response)=>{
                console.log(response,"6666")
            })
        }
    }   
}
</script>
<style scoped>

</style>