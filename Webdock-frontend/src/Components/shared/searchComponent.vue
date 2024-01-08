<template>
  <div class="Search_Container">
    <img class="Search_Icon" src="../../Assets/icons/searchIcon.svg" alt="search" />
    <input class="Search_Input" type="text" placeholder="Search" :value="search" @keyup="searchInput($event)" @focus="this.dropdownActivated = true"/>

    <div class="Search_Dropdown_container" v-if="this.search.length >= 1 && this.dropdownActivated" >
      <dropdownsearchComponent v-for="feature in filteredFeatures" :key="feature.id" :feature="feature" />
    </div>
  </div>

  <div class="SearchBackground" v-if="this.dropdownActivated" @click="this.dropdownActivated = false"></div>
</template>

<script>
import dropdownsearchComponent from "./dropdownsearchComponent.vue";
import { mapState } from "vuex";
export default {
  components: {
    dropdownsearchComponent,
  },
  computed: {
    ...mapState(["features"]),
    filteredFeatures(){
      return this.features.allFeatures.filter(feature => feature.title.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  data: () => ({
    dropdownActivated: false,
    search: new URLSearchParams(window.location.search).get("query") || "",
  }),
  methods: {
    searchInput: function (event) {
      this.search = event.target.value;
      if (event.key === "Enter") {
        window.location.href = '/search?query=' + encodeURIComponent(this.search)
      }
    },
  },
};
</script>

<style>
.Search_Dropdown_container{
  position: absolute;
  width: 220px;
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  top: 40px;
  z-index: 1000;

  border-radius: 4px;
  border: 2px solid #e0e0e0;
}
.Search_Container {
  width: fit-content;
  height: 100%;
  min-height: 40px;
  max-height: 40px;
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  border: 2px solid #e0e0e0;
  gap: 2px;
  justify-content: center;
  align-items: center;
  padding: 0 10px;

  position: relative;
}

.SearchBackground{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
}

.Search_Icon {
  width: 24px;
  aspect-ratio: 1/1;
}

.Search_Input {
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  font-size: 0.8rem;
  font-weight: bold;
  color: #fff;
  background-color: transparent;
}

.Search_Input::placeholder {
  color: #ebebeb;
}
</style>