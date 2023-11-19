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
  <div class="notification_container">
    <div class="notification_iconContainer" @click="toggleNotification">
      <img
        class="notification_icon"
        src="../../Assets/icons/bell.svg"
        alt="notification-icon"
      />
    </div>
    <div class="notification_InfoContainer" v-if="notificationOpen">
      <div class="notification_InfoContainer-Title">
        <h3 class="notification_InfoTitle">Notifications</h3>
      </div>
      <div class="notification_InfoContainer_Notifications">
        <notificationItem
          v-for="notification in this.$store.state.socket.notifications"
          :key="notification"
          :notification="notification"
        />
      </div>
    </div>
  </div>
  <div
    class="CloseContainer"
    @click="toggleNotification"
    v-if="notificationOpen"
  />
</template>

<script>
import { mapState } from "vuex";
import notificationItem from "./notifications/notificationItem.vue";
export default {
  data() {
    return {
      notificationOpen: false,
    };
  },
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
    toggleNotification() {
      this.notificationOpen = !this.notificationOpen;
    },
  },
  components: {
    notificationItem,
  },
  unmounted: function () {
    this.$store.dispatch("socket/disconnect");
  },
  /*   created: async function () {
    await this.createConnection();
  }, */
};
</script>

<style>
.notification_container {
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.notification_iconContainer {
  justify-content: center;
  align-items: center;
  display: flex;
  min-width: 32px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  border: 3px solid #000;
  cursor: pointer;
}

.notification_icon {
  filter: invert(100%);
}

.notification_InfoContainer {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 300px;
  width: fit-content;
  height: fit-content;
  min-height: 200px;
  background-color: #f2f2f2;
  border-radius: 3px;
  border: 1px solid #a9a9a9;
  z-index: 100;
  display: flex;
  flex-direction: column;
}

.notification_iconContainer::before {
  content: "";
  position: absolute;
  top: 100%;
  right: 6px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #f2f2f2;
}
.CloseContainer {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  z-index: 99;
}

.notification_InfoContainer-Title {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #a9a9a9;
  padding: 5px;
}

.notification_InfoTitle {
  font-size: 1rem;
  color: #737373;
}

.notification_InfoContainer_Notifications {
  flex: 1 0 0;
  width: 100%;
  overflow-y: auto;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}



.notification_InfoContainer_noNotifications {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: #737373;
  font-weight: 200;
}
</style>
