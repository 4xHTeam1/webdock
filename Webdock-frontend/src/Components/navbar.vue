<template>


<taps buttontext="ROADMAP" imageSrc="src/assets/icons/three-dots-vertical.svg"></taps>
<taps buttontext="FEATURE REQUEST" imageSrc="src/Assets/icons/three-dots-vertical.svg"></taps>


<img src="../Assets/webdock-logo-hvid.svg">

</template>


<script lang="ts">
import taps from '../Components/nav-components/taps.vue';
export default {
  components: {
    taps
  },
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

</style>