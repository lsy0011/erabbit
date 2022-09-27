import request from "../utils/request";

export const findHotGoods = (id, type, limit) => {
    return request('/goods/hot','get', {
        id,
        type,
        limit
    })
}

export const findRelGoods = (id,limit) => {
    return request('/goods/relevant','get',{id,limit})
}