<template>
  <ul>
    <li v-for="user in adminStore.state.users" :key="user.id">
      <button
        @click="getUser({ requesterId: authStore.state.user.id, userId: user.id })"
      >
        {{ user.name }}
      </button>
    </li>
  </ul> 

  <button @click="getUsers">get all users</button>
</template>

<script setup>
import adminStore from "./stores/adminstore";
import authStore from "./stores/authstore";

async function getUsers() {
  await adminStore.dispatch("getUsers", authStore.state.user.id);
}

async function getUser(payload) {
  console.log(payload);
  await adminStore.dispatch("getUser", payload);
}

async function getCategories() {
  await adminStore.dispatch("getCategories");
}

async function getCategory(payload) {
  await adminStore.dispatch("getCategory", payload);
}

async function updateCategory(payload) {
  await adminStore.dispatch("updateCategory", payload);
}

async function deleteCategory(payload) {
  await adminStore.dispatch("deleteCategory", payload);
}

async function getStatuses() {
  await adminStore.dispatch("getStatus");
}

async function getStatus(payload) {
  await adminStore.dispatch("getStatus", payload);
}

async function updateStatus(payload) {
  await adminStore.dispatch("updateStatus", payload);
}

async function deleteStatus(payload) {
  await adminStore.dispatch("deleteStatus", payload);
}
</script>

<style></style>
