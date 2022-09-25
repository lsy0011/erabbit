import request from "../utils/request";

export const findGoods = (id) => {
  return request('/goods', 'get', {
    id
  })
}

export const findCity = (id) => {
  return request('https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json', 'get')
}