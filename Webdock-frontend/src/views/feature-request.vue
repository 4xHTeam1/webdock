<template>
  <div class="container d-flex justify-content-center featureRequest_Container">
    <CreatePost />
    <div class="featureRequest_OverviewContainer">
      <div class="overview-area">
        <div v-if="this.features.allFeatures.length <= 0" class="NoFeaturesInList">
          <p>There's No Features. Be the first to request a feature.</p>
        </div>
        <requestOverview
          v-else
          v-for="feature in this.features.allFeatures"
          :key="feature.id"
          :feature="feature"
          :color="feature.status.color"
        />
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "../Components/navbar.vue";
import CreatePost from "../Components/featureRequest-components/CreatePost.vue";
import requestOverview from "../Components/featureRequest-components/requestOverview.vue";
import { mapState } from "vuex";

export default {
  components: {
    CreatePost,
    requestOverview,
    navbar,
  },
  computed: {
    ...mapState(["features"]),
  },
  mounted: async function () {
    await this.$store.dispatch("features/getAllFeatures");
  },
};
</script>

<style>
.NoFeaturesInList {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-wrap: wrap;
  color: #a9a9a9
}

.featureRequest_Container {
  flex: 1 1 0;
  gap: 18px;
  padding: 24px 0;
}

.featureRequest_OverviewContainer {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
}

.overview-area {
  flex: 1 1 0;
  overflow-y: auto;
  overflow-x: hidden;
  flex-wrap: nowrap;
  background: #fcfcfc;
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 15px;
}
</style>