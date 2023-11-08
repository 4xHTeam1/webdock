<template>
    <div class="container d-flex">
            <CreatePost/>
            <requestOverview/>
    </div>
</template>

<script>
import CreatePost from '../Components/CreatePost.vue'
import requestOverview from '../Components/requestOverview.vue'
import navbar from '../Components/navbar.vue'
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



</style>