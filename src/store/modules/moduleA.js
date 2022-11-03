export default {
  state: {
    name: "zhangsan",
  },
  mutations: {
    updateName(state, payload) {
      state.name = payload;
    },
  },
  getters: {
    fullName(state) {
      return state.name + "1111";
    },
    //使用fullName后面拼接，使用fullName。
    fullName2(state, getters) {
      return getters.fullName + "2222";
    },
    //引入大的里面的 counter的使用方法
    fullName3(state, getters, rootState) {
      return getters.fullName2 + rootState.counter;
    },
  },
  actions: {
    //actions里的context是上下文，这个上下文就不再是store对象了
    aUpdateName(context) {
      console.log(context);
      setTimeout(() => {
        context.commit("updateName", "wangwu");
      }, 1000);
    },
  },
};
