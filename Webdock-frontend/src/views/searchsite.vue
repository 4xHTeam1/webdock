<template>
    <div class="container">
        <div class="results-container">

        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex';
export default{
    computed: { 
        ...mapState(["search"])
    },
        mounted: async function(){
            const urlParams = new URLSearchParams(window.location.search)
            const query = urlParams.get("query")
            await this.$store.dispatch("search/searchAll", query)
        }
    }
</script>
<style>
    .results-container{
        background-color: #fff;
        width: 100%;
        height: 75vh;
        margin: 3vh;
        border-radius: 10px;
    }
</style>