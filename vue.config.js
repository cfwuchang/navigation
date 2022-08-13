module.exports = {
    configureWebpack: {
      // 配置本地服务器
      devServer: {
        compress: true,  // 启用压缩，代码占用的空间少，在互联网传输快
        port: 8888,  // 设置打开的端口
        host: 'localhost',  // host
        hot: true,  // 热启动
        open: true,  // 浏览器自动打开
        
      },
    }
  }