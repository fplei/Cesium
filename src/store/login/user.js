const user = {
    state:{
        user:'',
        add:0
        
    },
    mutations:{
        USER_INFO(state,info){
            state.user = info;
        },
        add(state){
            state.add++;
        }
    },
    actions:{
        saveUserInfo({ commit },data){
            commit('USER_INFO',data)
        }
    }
};
export default user