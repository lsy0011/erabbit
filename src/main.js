import { createApp } from 'vue'
import store from './store'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import ui from '../src/components/library'
// 重置样式的包
import 'normalize.css'
// 常用样式
import '../src/assets/style/common.less'
createApp(App).use(ui).use(store).use(router).use(ElementPlus, { size: 'small', zIndex: 3000 }).mount('#app')

