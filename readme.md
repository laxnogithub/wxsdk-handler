# wxsdk-handler
[language: en](./readme-en.md)
## 介绍
基于jweixin的一个工具包，可用于日常html开发。
同时也可以用于vue中。

# 快速开始

## 1. 使用vue的情况

```
import wxHandler from "wxsdk-handler";
Vue.use(wxHandler, {
	appid: xxx,
	server: "xxx"
} );

this.$wx.share().auth();
```

## 2. 普通的情况

```
import wxHandler from "wxsdk-handler";
new wxHandler({
	appid: xxx,
	server: xxx
}).share().auth();

```

# 如何使用

## 第一步: 导入工具包

### 1.使用vue的情况 (in: main.js)

```
import wxHandler from "wxsdk-handler";
Vue.use(wxHandler, { options } );
```

### 2. 普通的情况

```
import wxHandler from "wxsdk-handler";
new wxHandler({ options });
```

## 第二步: 设置属性
选项的优先级如下：优先级高的将会覆盖低的配置

wx.js > options.config > default config


### 1. 使用 wx.js

在你的项目根目录下创建 wx.js
```
module.exports = {
	appid: "xxxx",
	server: "http://localhost:8001/",
	path: "wx/v2/sign",
};
```

将你的 wx.js 文件路径加入到或直接导入到configFile
```
options: {
    configFile: require("./../wx.js"),
    //or
    configFile: "wx.js path (must absolute path)"
}
```

### 2. 使用 options.config

```
options: {
    config: { 
        appid: "xxxx",
        server: "http://localhost:8001/",
        path: "wx/v2/sign",
    }
};
```

## 第三步: 设置分享的配置选项

```
wx.share({
	title: "",
	desc: ""
	....
});

```

## 第四步: 启动

```
wx.share().auth();

```

# options

## configFile
default: null

微信配置文件的路径或本身

## config

### config.debug
default: debug

是否启用debug模式

### config.indexUrl
default: location.href

网页的首页地址

### config.server
default: http://localhost

后端签名接口的域名

### config.path
default: null

插件将会自动请求后端签名接口
接口的地址为域名+请求路径


### config.appid
default: null

微信sdk的appid

### config.scope
default: snsapi_userinfo

两个配置属性：snsapi_base/snsapi_userinfo

### config.over
default: ()=>{
	console.log("wx plugin is ready!");
}

wxsdk加载完毕后的回调函数

### config.jsApi
default: 

"updateAppMessageShareData"

"updateTimelineShareData"

"onMenuShareTimeline"

"onMenuShareAppMessage"

"onMenuShareQQ"

"onMenuShareQZone"

"onMenuShareWeibo"

微信sdk的请求接口名称列表

# share options

## title
default: document.title

微信分享的标题

## desc
default: title

微信分享的描述

## link
default: location.href

微信分享的地址

## imgUrl
default: null

微信分享的缩略图

## success
default: null

微信分享成功的回调函数

## fail
default: null

微信分享失败的回调函数

## cancel
default: null

微信分享取消的回调函数

## tigger
default: null

微信分享按钮点击的回调函数

## complete
default: null

微信分享接口调用完成时候的回调函数
