import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
     path:'/',
     name:'layoutIndex',
     component:() => import('@/views/layout/index.vue'),
     children:[
       {
         path:'',
         redirect: 'shouye'
       },
      {
        path:'shouye',
        name:'shouye',
        component:() => import('@/views/son/shouye.vue')
      },
      {
        path:'wenda',
        name:'wenda',
        component:() => import('@/views/son/wenda.vue')
      },
      {
        path:'shipin',
        name:'shipin',
        component:() => import('@/views/son/shipin.vue')
      },
      {
        path:'my',
        name:'my',
        component:() => import('@/views/son/my.vue')
      }
     ]
     
  },
  {
    path:'/login',
    name:'loginIndex',
    component:() => import('@/views/login/index.vue')
  }
]


const router = new VueRouter({
  routes
})

export default router
