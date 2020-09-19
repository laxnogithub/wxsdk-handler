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

# 自定义使用
一般情况下，调用share会自动请求并将相应配置输入wxsdk。
如果需要自定义则：

```
const wxsdk = wx.wxsdk;
wxsdk.ready(()=>{
	wxsdk.updateAppMessageShareData();
	...
});
wx.auth();

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

wx.js > options.config > 默认 config


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

## 第三步: 设置分享的配置选项和成功后的回调函数

```
wx.share({
	title: "",
	desc: ""
	....
},()=>{
	console.log('plugin is ready to use')
});
```

## 第四步: 启动

```
wx.share().auth();

```

# options

## configFile
默认: null

微信配置文件的路径或本身

## config

### config.debug
默认: false

是否启用debug模式

### config.indexUrl
默认: location.href

网页的首页地址

### config.server
默认: http://localhost

后端签名接口的域名

### config.path
默认: null

插件将会自动请求后端签名接口

接口的地址为域名+请求路径


### config.appid
默认: null

微信sdk的appid

### config.scope
默认: snsapi_userinfo

两个配置属性：snsapi_base/snsapi_userinfo

### config.over
默认: ()=>{
	console.log("wx plugin is ready!");
}

wxsdk加载完毕后的回调函数

### config.jsApi
默认: 

"updateAppMessageShareData"

"updateTimelineShareData"


微信sdk的请求接口名称列表

# share options

## title
默认: document.title

微信分享的标题

## desc
默认: title

微信分享的描述

## link
默认: location.href

微信分享的地址

## imgUrl
默认: null

微信分享的缩略图

## success
默认: null

微信分享成功的回调函数

## fail
默认: null

微信分享失败的回调函数

## cancel
默认: null

微信分享取消的回调函数

## tigger
默认: null

微信分享按钮点击的回调函数

## complete
默认: null

微信分享接口调用完成时候的回调函数
