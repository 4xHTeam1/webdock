<template>
  <div>
    {{
      this.$store.state.socket.socket !== null ? `Connected` : "not connected"
    }}
    <button @click="createConnection">connect</button>
    <button @click="this.$store.dispatch('socket/disconnect')">
      disconnect
    </button>
    <button @click="this.$store.dispatch('socket/connectDummy', 1)">
      Connect Dummy
    </button>
  </div>
  <ul>
    <li
      v-for="notification in this.$store.state.socket.notifications"
      :key="notification"
    >
      {{ notification.message }}
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["socket"]),
  },
  methods: {
    async createConnection() {
      await this.$store.dispatch(
        "socket/connect",
        this.$store.state.auth.user.id
      );
    },
  },
  unmounted: function () {
    this.$store.dispatch("socket/disconnect");
  },
  /*   created: async function () {
    await this.createConnection();
  }, */
};
</script>

<style></style>
