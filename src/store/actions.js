export default {
  //异步操作专用  context：上下文 --> store对象
  // aUpdateInfo(context, payload){
  //   setTimeout(()=>{
  //     context.commit('updateInfo')
  //     console.log(payload.message)
  //     payload.success()
  //     // console.log(payload)
  //   },1000)
  // },
  //做了个中转，dispatch可以返回Promise，使用Promise
  aUpdateInfo(context, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        context.commit("updateInfo");
        console.log(payload);

        resolve("1111");
      }, 1000);
    });
  },
};
