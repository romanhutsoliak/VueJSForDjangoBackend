<template>
    <div class='VuePagination' :class='props.theme.wrapper'>
        <nav :class='props.theme.nav'>

            <ul v-show="props.showPagination" class="pagination" :class="props.theme.list">

                <li v-if="props.hasEdgeNav" :class='props.theme.firstPage' @click="props.setFirstPage">
                    <a href="javascript:void(0);" v-bind="props.firstPageProps">{{props.texts.first}}</a>
                </li>

                <li v-if="props.hasChunksNav" :class='props.theme.prevChunk' @click="props.setPrevChunk">
                    <a href="javascript:void(0);" v-bind="props.prevChunkProps">{{props.texts.prevChunk}}</a>
                </li>

                <li :class="props.theme.prev" @click="props.setPrevPage">
                    <a href="javascript:void(0);" v-bind="props.prevProps">{{props.texts.prevPage}}</a>
                </li>

                <li v-for="page in props.pages" :key="page" :class="props.pageClasses(page)"
                    v-on="props.pageEvents(page)">
                    <a href="javascript:void(0);" v-bind="props.aProps" :class="props.theme.link">{{page}}</a>
                </li>

                <li :class="props.theme.next" @click="props.setNextPage">
                    <a href="javascript:void(0);" v-bind="props.nextProps">{{props.texts.nextPage}}</a>
                </li>

                <li v-if="props.hasChunksNav" :class='props.theme.nextChunk' @click="props.setNextChunk">
                    <a href="javascript:void(0);" v-bind="props.nextChunkProps">{{props.texts.nextChunk}}</a>
                </li>

                <li v-if="props.hasEdgeNav" :class="props.theme.lastPage" @click="props.setLastPage">
                    <a href="javascript:void(0);" v-bind="props.lastPageProps">{{props.texts.last}}</a>
                </li>

            </ul>

            <p v-show="props.hasRecords" :class='props.theme.count'>{{props.count}}</p>

        </nav>
    </div>

</template>

<script>
    export default {
        name: 'MyPagination',
        props: ['props']
    }
</script>

<style scoped>
    nav {
        background-color: transparent;
        height: auto;
        box-shadow: none;
        line-height: inherit;
    }
    nav li {
        margin-right: 5px;
    }
</style>
