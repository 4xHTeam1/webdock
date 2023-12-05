<template>
  <div class="container Testroadmap_Container">
    <div class="Testroadmap_Info">
      <h1 class="Testroadmap_Title">Roadmap</h1>
      <div class="Testroadmap_InteractionContainer">
        <filterComponent />
        <searchComponent />
      </div>
    </div>
    <div class="Testroadmap_RoadmapContainers">
      <StatusContainer status="Planned" :color="getFeaturesForStatus('status 1')[0].status.color"
        :featureList="getFeaturesForStatus('status 1')" />
      <StatusContainer status="In Progress" :color="getFeaturesForStatus('status 2')[0].status.color"
        :featureList="getFeaturesForStatus('status 2')" />
      <StatusContainer status="Complete" :color="getFeaturesForStatus('status 3')[0].status.color"
        :featureList="getFeaturesForStatus('status 3')" />
    </div>
  </div>
</template>

<script defer>
import StatusContainer from "../Components/roadmap-components/statusContainer.vue";
import searchComponent from "../Components/shared/searchComponent.vue";
import filterComponent from "../Components/shared/filterComponent.vue";
import { mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["features"]),
    getFeaturesForStatus() {
      return (status) =>
        this.$store.getters["features/getFeaturesForStatus"](status);
    },
  },
  methods: {
    async getAllFeatures() {
      this.$store.dispatch("features/getAllFeatures");
    },
  },
  created: async function () {
    await this.getAllFeatures();
  },
  components: {
    StatusContainer,
    searchComponent,
    filterComponent,
  },
};
</script>

<style>
.Testroadmap_Container {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
}

.Testroadmap_Info {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 30px;
  gap: 10px;
  align-items: center;
  padding-top: 24px;
}

.Testroadmap_Title {
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
  color: #fff;
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
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex: 1;
  padding: 24px 0;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  flex-wrap: nowrap;
  justify-content: space-between;
}
</style>
