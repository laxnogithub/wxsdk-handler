/*
 * @Description: 
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-09-17 16:11:23
 * @LastEditors: lax
 * @LastEditTime: 2020-09-17 16:17:04
 */
module.exports = { 
  
  /* 默认申请API权限项 */
  API_LIST = [
    "updateAppMessageShareData",
    "updateTimelineShareData",
    "onMenuShareTimeline",
    "onMenuShareAppMessage",
    "onMenuShareQQ",
    "onMenuShareQZone",
    "onMenuShareWeibo"
  ],

  /* 默认执行完成回调函数 */
  OVER = function() {
    console.log("wx plugin is ready!");
  },

  /* 默认DEBUG模式 */
  DEBUG_STATE = false,

  /* 默认生产环境 */
  PRO_STATE = false,

  /* 默认标题 */
  TITLE = document.title,

  /* 默认描述 */
  DESC = DEFAULT_TITLE,

  /* 默认链接地址 */
  LINK = location.href,

  /* 默认图片 */
  IMG = "",

  /* 默认后端服务器地址 */
  SERVER_URL = "https://wx.server.1045fm.cn",

  /* 默认后端测试服务器地址 */
  TEST_SERVER_URL = "https://wxt.server.1045fm.cn",

  /* 微信授权地址 */
  AUTH_URL =
    "https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect",
  
  /* 默认测试用APPID */
  TEST_APPID = "wx884d34049d77fcd1",
  
  /* 默认生产环境APPID */
  PRO_APPID = "wxbfaae54e7f89f3fa",
  
  /* 默认后端服务器接口地址 */
  REDIRECT_URI_PATH = "/wx/redirect",
  
  /* 默认状态参数 */
  // DEFAULT_STATE = "",

  /* 默认请求类型 */
  SCOPE_TYPE = ["snsapi_base", "snsapi_userinfo"]
}