<template>
  <div class="nav-container">
    <div class="container">
      <img class="img-size" src="../Assets/webdock-logo-hvid.svg">
      <div class="tap-parent-container">
        <taps buttontext="ROADMAP" imageSrc="src/assets/icons/three-dots-vertical.svg"></taps>
        <taps buttontext="FEATURE REQUEST" imageSrc="src/Assets/icons/lightbulb.svg"></taps>
      </div>
    </div>
    <div class="seperating-line"></div>
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
.nav-container{
  margin-top: 1vh;
}
.seperating-line{
  width:100vw;
  height:3px;
  background:#fff;
}
.tap-parent-container{
  margin-top: 10px;

  display: flex;
  flex-direction: row;
}
.img-size{
  width: 20vw;
}
</style>