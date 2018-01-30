import axios from '@/axios'
// import qs from 'qs'
const state = {
  link: {
    list: [],
    params: {
      name: '',
      page: 1,
      size: 10
    },
    total: 0
  }
}

const getters = {
  link: state => state.link
}

const actions = {
  LINK_LIST ({commit, state}) {
    return new Promise((resolve) => {
      axios.get('/api/link', {params: state.link.params}).then((res) => {
        let json = res.data
        commit('LINK_LIST', json.data)
        resolve(json)
      })
    })
  },
  LINK_SIZE_CHG ({commit, state}, size) {
    return new Promise((resolve) => {
      commit('LINK_SET_SIZE', size)
    })
  },
  LINK_PAGE_CHG ({commit, state}, page) {
    return new Promise((resolve) => {
      commit('LINK_SET_PAGE', page)
    })
  },
  LINK_DELETE ({commit, state}, id) {
    return new Promise((resolve) => {
      axios.delete('/api/link/' + id).then((res) => {
        let json = res.data
        commit('LINK_DEL', id)
        resolve(json)
      })
    })
  }
}

const mutations = {
  LINK_LIST (state, paging) {
    state.link.list = paging.data
    state.link.total = paging.total
  },
  LINK_SET_SIZE (state, size) {
    state.link.params.size = size
  },
  LINK_SET_PAGE (state, page) {
    state.link.params.page = page
  },
  LINK_DEL (state, id) {
    console.log(state.link)
    for (const [i, v] of state.link.list.entries()) {
      if (v.id === id) {
        state.link.list.splice(i, 1)
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
