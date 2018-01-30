import axios from '@/axios'
// import qs from 'qs'
const state = {
  article: {
    list: [],
    params: {
      first_id: 0,
      second_id: 0,
      third_id: 0,
      title: '',
      page: 1,
      size: 10
    },
    total: 0,
    temp: {title: '', content: ''}
  }
}

const getters = {
  article: state => state.article
}

const actions = {
  ARTICLE_LIST ({commit, state}) {
    return new Promise((resolve) => {
      axios.get('/api/article', {params: state.article.params}).then((res) => {
        let json = res.data
        commit('ARTICLE_LIST', json.data)
        resolve(json)
      })
    })
  },
  ARTICLE_SIZE_CHG ({commit, state}, size) {
    return new Promise((resolve) => {
      commit('ARTICLE_SET_SIZE', size)
    })
  },
  ARTICLE_PAGE_CHG ({commit, state}, page) {
    return new Promise((resolve) => {
      commit('ARTICLE_SET_PAGE', page)
    })
  },
  ARTICLE_POST ({commit, state}) {
    return new Promise((resolve) => {
      axios.post('/api/article', state.article.temp).then((res) => {
        let json = res.data
        resolve(json)
      })
    })
  },
  ARTICLE_EDIT ({commit, state}, id) {
    return new Promise((resolve) => {
      axios.get('/api/article/' + id).then((res) => {
        let json = res.data
        if (json.data) {
          commit('ARTICLE_EDIT', json.data)
        }
        resolve(json)
      })
    })
  }
}

const mutations = {
  ARTICLE_LIST (state, paging) {
    state.article.list = paging.data
    state.article.total = paging.total
  },
  ARTICLE_SET_SIZE (state, size) {
    state.article.params.size = size
  },
  ARTICLE_SET_PAGE (state, page) {
    state.article.params.page = page
  },
  ARTICLE_EDIT (state, article) {
    state.article.temp = article
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
