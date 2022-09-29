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

export const getCommentInfo = id => {
    return request(`/goods/${id}/evaluate`,'get')
}

export const getCommentList = id => {
    return request(`/goods/${id}/evaluate/page`,'get')
}