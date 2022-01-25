<template>
    <Loader v-if="loading"/>
    <div v-else>
        <div class="page-title">
        <h3>Счет</h3>

        <button class="btn waves-effect waves-light btn-small">
            <i class="material-icons">refresh</i>
        </button>
        </div>

        <div class="row">
            <Account :currency="currency" :account="account" />
            <CurrencyRates :currency="currency" />
        </div>
    </div>
</template>

<script>
    import Account from '@/components/homePage/Account'
    import CurrencyRates from '@/components/homePage/CurrencyRates'
    export default{
        data: () => ({
            loading: true,
            currency: null,
            account: null,
        }),
        async mounted() {
            await this.$store.dispatch('getCurrencyRates')
            this.currency = this.$store.getters.currency
            await this.$store.dispatch('getAccount')
            this.account = this.$store.getters.account
            this.loading = false
        },
        components: {
            Account, CurrencyRates
        },
    }
</script>
