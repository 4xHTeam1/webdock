<template>
  <RoleModal v-if="showRoleModal" @close="showRoleModal = false" />
  <div class="userOverviewContainer">
    <div class="user_ID">{{ user.id }}</div>
    <div class="userInfoContainer">
      <div class="usersAvatar">
        <div class="noneAvatar" style="background-color: #9cb" v-if="user.avatarURL === null || user.avatarURL === ''">
          {{ user.name[0] }}
        </div>
        <img :src="user.avatarURL" alt="Avatar" class="user_img" v-else />
      </div>
      <div class="name">{{ user.name }}</div>
    </div>
    <div class="userEmail">{{ user.email }}</div>
    <div class="userRole">{{ user.role }}</div>
    <div class="userSettings" @click="showModal()">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-gear-fill"
        viewBox="0 0 16 16">
        <path
          d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
      </svg>
    </div>
  </div>
</template>

<script>
import RoleModal from "./admin-components/roleModal.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      showRoleModal: false,
    };
  },
  components: {
    RoleModal,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["admin", "auth"]),
  },
  methods: {
    async showModal() {
      await this.$store.dispatch("admin/getUser", { requesterId: this.auth.user.id, userId: this.user.id });
      this.showRoleModal = true;
    },
  }
};
</script>

<style>
.userOverviewContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100px;
  background-color: #24ab95;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  gap: 20px;
  padding: 40px;
  color: white;
  z-index: 1;
  border-radius: 6px;
}

.name {
  flex: 1;
}

.user_ID {
  flex: 1;
}

.userEmail {
  flex: 1;
}

.userRole {
  flex: 1;
}

.userInfoContainer {
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex: 1;
}

.usersAvatar {
  min-width: 26px;
  width: 26px;
  height: 26px;
  border-radius: 100px;
  position: relative;
  z-index: 1;
  margin: 0 10px 0 10px;
}

.noneAvatar {
  font-size: 18px;
  color: white;
  width: 100%;
  height: 100%;
  background: grey;
  border-radius: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-transform: uppercase;
  position: absolute;
}

.user_img {
  width: 100%;
  height: 100%;
  border-radius: 100px;
  object-fit: cover;
}
</style>
