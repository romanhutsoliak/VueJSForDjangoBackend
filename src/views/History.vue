<template lang="html">
    <div>
        <div class="page-title">
            <h3>История записей</h3>
        </div>

        <div class="history-chart">
            <vue3-chart-js
                ref="chartRef"
                :id="doughnutChart.id"
                :type="doughnutChart.type"
                :data="doughnutChart.data"
                @before-render="beforeRenderLogic"
            />
            <div @click="updateChart">Update</div>
        </div>

        <section>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Сумма</th>
                        <th>Дата</th>
                        <th>Категория</th>
                        <th>Тип</th>
                        <th>Открыть</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(history, index) of accountHistory" :key="index">
                        <td>{{ history.id }}</td>
                        <td>{{ history.amount }}</td>
                        <td>{{ history.date}}</td>
                        <td>{{ !!history.category ? history.category.name : '' }}</td>
                        <td>
                            <span v-if="history.type == 1" class="white-text badge green">Доход</span>
                            <span v-else class="white-text badge red">Расход</span>
                        </td>
                        <td>
                            <router-link :to="{ name: 'historyDetail', params: { id: history.id }}">
                                <button class="btn-small btn" @click="historyDetailClick">
                                    <i class="material-icons">open_in_new</i>
                                </button>
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>

            <Pagination v-model="paginationPage" :records="paginationAllCount" :per-page="paginationPerPageCount" :options="paginationOptions" @paginate="paginationClick"/>
        </section>
    </div>
</template>

<script>
    import paginationMixin from '@/mixins/pagination.mixin'
    import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
    import { ref, getCurrentInstance, onMounted } from 'vue'

    export default{
        mixins: [paginationMixin],
        components: {Vue3ChartJs},
        data: () => ({
            loading: true,
            categories: [],
            accountHistory: null,
        }),
        async mounted() {
            this.loadAccountHistory()

            this.loading = false
        },
        methods: {
            paginationClick() {
                this.$router.push(`${this.$route.path}?page=${this.paginationPage}`)
                this.loadAccountHistory()
            },
            async loadAccountHistory() {
                const result = await this.$axios.get('/api/account-histories/?page='+this.paginationPage+'&count='+this.paginationPerPageCount)
                this.accountHistory = this.setupPagination(result.data)
            }
        },
        setup () {
            const chartRef = ref(null)
            const axios = getCurrentInstance().appContext.app.config.globalProperties.$axios;

            const doughnutChart = {
                id: 'doughnut',
                type: 'doughnut',
                data: {
                    labels: [],
                    datasets: [{
                        backgroundColor: [],
                        data: []
                    }]
                },
                // data: {
                //     labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                //     datasets: [
                //     {
                //         backgroundColor: [
                //         '#41B883',
                //         '#E46651',
                //         '#00D8FF',
                //         '#DD1B16'
                //         ],
                //         data: [40, 20, 80, 10]
                //     }
                //     ]
                // },
                options: {
                    plugins: {}
                }
            }

            onMounted(async () => {
                updateChart()
            })

            const updateChart = async () => {
                const requestData = await axios.get('/api/planning/?count=10')
                doughnutChart.data.labels = []
                doughnutChart.data.datasets[0] = {data:[],  backgroundColor:[]}
                const colors = ['#41B883', '#E46651', '#00D8FF','#DD1B16']
                let i = 0
                requestData.data.results.forEach(function(category) {
                    doughnutChart.data.labels.push(category.name)
                    doughnutChart.data.datasets[0].data.push(+category.category_amount_spend)
                    doughnutChart.data.datasets[0].backgroundColor.push(colors[i])
                    i++
                })

                chartRef.value.update(250)
            }

            return {
                doughnutChart,
                updateChart,
                chartRef
            }
        },
    }
</script>


<style lang="css" scoped>
</style>
