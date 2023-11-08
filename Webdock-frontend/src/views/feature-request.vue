<template>
    <div class="container">
            <CreatePost/>
    </div>
</template>

<script>
import CreatePost from '../Components/CreatePost.vue'
export default {
    components: {
    CreatePost
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