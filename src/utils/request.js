import axios from "axios";
import store from "../store";
import router from "../router";

const baseURL = "http://pcapi-xiaotuxian-front-devtest.itheima.net/"
// 创建一个新的axios实例
const instance = axios.create({
    // axios的配置
    baseURL,
    timeout: 5000
})


// 请求拦截器（在请求之前进行一些配置）,如果有token进行头部携带
instance.interceptors.request.use(config => {
    // 1、获取用户信息
    const {
        profile
    } = store.state.user
    // console.log("token",profile.token);
    // 2、判断是否有token
    if (profile.token) {
        // 3、设置Token
        config.headers.Authorization = `Bearer ${profile.token}`
    }

    return config
}, err => Promise.reject(err))


// 响应拦截器：1. 剥离无效数据  2. 处理token失效
instance.interceptors.response.use(res => res.data, err => {
    // 401 状态码 进入该函数
    if (err.response && err.response.status === 401) {
        // 1、清空无效用户信息
        store.commit('user/setUser', {})
        // 2、跳转到登录页 跳转传参给登录页码
        const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
        router.push(`/login?redirectUrl=${fullPath}`)
    }
    return Promise.reject(err)
})


// 导出一个函数，调用当前的axsio实例发请求，返回值promise

// 请求工具函数
export default (url, method, submitData) => {
    return instance({
        url,
        method,
        // 1. 如果是get请求  需要使用params来传递submitData   ?a=10&c=10
        // 2. 如果不是get请求  需要使用data来传递submitData   请求体传参
        // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
        // toLowerCase()方法将string转换成小写
        [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
    })
}