import Vue from "vue";
import Vuex from "vuex";

import { authorityPlugins } from "@/utils/authority";

const files = require.context(".", false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
  if (key === "./index.js") return;
  modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
});

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
  plugins: [authorityPlugins]
});

export default store;
