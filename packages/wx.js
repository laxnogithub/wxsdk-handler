/*
 * @Description: wxHandler
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-09-18 15:28:37
 * @LastEditors: lax
 * @LastEditTime: 2020-11-03 22:40:36
 */
const DEFAULT = require("./defaultOptions.js");
const axios = require("axios");
const logger = require("./log/");

class wxHandler {
	constructor(p = {}) {
		this.wxsdk = this.__getSDK();
		this.p = p;
		this.config = this.__getConfig();
		this.serverUrl = this.__getServerUrl();
		this.indexUrl = this.config.indexUrl;
		this.debug = this.config.debug;
		this.__setLog();
	}
	/**
	 * @function share
	 * @description set share config
	 * @param {*} p
	 * @param {function} callback
	 */
	share(
		share = {},
		complete = this.config.over,
		success = this.config.success
	) {
		const self = this;
		if (!this.checkWX()) {
			complete();
			return this;
		}
		this.wxsdk.ready(function () {
			logger.success("######## wx is ready ##########");
			logger.success("wx is ready");
			logger.success("###############################");
			const config = self.__getShareConfig(share);
			logger.log("####### share config: #########");
			logger.log(config);
			logger.log("###############################");
			DEFAULT.API_LIST.forEach((api) => {
				const fun = this.wxsdk[api];
				fun(config);
			});
			success();
			complete();
		});
		this.wxsdk.error((res) => {
			logger.error("##### wxsdk load error: #######");
			logger.error(res);
			logger.error("###############################");
			complete();
		});
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
				this.wxsdk.config(this.__generateWxConfig(resp.data));
			})
			.catch((error) => {
				logger.error("##### wxsdk auth error: #######");
				logger.error(error.message);
				logger.error("###############################");
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
	 * @function __setLog
	 * @description set log state
	 */
	__setLog() {
		if (this.debug) logger.resumeLogs();
		if (!this.debug) logger.pauseLogs();
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
	 * @description get back api with server + path
	 */
	__getServerUrl() {
		return this.config.server + this.config.path;
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
			debug: DEFAULT.DEBUG_STATE,
			pro: DEFAULT.PRO_STATE,
			indexUrl: this.getURL(true),
			server: "http://localhost:8080",
			path: "",
			appid: "",
			scope: DEFAULT.SCOPE_TYPE[1],
			over: DEFAULT.OVER,
			success: DEFAULT.SUCCESS,
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
	 * @function getURL
	 * @description get html url (true/false: contain #)
	 * @param {*} is
	 */
	getURL(is) {
		let baseUrl = location.href;
		if (!is) return baseUrl;
		if (baseUrl.indexOf("#") == -1) return baseUrl;
		baseUrl = baseUrl.split("#/");
		return baseUrl[0] + baseUrl[1];
	}
	/**
	 * @function __getSDK
	 * @description set wxsdk
	 */
	__getSDK() {
		if (wx) return wx;
		if (!wx) {
			logger.error("######## wxsdk error: #########");
			logger.error("wxsdk not find, please import jweixin.js");
			logger.error("###############################");
			return null;
		}
	}
	/**
	 * @function checkWX
	 * @description check wx browser
	 */
	checkWX() {
		let ua = window.navigator.userAgent.toLowerCase();
		return ua.match(/MicroMessenger/i) == "micromessenger";
	}
}

module.exports = wxHandler;
module.exports.install = (Vue, options) => {
	Vue.prototype.$wx = new wxHandler(options);
};
