import axios from '@/axios'
// import qs from 'qs'
const state = {
  banner: {
    list: [],
    params: {
      page: 1,
      size: 10
    },
    total: 0,
    temp: {
      img: '',
      url: ''
    }
  }
}

const getters = {
  banner: state => state.banner
}

const actions = {
  BANNER_LIST ({commit, state}) {
    return new Promise((resolve) => {
      axios.get('/api/banner', {params: state.banner.params}).then((res) => {
        let json = res.data
        commit('BANNER_LIST', json.data)
        resolve(json)
      })
    })
  },
  BANNER_SIZE_CHG ({commit, state}, size) {
    return new Promise((resolve) => {
      commit('BANNER_SET_SIZE', size)
    })
  },
  BANNER_PAGE_CHG ({commit, state}, page) {
    return new Promise((resolve) => {
      commit('BANNER_SET_PAGE', page)
    })
  },
  BANNER_POST ({commit, state}) {
    return new Promise((resolve) => {
      axios.post('/api/banner', state.banner.temp).then((res) => {
        let json = res.data
        if (json.code === 200) {
          state.banner.temp = {
            img: '',
            url: ''
          }
        }
        resolve(json)
      })
    })
  },
  BANNER_EDIT ({commit, state}, id) {
    return new Promise((resolve) => {
      axios.get('/api/banner/' + id).then((res) => {
        let json = res.data
        if (json.data) {
          commit('BANNER_EDIT', json.data)
        }
        resolve(json)
      })
    })
  },
  BANNER_DELETE ({commit, state}, id) {
    return new Promise((resolve) => {
      axios.delete('/api/banner/' + id).then((res) => {
        let json = res.data
        commit('BANNER_DEL', id)
        resolve(json)
      })
    })
  }
}

const mutations = {
  BANNER_LIST (state, paging) {
    state.banner.list = paging.data
    state.banner.total = paging.total
  },
  BANNER_SET_SIZE (state, size) {
    state.banner.params.size = size
  },
  BANNER_SET_PAGE (state, page) {
    state.banner.params.page = page
  },
  BANNER_EDIT (state, banner) {
    state.banner.temp = banner
  },
  BANNER_DEL (state, id) {
    console.log(state.link)
    for (const [i, v] of state.banner.list.entries()) {
      if (v.id === id) {
        state.banner.list.splice(i, 1)
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
