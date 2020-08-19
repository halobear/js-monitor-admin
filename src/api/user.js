import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/api/login",
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
