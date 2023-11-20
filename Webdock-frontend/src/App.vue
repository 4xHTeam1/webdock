<script setup>
import { computed } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { mapState, useStore } from "vuex";
import navbar from "./Components/navbar.vue"
const store = useStore();

</script>

<template>
  <navbar />
  <RouterView />
</template>
