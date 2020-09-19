# info
wxsdk tools for vue or html

# quick start

## 1. use vue

```
import wxHandler from "wxsdk-handler";
Vue.use(wxHandler, {
	appid: xxx,
	server: "xxx"
} );

this.$wx.share().auth();
```

## 2. normal

```
import wxHandler from "wxsdk-handler";
new wxHandler({
	appid: xxx,
	server: xxx
}).share().auth();

```

# how to use

## step 1: import this tools

### 1.use vue (in: main.js)

```
import wxHandler from "wxsdk-handler";
Vue.use(wxHandler, { options } );
```

### 2. normal

```
import wxHandler from "wxsdk-handler";
new wxHandler({ options });
```

## step 2: set options
options = wx.js > options.config > default config


### 1. use wx.js

create wx.js in your ${workspace}/wx.js
```
module.exports = {
	appid: "xxxx",
	server: "http://localhost:8001/",
	path: "wx/v2/sign",
};
```

add wx.js path to options.configFile
```
options: {
    configFile: require("./../wx.js"),
    //or
    configFile: "wx.js path (must absolute path)"
}
```

### 2. use options.config

```
options: {
    config: { 
        appid: "xxxx",
        server: "http://localhost:8001/",
        path: "wx/v2/sign",
    }
};
```

## step 3: set share config

```
wx.share({
	title: "",
	desc: ""
	....
});

```

## step 4: run

```
wx.share().auth();

```

# options

## configFile
default: null

wx config file or file path

## config

### config.debug
default: false

debug mode : true or false

### config.indexUrl
default: location.href

this html index url

### config.server
default: http://localhost

back api server host

### config.path
default: null

back api = config.server+config.path
plugin will auto auth this api


### config.appid
default: null

wx appid

### config.scope
default: snsapi_userinfo

can use snsapi_base/snsapi_userinfo

### config.over
default: ()=>{
	console.log("wx plugin is ready!");
}

wx ready callback function

### config.jsApi
default: 

"updateAppMessageShareData"

"updateTimelineShareData"

"onMenuShareTimeline"

"onMenuShareAppMessage"

"onMenuShareQQ"

"onMenuShareQZone"

"onMenuShareWeibo"

wxsdk api

# share options

## title
default: document.title

wx share title

## desc
default: title

wx share desc

## link
default: location.href

wx share link

## imgUrl
default: null

wx share img url

## success
default: null

wx share success function

## fail
default: null

wx share fail function

## cancel
default: null

wx share cancel function

## tigger
default: null

wx share tigger function

## complete
default: null

wx share complete function
