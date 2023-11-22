<template>
  <div class="tap-container">
    <img class="img-color" :src="imageSrc">
    <p id="roadmap-tap" :style="{ color: isActive ? '#000' : '#fff' }" class="fw-bolder noHover">{{ buttontext }}</p>
  </div>
</template>

<script>
export default {
  props: {
    buttontext: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    },
    imageSrc: String
  }
}
</script>

<style>
.img-color {
  filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(140deg) brightness(102%) contrast(110%);
}

.tap-container {
  max-width: fit-content;
  display: flex;
  flex-direction: row;

  border: 3px solid #fff;
  border-bottom: none;
  border-radius: 11px 11px 0 0;
  
  margin-left: -2px;

  padding: 5px;
  padding-right: 7px;
  background: none;
}

#roadmap-tap {
  margin-bottom: 0;
  text-decoration: none;
  color: inherit;
}
</style>

