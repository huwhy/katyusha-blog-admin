import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['../components/Layout.vue'], resolve),
      redirect: '/index',
      children: [
        {
          path: '/index',
          component: resolve => require(['../pages/article/list.vue'], resolve)
        },
        {
          path: '/article',
          component: resolve => require(['../pages/article/list.vue'], resolve)
        },
        {
          path: '/article/add',
          component: resolve => require(['../pages/article/add.vue'], resolve)
        },
        {
          path: '/article/:id(\\d+)',
          component: resolve => require(['../pages/article/add.vue'], resolve)
        },
        {
          path: '/category',
          component: resolve => require(['../pages/category/list.vue'], resolve)
        },
        {
          path: '/link',
          component: resolve => require(['../pages/link/list.vue'], resolve)
        },
        {
          path: '/mp-config',
          component: resolve => require(['../pages/mp-config/list.vue'], resolve)
        },
        {
          path: '/mp-config/add',
          component: resolve => require(['../pages/mp-config/add.vue'], resolve)
        },
        {
          path: '/mp-config/:id(\\d+)',
          component: resolve => require(['../pages/mp-config/add.vue'], resolve)
        },
        {
          path: '/mp-menu',
          component: resolve => require(['../pages/mp/menu/index.vue'], resolve)
        },
        {
          path: '/mp-reply',
          component: resolve => require(['../pages/mp/reply/index.vue'], resolve)
        },
        {
          path: '/mp-reply/add',
          component: resolve => require(['../pages/mp/reply/add.vue'], resolve)
        }
      ]
    }
  ]
})
