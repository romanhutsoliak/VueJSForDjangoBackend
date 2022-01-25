import { axiosHTTP } from '../plugins/axios'

export default {
    state: {
        currency: null,
        account: null,
        accountHistory: []
    },
    mutations: {
        setCurrency(state, currency) {
            state.currency = currency
        },
        setAccount(state, account) {
            state.account = account
        },
        setAccountHistory(state, accountHistory) {
            state.accountHistory = accountHistory
        },
    },
    actions: {
        async getCurrencyRates({dispatch, commit}) {
            try {
                await axiosHTTP.get('/api/currency-rates/')
                    .then(response => {
                        commit('setCurrency', response.data)
                    })
            }
            catch(e) {
                commit('setError', e)
                throw e
            }
        },

        async getAccount({dispatch, commit}) {
            try {
                await axiosHTTP.get('/api/current-user/account/')
                    .then(response => {
                        commit('setAccount', response.data)
                    })
            }
            catch(e) {
                commit('setError', e)
                throw e
            }
        },
        async getAccountHistory({dispatch, commit}) {
            try {
                await axiosHTTP.get('/api/account-histories/')
                    .then(response => {
                        commit('setAccountHistory', response.data.results)
                    })
            }
            catch(e) {
                commit('setError', e)
                throw e
            }
        },
    },
    getters: {
        currency: state => state.currency,
        account: state => state.account,
        accountHistory: state => state.accountHistory,
    }
}
