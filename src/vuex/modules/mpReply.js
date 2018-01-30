import axios from '@/axios'
// import qs from 'qs'
const state = {
  mpReply: {
    list: [],
    params: {
      key: '',
      mp_id: 0,
      page: 1,
      size: 10
    },
    total: 0,
    temp: {mpId: '', type: 1, keyword: '', content: ''}
  }
}

const getters = {
  mpReply: state => state.mpReply
}

const actions = {
  MP_REPLY_LIST ({commit, state}) {
    return new Promise((resolve) => {
      axios.get('/api/mp-reply', {params: state.mpReply.params}).then((res) => {
        let json = res.data
        commit('MP_REPLY_LIST', json.data)
        resolve(json)
      })
    })
  },
  MP_REPLY_SIZE_CHG ({commit, state}, size) {
    return new Promise((resolve) => {
      commit('MP_REPLY_SET_SIZE', size)
    })
  },
  MP_REPLY_SET_MPID ({commit, state}, id) {
    return new Promise((resolve) => {
      commit('MP_REPLY_SET_MPID', id)
    })
  },
  MP_REPLY_PAGE_CHG ({commit, state}, page) {
    return new Promise((resolve) => {
      commit('MP_REPLY_SET_PAGE', page)
    })
  },
  MP_REPLY_DELETE ({commit, state}, id) {
    return new Promise((resolve) => {
      axios.delete('/api/mp-reply/' + id).then((res) => {
        let json = res.data
        commit('MP_REPLY_DEL', id)
        resolve(json)
      })
    })
  },
  MP_REPLY_POST ({commit, state}) {
    return new Promise((resolve) => {
      axios.post('/api/mp-reply', state.mpReply.temp).then((res) => {
        let json = res.data
        resolve(json)
      })
    })
  },
  MP_REPLY_EDIT ({commit, state}, id) {
    return new Promise((resolve) => {
      axios.get('/api/mp-reply/' + id).then((res) => {
        let json = res.data
        if (json.data) {
          commit('MP_REPLY_EDIT', json.data)
        }
        resolve(json)
      })
    })
  }
}

const mutations = {
  MP_REPLY_LIST (state, paging) {
    state.mpReply.list = paging.data
    state.mpReply.total = paging.total
  },
  MP_REPLY_SET_SIZE (state, size) {
    state.mpReply.params.size = size
  },
  MP_REPLY_SET_PAGE (state, page) {
    state.mpReply.params.page = page
  },
  MP_REPLY_SET_MPID (state, id) {
    state.mpReply.params.mpId = id
  },
  MP_REPLY_DEL (state, id) {
    for (const [i, v] of state.mpReply.list.entries()) {
      if (v.id === id) {
        state.mpReply.list.splice(i, 1)
        break
      }
    }
  },
  MP_REPLY_EDIT (state, config) {
    state.mpReply.temp = config
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
