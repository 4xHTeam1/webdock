<template>

    <div class="container d-flex">
        <adminMenu/>
        
      <div class="container">
         <whitebg/> 
        <adminsection/>
        </div>
    </div>     
</template>

<script>
import adminMenu from '../Components/adminMenu.vue'
import adminsection from '../Components/adminsection.vue'
import whitebg from '../Components/whitebg.vue'
export default {
    components: {
    adminMenu,
    whitebg,
    adminsection,
    
  }
}



</script>


<style>
.container{
    float: left;
}

</style>