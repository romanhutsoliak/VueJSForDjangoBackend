import axios from 'axios'
import Vue from 'vue'
import { axiosHTTP } from '../plugins/axios'

export default {
    state: {
        isAuthenticated: typeof localStorage.auth_token != 'undefined' ? true : false,
        status: '',
        currentUser: {},
    },
    mutations: {
        authSetToken(state, token) {
            state.auth_token = token
        },
        authClearToken(state) {
            state.auth_token = null
        },
        auth_request: (state) => {
            state.status = 'loading'
        },
        auth_success: (state, token) => {
            state.status = 'success'
            state.token = token
        },
        auth_error: (state) => {
            state.status = 'error'
        },
        authSetCurrentUser(state, currentUser) {
            state.currentUser = currentUser
        },
        authSetIsAuthenticated(state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated
        }
    },
    actions: {
        async currentUser({dispatch, commit}) {
            try {
                await axiosHTTP.get('/auth/users/me/')
                    .then(response => {
                        commit('authSetCurrentUser', response.data)
                        //commit('authSetIsAuthenticated', true)
                    })
                    .catch(error => {
                        delete axiosHTTP.defaults.headers.common['Authorization']
                        localStorage.removeItem('auth_token')
                    })
            }
            catch(e) {
                commit('setError', e)
                throw e
            }
        },
        async login({dispatch, commit}, {email, password}) {
            await axiosHTTP.post('/auth/token/login/', {email, password}, {headers: {'Authorization': null}})
                .then(response => {
                    localStorage.setItem('auth_token', response.data.auth_token)
                    axiosHTTP.defaults.headers.common['Authorization'] = 'Token ' + response.data.auth_token
                    commit('authSetIsAuthenticated', true)
                })
                .catch(error => {
                    commit('setError', error.response.data.non_field_errors[0])
                    localStorage.removeItem('auth_token')
                })
                .finally(() => this.loading = false);

        },
        async logout({dispatch, commit}) {
            await axiosHTTP.post('/auth/token/logout/', {})
                .then(response => {
                    localStorage.removeItem('auth_token')
                    delete axiosHTTP.defaults.headers.common['Authorization']
                    commit('authSetIsAuthenticated', false)
                })
        },
        async register({dispatch, commit}, {email, username, phone, first_name, last_name, password, re_password}) {
            try {
                const res = await axios.post('http://127.0.0.1:8081/auth/users/', {
                    email,
                    username,
                    phone,
                    first_name,
                    last_name,
                    password,
                    re_password,
                })
                console.log(res.data)
            }
            catch(e) {
                commit('setError', e)
                throw e
            }
        },
    },
    getters: {
        currentUser: state => state.currentUser,
        isAuthenticated: state => state.isAuthenticated,
        authStatus: state => state.status,
    }
}
