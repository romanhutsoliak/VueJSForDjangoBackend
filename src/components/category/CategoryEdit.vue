<template>
    <div>
        <div class="page-subtitle">
            <h4>Редактировать</h4>
        </div>

        <form @submit.prevent="submitForm">
            <div class="input-field" >
                <select ref="select" v-model="id">
                    <option
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.id"
                    > {{ category.name }}</option>
                </select>
                <label>Выберите категорию</label>
                <div class="input-errors" v-for="(error, index) of v$.id.$errors" :key="index">
                    <span class="helper-text invalid">{{ error.$message }}</span>
                </div>

            </div>

            <div class="input-field">
                <input type="text" v-model="name" id="name2">
                <label for="name2">Название</label>
                <div class="input-errors" v-for="(error, index) of v$.name.$errors" :key="index">
                    <span class="helper-text invalid">{{ error.$message }}</span>
                </div>
            </div>

            <div class="input-field">
                <input
                    v-model="limit"
                    type="text"
                >
                <label for="limit">Лимит</label>
                <div class="input-errors" v-for="(error, index) of v$.limit.$errors" :key="index">
                    <span class="helper-text invalid">{{ error.$message }}</span>
                </div>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                Обновить
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { email, required, minLength, numeric, integer } from "@vuelidate/validators";
import { ref } from 'vue'
export default {
    setup: () => {
        const externalResults = ref({})
        return {
            externalResults,
            v$: useVuelidate({ $externalResults: externalResults })
        }
    },
    data: () => ({
        select: null,
        name: '',
        limit: '',
        id: '',
    }),
    validations: () => ({
        name: {required},
        limit: {required, numeric},
        id: {required, integer},
    }),
    props: {
        categories: {
            type: Array,
            required: true,
        },
        updateCategorySelectIndex: {
            type: Number,
            required: false,
        }
    },
    methods: {
        async submitForm() {
            this.v$.$validate()
            if (!this.v$.$error) {
                try {
                    const category = await this.$axios.put('/api/categories/'+this.id+'/', {name: this.name, limit: this.limit})
                    this.$store.commit('updateCategoty', category.data)

                    this.$message('Категория обновлена')

                    this.$emit('updatedCategoty', category.data)
                } catch (e) {
                    if (typeof e.response != 'undefined' && e.response.status == 400) {
                        Object.assign(this.externalResults, e.response.data)
                    } else throw e
                }
            }
        },
    },
    watch: {
        id(categoryId) {
            const {name, limit} = this.categories.find(category => category.id == categoryId)
            this.name = name
            this.limit = limit
        }
    },
    created() {
        this.id = this.updateCategorySelectIndex ? this.updateCategorySelectIndex : this.categories[0].id
    },
    mounted() {
        this.select = M.FormSelect.init(this.$refs.select)
        M.updateTextFields()
    },
    destroyed() {
        if (this.select && this.select.destroy) {
            this.select.destroy()
        }
    },
}
</script>
