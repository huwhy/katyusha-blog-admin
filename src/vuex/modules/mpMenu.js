import axios from '@/axios'
// import qs from 'qs'
const state = {
  mpMenu: {
    configs: {},
    temp: {
      id: '',
      menus: [],
      editMenu: null,
      rootIndex: null,
      childIndex: null
    }
  }
}

const getters = {
  mpMenu: state => state.mpMenu
}

const actions = {
  MP_MENU_GET ({commit, state}, mpId) {
    return new Promise((resolve) => {
      if (!state.mpMenu.configs[mpId]) {
        axios.get('/api/mp-menu/' + mpId).then((res) => {
          let json = res.data
          commit('MP_MENU_PUT', {id: mpId, data: json.data})
          resolve(json.data)
        })
      } else {
        resolve(state.mpMenu.configs[mpId])
      }
    })
  },
  MP_MENU_ADD_ROOT ({commit, state}) {
    return new Promise((resolve) => {
      commit('MP_MENU_ADD_ROOT')
      resolve()
    })
  },
  MP_MENU_EDIT_ROOT ({commit, state}, i) {
    return new Promise((resolve) => {
      commit('MP_MENU_EDIT_ROOT', i)
      resolve()
    })
  },
  MP_MENU_ADD_CHILD ({commit, state}, i) {
    return new Promise((resolve) => {
      commit('MP_MENU_ADD_CHILD', i)
      resolve()
    })
  },
  MP_MENU_EDIT_CHILD ({commit, state}, params) {
    return new Promise((resolve) => {
      commit('MP_MENU_EDIT_CHILD', params)
      resolve()
    })
  },
  MP_MENU_DEL_MENU ({commit, state}) {
    return new Promise((resolve) => {
      if (state.mpMenu.temp.editMenu.type === 0) {
        commit('MP_MENU_DEL_ROOT', state.mpMenu.temp.rootIndex)
      } else {
        commit('MP_MENU_DEL_CHILD', {rootIndex: state.mpMenu.temp.rootIndex, index: state.mpMenu.temp.childIndex})
      }
      resolve()
    })
  },
  MP_MENU_DEL_CHILD ({commit, state}, params) {
    return new Promise((resolve) => {
      commit('MP_MENU_DEL_CHILD', params)
      resolve()
    })
  },
  MP_MENU_CANCEL ({commit, state}) {
    return new Promise((resolve) => {
      commit('MP_MENU_CANCEL')
      resolve()
    })
  },
  MP_MENU_POST ({commit, state}) {
    return new Promise((resolve) => {
      axios.post('/api/mp-menu/' + state.mpMenu.temp.id, state.mpMenu.temp.menus).then((res) => {
        let json = res.data
        resolve(json)
      })
    })
  },
  MP_MENU_EDIT ({commit, state}, id) {
    return new Promise((resolve) => {
      axios.get('/api/mp-menu/' + id).then((res) => {
        let json = res.data
        if (json.data) {
          commit('MP_CONFIG_EDIT', json.data)
        }
        resolve(json)
      })
    })
  }
}

const mutations = {
  MP_MENU_PUT (state, params) {
    state.mpMenu.temp.id = params.id
    let menus = params.data
    if (!menus) {
      menus = []
    }
    state.mpMenu.configs[params.id] = menus
    state.mpMenu.temp.menus = menus
  },
  MP_MENU_ADD_ROOT (state) {
    if (state.mpMenu.temp.menus.length < 3) {
      let menu = {
        title: '标题',
        sort: state.mpMenu.temp.menus.length,
        type: 0,
        content: '',
        childMenus: []
      }
      state.mpMenu.temp.menus.push(menu)
      state.mpMenu.temp.editMenu = menu
      state.mpMenu.temp.rootIndex = state.mpMenu.temp.menus.length
    }
  },
  MP_MENU_EDIT_ROOT (state, i) {
    if (state.mpMenu.temp.menus.length > i) {
      state.mpMenu.temp.editMenu = state.mpMenu.temp.menus[i]
      state.mpMenu.temp.rootIndex = i
    }
  },
  MP_MENU_ADD_CHILD (state, i) {
    if (state.mpMenu.temp.menus.length > i) {
      let rootMenu = state.mpMenu.temp.menus[i]
      if (rootMenu.childMenus.length < 5) {
        let menu = {
          title: '子标题',
          sort: rootMenu.childMenus.length,
          type: 1,
          content: ''
        }
        rootMenu.childMenus.push(menu)
        state.mpMenu.temp.editMenu = menu
        state.mpMenu.temp.rootIndex = i
        state.mpMenu.temp.childIndex = rootMenu.childMenus.length
      }
    }
  },
  MP_MENU_EDIT_CHILD (state, params) {
    let rootMenu = state.mpMenu.temp.menus[params.rootIndex]
    state.mpMenu.temp.editMenu = rootMenu.childMenus[params.index]
    state.mpMenu.temp.rootIndex = params.rootIndex
    state.mpMenu.temp.childIndex = params.index
  },
  MP_MENU_DEL_ROOT (state, i) {
    state.mpMenu.temp.menus.splice(i, 1)
  },
  MP_MENU_DEL_CHILD (state, params) {
    let rootMenu = state.mpMenu.temp.menus[params.rootIndex]
    rootMenu.childMenus.splice(params.index, 1)
  },
  MP_MENU_CANCEL (state) {
    state.mpMenu.temp.editMenu = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
