import { createWebHashHistory , createRouter } from "vue-router"

import Layout from '../views/layout.vue'
import Home from '../views/home/index.vue'
import TopCategory from '../views/category/index.vue'
import SubCategory from '../views/category/sub.vue'
import Goods from '../views/goods/index.vue'
import Login from '../views/login/index.vue'

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
            },
            {
                path:'/product/:id',
                component:Goods 
            }
        ]
    },
    {
        path:'/login',
        component:Login,
    }
]
//createRouter创建路由实例
const router = createRouter({
    //使用hash
    history: createWebHashHistory(),
    routes,
    scrollBehavior(){
        return { left:0 , top:0}
    }
})

export default router