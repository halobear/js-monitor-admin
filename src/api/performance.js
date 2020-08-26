import request from "@/utils/request";

export function list(params) {
  return request({
    url: `/api/monitor/performance/list`,
    params
  });
}

export function staticstics() {
  return request({
    url: `/api/monitor/performance/staticstics`
  });
}
