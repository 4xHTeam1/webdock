<template>
    
    <div class="container d-flex">
        <adminMenu/>
        <adminsection/>
    </div>
    
</template>

<script>
import adminMenu from '../Components/adminMenu.vue'
import adminsection from '../Components/adminsection.vue'
export default {
    components: {
    adminMenu,
    adminsection
  }
}



</script>


<style>
.container{
    float: left;
}

</style>