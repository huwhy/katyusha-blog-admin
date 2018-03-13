import Vue from 'vue'
import Vuex from 'vuex'
import Articles from './modules/article'
import Banners from './modules/banner'
import Topbar from './modules/topbar'
import System from './modules/system'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Articles,
    Banners,
    Topbar,
    System
  }
})
