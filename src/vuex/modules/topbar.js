const state = {
  tabViews: [],
  tabNames: {
    '/': '首页',
    '/index': '首页',
    '/category': '文章类目',
    '/article': '文章',
    '/article/add': '添加文章',
    '/link': '链接管理',
    '/mp-config': '公众号配置',
    '/mp-config/add': '添加公众号配置',
    '/mp-menu': '公众号菜单',
    '/mp-reply': '自动回复设置',
    '/mp-reply/add': '添加回复'
  },
  tabRegNames: [
    {
      reg: /^\/article\/(\d+)$/,
      name: '编辑文章'
    },
    {
      reg: /^\/mp-config\/(\d+)$/,
      name: '修改公众号配置'
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
