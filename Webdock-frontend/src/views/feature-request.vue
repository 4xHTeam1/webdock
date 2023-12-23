<template>
  <div class="container d-flex justify-content-center featureRequest_Container">
    <div class="drop">
    <CreatePost />
    <!-- dropdown som ændre sort method fra newest til oldest og omvent somt sortere -->
    <select class="Options" v-model="this.sortMethod" @change="(e) => {sortMethod=e.target.value;this.sortFeatures()}">
        <option value="Newest">Newest</option>
        <option value="Oldest">Oldest</option>
    </select> 
  </div>
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
  // data indeholder en lokalstate som er sorterings metoden, retunere en sorterings metode  
  data: function(){
    return{
      sortMethod: "Newest"
    }
  }, 
  // funtionerne som er metoderne til at sortere i alle vores features 
  methods: {
    //Den tager alle vores features fra vores feature store, og sortere listen efter nyeste, tager 2 features/a,b 
    sortNewest(){
      this.features.allFeatures.sort((a,b)=>{
        //og tjekker på diferracen på dateSubmitted 
        return new Date(b.dateSubmitted) - new Date(a.dateSubmitted)
      })
    },
    // se noter oven over
    sortOldest(){
      this.features.allFeatures.sort((a,b)=>{
        return new Date(a.dateSubmitted) - new Date(b.dateSubmitted)
      })
    },
    //det er en function der bliver kaldt når vi fortager en ændring i dropdown på hjemmesiden
    sortFeatures(){
      if(this.sortMethod === "Newest"){
        this.sortNewest()
      } else if (this.sortMethod === "Oldest"){
        this.sortOldest()
      }
    }
  }
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

.drop{
  gap: 10px;
  display: flex;
  flex-direction: column;
}

.Options{
  background-color: #fcfcfc;
  color: black;  
  border-radius: 5px;
}
</style>