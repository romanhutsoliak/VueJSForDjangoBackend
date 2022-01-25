import paginationTemplate from '@/views/Pagination'

export default {
    data: () => ({
        paginationPage: 1,
        paginationAllCount: 20,
        paginationPerPageCount: 5,
        paginationOptions: {
            template: paginationTemplate
        },
    }),
    created() {
        this.paginationPage = this.$route.query.page || 1
    },
    methods: {
        setupPagination(resultData) {
            this.paginationAllCount = resultData.count
            this.paginationPerPageCount = resultData.page_size

            return resultData.results || resultData
        }
    }
}
