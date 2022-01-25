<template lang="html">
  <div>
    <div>
      <div class="breadcrumb-wrap">
        <a href="/history" class="breadcrumb">История</a>
        <a class="breadcrumb">
          Расход
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="[{ green: history.type }, 'red']">
            <div class="card-content white-text">
                <p>Ид транзакции: {{ history.id }}</p>
                <p>Описание: {{ history.description }}</p>
                <p>Сумма: {{ history.amount }}</p>
                <p>Категория: {{ !!history.category ? history.category.name : '' }}</p>
                <p>Дата: {{ history.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data: () => ({
        loading: true,
        history: {},
    }),
    async mounted() {
        const historyData = await this.$axios.get('/api/account-histories/'+ this.$route.params.id+ '/')
        this.history = historyData.data
        console.log(this.history)
    },
}
</script>

<style lang="css" scoped>
</style>
