<template>
    <div class="tap-container">
        <img :src="imageSrc">
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
};
</script>

<style>
.tap-container{
    margin: 50px;

    max-width: fit-content;
    display: flex;
    flex-direction: row;

    border: 1px solid #fff ;
    border-radius: 11px 11px 0 0;

    padding: 5px;
    padding-right: 7px;    
}
#roadmap-tap {
    margin-bottom: 0;
}
</style>

