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
        <small class="helper-text invalid">Email</small>
      </div>
      <div class="input-field">
        <input
            id="phone"
            type="text"
            v-model.trim="phone"
            :class="{invalid: v$.phone.$errors.length}"
        >
        <label for="Phone">Phone</label>
        <small class="helper-text invalid">Phone</small>
      </div>
      <div class="input-field">
        <input
            id="first_name"
            type="text"
            v-model.trim="first_name"
            :class="{invalid: v$.first_name.$errors.length}"
        >
        <label for="first_name">First name</label>
        <small class="helper-text invalid">First name</small>
      </div>
      <div class="input-field">
        <input
            id="last_name"
            type="text"
            v-model.trim="last_name"
            :class="{invalid: v$.last_name.$errors.length}"
        >
        <label for="last_name">Last name</label>
        <small class="helper-text invalid">Last name</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: v$.password.$errors.length}"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid">Password</small>
      </div>
      <div class="input-field">
        <input
            id="re_password"
            type="password"
            v-model.trim="re_password"
            :class="{invalid: v$.re_password.$errors.length}"
        >
        <label for="re_password">Повторить пароль</label>
        <small class="helper-text invalid">Re-type password</small>
      </div>
      <div class="input-field">
        <input
            id="username"
            type="text"
            v-model.trim="username"
            :class="{invalid: v$.username.$errors.length}"
        >
        <label for="username">Имя</label>
        <small class="helper-text invalid">Name</small>
      </div>
      <p>
        <label>
          <input type="checkbox" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { email, required, minLength } from "vuelidate/lib/validators";

export default {
  setup: () => ({ v$: useVuelidate() }),
  data: () => ({
    email: '',
    phone: '',
    first_name: '',
    last_name: '',
    password: '',
    re_password: '',
    username: '',
    agree: false

                    
  }),
  validations: {
    email: {email, required},
    phone: {},
    first_name: {},
    last_name: {},
    password: {required, minLength: minLength(6)},
    re_password: {required, minLength: minLength(6)},
    username: {required},
  },
  methods: {
    async submitForm() {
      const isFormCorrect = await this.v$.$validate()
      // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
      
      console.log(this.v$.email)
      // console.log(this.v$.email.$invalid)
      // console.log(this.v$.email.$errors)
      
      if (isFormCorrect) {
        this.$store.dispatch('register', {
          email: this.email,
          phone: this.phone,
          first_name: this.first_name,
          last_name: this.last_name,
          password: this.password,
          re_password: this.re_password,
          username: this.username,
        })
      }
      
      // actually submit form

      
    }
  }
}
</script>

<style lang="css" scoped>
</style>
