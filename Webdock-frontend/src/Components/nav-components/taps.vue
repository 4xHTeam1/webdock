<template>
    <div class="tap-container">
        <img class="img-color" :src="imageSrc">
        <p id="roadmap-tap" class="fw-bolder">{{ buttontext }}</p>

    </div>
</template>

<script lang="ts">
export default {
  props: {
    buttontext: {
      type: String,
      required: true
    },
    imageSrc: String
  }
}


</script>

<style>
.router-link-exact-active {
  background: white;
  color: black;

  
  border-radius: 11px 11px 0 0;
}
.router-link-exact-active > .img-color {
  filter: invert(0%) sepia(3%) saturate(21%) hue-rotate(101deg) brightness(96%) contrast(100%);
}

.tap-container{
    max-width: fit-content;
    display: flex;
    flex-direction: row;

    border: 3px solid #fff ;
    border-radius: 11px 11px 0 0;

    padding: 5px;
    padding-right: 7px;    
}



.img-color {
  filter: invert(0%) sepia(3%) saturate(21%) hue-rotate(101deg) brightness(96%) contrast(100%);
}


#roadmap-tap {
    margin-bottom: 0;
    text-decoration: none;
    
}
</style>

