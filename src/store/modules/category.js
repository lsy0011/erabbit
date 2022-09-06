import {
    topCategory
} from '../../api/constants'
import {
    findAllCategory
} from '../../api/category'

export default {
    namespaced: true,
    state: () => {
        return {
            // 分类信息集合 依赖 topCategory 重新设置 保证初始化就有数据 不至于白屏 
            // map() 得到一个新的数组 返回的为一个对象 对象中需有自己的 名字 和 ID 
            list: topCategory.map(item => {
                {
                    name: item
                }
            })
        }
    },
    mutations: {
        // payload 表示所有的分类集合
        setList(state, payload) {
            state.list = payload
        },
        // 修改当前一级分类下的open数据为true
        show(state, id) {
            const category = state.list.find(category => category.id === id.id)
            category.open = true
        },
        // 修改当前一级分类下的open数据为false
        hide(state, id) {
            const category = state.list.find(category => category.id === id.id)
            category.open = false
        }
    },

    actions: {
        async getList({
            commit
        }) {
            const {
                result
            } = await findAllCategory()
            // 给一级分类加上一个控制二级分类显示隐藏的数据open
            // forEach() 方法主要是用于调用数组的每个元素，并将元素传递给回调函数。
            result.forEach(item => {
                item.open = false
            });
            commit('setList', result)
        }
    }
}