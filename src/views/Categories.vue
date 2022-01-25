<template lang="html">
    <div>
        <div class="page-title">
            <h3>Категории</h3>
        </div>
        <Loader v-if="loading" />
        <section v-else>
            <div class="row">
                <div class="col s12 m6">
                    <CategoryCreate
                        @categoryWasCreated="categoryWasCreatedFn"
                    />
                </div>
                <div class="col s12 m6">
                    <!-- :key - re-render component if value changes -->
                    <!-- :updateCategorySelectIndex - after re-render keep show edited select -->
                    <!-- @updatedCategoty - listener for $emit() -->
                    <CategoryEdit
                        :categories="categories"
                        :updateCategorySelectIndex="updateCategorySelectIndex"
                        :key="categories.length + updatedCategoryCount"
                        @updatedCategoty="updatedCategotyFn"
                        v-if="categories.length"
                    />
                    <div v-else>Нет категорий для изменения</div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import CategoryCreate from '@/components/category/CategoryCreate'
    import CategoryEdit from '@/components/category/CategoryEdit'
    export default {
        data: () => ({
            categories: [],
            updatedCategoryCount: 0,
            updateCategorySelectIndex: 0,
            loading: true,
        }),
        components: {
            CategoryCreate, CategoryEdit
        },
        methods: {
            categoryWasCreatedFn(category) {
                this.categories.push(category)
            },
            updatedCategotyFn(category) {
                this.updateCategorySelectIndex = category.id
                this.updatedCategoryCount++
            },
        },
        async mounted() {
            await this.$store.dispatch('getCategories')
            this.categories = this.$store.getters.categories
            this.loading = false
        }
    }
</script>

<style lang="css" scoped>
</style>
