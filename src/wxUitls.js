/*
 * @Description: wxHandler
 * @Version: 1.0.8
 * @Autor: lax
 * @Date: 2020-04-08 10:38:49
 * @LastEditors: lax
 * @LastEditTime: 2020-07-05 15:26:03
 */

const axios = require("axios");

const wxsdk = wx;

const 
  
  /* 默认申请API权限项 */
  DEFAULT_API_LIST = [
    "updateAppMessageShareData",
    "updateTimelineShareData",
    "onMenuShareTimeline",
    "onMenuShareAppMessage",
    "onMenuShareQQ",
    "onMenuShareQZone",
    "onMenuShareWeibo"
  ],

  /* 默认执行完成回调函数 */
  DEFAULT_OVER = function() {
    console.log("wx plugin is ready!");
  },

  /* 默认DEBUG模式 */
  DEFAULT_DEBUG_STATE = false,

  /* 默认生产环境 */
  DEFAULT_PRO_STATE = false,

  /* 默认标题 */
  DEFAULT_TITLE = document.title,

  /* 默认描述 */
  DEFAULT_DESC = DEFAULT_TITLE,

  /* 默认链接地址 */
  DEFAULT_LINK = location.href,

  /* 默认图片 */
  DEFAULT_IMG = "",

  /* 默认后端服务器地址 */
  DEFAULT_SERVER_URL = "https://wx.server.1045fm.cn",

  /* 默认后端测试服务器地址 */
  DEFAULT_TEST_SERVER_URL = "https://wxt.server.1045fm.cn",

  /* 微信授权地址 */
  AUTH_URL =
    "https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect",
  
  /* 默认测试用APPID */
  DEFAULT_TEST_APPID = "wx884d34049d77fcd1",
  
  /* 默认生产环境APPID */
  DEFAULT_PRO_APPID = "wxbfaae54e7f89f3fa",
  
  /* 默认后端服务器接口地址 */
  DEFAULT_REDIRECT_URI_PATH = "/wx/redirect",
  
  /* 默认状态参数 */
  // DEFAULT_STATE = "",

  /* 默认请求类型 */
  DEFAULT_SCOPE_TYPE = ["snsapi_base", "snsapi_userinfo"];

function wxProcessor(p) {p = p || {};
  const self = this;

  this.debug = p.debug || DEFAULT_DEBUG_STATE;

  this.pro = p.pro || DEFAULT_PRO_STATE;

  this.indexUrl = p.index || this.getURL(true);

  this.server =
    p.server || (this.pro ? DEFAULT_SERVER_URL : DEFAULT_TEST_SERVER_URL);
    
  this.appid = p.appid || (this.pro ? DEFAULT_PRO_APPID : DEFAULT_TEST_APPID);

  this.scope =
    typeof p.scope == "string"
      ? p.scope
      : typeof p.scope == "number"
        ? DEFAULT_SCOPE_TYPE[p.scope]
        : DEFAULT_SCOPE_TYPE[1];

  this.trigger = p.trigger ? p.trigger : null;

  this.over = p.over || DEFAULT_OVER;

  this.updateByWxSDK = updateByWxSDK;

  this.updateByWxSDK(p);

  this.execute = function() {
    axios
      .get(self.server + "/wx/sign", {
        params: {
          url: self_url
        }
      })
      .then(function(resp) {
        let data = resp.data;
        wxsdk.config({
          debug: self.debug,
          appId: data.appid,
          timestamp: data.timestamp,
          nonceStr: data.noncestr,
          signature: data.signature,
          jsApiList: self.jsApiList
        });

        wxsdk.ready(function() {
          self.debug && console.log("wx-ready");

          /* 分享给朋友及分享到qq */
          wxsdk.updateAppMessageShareData({
            title: self.title,
            desc: self.desc,
            link: self.link,
            imgUrl: self.img,
            success: function() {},
            cancel: function() {}
          });

          /* 分享朋友圈及分享到qq空间 */
          wxsdk.updateTimelineShareData({
            title: self.title,
            link: self.link,
            imgUrl: self.img,
            success: function() {},
            cancel: function() {}
          });

          /* 分享到腾讯微博 */
          wxsdk.onMenuShareWeibo({
            title: self.title,
            desc: self.desc,
            link: self.link,
            imgUrl: self.img,
            success: function() {},
            cancel: function() {}
          });

          wxsdk.onMenuShareTimeline({
            title: self.title,
            link: self.link,
            imgUrl: self.img,
            success: function() {}
          });

          wxsdk.onMenuShareAppMessage({
            title: self.title,
            desc: self.desc,
            link: self.link,
            imgUrl: self.img,
            type: "",
            dataUrl: "",
            success: function() {}
          });

          wxsdk.onMenuShareQQ({
            title: self.title,
            desc: self.desc,
            link: self.link,
            imgUrl: self.img,
            success: function() {},
            cancel: function() {}
          });

          wxsdk.onMenuShareQZone({
            title: self.title,
            desc: self.desc,
            link: self.link,
            imgUrl: self.img,
            success: function() {},
            cancel: function() {}
          });
        });

        wxsdk.error(function() {
          //alert("error");
        });

        self.over();
      })
      .catch(function(error) {
        console.log("wxsdk load error:");
        console.log(error);
      });
  };

  /**
   * @method
   * @description 微信授权
   * @memberof wx
   * @member {function} auth
   * @inner
   */
  this.auth = function() {
    let url = AUTH_URL.replace("APPID", this.appid)
      .replace("REDIRECT_URI", this.server + DEFAULT_REDIRECT_URI_PATH)
      .replace("SCOPE", this.scope)
      .replace("STATE", this.indexUrl);
    window.location.href = url;
  };

  /**
   * @method
   * @description 获取网页地址
   * @memberof wx
   * @member {function} getURL
   * @inner
   */
  this.getURL = function(is) {
    let baseUrl = location.href;
    if(!is) return baseUrl;
    baseUrl = baseUrl.split("#/")
    return baseUrl[0]+baseUrl[1];
  };

  /**
   * @method
   * @description 处理图片地址
   * @memberof wx
   * @member {function} _getImg
   * @inner
   */
  this._getImg = function(path){
    if(path.indexOf("http") != -1){
      return path;
    }esle{
      return  window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname + path;
    }

  }

}

function updateByWxSDK(p){
  p = p || {};
    this.title = p.title || DEFAULT_TITLE;
    this.debug = p.debug || DEFAULT_DEBUG_STATE;
    this.desc = p.desc || DEFAULT_DESC;
    this.link = p.link || DEFAULT_LINK;
    this.img = this._getImg(p.img || DEFAULT_IMG);
    this.jsApiList = p.list || DEFAULT_API_LIST;
    this.over = p.over || DEFAULT_OVER;
    this.trigger = p.trigger || null;
    return this;
}

export default wxProcessor;