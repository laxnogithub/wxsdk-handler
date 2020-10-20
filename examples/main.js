/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-04-08 08:48:09
 * @LastEditors: lax
 * @LastEditTime: 2020-10-20 11:02:20
 */
import Vue from "vue";
import App from "./App.vue";
import wxHandler from "../packages/wx.js";

Vue.config.productionTip = false;

Vue.use(wxHandler, {
	configFile: require("./../wx.js"),
	config: { debug: false },
});
new Vue({
	render: (h) => h(App),
}).$mount("#app");
