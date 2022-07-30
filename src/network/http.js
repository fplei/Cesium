import Qs from 'qs'
import axios from 'axios'
import { baseUrl} from "./env.js";
import { Message, Loading} from 'element-ui';

//写域名
axios.defaults.baseURL = baseUrl;

axios.defaults.timeout = 600000;
//http request拦截器
axios.interceptors.request.use(
    config => {
        Loading.service({
            background: "rgba(0, 0, 0, 0.4)",
            fullscreen: true,
            lock: true,
        })
        config.data = Qs.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded;multipart/form-data'
        };
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// 响应拦截器即异常处理  
axios.interceptors.response.use(response => {
    Loading.service({
        background: "rgba(0, 0, 0, 0.4)",
        fullscreen: true,
        lock: true,
    }).close();
    let status = response.data.server_status;
    if (status && status != 200) {
        Message({
            message: response.data.server_error,
            type: 'error',
            duration: 3 * 1000
        })
    }
    return response
}, err => {

    // 利用loading的单例属性关闭loading
    Loading.service({
        background: "rgba(0, 0, 0, 0.4)",
        fullscreen: true,
        lock: true,
    }).close();

    console.log("请求错误=====", err);

    if (!err) {
        Message({
            message: "连接错误",
            type: 'error',
            duration: 3 * 1000
        })
        return
    }

    if (err.hasOwnProperty('response')) {
        Message({
            message: `错误码${err.response.status}， ${err.response.data.message}`,
            type: 'error',
            duration: 3 * 1000
        })
    } else {
        Message({
            message: err,
            type: 'error',
            duration: 3 * 1000
        })
    }

    return Promise.resolve(err.response)
})


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(response => {
                if (response != undefined && response.data != undefined) {
                    resolve(response.data);
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function get(url, params = {}, ) {
    return new Promise((resolve, reject) => {
        axios(url, {
                params
            })
            .then(response => {
                console.log("response=", response)
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function deleteMethod(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}