<template>
  <div class="Search_Container">
    <img class="Search_Icon" src="../../Assets/icons/searchIcon.svg" alt="search" />
    <input class="Search_Input" type="text" placeholder="Search" @keyup="searchInput($event)" />
  </div>
</template>

<script lang="ts">
let timeout: any = null;
export default {
  data: () => ({
    search: "",
  }),
  methods: {
    searchInput: function (event: any) {
      if (event.key === "Enter") {
        this.search = event.target.value;
        window.location.href = '/search?query=' + encodeURIComponent(this.search)
      } else {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
          this.search = event.target.value;
          window.location.href = '/search?query=' + encodeURIComponent(this.search)
        }, 1000);
      }
    },
  },
};
</script>

<style>
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