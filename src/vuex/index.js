import Vue from 'vue'
import Vuex from 'vuex'
import Articles from './modules/article'
import Category from './modules/category'
import Link from './modules/link'
import Topbar from './modules/topbar'
import MpConfig from './modules/mpConfig'
import MpMenu from './modules/mpMenu'
import MpReply from './modules/mpReply'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Articles,
    Category,
    Link,
    Topbar,
    MpConfig,
    MpMenu,
    MpReply
  }
})
