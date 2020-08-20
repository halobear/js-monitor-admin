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
    const data = await Api.projects();
    commit("SET_MONITOR", {
      projects: data.map(item => item.pid)
    });
  },
  async fetchMonitorStatistics({ commit }) {
    const statistics = await Api.statistics();
    commit("SET_MONITOR", { statistics });
  }
};

export default {
  state,
  mutations,
  actions
};
