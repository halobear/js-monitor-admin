import moment from "moment";
import * as Api from "@/api/monitor";
import * as Per from "@/api/performance";

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
  },
  performance: [],
  todayPerformance: {},
  totalPerformance: {}
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
  },
  async fetchPerList({ commit }, pid) {
    const { list } = await Per.list({ size: 300, pid });
    list.forEach(item => {
      item.date = moment(item.create_time).format("MM/DD HH:mm:ss");
      item["加载时间"] = item.load_time;
      item["白屏时间"] = item.white_time;
    });
    commit("SET_MONITOR", {
      performance: list
    });
  },
  async fetchPerStatistics({ commit }, pid) {
    const { today = {}, total = {} } = await Per.staticstics({ pid });
    commit("SET_MONITOR", {
      todayPerformance: today,
      totalPerformance: total
    });
  }
};

export default {
  state,
  mutations,
  actions
};
