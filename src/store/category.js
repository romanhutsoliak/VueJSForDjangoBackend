import { axiosHTTP } from '../plugins/axios'

export default {
    state: {
        categories: null,
    },
    mutations: {
        setCategories(state, categories) {
            state.categories = categories
        },
        updateCategoty(state, newCategory) {
            const categoryId = newCategory.id
            let category = state.categories.find(category=>category.id==categoryId);
            if(category) {
                category.name = newCategory.name;
                category.limit = newCategory.limit;
            }
        },
    },
    actions: {
        async getCategories({dispatch, commit}) {
            try {
                await axiosHTTP.get('/api/categories/')
                    .then(response => {
                        commit('setCategories', response.data.results)
                    })
            }
            catch(e) {
                commit('setError', e)
                throw e
            }
        },
    },
    getters: {
        categories: state => state.categories,
    }
}
