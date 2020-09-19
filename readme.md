# info

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

### 3. default config

```
{
	debug: false,
	pro: false,
	indexUrl: location.href,
	server: "http://localhost:8080",
	path: "",
	appid: "",
	scope: "snsapi_userinfo",
	over: function () {
		console.log("wx plugin is ready!");
	},
	jsApi: [
		"updateAppMessageShareData",
		"updateTimelineShareData",
		"onMenuShareTimeline",
		"onMenuShareAppMessage",
		"onMenuShareQQ",
		"onMenuShareQZone",
		"onMenuShareWeibo",
	],
}
```

## run 

1. use vue (in:xxx.vue)

```
this.$wx.share({
	title: "title",
	desc: "desc",
}).auth();
```

2. normal
   
```
new wxHandler().share(p).auth();

```

3. shareOptions

```
{
	title: document.title,
	desc: document.title,
	link: location.href,
	imgUrl: "",
    success: null,
    fail: null,
    tigger: null,
    complete: null,
    cancel: null
}
```
