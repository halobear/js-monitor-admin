const state = {
  collapsed: false,
  device: "desktop"
};

const mutations = {
  SET_TOGGLE_SIDEBAR: (state, collapsed) => {
    state.collapsed = collapsed;
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  }
};

const actions = {
  toggleSidebar({ commit }, type) {
    commit("SET_TOGGLE_SIDEBAR", type);
  },
  toggleDevice({ commit }, device) {
    commit("TOGGLE_DEVICE", device);
  }
};

export default {
  state,
  mutations,
  actions
};
