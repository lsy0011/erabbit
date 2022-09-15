import request from "../utils/request.js";

export function findAllCategory() {
    return request('/home/category/head', 'get')
}

export const findTopCategory = (id) => {
    return request('/category', 'get', {
        id
    })
}

export const findTSubCategoryFilter = (id) => {
    return request('/category/sub/filter', 'get', {
        id
    })
}

export function findSubCategoryGoods(params) {
    return request('/category/goods/temporary', 'post', params)
}