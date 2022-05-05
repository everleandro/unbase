import Vue from "vue";

Vue.use({
  install(Vue) {
    //flash service
    Vue.prototype.$flash = function (flash) {
      let conf = { show: true };
      if (typeof flash === "string") {
        conf.message = flash;
      } else {
        conf = { ...conf, ...flash };
      }

      this.$store.commit("SET_FLASH_CONFIG", conf);
    };
  },
});
