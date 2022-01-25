<template lang="html">
    <div>
        <div class="page-title">
            <h3>{{ $filters.locale('Profile') }}</h3>
        </div>

        <form class="form" @submit.prevent="submitForm">
            <div class="input-field">
                <input
                    id="input_name"
                    type="text"
                    v-model="v$.name.$model"
                />
                <label for="input_name">{{ $filters.locale('Name') }}</label>
                <div class="input-errors" v-for="(error, index) of v$.name.$errors" :key="index">
                    <span class="helper-text invalid">{{ error.$message }}</span>
                </div>
            </div>

            <div class="input-field">
                <div class="switch">
                    <label>
                    English
                    <input type="checkbox" v-model="v$.isRuLocale.$model">
                    <span class="lever"></span>
                    Русский
                    </label>
                </div>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                {{ $filters.locale('Update') }}
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { email, required, minLength, numeric, date, boolean } from "@vuelidate/validators";
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
        name: '',
        isRuLocale: false,
        loading: true,
    }),
    validations: () => ({
        name: {required},
        isRuLocale: {required},
    }),
    mounted() {
        this.name = this.$store.getters.currentUser.username
        this.isRuLocale = this.$store.getters.currentUser.locale !== 'en-En'
        setTimeout(() => {
            M.updateTextFields()
        }, 100);
    },
    methods: {
        async submitForm() {
            this.v$.$validate()
            if (!this.v$.$error) {
                try {
                    const res = await this.$axios.put('/auth/users/me/', {
                        username: this.name,
                        locale: this.isRuLocale ? 'ru-Ru' : 'en-En',
                    })
                    this.$store.commit('authSetCurrentUser', res.data)

                    this.v$.$reset()
                    this.$message('Изменения сохранены')
                } catch (e) {
                    if (e.response.status == 400) {
                        this.externalResults = e.response.data
                    }
                }
            }
        }
    },
}
</script>

<style lang="css" scoped>
</style>
