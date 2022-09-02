import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'

export default createStore({
    state:{},
    mutations:{},
    actions:{},
    modules:{
        cart,
        user,
        category
    },
    plugins:[
        createPersistedState({
            key:'xiaotuxian-124-store',
            paths:['user','cart','category']
        })
    ]
})