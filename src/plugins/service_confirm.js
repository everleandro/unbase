import Vue from "vue";

Vue.use({
  install(Vue) {
    Vue.prototype.$confirm = function (alert) {
      let conf = { show: true };
      if (typeof alert === "string") {
        conf.message = alert;
      } else {
        conf = { ...conf, ...alert };
      }
      this.$store.commit("SET_CONFIRM_CONFIG", conf);
      if (conf.show) {
        return new Promise((resolve) => {
          const unwatch = this.$store.watch(
            function (state) {
              return state;
            },
            function ({ confirm }) {
              resolve(confirm.value);
              setTimeout(() => {
                unwatch();
              });
            },
            {
              deep: true,
            }
          );
        });
      }
    };
  },
});
