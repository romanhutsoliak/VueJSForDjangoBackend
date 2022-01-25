import { createApp } from 'vue'
import messagePlugin from '@/plugins/message'
import axiosPlugin from '@/plugins/axios'
import VuelidatePlugin from '@vuelidate/core'
import tooltipDirective from '@/directives/tooltip.directive'
import filters from '@/filters'
import Pagination from 'v-pagination-3';
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import router from './router'
import 'materialize-css/dist/js/materialize.min.js'
import Loader from '@/components/app/Loader'

const app = createApp(App)

// global filters
app.config.globalProperties.$filters = filters

app.use(store)
    .use(router)
    .use(VuelidatePlugin)
    .use(messagePlugin)
    .use(axiosPlugin)
    .directive('tooltip', tooltipDirective)
    .component('Loader', Loader)
    .component('Pagination', Pagination)
    .mount('#app')
