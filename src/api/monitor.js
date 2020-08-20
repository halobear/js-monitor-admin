import request from "@/utils/request";

export function all(params) {
  return request({
    url: "/api/monitor/allList",
    params
  });
}

export function loaderrors(params) {
  return request({
    url: `/api/monitor/loaderrors`,
    params
  });
}
