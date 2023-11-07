<template>
  
<img src="../Assets/webdock-logo-hvid.svg">

<div class="tap-parent-container">
<taps buttontext="ROADMAP" imageSrc="src/assets/icons/three-dots-vertical.svg"></taps>
<taps buttontext="FEATURE REQUEST" imageSrc="src/Assets/icons/lightbulb.svg"></taps>
</div>


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
.tap-parent-container{
  margin-top: 10px;
  margin-bottom: 10px;

  display: flex;
  flex-direction: row;
}
</style>