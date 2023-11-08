<template>
  <div class="nav-container">
    <div class="container">
      <div class="logo-icon-flex">
        <Router-link to="/">
          <img class="img-size" src="../Assets/webdock-logo-hvid.svg">
        </Router-link>
        <div class="icon-parent-container">
          <icons letterSrc="J" iconSrc="src/assets/icons/bell.svg" ></icons>
        </div>
      </div>
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
import icons from '../Components/nav-components/ikoner.vue';
export default {
  components: {
    taps,
    icons
  },
  props: {
    buttontext: {
      type: String,
      required: true
    },
    imageSrc: String,
    letterSrc: {
      type: String,
      required: true
    } 
  }
};

</script>


<style>
.icon-parent-container{
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  align-items: center;
}
.logo-icon-flex{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.nav-container{
  margin-top: 1.5vh;
}
.seperating-line{
  width:100vw;
  height:3px;
  background:#fff;
}
.tap-parent-container{
  margin-top: 15px;

  display: flex;
  flex-direction: row;
}
.img-size{
  width: 20vw;
  min-width: 200px;
}
</style>