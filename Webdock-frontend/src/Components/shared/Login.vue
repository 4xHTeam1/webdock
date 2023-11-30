<template>
  <button :class="className" :style="style" @click="login">Log in</button>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "roadmapStatusContainer",
  props: {
    className: {
      type: String,
      required: false,
      default: "Login_Button",
    },
  },
  computed: {
    ...mapState(["auth"]),
  },
  methods: {
    login() {
      const currentUrl = window.location.href;
      window.location.href =
        `https://webdock.io/en/login?companyID=ucl_feedback_tool&redirect=${currentUrl}`;
    },
  },
  mounted: function () {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("ssoToken");
    if (token) {
      localStorage.setItem("token", token);
      this.$store.dispatch("auth/login", token);
    } else if (localStorage.getItem("token") !== null) {
      this.$store.dispatch("auth/login", localStorage.getItem("token"));
    }
  },
};
</script>

<style>
.Login_Button {
  width: fit-content;
  height: 35px;
  padding: 0 10px;
  border-radius: 5px;
  border: 2px solid #fff;
  color: #fff;
  background: transparent;
}

.Login_Button:hover {
  border: 2px solid #fff;
  color: #fff;
}
</style>
