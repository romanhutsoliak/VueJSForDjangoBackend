import { createStore } from 'vuex'
import auth from './auth'
import currency from './currency'
import category from './category'

export default createStore({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error: s=> s.error
  },
  actions: {
  },
  modules: {
    auth, currency, category
  }
})
