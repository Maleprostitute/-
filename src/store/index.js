import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state: {
    cachelist: [],
    token: localStorage.getItem('token'),
    id: localStorage.getItem('id')
  },
  mutations: {
    addcache(state, name) {
      if (!state.cachelist.includes(name)) {
        state.cachelist.push(name)
        console.log('添加')
      }
    },
    delcache(state, name) {
      const res = state.cachelist.filter(item => {
        return item !== name
      })
      state.cachelist = res
      console.log('删除')
    },
    setToken(state, payload) {
      state.token = payload.token
      state.id = payload.id
      localStorage.setItem('token', payload.token)
      localStorage.setItem('id', payload.id)
    },
    removeToken(state) {
      state.token = ''
      state.id = ''
      localStorage.removeItem('token')
      localStorage.removeItem('id')
    }
  }
})

export default store
