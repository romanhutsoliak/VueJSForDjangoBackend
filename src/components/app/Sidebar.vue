<template lang="html">
  <ul class="sidenav app-sidenav" :class="{open: openSidebare}">
    <router-link
      v-for="link in links"
      :key="link.url"
      active-class="active"
      custom
      :to="link.url"
      :exact="link.exact"
       v-slot="{ navigate, href, route }"
    >
      <li><a :href="link.url" class="waves-effect waves-orange pointer" @click="navigate">{{link.title}}</a></li>
    </router-link>
  </ul>

</template>

<script>
import filters from '@/filters'
export default {
    props: ['openSidebare'],
    data: () => ({
        links: [
            {title: filters.locale('Account'), url: '/', exact: true},
            {title: filters.locale('History'), url: '/history'},
            {title: filters.locale('Planning'), url: '/planning'},
            {title: filters.locale('New record'), url: '/record'},
            {title: filters.locale('Category'), url: '/categories'}
        ]
    })
}
</script>

<style lang="css" scoped>
</style>
