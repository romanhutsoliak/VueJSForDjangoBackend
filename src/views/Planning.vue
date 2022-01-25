<template lang="html">
    <div>
        <div class="page-title">
            <h3>Планирование</h3>
            <h4>{{ account.amount }}</h4>
        </div>
        <section>
            <div v-for="(category, index) of categories" :key="index" v-tooltip="category.tooltip">
                <p><strong>{{ category.name }}:</strong> {{ category.category_amount_spend || 0 }} из {{ category.limit }}</p>
                <div class="progress" >
                    <div
                        class="determinate"
                        :class="[category.categoryColor]"
                        :style="{width: category.categoryPercent + '%'}"></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data: () => ({
        loading: true,
        categories: {},
        account: {},
    }),
    async mounted() {
        const requestData = await this.$axios.get('/api/planning/?count=10')
        this.categories = requestData.data.results.map(category => {
            const categoryPercent = 100 * category.category_amount_spend / category.limit
            const categoryColor = categoryPercent <= 60 ? 'green' :
                (categoryPercent < 100 ? 'yellow' : 'red')

            let tooltip = category.limit - category.category_amount_spend
            if (tooltip > 0) tooltip = 'There is '+tooltip+' left';
            else if (tooltip < 0) tooltip = 'You overheaded your budget for '+tooltip;
            else if (tooltip == 0) tooltip = 'Your budget is over';

            return {
                ...category,
                categoryColor,
                categoryPercent,
                tooltip
            }
        })
        this.account = (await this.$axios.get('/api/current-user/account/')).data || {}
        this.loading = false
    },
}
</script>

<style lang="css" scoped>
</style>
