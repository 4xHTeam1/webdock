<script setup>
import { computed } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { mapState, useStore } from "vuex";
const store = useStore();

//if there's a token in localstorage, dispatch the login action
const token = localStorage.getItem("token");
if (token) {
  store.dispatch("auth/login", token);
}
</script>

<template>
  <RouterView />
</template>
