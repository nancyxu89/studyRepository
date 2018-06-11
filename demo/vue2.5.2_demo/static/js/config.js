;(function () {
  window.handleDelay = 500
  window.flag = 'jusfoun'
  // window.flag = 'gbde'
  window.appShortName = '招商通'
  window.publicRecord = '京公网安备11000002000001号 互联网新闻信息服务许可 ©2016'

  switch (window.flag) {
    case 'jusfoun':
      window.appName = '九次方大数据|招商通'
      window.companyName = '九次方大数据'
      window.logo = './static/img/logo.png'
      window.about = './static/img/abouts-left.jpg'
      break
    case 'gbde':
      window.appName = '贵阳大数据交易所|招商通'
      window.companyName = '贵阳大数据交易所'
      window.logo = './static/img/new-logo.png'
      window.about = './static/img/new-abouts-left.jpg'
      break
    default:
      break
  }

  // window.creditPlatformUrl = 'http://192.168.200.200:8096/login'
  // window.api_host = 'http://192.168.200.200:8095/zhaoshangtong/'
  // window.new_api_host = 'http://192.168.200.200:8097/datasource_api'

  //内网地址
  window.api_host = 'http://192.168.200.12:8888/zst_api_gateway/zst_bussiness_api/'
  window.new_api_host = 'http://192.168.200.12:8888/zst_api_gateway/datasource_api'

  // window.api_host = 'http://192.168.200.12:8080/zst_bussiness_api/'
  // window.new_api_host = 'http://192.168.200.13:8080/datasource_api'

  //外网地址
  // window.api_host = 'http://202.106.10.250:5061/zst_api_gateway/zst_bussiness_api'
  // window.new_api_host = 'http://202.106.10.250:5061/zst_api_gateway/datasource_api'
})()
