import axios from 'axios'
import router from '../router'
import store from '../store'

const baseURL = 'http://127.0.0.1:8081'
const BEARER = typeof localStorage.auth_token != 'undefined' ? 'Token ' + localStorage.auth_token : ''

export const axiosHTTP = axios.create({
    baseURL
})

if (BEARER) axiosHTTP.defaults.headers.common['Authorization'] = BEARER
axiosHTTP.interceptors.response.use(function (response) {
    return response
}, function (error) {
    console.log(error.response.data)
    if (error.response.status === 401) {
        delete axiosHTTP.defaults.headers.common['Authorization']
        localStorage.removeItem('auth_token')
        store.commit('authSetIsAuthenticated', false)

        router.push('login')
    }
    else if (error.response.status === 400) {
        // store.commit('setError', error.response.data)
    }
    return Promise.reject(error)
})

export default {
    install(app, options) {
        app.config.globalProperties.$axios = axiosHTTP
    }
}
