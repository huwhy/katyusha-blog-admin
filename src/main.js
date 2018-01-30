// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './vuex'

Vue.config.productionTip = false
Vue.use(Element)

Vue.prototype.addTabView = function () {
  let route = this.$route
  this.$store.dispatch('addView', {path: route.path, params: route.params, query: route.query})
}

Vue.prototype.removeView = function (path) {
  if (!path) {
    path = this.$route.path
  }
  this.$store.dispatch('delView', {path: path}).then((views) => {
    if (path === this.$route.path) {
      const latestView = views.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.path)
      } else {
        this.$router.push('/')
      }
    }
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
