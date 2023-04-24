import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入全局样式
import './styles/index.less'

//引入vant全部组件
import Vant from 'vant'

//引入vant样式
import 'vant/lib/index.css'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
