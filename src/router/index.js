import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['../components/Layout.vue'], resolve),
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: resolve => require(['../pages/Index.vue'], resolve)
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
          path: '/banner',
          component: resolve => require(['../pages/banner/list.vue'], resolve)
        },
        {
          path: '/banner/add',
          component: resolve => require(['../pages/banner/add.vue'], resolve)
        },
        {
          path: '/banner/:id(\\d+)',
          component: resolve => require(['../pages/banner/add.vue'], resolve)
        },
        {
          path: '/about',
          component: resolve => require(['../pages/about.vue'], resolve)
        },
        {
          path: '/system',
          component: resolve => require(['../pages/system.vue'], resolve)
        },
        {
          path: '/seo',
          component: resolve => require(['../pages/seo.vue'], resolve)
        }
      ]
    }
  ]
})
