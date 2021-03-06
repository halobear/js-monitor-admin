import request from "@/utils/request";

export function all(params) {
  return request({
    url: "/api/monitor/allList",
    params
  });
}

export function jserrors(params) {
  return request({
    url: `/api/monitor/jserrors`,
    params
  });
}

export function loaderrors(params) {
  return request({
    url: `/api/monitor/loaderrors`,
    params
  });
}

export function projects() {
  return request({
    url: `/api/monitor/projects`
  });
}

export function removeProjects(pid) {
  return request({
    url: `/api/monitor/projects`,
    method: "delete",
    params: { pid }
  });
}

export function statistics(pid) {
  return request({
    url: `/api/monitor/statistics`,
    params: { pid }
  });
}
