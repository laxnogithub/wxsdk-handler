/*
 * @Description: wxHandler
 * @Version: 1.0.8
 * @Autor: lax
 * @Date: 2020-04-08 10:38:49
 * @LastEditors: lax
 * @LastEditTime: 2020-09-18 16:03:00
 */


const path = require('path');
const DEFAULT = require(path.join(__dirname,'./default'));
const axios = require("axios");

const wxsdk = wx;

function wxProcessor(p= {}) {
  const self = this;

  // 仅当默认为false可以这样写
  this.debug = p.debug || DEFAULT.DEBUG_STATE;

  this.pro = p.pro || DEFAULT.PRO_STATE;

  this.indexUrl = p.index || getURL(true);

  this.server =
    p.server || (this.pro ? DEFAULT.SERVER_URL : DEFAULT.TEST_SERVER_URL);
    
  this.appid = p.appid || (this.pro ? DEFAULT.PRO_APPID : DEFAULT.TEST_APPID);

  this.scope =
    typeof p.scope == "string"
      ? p.scope
      : typeof p.scope == "number"
        ? DEFAULT.SCOPE_TYPE[p.scope]
        : DEFAULT.SCOPE_TYPE[1];

  this.trigger = p.trigger ? p.trigger : null;

  this.over = p.over || DEFAULT.OVER;

  this.updateByWxSDK = updateByWxSDK;

  this.updateByWxSDK(p);

  this.execute = function(isnew) {
    const requestPath = isnew?"/wx/v2/sign":"/wx/sign";
    axios
      .get(self.server + requestPath, {
        params: {
          url: getURL(true)
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

          self.over();
        });

        wxsdk.error(function() {
          //alert("error");
        });
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
      .replace("REDIRECT_URI", this.server + DEFAULT.REDIRECT_URI_PATH)
      .replace("SCOPE", this.scope)
      .replace("STATE", this.indexUrl);
    window.location.href = url;
  };
}






/**
 * @method
 * @description 获取网页地址
 * @memberof wx
 * @member {function} getURL
 * @inner
 */
function getURL(is) {
  let baseUrl = location.href;
  if(!is) return baseUrl;
  if(baseUrl.indexOf("#") == -1)return baseUrl;
  baseUrl = baseUrl.split("#/")
  console.log(baseUrl[0]+baseUrl[1])
  return baseUrl[0]+baseUrl[1];
};

/**
 * @method
 * @description 处理图片地址
 * @memberof wx
 * @member {function} _getImg
 * @inner
 */
function _getImg(path){
  if(path.indexOf("http") != -1){
    return path;
  }else{
    return  window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname + path;
  }
}

function updateByWxSDK(p){
  p = p || {};
    this.title = p.title || DEFAULT.TITLE;
    this.debug = p.debug || DEFAULT.DEBUG_STATE;
    this.desc = p.desc || DEFAULT.DESC;
    this.link = p.link || DEFAULT.LINK;
    this.img = _getImg(p.img || DEFAULT.IMG);
    this.jsApiList = p.list || DEFAULT.API_LIST;
    this.over = p.over || DEFAULT.OVER;
    this.trigger = p.trigger || null;
    return this;
}

function getWorkspace(){
  return path.join(__dirname,"./../../../")
}


export default wxProcessor;