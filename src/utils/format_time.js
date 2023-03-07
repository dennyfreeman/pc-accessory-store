import dayjs from "dayjs";

export function formatDateTime(time) {
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss:SSS")
}

export function formatDateTimeID(time) {
  return dayjs(time).format("YYYYMMDDHHmmssSSS")
}