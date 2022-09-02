import { createWebHashHistory , createRouter } from "vue-router"

import Layout from '../views/layout.vue'
import Home from '../views/home/index.vue'

//路由规则
const routes = [
    {
        path:'/',
        component: Layout,
        children:[
            {
                path:'/',
                component:Home
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