import { createWebHashHistory , createRouter } from "vue-router"

import Layout from '../views/layout.vue'
import Home from '../views/home/index.vue'
import TopCategory from '../views/category/index.vue'
import SubCategory from '../views/category/sub.vue'

//路由规则
const routes = [
    {
        path:'/',
        component: Layout,
        children:[
            {
                path:'/',
                component:Home
            },
            {
                path:'/category/:id',
                component:TopCategory
            },
            {
                path:'/category/sub/:id',
                component:SubCategory
            }
        ]
    }
]
//createRouter创建路由实例
const router = createRouter({
    //使用hash
    history: createWebHashHistory(),
    routes
})

export default router