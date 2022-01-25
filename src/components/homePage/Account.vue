<template>
    <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
            <div class="card-content white-text">
                <span class="card-title">Счет в валюте</span>

                <p v-for="cur in currencyArray" :key="cur"
                    class="currency-line"
                >
                    <span>{{ getCurrency(cur) + ' ' + getCurrencyIco(cur) }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        'currencyArray': ['USD', 'EUR', 'RUB', ]
    }),
    props: [ 'currency', 'account' ],
    mounted: () => {

    },
    computed: {
        base() {
            return this.account.amount / this.currency['RUB']
        }
    },
    methods: {
        getCurrency(currency) {
            return Math.floor(this.account.amount / this.currency[currency])
        },
        getCurrencyIco(currency) {
            if (currency == 'RUB') return 'Р';
            if (currency == 'EUR') return 'E';
            if (currency == 'USD') return '$';
        }
    }
}
</script>
