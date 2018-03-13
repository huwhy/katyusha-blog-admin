import axios from '@/axios'
// import qs from 'qs'
const state = {
  systemConfig: {
    companyCn: '',
    companyEn: '',
    companyPerson: '',
    companyPhone: '',
    companyMail: '',
    companyAddress: ''
  },
  seo: {
    id: 0,
    title: '',
    desc: '',
    words: ''
  }
}

const getters = {
  systemConfig: state => state.systemConfig,
  seo: state => state.seo
}

const actions = {
  SYSTEM_CONFIG_POST ({commit, state}) {
    return new Promise((resolve) => {
      axios.post('/api/system', state.systemConfig).then((res) => {
        let json = res.data
        if (json.code === 200) {
          state.systemConfig = {
            companyCn: '',
            companyEn: '',
            companyPerson: '',
            companyPhone: '',
            companyMail: '',
            companyAddress: ''
          }
        }
        resolve(json)
      })
    })
  },
  SYSTEM_CONFIG_GET ({commit, state}) {
    return new Promise((resolve) => {
      axios.get('/api/system').then((res) => {
        let json = res.data
        commit('SYSTEM_CONFIG_EDIT', json.data)
        resolve(json.data)
      })
    })
  },
  SEO_POST ({commit, state}) {
    return new Promise((resolve) => {
      axios.post('/api/seo', state.seo).then((res) => {
        let json = res.data
        if (json.code === 200) {
          state.seo = {
            id: '',
            title: '',
            desc: '',
            words: ''
          }
        }
        resolve(json)
      })
    })
  },
  SEO_GET ({commit, state}) {
    return new Promise((resolve) => {
      axios.get('/api/seo').then((res) => {
        let json = res.data
        commit('SEO_EDIT', json.data)
        resolve(json.data)
      })
    })
  }
}

const mutations = {
  SYSTEM_CONFIG_EDIT (state, config) {
    state.systemConfig = config
  },
  SEO_EDIT (state, seo) {
    state.seo = seo
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
