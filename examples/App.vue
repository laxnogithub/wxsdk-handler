<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-04-07 20:45:54
 * @LastEditors: lax
 * @LastEditTime: 2020-12-21 16:14:59
 -->
<template>
	<div id="app">{{ data }}</div>
</template>

<style lang="scss">
@import "@ex/css/pmdInit";
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	width: 100%;
	height: 100%;
}

#sys {
	position: absolute;
}
</style>

<script>
export default {
	name: "vue",
	data: () => {
		return {
			data: 0,
		};
	},
	created() {
		const wx = this.$wx;
		wx.share(
			{
				title: "1234",
				desc: "desc",
			},
			() => {
				console.log("wx over");
				this.data++;
			}
		).auth();
	},
};
</script>
