<template>
  <div class="Filter_Container">
    <div class="Filter_Button" @click="toggleFilter()">
      <img
        class="Filter_Icon"
        src="../../Assets/icons/filterIcon.svg"
        alt="filter"
      />
      <p class="Filter_Title">Filter</p>
    </div>
    <div class="Filter_FiltersContainer" v-if="activated">
      <div class="Filter_FiltersInfo">
        <p class="Filter_FiltersTitle">Filters</p>
        <p class="Filter_FiltersSelect" @click="toggleSelectAll()">
          {{ allSelected ? "Select None" : "Select All" }}
        </p>
      </div>
      <div class="Filter_FiltersWrapper">
        <div class="Filter_Filter" v-for="filter in filters" :key="filter.name">
          <input
            class="Filter_Checkbox"
            type="checkbox"
            :checked="filter.activated"
            @click="checkFilter(filter)"
          />
          <p class="Filter_Text">{{ filter.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      activated: false,
      allSelected: false,
      filters: [
        {
          name: "Filter 1",
          activated: false,
        },
        {
          name: "Filter 2",
          activated: false,
        },
        {
          name: "Filter 3",
          activated: false,
        },
      ],
    };
  },
  methods: {
    toggleFilter() {
      this.activated = !this.activated;
    },
    toggleSelectAll() {
      this.filters.forEach((filter) => {
        filter.activated = !this.allSelected;
      });

      this.allSelected = !this.allSelected;
    },
    checkFilter(filter: any) {
      filter.activated = !filter.activated;
      this.allSelected = this.filters.every((filter) => filter.activated);
    },
  },
};
</script>

<style>
.Filter_Container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.Filter_Button {
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
  user-select: none;
  cursor: pointer;
  padding: 0 10px;
}

.Filter_Icon {
  width: 24px;
  aspect-ratio: 1/1;
}

.Filter_Title {
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  font-size: 0.8rem;
  font-weight: bold;
  color: #fff;
  background-color: transparent;
  margin: 0;
}
.Filter_FiltersContainer {
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  width: 100%;
  min-width: 220px;
  height: fit-content;
  background-color: #fff;
  border-radius: 5px;
  border: 2px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 100;
  max-height: 200px;
}

.Filter_FiltersInfo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #5f5f5f;
  padding: 10px;
}

.Filter_FiltersTitle {
  font-size: 0.8rem;
  color: #000;
  margin: 0;
}

.Filter_FiltersSelect {
  font-size: 0.8rem;
  color: green;
  margin: 0;
  cursor: pointer;
}

.Filter_FiltersSelect:hover {
  text-decoration: underline;
}

.Filter_FiltersWrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px 10px 10px;
  overflow-y: auto;
  overflow-x: hidden;
}

.Filter_FiltersWrapper::-webkit-scrollbar {
  width: 14px;
}

.Filter_FiltersWrapper::-webkit-scrollbar-thumb {
  border: 4px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  border-radius: 9999px;
  background-color: #696969;
}

.Filter_Filter {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  max-height: 20px;
  min-height: 20px;
}

.Filter_Checkbox {
  width: 14px;
  aspect-ratio: 1/1;
}
.Filter_Text {
  font-size: 0.8rem;
  color: #5f5f5f;
  margin: 0;
  font-weight: bold;
}
</style>