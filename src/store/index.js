import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    flash: {
      message: "",
      color: "success",
      show: false,
    },
    confirm: {
      message: "",
      value: false,
      color: "red",
      show: false,
      title: null,
    },
  },
  getters: {
    flashConfig: (state) => {
      return state.flash;
    },
    confirmConfig: (state) => {
      return state.confirm;
    },
  },
  mutations: {
    SET_FLASH_CONFIG(state, { message, color, show }) {
      state.flash = {
        message: message || "",
        show: !!show,
        color: color || "success",
      };
    },
    SET_CONFIRM_CONFIG(state, { message, color, value, show }) {
      state.confirm = {
        ...state.confirm,
        message: message || "",
        show: !!show,
        value: !!value,
        color: color || "red",
      };
    },
  },
  actions: {},
  modules: {},
});
