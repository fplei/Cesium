<template>
  <div class="login">
    <div class="login_form">
      <p>后台管理系统</p>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登录" name="first">
          <el-form
            :model="loginForm"
            :rules="rules"
            ref="loginForm"
            @submit.native.prevent
          >
            <el-form-item label="" prop="userName" class="elItem">
              <el-input
                type="text"
                autocomplete="off"
                v-model="loginForm.userName"
                prefix-icon="el-icon-user-solid"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input
                type="password"
                autocomplete="off"
                v-model="loginForm.password"
                prefix-icon="el-icon-lock"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item class="btns">
              <el-button type="primary" @click="goToLogin" native-type="submit"
                >登录</el-button
              >
              <el-button @click="resetLoginForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <!-- 注册组件 -->
          <register></register>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
 
<script>
//引入注册组件
import register from "@/components/register";
export default {
  data() {
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("账号不能为空"));
      } else if (value === "admin") {
        callback();
      } else {
        callback(new Error("请输入正确的用户名"));
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value === "123456") {
        callback();
      } else {
        callback(new Error("请输入正确的密码"));
      }
    };
    return {
      loginForm: {
        userName: "",
        password: "",
      },
      activeName: "first", //默认显示登录页面
      rules: {
        userName: [
          {
            validator: validateUserName,
            trigger: "blur",
          },
        ],
        password: [
          {
            validator: validatePassword,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //账户密码实现简单登录跳转功能 测试用
    goToLogin() {
      // server.xx(param).then((res) => {
      //   if (res.result_data && res.result_data.token) {
      //     let token = res.result_data.token;
      //     Cookies.set("Nanjing-token", token, { expires: 7 });
      //     setTimeout(() => {
      //       this.$router.push("/home");
      //     }, 500);
      //   }
      // })
      this.$refs["loginForm"].validate((valid) => {
        
        if (valid) {
          if (
            this.loginForm.userName != "admin" ||
            this.loginForm.password != "123456"
          ) {
            this.$message.error("账号密码不正确");
            return false;
          } else {
            this.$message({ message: "登陆成功", type: "success" });
            this.$router.push("/");
            console.log(this.loginForm.userName)
            this.$store.dispatch('saveUserInfo',this.loginForm.userName);//请求回来后，把用户信息存储到VUEX里
          }
        } else {
          this.$message.error("登陆失败");
          return false;
        }
      });
    },
    resetLoginForm() {
      this.$refs["loginForm"].resetFields();
    },
    handleClick() {},
  },
  components: {
    register,
  },
};
</script>
 
<style scoped>
.login {
  width: 100%;
  height: 100vh;
  background: url("~@/assets/img/login/loginBg.jpg");
  background-size: 100% 100%;
  background-position: center center;
  overflow: auto;
  position: relative;
}
.login p {
  font-size: 24px;
  text-align: center;
  font-weight: 600;
}
.login_form {
  width: 400px;
  height: 360px;
  position: absolute;
  left: 78%;
  top: 50%;
  margin-left: -200px;
  margin-top: -150px;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px #ddd;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>