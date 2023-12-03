<template>
  <div class="notification_container">
    <div class="notification_iconContainer" @click="toggleNotification">
      <img class="notification_icon" src="../../Assets/icons/bell.svg" alt="notification-icon" />
      <div class="notification_iconAmount" v-if="this.socket.notifications.length > 0">
        {{ this.socket.notifications.length }}
      </div>
    </div>
    <div class="notification_InfoContainer" v-if="notificationOpen">
      <div class="notification_InfoContainer-Title">
        <h3 class="notification_InfoTitle">Notifications</h3>
        <p class="notification_MarkAll" @click="markAllAsRead">
          Mark all as read
        </p>
      </div>
      <div class="notification_InfoContainer_Notifications">
        <p class="notification_InfoContainer_noNotifications" v-if="this.socket.notifications.length === 0">
          No new notifications
        </p>
        <notificationItem v-for="notification in this.socket.notifications" :key="notification"
          :notification="notification" />
      </div>
    </div>
  </div>
  <div class="CloseContainer" @click="toggleNotification" v-if="notificationOpen" />
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
    ...mapState(["socket", "auth"]),
  },
  methods: {
    async createConnection() {
      await this.$store.dispatch(
        "socket/connect",
        this.auth.user.id
      );
    },
    toggleNotification() {
      this.notificationOpen = !this.notificationOpen;
    },
    markAllAsRead() {
      this.$store.dispatch("socket/markAllAsRead", this.auth.user.id);
    },
  },
  components: {
    notificationItem,
  },
  unmounted: function () {
    this.$store.dispatch("socket/disconnect");
  },
  created: async function () {
    await this.createConnection();
    await this.$store.dispatch("socket/GetNotifications", this.auth.user.id);
    console.log(this.socket.notifications.notifications)
  },
};
</script>

<style>
.test_data {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

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
  border: 3px solid #fff;
  cursor: pointer;
}


.notification_iconAmount {
  position: absolute;
  top: 0;
  right: 0;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #327e60;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  border: 1px solid #fff;
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

.notification_MarkAll {
  font-size: 0.8rem;
  color: #327e60;
  cursor: pointer;
  margin: 0;
}

.notification_MarkAll:hover {
  text-decoration: underline;
}
</style>
