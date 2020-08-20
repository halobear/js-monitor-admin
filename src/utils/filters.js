import dayjs from "kuan-utils/lib/dayjs";

export function timeAgo(startTime) {
  const currentTime = new Date().getTime();
  const time = currentTime - dayjs.toDate(startTime).getTime();
  const day = Math.floor(time / (1000 * 60 * 60 * 24));
  const hour = Math.floor(time / (1000 * 60 * 60));
  const min = Math.floor(time / (1000 * 60));
  const month = Math.floor(day / 30);
  const year = Math.floor(month / 12);
  if (year || month || day) {
    return dayjs.format(startTime, "YYYY-MM-DD HH:mm:ss");
  }
  if (hour) return hour + "小时前";
  if (min) return min + "分钟前";
  else return "刚刚";
}
