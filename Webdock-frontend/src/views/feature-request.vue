<template>
    <div class="container d-flex justify-content-center featureRequest_Container">
        <CreatePost />
        <div class="featureRequest_OverviewContainer">
            <div class="overview-area">
                <requestOverview status="planned" color="#1FA0FF" />
                <requestOverview status="under review" color="#85B5B5" />
                <requestOverview status="in progress" color="#C17AFF" />
                <requestOverview status="in progress" color="#C17AFF" />
                <requestOverview status="in progress" color="#C17AFF" />
                <requestOverview status="in progress" color="#C17AFF" />
                <requestOverview status="in progress" color="#C17AFF" />
                <requestOverview status="in progress" color="#C17AFF" />
            </div>
        </div>
    </div>
</template>

<script>
import navbar from '../Components/navbar.vue'
import CreatePost from '../Components/featureRequest-components/CreatePost.vue'
import requestOverview from '../Components/featureRequest-components/requestOverview.vue'
export default {
    components: {
        CreatePost,
        requestOverview,
        navbar
    }
}
</script>

<style>
.featureRequest_Container {
    flex: 1 1 0;
    gap: 18px;
    padding: 24px 0;
}

.featureRequest_OverviewContainer {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
}

.overview-area {
    flex: 1 1 0;
    overflow-y: auto;
    overflow-x: hidden;
    flex-wrap: nowrap;
    background: #FCFCFC;
    border-radius: 10px;
    max-width: 600px;
}
</style>