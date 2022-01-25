import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next()
        return
    }
    else next('/')
}
const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next()
        return
    }
    else next('/login')
}

const routes = [
    {
        path: '/login',
        name: 'login',
        meta: { layout: 'empty' },
        component: () => import('../views/Login.vue'),
        beforeEnter: ifNotAuthenticated,
    },
    {
        path: '/register',
        name: 'register',
        meta: { layout: 'empty' },
        component: () => import('../views/Register.vue'),
        beforeEnter: ifNotAuthenticated,
    },
    {
        path: '/',
        name: 'Home',
        meta: { layout: 'main' },
        component: () => import('../views/Home.vue'),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/categories',
        name: 'categories',
        meta: { layout: 'main' },
        component: () => import('../views/Categories.vue'),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/record',
        name: 'record',
        meta: { layout: 'main' },
        component: () => import('../views/Record.vue'),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/history/:id',
        name: 'historyDetail',
        meta: { layout: 'main' },
        component: () => import('../views/DetailRecord.vue'),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/history',
        name: 'history',
        meta: { layout: 'main' },
        component: () => import('../views/History.vue'),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/planning',
        name: 'planning',
        meta: { layout: 'main' },
        component: () => import('../views/Planning.vue'),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/profile',
        name: 'profile',
        meta: { layout: 'main' },
        component: () => import('../views/Profile.vue'),
        beforeEnter: ifAuthenticated,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
