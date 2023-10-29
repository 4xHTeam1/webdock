<template>
  <p>USER: {{ authStore.state.user }}</p>
  <button @click="testLogin">Test Login</button>
</template>

<script setup>
import authStore from "./stores/authstore";

let user = authStore.user;

async function testLogin() {
  await authStore.dispatch(
    "login",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6IkpvaG5Eb2VAZG9lLmNvbSIsImF2YXRhclVybCI6Imdvb2dsZS5jb20iLCJpZCI6ImUzODliYjdiLWRjNTgtNGIwYi04ZjU0LWRhYzE1OWQ1YTYwOSJ9.u3obh7cNyjunZ8OygXrjYMH1f2DKA79ul40jpPJZCsg"
  );
}
</script>
