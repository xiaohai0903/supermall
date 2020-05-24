import axios from 'axios'

export function request(options) {
    return new Promise((resolve, reject) => {
        //创建axios实例
        const instance =axios.create({
            baseURL:'http://152.136.185.210:8000/api/n3',
            timeout:5000
        })
        //拦截器的使用  比如config中一些信息 不符合服务器要求
        //每次发送网络请求，都希望界面中显示一个请求
        instance.interceptors.response.use(res =>{
            return res.data
        })
        instance(options)
            .then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
}
