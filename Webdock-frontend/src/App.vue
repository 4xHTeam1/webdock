<script setup>
import { computed } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { mapState, useStore } from "vuex";
import navbar from "./Components/navbar.vue"
const store = useStore();

//if there's a token in localstorage, dispatch the login action
const token = localStorage.getItem("token");
if (token) {
  store.dispatch("auth/login", token);
}
</script>

<template>
  <navbar />
  <RouterView />
</template>
