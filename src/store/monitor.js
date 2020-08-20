import * as Api from "@/api/monitor";

const state = {
  projects: []
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
  }
};

export default {
  state,
  mutations,
  actions
};
