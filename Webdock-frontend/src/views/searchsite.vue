<template>
    <div class="container search_container">
        <div class="search_TitleContainer">
            <h1 class="search_Title"><b>Search results</b></h1>
            <searchComponent />
        </div>
        <div class="results-container">
            <request-overview v-for="feature in this.search.searchResults.features" :key="feature.id" :feature="feature" />
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import requestOverview from '../Components/featureRequest-components/requestOverview.vue';
import searchComponent from "../Components/shared/searchComponent.vue";
export default {
    components: {
        requestOverview,
        searchComponent,
    },
    computed: {
        ...mapState(["search"]),
    },
    mounted: async function () {
        const urlParams = new URLSearchParams(window.location.search)
        const query = urlParams.get("query")
        await this.$store.dispatch("search/searchAll", query)
    }
}
</script>
<style>
.search_container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 24px;
    padding-bottom: 24px;
    gap: 10px;
}

.results-container {
    background-color: #fff;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: 10px;
    padding: 25px;
    gap: 15px;
}

.search_TitleContainer {
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 30px;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    color: #fff;
}
</style>