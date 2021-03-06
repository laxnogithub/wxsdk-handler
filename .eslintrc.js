/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-09-01 16:05:12
 * @LastEditors: lax
 * @LastEditTime: 2020-10-09 22:37:49
 */
module.exports = {
	root: true,
	env: {
		node: true,
	},
	globals: {
		wx: true,
	},
	extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
	parserOptions: {
		parser: "babel-eslint",
		sourceType: "module",
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
	},
};
