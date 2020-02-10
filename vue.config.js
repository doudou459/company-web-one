
module.exports = {
devServer: {
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    proxy: {
      '/service': {//对service路径进行代理
          target: 'http://localhost',  // service路径代理的请求
          ws: false,  // proxy websockets 
          changeOrigin: true,  // 是否跨域
          pathRewrite: {
            '^/service': ''//service路径重写为''
        }
      },
    } 
}
}