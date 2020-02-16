import { Message } from 'element-ui'

// 网页启动时执行该文件，data参数是插件里面本来就有的
export default function(data) {
  let { $axios, redirect} = data
  console.dir(data)
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
      let { statusCode, message } = error.response.data

      // 如果请求成功(后台给了错误提示: 如验证码错误...),状态码报错,则处理返回报文
      if(statusCode === 400) {
        Message.error(message)
        return Promise.resolve(error.response)

      }else if(statusCode === 401 || statusCode === 403) {
        // 当前的token请求出问题，
        // 401一般是token错误或者过期，403是因为接口没有传token
        Message.error('你还没有登录！')
        // 重定向到登录页，携带当前页的url
        redirect(200, '/user/login', {
          returnUrl: data.route.fullPath
        })
        return Promise.resolve(error.response)

      }else {
        // 对响应错误做点什么
        return Promise.reject(error)
      }
       
    }
  ) 

  // $axios.onRequest(config => {
  //   console.log("Making request to " + config.url) 
  // }) 

  // $axios.onError(error => {
  //   const code = parseInt(error.response && error.response.status) 
  //   if (code === 400 && error.response.data.message) {
  //     console.log(error) 
  //   } else if (code === 400) {
  //     redirect("/400") 
  //   }else {
  //     console.dir(error)
  //   }
  // }) 
}
