import axios from '@/axios'
// import qs from 'qs'
const state = {
  category: {
    list: [],
    params: {
      pid: 0,
      level: 0,
      page: 1,
      size: 10
    },
    total: 0
  }
}

const getters = {
  category: state => state.category
}

const actions = {
  CATEGORY_LIST ({commit, state}) {
    return new Promise((resolve) => {
      axios.get('/api/category', {params: state.category.params}).then((res) => {
        let json = res.data
        commit('CATEGORY_LIST', json.data)
        resolve(json)
      })
    })
  },
  CATEGORY_SIZE_CHG ({commit, state}, size) {
    return new Promise((resolve) => {
      commit('CATEGORY_SET_SIZE', size)
    })
  },
  CATEGORY_PAGE_CHG ({commit, state}, page) {
    return new Promise((resolve) => {
      commit('CATEGORY_SET_PAGE', page)
    })
  }
}

const mutations = {
  CATEGORY_LIST (state, paging) {
    state.category.list = paging.data
    state.category.total = paging.total
  },
  CATEGORY_SET_SIZE (state, size) {
    state.category.params.size = size
  },
  CATEGORY_SET_PAGE (state, page) {
    state.category.params.page = page
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
