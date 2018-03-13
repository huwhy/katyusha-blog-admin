const state = {
  tabViews: [],
  tabNames: {
    '/': '首页',
    '/home': '首页',
    '/index': '首页',
    '/banner': '轮播广告',
    '/article': '文章',
    '/article/add': '添加文章',
    '/about': '公司介绍',
    '/system': '设置',
    '/seo': 'SEO'
  },
  tabRegNames: [
    {
      reg: /^\/article\/(\d+)$/,
      name: '编辑文章'
    }
  ]
}

const getters = {
  tabViews: state => state.tabViews,
  tabNames: state => state.tabNames,
  tabRegNames: state => state.tabRegNames
}

const actions = {
  addView ({commit, state}, view) {
    commit('addTabView', view)
  },
  delView ({commit}, view) {
    return new Promise((resolve) => {
      commit('delTabView', view)
      resolve([...state.tabViews])
    })
  }
}

const mutations = {
  addTabView (state, view) {
    if (state.tabViews.some(v => v.path === view.path)) return
    state.tabViews.push(view)
  },
  delTabView (state, view) {
    for (const [i, v] of state.tabViews.entries()) {
      if (v.path === view.path) {
        state.tabViews.splice(i, 1)
        break
      }
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
