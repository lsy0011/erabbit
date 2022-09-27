import request from "../utils/request";

export const findHotGoods = (id, type, limit) => {
    return request('/goods/hot','get', {
        id,
        type,
        limit
    })
}