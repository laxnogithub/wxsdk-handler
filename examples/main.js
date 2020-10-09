/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-04-08 08:48:09
 * @LastEditors: lax
 * @LastEditTime: 2020-10-09 22:45:41
 */
import Vue from "vue";
import App from "./App.vue";
import wxHandler from "../package/wx.js";

Vue.config.productionTip = false;

Vue.use(wxHandler, {
	configFile: require("./../wx.js"),
	config: { debug: true },
});
new Vue({
	render: (h) => h(App),
}).$mount("#app");
