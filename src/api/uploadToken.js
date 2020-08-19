import request from "@/utils/request";
import localData from "kuan-utils/lib/localData";
const { get, set } = localData;

const aliKey = "UPLOAD_TOKEN_ALI";
const qnKey = "UPLOAD_TOKEN_QN";

/**
 * @param {string} type (hotel || pano)
 */
export async function qnToken(type = "hotel") {
  const key = `${qnKey}-${type}`;
  const localToken = get(key);
  if (localToken) return localToken;
  const { hotel_upload_token } = await request({
    url: "/api2020/dashboard/v1/hotel/upload/token",
    params: { type }
  });
  set(key, hotel_upload_token, 60 * 24);
  return hotel_upload_token;
}
/**
 * 阿里云上传token
 */
export async function aliToken() {
  const localToken = get(aliKey);
  if (localToken) return localToken;

  const data = await request({
    url: "/api2020/crm/v1/uptoken"
  });

  set(aliKey, data, 60 * 24);
  return data;
}

export async function newQn() {
  const key = `${qnKey}-new`;
  const localToken = get(key);
  if (localToken) return localToken;
  const { token } = await request({
    url: "/api2020/dashboard/v1/uptoken/qiniu"
  });
  set(key, token, 60 * 24);
  return token;
}
