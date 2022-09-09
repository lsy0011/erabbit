import request from "../utils/request.js";

export function findAllCategory(){
    return request('/home/category/head','get')
}

export const findTopCategory = (id) => {
    return request('/category', 'get', { id })
  }