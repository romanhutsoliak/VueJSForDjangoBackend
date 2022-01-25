<template lang="html">
    <Loader v-if="loading" />
    <div class="app-main-layout" v-else>

        <Navbar @sidebareClose="sidebareIsOpen = !sidebareIsOpen" />

        <Sidebar v-model:openSidebare="sidebareIsOpen" :key="localeWasChanged" />

        <main class="app-content" :class="{full: !sidebareIsOpen}">
            <div class="app-page">
                <router-view />
            </div>
        </main>
        <div class="fixed-action-btn">
            <router-link to="/record" class="btn-floating btn-large blue" v-tooltip="'Create new record'">
                <i class="large material-icons">add</i>
            </router-link>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/app/Sidebar'
import Navbar from '@/components/app/Navbar'
import Loader from '@/components/app/Loader'
import messages from '@/utils/messages'
export default {
    data: () => ({
        sidebareIsOpen: true,
        loading: true,
    }),
    components: {
        Sidebar, Navbar, Loader
    },
    async mounted() {
        await this.$store.dispatch('currentUser')
        this.loading = false
    },
    computed: {
        error() {
            return this.$store.getters.error
        },
        localeWasChanged() {
            return this.$store.getters.currentUser.locale
        },
    },
    watch: {
        error(e) {
            return this.$error(messages[e] || e || 'Something went wrong')
        }
    }
}
</script>

<style lang="css" scoped>
</style>
