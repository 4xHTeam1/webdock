<template>
  <div class="Status_Container">
    <div class="Status_Header">
      <p class="Status_HeaderTitle" :style="{ '--color': color }">
        {{ status }}
      </p>
    </div>
    <div class="Status_SlotContainer">
      <roadmap-features v-for="feature in featureList" v-bind:key="feature.id" :feature="feature" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import roadmapFeatures from "./roadmapFeatures.vue";

let filteredFeatures = [];

export default {
  name: "roadmapStatusContainer",

  components: {
    roadmapFeatures,
  },
  props: {
    status: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
    featureList: {
      type: Array,
      required: false,
    },
  },
};
</script>

<style>
.Status_Container {
  flex: 1 0 0;
  height: 100%;
  max-width: 300px;
  min-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #c1c1c1;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 19px rgba(0, 0, 0, 0.4);
  
}

.Status_Header {
  min-height: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 30px;
  border-bottom: 1px solid #c1c1c1;
}

.Status_HeaderTitle {
  font-size: 1rem;
  color: #000;
  position: relative;
  margin: 0;
  padding: 0;
}

.Status_HeaderTitle::before {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: var(--color);
  border-radius: 50%;
  left: -15px;
  top: 50%;
  transform: translateY(-50%);
}

.Status_SlotContainer {
  flex: 1 0 0;
  padding: 0px 15px 10px 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  overflow-x: hidden;
}

.Status_SlotContainer::-webkit-scrollbar {
  width: 14px;
}

.Status_SlotContainer::-webkit-scrollbar-thumb {
  border: 4px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  border-radius: 9999px;
  background-color: #696969;
}
</style>
../../stores/features
