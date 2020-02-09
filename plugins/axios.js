import { Message } from 'element-ui'


export default function({ $axios, redirect }) {
  // 添加请求拦截器
  $axios.interceptors.request.use(
    function(config) {
      // console.log(config)
      // 在发送请求之前做些什么
      return config 
    },
    function(error) {
      // 对请求错误做些什么
      return Promise.reject(error) 
    }
  ) 

  // 添加响应拦截器
  $axios.interceptors.response.use(
    function(response) {
      // console.log(response)
      // 对响应数据做点什么
      return response 
    },
    function(error) {
      // console.dir(error)
      // 如果请求成功(后台给了错误提示: 如验证码错误...),状态码报错,则处理返回报文
      if(error.response) {
        // 统一错误提示
        Message.error(error.response.data.message)
        return Promise.resolve(error.response)
      }else {
        // 对响应错误做点什么
        return Promise.reject(error)
      }
       
    }
  ) 

//   $axios.onRequest(config => {
//     console.log("Making request to " + config.url) 
//   }) 

//   $axios.onError(error => {
//     const code = parseInt(error.response && error.response.status) 
//     if (code === 400 && error.response.data.message) {
//       console.log(error) 
//     } else if (code === 400) {
//       redirect("/400") 
//     }
//   }) 
}
