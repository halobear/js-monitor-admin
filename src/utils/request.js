import { createApi, encrypt } from "@halobear/vue-request";
import authority from "./authority";

const key = "";

const request = createApi({
  setHeaders: config => {
    const { params = {}, data = {} } = config;
    const now = Date.parse(new Date()) / 1000;
    const headers = {
      "X-Halo-App": "halo",
      "Http-Request-Halo-Sign": encrypt({ ...params, ...data, time: now }, key)
    };
    const { token = "" } = authority.get() || {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  },
  loginForce: () => {}
});

export default request;
