/*
 * @Description: wxHandler
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-09-18 15:28:37
 * @LastEditors: lax
 * @LastEditTime: 2020-09-19 19:00:38
 */
const DEFAULT = require("./defaultOptions.js");
const axios = require("axios");
/*  eslint-disable-next-line */
const wxsdk = wx;

class wxHandler {
	constructor(p = {}) {
		this.wxsdk = wxsdk;
		this.p = p;
		this.config = this.__getConfig();
		this.serverUrl = this.__getServerUrl();
		this.indexUrl = this.config.indexUrl;
	}
	/**
	 * @function share
	 * @description set share config
	 * @param {*} p
	 * @param {*} callback
	 */
	share(p = {}, callback) {
		const self = this;
		wxsdk.ready(() => {
			self.debug & console.log("wx-ready");
			self.debug & console.log(p);
			DEFAULT.API_LIST.forEach((api) => {
				wxsdk[api](this.__getShareConfig(p));
			});
			callback & callback();
		});
		wxsdk.error((res) => {
			console.log("wxsdk load error:");
			console.log(res);
		});
		this;
		return this;
	}
	/**
	 * @function auth
	 * @description wxsdk auth
	 */
	auth() {
		axios
			.get(this.serverUrl, { params: { url: this.indexUrl } })
			.then((resp) => {
				wxsdk.config(this.__generateWxConfig(resp.data));
			})
			.catch((error) => {
				console.log("wxsdk auth error:");
				console.log(error);
			});
		return this;
	}
	/**
	 * @function wxLogin
	 * @description redirect to wx login
	 */
	wxLogin() {
		let url = DEFAULT.AUTH_URL.replace("APPID", this.config.appid)
			.replace("REDIRECT_URI", this.config.server + DEFAULT.REDIRECT_URI_PATH)
			.replace("SCOPE", this.config.scope)
			.replace("STATE", this.indexUrl);
		window.location.href = url;
	}
	/**
	 * @function __getShareConfig
	 * @description return share config options > default
	 * @param {*} p
	 */
	__getShareConfig(p) {
		return Object.assign(
			{},
			{
				title: DEFAULT.TITLE,
				desc: DEFAULT.DESC,
				link: DEFAULT.LINK,
				imgUrl: DEFAULT.IMG,
			},
			p
		);
	}
	/**
	 * @function __generateWxConfig
	 * @description return wx config object
	 * @param {*} data
	 */
	__generateWxConfig(data) {
		return {
			debug: this.config.debug,
			appId: data.appid,
			timestamp: data.timestamp,
			nonceStr: data.noncestr,
			signature: data.signature,
			jsApiList: this.config.jsApi,
		};
	}
	/**
	 * @function __getServerUrl
	 * @description get back api
	 */
	__getServerUrl() {
		return this.config.server + this.config.path;
	}
	__getWorkspace() {
		return;
	}
	/**
	 * @function __getConfig
	 * @description get config options.config > configfile > default config
	 */
	__getConfig() {
		const config_file = this.__getConfigFile();
		return Object.assign(
			{},
			this.__defaultConfig(),
			config_file,
			this.p.config || {}
		);
	}
	/**
	 * @function __defaultConfig
	 * @description get default config
	 */
	__defaultConfig() {
		return {
			debug: false,
			pro: false,
			indexUrl: this.__getURL(true),
			server: "http://localhost:8080",
			path: "",
			appid: "",
			scope: DEFAULT.SCOPE_TYPE[1],
			over: DEFAULT.OVER,
			jsApi: DEFAULT.API_LIST,
		};
	}
	/**
	 * @function __getConfigFile
	 * @description get config file
	 */
	__getConfigFile() {
		let config_file = null;
		try {
			config_file =
				typeof this.p.configFile === "string"
					? require(this.p.configFile + "")
					: this.p.configFile;
		} catch (error) {
			return config_file;
		}
		return config_file;
	}
	/**
	 * @function __getURL
	 * @description get html url (true/false: contain #)
	 * @param {*} is
	 */
	__getURL(is) {
		let baseUrl = location.href;
		if (!is) return baseUrl;
		if (baseUrl.indexOf("#") == -1) return baseUrl;
		baseUrl = baseUrl.split("#/");
		return baseUrl[0] + baseUrl[1];
	}
}

module.exports = wxHandler;
module.exports.install = (Vue, options) => {
	Vue.prototype.$wx = new wxHandler(options);
};
