import Vue from 'vue'
import Vuex from 'vuex'
import {getItem,setItem,removeItem} from '@/utils/storage.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user:null
    user:getItem('USER_TOKEN')||null
  },
  getters: {
  },
  mutations: {
    setUser(state,payload){
      state.user = payload
      
      //防止数据丢失，修改好state里的数据后，要把它存储到本地token
      setItem('USER_TOKEN',payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
