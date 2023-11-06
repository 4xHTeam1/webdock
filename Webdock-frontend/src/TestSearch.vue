<template>
  <input type="text" v-model="query" @keyup="searchAll(query)" />

  <div>
    <ul>
      <li
        v-for="searchResult in searchStore.state.searchResults.users"
        :key="searchResult.id"
      >
        {{ searchResult.name }}
      </li>
    </ul>
    <ul>
      <li
        v-for="searchResult in searchStore.state.searchResults.features"
        :key="searchResult.id"
      >
        {{ searchResult.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import searchStore from "./stores/searchstore";

async function searchAll(query) {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  this.timer = setTimeout(async () => {
    await searchStore.dispatch("searchAll", query);
  }, 1000);
}
</script>

<style>
</style>