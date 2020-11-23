/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-04-08 08:48:09
 * @LastEditors: lax
 * @LastEditTime: 2020-11-23 11:45:09
 */
import Vue from "vue";
import App from "./App.vue";
import wxHandler from "../packages/wx.js";

Vue.config.productionTip = false;
const isDev = process.env.NODE_ENV === "development";

Vue.use(wxHandler, {
	configFile: require("./../wx.js"),
	config: isDev
		? {
				debug: true,
				appid: "wxbfaae54e7f89f3fa",
				server: "https://wxt.server.1045fm.cn/",
				path: "wx/sign",
		  }
		: {},
});
new Vue({
	render: (h) => h(App),
}).$mount("#app");
