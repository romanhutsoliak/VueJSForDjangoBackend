<template>
    <div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
            <div class="card-content white-text">
                <div class="card-header">
                    <span class="card-title">Курс валют</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Валюта</th>
                            <th>Курс</th>
                            <th>Дата</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="cur in currencyArray" :key="cur">
                            <td>{{cur}}</td>
                            <td>{{ currency[cur + '_formated'] || currency[cur] }}</td>
                            <td>{{ currencyDateFormat(currency.date) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
//import { computed } from 'vue-demi'
export default {
    data: () => ({
        'currencyArray': ['USD', 'EUR', 'RUB', ]
    }),
    props: [ 'currency' ],
    methods: {
        currencyDateFormat(date) {
            var today = new Date(date);
            return today.toLocaleDateString("en-US"); // 9/17/2016
        }
    }
}
</script>
