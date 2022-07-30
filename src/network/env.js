export var baseUrl = ""

if (process.env.NODE_ENV == 'production') {
    if (process.env.VUE_APP_FLAG == 'prod') {
        //正式环境走的地址
        baseUrl = "";
    } else if (process.env.VUE_APP_FLAG == 'qa') {
        //qa环境走的地址
        baseUrl = "";
    }
} else {
    // 开发环境
    baseUrl = "http://10.6.20.39:8080/";
    console.log(baseUrl)
}