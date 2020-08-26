import request from "@/utils/request";

console.log(process.env.VUE_APP_PROXY);

export function login(data) {
  return request({
    url: "/api/monitor/login",
    method: "post",
    data
  });
}

export function logout() {
  return Promise.resolve();
}

// 获取验证码
export function getCode(data) {
  return request({
    url: "/api/v1/phone/code",
    method: "post",
    data
  });
}
