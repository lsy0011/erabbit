import request from "../utils/request.js";

export function findAllCategory(){
    return request('/home/category/head','get')
}