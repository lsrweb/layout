import { createApp } from "vue";
import { createStore } from "vuex";

import App from "./App.vue";
import router from "./router";

const store = createStore({
  state() {
    return {
      token: localStorage.getItem("token"),
      car: []
    };
  },
  mutations: {
    SET_TOKEN(state, val) {
      state.token = val;
    }
  }
});

export default store;

import ElemetPlus from "element-plus";
import "element-plus/dist/index.css";

import "./assets/main.scss";

const app = createApp(App);
app.use(ElemetPlus);
app.use(router);
app.use(store);
app.mount("#app");

