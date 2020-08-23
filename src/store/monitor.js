import moment from "moment";
import * as Api from "@/api/monitor";

const state = {
  projects: [],
  statistics: {
    assetErrorTodayTotal: 0,
    assetErrorTotal: 0,
    fromTodayTotal: 0,
    fromTotal: 0,
    jsErrorTodayTotal: 0,
    jsErrorTotal: 0,
    personEffetTodayTotal: 0,
    personEffetTotal: 0,
    start_time: "",
    end_time: "",
    typesTotal: [],
    jsErrorDatas: [],
    assetErrorDatas: []
  }
};

const mutations = {
  SET_MONITOR(state, payload) {
    Object.assign(state, payload);
  }
};

const actions = {
  async fetchProjects({ commit, state }) {
    if (state.projects.length) return;
    const projects = await Api.projects();
    projects.forEach((item, key) => {
      item.id = key + 1;
      item.range = `${moment(item.start_time).format("MM/DD")}-${moment(
        item.end_time
      ).format("MM/DD")}`;
    });
    commit("SET_MONITOR", {
      projects
    });
  },
  async fetchMonitorStatistics({ commit }, pid) {
    const statistics = await Api.statistics(pid);
    commit("SET_MONITOR", { statistics });
  }
};

export default {
  state,
  mutations,
  actions
};
