<template>
    <div class="dropdownelement-container">
        <router-link class="dropdownelement" :to="`/feature-request/${feature.id}`">{{ feature.title }}</router-link>
    </div>
</template>
<script>
export default {
    props:{
        feature:{
            type: Object,
            required: true
        }
    },
    created(){
        console.log(this.feature)
    }
}
</script>
<style>
    .dropdownelement-container{
        display: flex;
        flex: 1;
        min-width: 0;
        max-height: 35px;
        border-bottom: 2px solid #e0e0e0;
    }
    .dropdownelement-container:hover{
        background-color: #e0e0e0;
    }
    .dropdownelement{
        text-decoration: none;
        color: #000;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        padding: 3px;
        z-index: 1001;
    }
    .dropdownelement:hover{
        text-decoration: none;
        color: #000;
    }
</style>