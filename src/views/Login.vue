<template lang="html">
  <form class="card auth-card" @submit.prevent="submitForm">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: v$.email.$errors.length}"
        >
        <label for="email">Email</label>
        <div class="input-errors" v-for="(error, index) of v$.email.$errors" :key="index">
          <small class="helper-text invalid">{{ error.$message }}</small>
        </div>
        
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: v$.password.$errors.length}"
        >
        <label for="password">Пароль</label>
        <div class="input-errors" v-for="(error, index) of v$.password.$errors" :key="index">
          <small class="helper-text invalid">{{ error.$message }}</small>
        </div>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { email, required, minLength } from "@vuelidate/validators";

export default {
  data: () => ({
    v$: useVuelidate(),
    email: '',
    password: ''
  }),
  validations: () => ({
    email: {email, required},
    password: {required, minLength: minLength(3)}
  }),
  methods: {
    async submitForm() {
      this.v$.$validate()
      if (!this.v$.$error) {
        // actually submit form
        try {
          //console.log(this.$axios3)
          await this.$store.dispatch('login', {email: this.email, password: this.password})
          this.$router.push('/')
        } catch (e) {}
        
      }
    }
  },
  mounted() {
    
  }
}
</script>

<style lang="css" scoped>
</style>
