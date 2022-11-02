<template>
    <div>
        <!-- Vuex -->
        <h3>{{$store.state.counter}}</h3>
        <h3>{{$store.getters.powerCounter}}</h3>
        <p>{{$store.getters.more20stu}}</p>
        <h3>{{$store.state.info}}</h3>
    </div>
</template>

<script>
export default {
    name:'HelloVuex',
    // props:{
    //     counter:Number
    // },
    data(){
        return{

        }
    },
    mounted(){

    },
    methods:{

    }
}
</script>

<style scoped>

</style>