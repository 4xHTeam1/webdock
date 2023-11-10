<template>
    <div class="container d-flex">
            <CreatePost/>
            <div class="overview-area">
                <requestOverview status="planned" color="#1FA0FF"/>
                <requestOverview status="under review" color="#85B5B5"/>
                <requestOverview status="in progress" color="#C17AFF"/>
                <requestOverview status="in progress" color="#C17AFF"/>
                <requestOverview status="in progress" color="#C17AFF"/>
                <requestOverview status="in progress" color="#C17AFF"/>
                <requestOverview status="in progress" color="#C17AFF"/>
                <requestOverview status="in progress" color="#C17AFF"/>

            </div>
    </div>
</template>

<script>
import CreatePost from '../Components/CreatePost.vue'
import requestOverview from '../Components/requestOverview.vue'
export default {
    components: {
    CreatePost,
    requestOverview
  }
}
</script>

<style>
body{
    width: 100%;
    height: auto;
    background-image: url("../Assets/webdock-baggrund.jpg");
    background-repeat: no-repeat;
    background-size: cover;
}

.overview-area{
    background-color: #FCFCFC;
    border-radius: 10px;
    width: 600px;
    max-height: 100%;
    margin-left: 20px;
    overflow-y: auto;
    overflow-x: hidden;
}


</style>