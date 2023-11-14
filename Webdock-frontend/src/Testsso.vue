<template>
  <button @click="login">Login</button>
  {{ auth.user }}
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "roadmapStatusContainer",
  computed: {
    ...mapState(["auth"]),
  },
  methods: {
    login() {
      window.location.href =
        "https://webdock.io/en/login?companyID=ucl_feedback_tool&redirect=http://localhost:5173/sso";
    },
  },
  mounted: function () {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("ssoToken");
    console.log(token);
    if (token) {
      localStorage.setItem("token", token);
      this.$store.dispatch("auth/login", token);
    }
  },
};
</script>

<style></style>
