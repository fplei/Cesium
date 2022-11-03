export default {
  //平方
  powerCounter(state) {
    return state.counter * state.counter;
  },
  //获取年龄大于20岁
  more20stu(state) {
    return state.students.filter((s) => s.age > 20);
  },
  //获取学生的个数
  more20stuLength(state, getters) {
    return getters.more20stu.length;
  },
  //获取age，自己传入的年龄
  moreAgeStu(state) {
    return function (age) {
      return state.students.filter((s) => s.age > age);
    };
    //简洁，阅读性差
    // return age => {
    //   return state.students.filter(s => s.age > age)
    // }
  },
};
