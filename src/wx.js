/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-09-18 15:28:37
 * @LastEditors: lax
 * @LastEditTime: 2020-09-18 18:16:33
 */
const path = require("path");
const DEFAULT = require("./defaultOptions.js");
const axios = require("axios");
/*  eslint-disable-next-line */
const wxsdk = wx;

class wxHandler {
	constructor(p = {}) {
		this.wxsdk = wxsdk;
		this.p = p;
		this.configPath = p.configPath || this.__getWorkspace();
		this.configName = p.configName || "wx.js";
		this.config = this.__getConfig();
	}
	share(p = {}, callback) {
		const options = p;
		const self = this;
		wxsdk.ready(function () {
			self.debug && console.log("wx-ready");
			callback();
			/* 分享给朋友及分享到qq */
			wxsdk.updateAppMessageShareData({
				title: options.title,
				desc: options.desc,
				link: options.link,
				imgUrl: options.img,
				success: function () {},
				cancel: function () {},
			});

			/* 分享朋友圈及分享到qq空间 */
			wxsdk.updateTimelineShareData({
				title: options.title,
				link: options.link,
				imgUrl: options.img,
				success: function () {},
				cancel: function () {},
			});

			/* 分享到腾讯微博 */
			wxsdk.onMenuShareWeibo({
				title: options.title,
				desc: options.desc,
				link: options.link,
				imgUrl: options.img,
				success: function () {},
				cancel: function () {},
			});

			wxsdk.onMenuShareTimeline({
				title: options.title,
				link: options.link,
				imgUrl: options.img,
				success: function () {},
			});

			wxsdk.onMenuShareAppMessage({
				title: options.title,
				desc: options.desc,
				link: options.link,
				imgUrl: options.img,
				type: "",
				dataUrl: "",
				success: function () {},
			});

			wxsdk.onMenuShareQQ({
				title: options.title,
				desc: options.desc,
				link: options.link,
				imgUrl: options.img,
				success: function () {},
				cancel: function () {},
			});

			wxsdk.onMenuShareQZone({
				title: options.title,
				desc: options.desc,
				link: options.link,
				imgUrl: options.img,
				success: function () {},
				cancel: function () {},
			});
		});
		return this;
	}
	config() {
		const self = this;
		axios
			.get(this.__getServerUrl(), { params: { url: this.config.indexUrl } })
			.then((resp) => {
				const data = resp.data;
				wxsdk.config({
					debug: self.config.debug,
					appId: data.appid,
					timestamp: data.timestamp,
					nonceStr: data.noncestr,
					signature: data.signature,
					jsApiList: self.config.jsApi,
				});
			})
			.catch((error) => {
				console.log("wxsdk load error:");
				console.log(error);
			});
	}
	__getServerUrl() {
		return this.config.server + this.config.path;
	}
	__getWorkspace() {
		return path.join(__dirname, "./../../../");
	}
	__getConfig() {
		const config_file = this.__getConfigFile();
		console.log(config_file);
		return Object.assign(
			{},
			this.p.config || {},
			config_file,
			this.__defaultConfig()
		);
	}
	__defaultConfig() {
		return {
			debug: false,
			pro: false,
			indexUrl: this.__getURL(true),
			server: "https://localhost:8080",
			path: "",
			appid: "",
			scope: DEFAULT.SCOPE_TYPE[1],
			over: DEFAULT.OVER,
			jsApi: DEFAULT.API_LIST,
		};
	}
	__getConfigFile() {
		let config_file = null;
		const config_path = path.join(this.configPath, this.configName);
		console.log(config_path);
		console.log(path.resolve(__dirname, "./../wx.js"));
		try {
			// config_file = require(path.join(this.configPath, this.configName));
			config_file = require("/wx.js");
		} catch (error) {
			return config_file;
		}
		return config_file;
	}
	__getURL(is) {
		let baseUrl = location.href;
		if (!is) return baseUrl;
		if (baseUrl.indexOf("#") == -1) return baseUrl;
	}
}

module.exports = wxHandler;
