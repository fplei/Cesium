/*
 * @Author: xx
 * @Date: 2022-09-9 14:05:52
 * @LastEditTime: 2022-09-9 14:58:01
 * 可以输入预定的版权声明、个性签名、空行等
 * 免费的在线API接口地址：https://segmentfault.com/a/1190000042085705?utm_source=sf-similar-article
 */
import {
  post,
  fetch,
  put,
  deleteMethod,
  downLoad,
  upLoad,
} from "network/http.js";

import { baseUrl } from "../env.js";
// import { server } from "../dataImport/index.js";

let dataManage = ""; // xxx
let ky = "http://jsonplaceholder.typicode.com";
if (baseUrl == "http://localhost:8089") {
  ky = "/api";
  dataManage = "/dataManage";
}
export const server = {
  /**
   * 列表
   * @param {Object} params
   * params 包含以下参数
   * @param {Number}   
   * @param {Number}  
   * @returns
   * 获取100篇文章数据（GET）http://jsonplaceholder.typicode.com/posts
   * 返回100条数据，每条内容都有帖子 ID、发贴人 ID、标题、以及简介。
   */
  reqDataList() {
    return fetch(ky + "/posts");
  },

  /**
   * 根据文章ID获取文章数据
   * GET
   * http://jsonplaceholder.typicode.com/posts/2
   * **
   */
  reqDataListById(params){
    const id = params.id;
    return fetch(ky + `/posts/${id}`);
  },
  
  /***添加文章
   * http://jsonplaceholder.typicode.com/posts
   * ***/
  reqUpdateEssay(params){
    return post(ky + "/posts",params)
  },

};
