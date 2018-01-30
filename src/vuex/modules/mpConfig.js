import axios from '@/axios'
// import qs from 'qs'
const state = {
  mpConfig: {
    list: [],
    params: {
      name: '',
      page: 1,
      size: 10
    },
    total: 0,
    temp: {
      appId: '',
      name: '',
      secret: '',
      token: '',
      aesKey: ''
    }
  }
}

const getters = {
  mpConfig: state => state.mpConfig
}

const actions = {
  MP_CONFIG_LIST ({commit, state}) {
    return new Promise((resolve) => {
      axios.get('/api/mp-config', {params: state.mpConfig.params}).then((res) => {
        let json = res.data
        commit('MP_CONFIG_LIST', json.data)
        resolve(json)
      })
    })
  },
  MP_CONFIG_SIZE_CHG ({commit, state}, size) {
    return new Promise((resolve) => {
      commit('MP_CONFIG_SET_SIZE', size)
    })
  },
  MP_CONFIG_PAGE_CHG ({commit, state}, page) {
    return new Promise((resolve) => {
      commit('MP_CONFIG_SET_PAGE', page)
    })
  },
  MP_CONFIG_DELETE ({commit, state}, id) {
    return new Promise((resolve) => {
      axios.delete('/api/mp-config/' + id).then((res) => {
        let json = res.data
        commit('MP_CONFIG_DEL', id)
        resolve(json)
      })
    })
  },
  MP_CONFIG_POST ({commit, state}) {
    return new Promise((resolve) => {
      axios.post('/api/mp-config', state.mpConfig.temp).then((res) => {
        let json = res.data
        resolve(json)
      })
    })
  },
  MP_CONFIG_EDIT ({commit, state}, id) {
    return new Promise((resolve) => {
      axios.get('/api/mp-config/' + id).then((res) => {
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
  MP_CONFIG_LIST (state, paging) {
    state.mpConfig.list = paging.data
    state.mpConfig.total = paging.total
  },
  MP_CONFIG_SET_SIZE (state, size) {
    state.mpConfig.params.size = size
  },
  MP_CONFIG_SET_PAGE (state, page) {
    state.mpConfig.params.page = page
  },
  MP_CONFIG_DEL (state, id) {
    for (const [i, v] of state.mpConfig.list.entries()) {
      if (v.id === id) {
        state.mpConfig.list.splice(i, 1)
        break
      }
    }
  },
  MP_CONFIG_EDIT (state, config) {
    state.mpConfig.temp = config
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
