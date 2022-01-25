<template>
    <component :is="layout">
        <router-view/>
    </component>
</template>

<script type="text/javascript">
import EmptyLayout from '@/layouts/Empty.vue'
import MainLayout from '@/layouts/Main.vue'
export default {
    computed: {
        layout () {
            return (this.$route.meta.layout || 'empty') + '-layout'
        }
    },
    components: {
        EmptyLayout, MainLayout
    }
}
</script>

<style lang="scss">
    @import '~materialize-css/dist/css/materialize.min.css';
    @import 'assets/index.css';
</style>
