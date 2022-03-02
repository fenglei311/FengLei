import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import xingzuo from '@/pages/xingzuo'
import toutiao from '@/pages/toutiao'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    redirect: "/xingzuo",
    component: index,
    children: [{
        path: "/toutiao",
        component: toutiao
      },
      {
        path: "/xingzuo",
        component: xingzuo
      },

    ],
  }]
})
