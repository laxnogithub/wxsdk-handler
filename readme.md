# info

# how to use

## import this tools

1.use vue (in: main.js)

```
import wxHandler from "wxsdk-handler";
Vue.use(wxHandler, { configFile: require("./../wx.js"),config: { debug: true} });
```

2. normal

```
import wxHandler from "wxsdk-handler";
new wxHandler({
    { 
        configFile: require("./../wx.js"),
        config: { debug: true}
    }
});
```

## set options
options = wx.js > options.config > default config


1. wx.js
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
new wxHandler({
    { 
        configFile: require("./../wx.js"),
    }
});
```

2. options.config

```
new wxHandler({
    { 
        appid: "xxxx",
	    server: "http://localhost:8001/",
	    path: "wx/v2/sign",
    }
});

```

3. default config

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
