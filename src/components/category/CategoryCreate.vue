<template>
    <div>
        <div class="page-subtitle">
            <h4>Создать</h4>
        </div>

        <form @submit.prevent="submitForm">
            <div class="input-field">
                <input
                    id="name"
                    type="text"
                    v-model.trim="name"
                    :class="{invalid: v$.name.$errors.length}"
                >
                <label for="name">Название</label>
                <div class="input-errors" v-for="(error, index) of v$.name.$errors" :key="index">
                    <span class="helper-text invalid">{{ error.$message }}</span>
                </div>
            </div>

            <div class="input-field">
                <input
                    id="limit"
                    type="text"
                    v-model.trim="limit"
                    :class="{invalid: v$.limit.$errors.length}"
                >
                <label for="limit">Лимит</label>
                <div class="input-errors" v-for="(error, index) of v$.limit.$errors" :key="index">
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
import { email, required, minLength, numeric } from "@vuelidate/validators";
import { reactive, ref } from 'vue'
export default {
    setup: () => {
        const externalResults = ref({})
        return {
            externalResults,
            v$: useVuelidate({ $externalResults: externalResults })
        }
    },
    data: () => ({
        name: '',
        limit: '',
    }),
    validations: () => ({
        name: {required},
        limit: {required, numeric}
    }),
    methods: {
        async submitForm() {
            this.v$.$validate()
            if (!this.v$.$error) {
                try {
                    const category = await this.$axios.post('/api/categories/', {name: this.name, limit: this.limit})

                    this.name = ''
                    this.limit = ''
                    this.v$.$reset()
                    this.$message('Категория создана')

                    this.$emit('categoryWasCreated', category.data)
                } catch (e) {
                    if (e.response.status == 400) {
                        Object.assign(this.externalResults, e.response.data)
                    }
                }
            }
        }
    },
    mounted() {

    }
}
</script>
