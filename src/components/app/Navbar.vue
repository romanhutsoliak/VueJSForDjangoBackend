<template lang="html">
    <nav class="navbar orange lighten-1">
        <div class="nav-wrapper">
            <div class="navbar-left">
                <a href="#" @click.prevent="$emit('sidebareClose')">
                    <i class="material-icons black-text">dehaze</i>
                </a>
                <span class="black-text">{{date}}</span>
            </div>

            <ul class="right hide-on-small-and-down">
                <li>
                    <a
                    class="dropdown-trigger black-text"
                    href="#"
                    data-target="dropdown"
                    ref="user_dropdown"
                    >
                        {{username}}
                        <i class="material-icons right">arrow_drop_down</i>
                    </a>

                    <ul id='dropdown' class='dropdown-content'>
                        <li v-if="!isAuthenticated">
                            <router-link to="/login" class="black-text">
                                <i class="material-icons">account_circle</i>Login
                            </router-link>
                        </li>
                        <li v-if="isAuthenticated">
                            <router-link to="/profile" class="black-text">
                                <i class="material-icons">account_circle</i>Профиль
                            </router-link>
                        </li>
                        <li v-if="isAuthenticated">
                            <a href="#" class="black-text" @click.prevent="logout">
                                <i class="material-icons">assignment_return</i>Выйти
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    data: () => ({
        date: new Date(),
        intervalInstance: null,
        dropdawnInstance: null
    }),
    computed: {
        username() {
            return this.$store.getters.currentUser.username || 'Guest'
        },
        isAuthenticated() {
            return this.$store.getters.isAuthenticated ? true : false
        }
    },
    methods: {
        async logout() {
            //try {
                await this.$store.dispatch('logout')
                this.$router.push('/login?message=logout');
            //} catch (e) {}
        },
        formateDate(value, format = 'date') {
            const options = {}

            if (format.includes('date')) {
                options.day = '2-digit'
                options.month = 'long'
                options.year = 'numeric'
            }
            if (format.includes('time')) {
                options.hour = '2-digit'
                options.minute = '2-digit'
                options.second = '2-digit'
            }

            const locale = this.$store.getters.currentUser.locale || 'en-En'
            return new Intl.DateTimeFormat(locale, options).format(value)
        }
    },
    mounted() {
        this.date = this.formateDate(new Date(), 'datetime')
        this.intervalInstance = setInterval(() => {
            this.date = this.formateDate(new Date(), 'datetime')
        }, 1000)
        this.dropdawnInstance = M.Dropdown.init(this.$refs.user_dropdown)
    },
    beforeDestroy() {
        clearInterval(this.intervalInstance)
        if (this.dropdawnInstance && this.dropdawnInstance.destroy) {
            this.dropdawnInstance.destroy()
        }
    }
}
</script>

<style lang="css" scoped>
</style>
