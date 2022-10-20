let baseUrl = null;

if (process.env.NODE_ENV == "production") {
    if (process.env.VUE_APP_FLAG == "prod") {
        //正式环境走的地址
        baseUrl = "";
    } else if (process.env.VUE_APP_FLAG == "qa") {
        //qa环境走的地址
        baseUrl = "";
    }
} else {
    // 开发环境
    // baseUrl = "http://localhost:8089";
    // console.log("Error报错啦！")
    
}
export { baseUrl };
