<template>
  <div class="Testroadmap_Container">
    <div class="Testroadmap_Info">
      <h1 class="Testroadmap_Title">Testroadmap</h1>
      <div class="Testroadmap_InteractionContainer">
        <filterComponent/>
         <searchComponent />
      </div>
    </div>
    <div class="Testroadmap_RoadmapContainers">
      <StatusContainer status="Planned" color="#1FA0FF" />
      <StatusContainer status="In Progress" color="#C17AFF" />
      <StatusContainer status="Complete" color="#6CD345" />
    </div>
  </div>
</template>

<script lang="ts">
import StatusContainer from "../Components/roadmap-components/statusContainer.vue";
import searchComponent from "../Components/shared/searchComponent.vue";
import filterComponent from "../Components/shared/filterComponent.vue";
export default {
  components: {
    StatusContainer,
    searchComponent,
    filterComponent,
  },
};
</script>

<style>
.Testroadmap_Container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.Testroadmap_Info {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 30px;
  gap: 10px;
  padding: 0 10px;
  align-items: center;
}

.Testroadmap_Title {
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
  flex: 1;
}

.Testroadmap_InteractionContainer {
  display: flex;
  flex-direction: row;
  gap: 10px;
  min-width: 300px;
  justify-content: flex-end;
  align-items: center;
}

.Testroadmap_Test {
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
}

.Testroadmap_RoadmapContainers {
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  align-items: center;
}
</style>
