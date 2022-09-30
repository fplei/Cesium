import Qs from "qs";
import axios from "axios";
import { baseUrl } from "./env.js";

import Cookies from "js-cookie";

// axios.defaults.baseURL = baseUrl;
// axios.defaults.timeout = 30000;

// 允许携带cookie
axios.defaults.withCredentials = true;

// 创建axios实例
export const service = axios.create({
  baseURL: baseUrl, // api 的 base_url
  timeout: 3000000, // 请求超时时间
});

//http request 拦截器
service.interceptors.request.use(
  (config) => {
    console.log(config)
  
    // let token = Cookies.get("iwhereMapper-token");
    // if (token) {
    //   config.headers["Authorization"] = "Bearer " + token;
    // }
    // config.headers["Content-Type"] = "application/json;charset=UTF-8";
    // config.headers["Content-Type"] =
    //     "application/x-www-form-urlencoded;multipart/form-data";
    // config.data = Qs.stringify(config.data);

    // if (config.url.indexOf('publish/publish')!== -1) {
    //     config.headers["Content-Type"] = "application/json;charset=UTF-8"
    // } else {
    //     config.headers["Content-Type"] =
    //     "application/x-www-form-urlencoded;multipart/form-data";
    //     config.data = Qs.stringify(config.data);
    // }

    if (config.headers["Content-Type"] === "application/json") {
    } else {
      config.headers["Content-Type"] =
        "application/x-www-form-urlencoded;multipart/form-data;";
      config.data = Qs.stringify(config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 响应拦截器即异常处理
service.interceptors.response.use(
  (response) => {
    // 响应数据处理
    const data = response.data;
    if (response.status !== 200) {
      return Promise.reject(new Error("error"));
    } else {
      if (response.status === 200) {
        if (parseInt(data.code) === 200 || data.server_status === 200) {
          return Promise.resolve(data);
        }
        errorHandle(data.server_status, data.server_error);
        return Promise.resolve(response.data);
      }
    }
  },
  (error) => {
    // 响应错误
    console.log("请求错误=====", error);
    const { response } = error;
    if (response) {
      errorHandle(response.status, response.data.message);
      return Promise.reject(response.data);
    } else {
      return Promise.reject("中断！");
    }
  }
);

// 错误信息处理
const errorHandle = (status, other) => {
  switch (status) {
    case 400:
      console.log("信息验证失败");
      break;
    case 401:
      console.log("未授权认证失败");
      break;
    case 403:
      console.log("无权限访问");
      break;
    case 404:
      console.log("请求资源不存在");
      break;
    case 409:
      //服务器的资源处于一种不可能或不一致的状态, 比如用户名冲突
      console.log("用户名冲突");
      break;
    case 500:
      console.log("系统发生异常，请管理员进行排查！");
      break;
    default:
      console.log(other);
      break;
  }
};

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function fetch(url, params, config = {}) {
  return new Promise((resolve, reject) => {
    service
      .get(
        url,
        {
          params: params,
        },
        config
      )
      .then((response) => {
        if (response != undefined) {
          resolve(response);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
/**
 * 封装POST请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    service.post(url, data, config).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    service.patch(url, data, config).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    service.put(url, data, config).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装delete请求 参数当做java对象来封装接收
 * @param url
 * @param data
 * @returns {Promise}
 */
export function deleteMethod(url, data = {}) {
  return new Promise((resolve, reject) => {
    service.delete(url, { data: data }).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装delete请求 将参数作为url参数
 * @param url
 * @param data
 * @returns {Promise}
 *
 */
export function deleteMethod1(url, data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    service.delete(url, { params: data }, config).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装 upLoad 请求,用于文件上传
 * @param url
 * @param {FormData} formDatas // new FormData().append('key',file)
 * @returns {response}
 */
export function upLoad(url, formDatas = {}, onProgressBack = null) {
  return new Promise((resolve, reject) => {
    service({
      method: "post",
      url: url, // 请求地址
      data: formDatas,
      params: formDatas,
      //这部分非常重要，否则formdata会被转格式
      transformRequest: [
        function () {
          return formDatas;
        },
      ],
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.lengthComputable) {
          let process =
            ((progressEvent.loaded / progressEvent.total) * 100) | 0;
          if (onProgressBack) {
            onProgressBack(process);
          }
        //   console.log(`上传进度：${process}%`);
        }
      },
    }).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装 downLoad 请求
 * 需要js对数据进行处理的时候用该方法
 * 直接下载可以用 window.open();
 * @param url
 * @param data
 * @returns {response}
 */

export function downLoad(url, data = {}) {
  return new Promise((resolve, reject) => {
    service({
      method: "post",
      url: url, // 请求地址
      data: data, // 参数
      responseType: "blob", // 表明返回服务器返回的数据类型
      onDownloadProgress: (progressEvent) => {
        if (progressEvent.lengthComputable) {
          let process =
            ((progressEvent.loaded / progressEvent.total) * 100) | 0;
          console.log(`下载进度：${process}%`);
        }
      },
    }).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
