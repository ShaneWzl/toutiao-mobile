import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/dayjs'

//引入全局样式
import './styles/index.less'

//引入vant全部组件
import Vant from 'vant'

//引入vant样式
import 'vant/lib/index.css'

//引入lib-flexible  --是vant建议的进行设置rem基准值的工具
import 'lib-flexible'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
