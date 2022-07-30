import {
    post,
    get
} from './http.js'

import {
    baseUrl
} from "./env.js";
let api = baseUrl

let ky = ''
import axios from "axios";
if (api == "http://localhost:8080") {
    ky = '/api'
}
console.log(ky,"222")
console.log(api,"1111")
     
export const server = {
    // 画网格
    drawGridOnMap(params) {
        return post(ky + "/", params);
    },
    // 画图
    haha(params){
        return post(ky + "/", params);
    }

}