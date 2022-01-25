<template lang="html">
    <div>
        <div class="page-title">
            <h3>Новая запись</h3>
        </div>

        <form class="form" @submit.prevent="submitForm">
            <div class="input-field" >
                <select ref="new_record_select" v-model="category_id">
                    <option
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.id"
                    > {{ category.name }}</option>
                </select>
                <label>Выберите категорию</label>
                <div class="input-errors" v-for="(error, index) of v$.category_id.$errors" :key="index">
                    <span class="helper-text invalid">{{ error.$message }}</span>
                </div>
            </div>

            <p>
                <label>
                    <input
                        class="with-gap"
                        value="1"
                        name="type"
                        type="radio"
                        v-model="v$.type.$model"
                    />
                    <span>Доход</span>
                </label>
            </p>

            <p>
                <label>
                    <input
                        class="with-gap"
                        value="0"
                        name="type"
                        type="radio"
                        v-model="v$.type.$model"
                    />
                    <span>Расход</span>
                </label>
            </p>

            <div class="input-field">
                <input
                    id="amount"
                    type="text"
                    v-model="v$.amount.$model"
                >
                <label for="amount">Сумма</label>
                <div class="input-errors" v-for="(error, index) of v$.amount.$errors" :key="index">
                    <span class="helper-text invalid">{{ error.$message }}</span>
                </div>
            </div>

            <div class="input-field">
                <input
                    id="description"
                    type="text"
                    v-model="v$.description.$model"
                >
                <label for="description">Описание</label>
                <div class="input-errors" v-for="(error, index) of v$.description.$errors" :key="index">
                    <span class="helper-text invalid">{{ error.$message }}</span>
                </div>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                Создать
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { email, required, minLength, numeric, date } from "@vuelidate/validators";
import { reactive, ref } from 'vue'
export default {
    setup: () => {
        const externalResults = ref()
        return {
            externalResults,
            v$: useVuelidate({ $externalResults: externalResults })
        }
    },
    data: () => ({
        amount: '',
        category_id: '',
        type: 1,
        description: '',
        categories: [],
        loading: true,
    }),
    validations: () => ({
        amount: {required, numeric},
        category_id: {required, numeric},
        type: {required, numeric},
        description: {required},
    }),
    methods: {
        async submitForm() {
            this.v$.$validate()
            if (!this.v$.$error) {
                try {
                    const category = await this.$axios.post('/api/account-histories/', {
                        amount: this.amount,
                        category: this.category_id,
                        type: this.type,
                        description: this.description,
                    })

                    this.amount = ''
                    this.category_id = ''
                    this.type = ''
                    this.description = ''
                    this.v$.$reset()
                    this.$message('Запись создана')

                } catch (e) {
                    if (e.response.status == 400) {
                        this.externalResults = e.response.data
                    }
                }
            }
        }
    },
    async created() {
        await this.$store.dispatch('getCategories')
        this.categories = this.$store.getters.categories
    },
    mounted() {
        var this2 = this;
        setTimeout(function() {
            this2.select = M.FormSelect.init(this2.$refs.new_record_select)
            M.updateTextFields()
        }, 200);

        this.loading = false
    },
    destroyed() {
        if (this.select && this.select.destroy) {
            this.select.destroy()
        }
    },
}
</script>

<style lang="css" scoped>
</style>
