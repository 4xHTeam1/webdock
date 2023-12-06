<template>
  <div class="profil-container">
    <div class="icon-dot icon-profile" :class="{ toggle: OpenMenu }" @click="toggleMenu">
        <p class="icon-p" v-if=" auth.user.avatarURL === null || auth.user.avatarURL === '' || auth.user.avatarURL === undefined">{{ auth.user.name[0] }}</p>
      <img v-else :src="auth.user.avatarURL" alt="avatar" class="user_img" />
    </div>
    <div class="profil-dropdown" v-if="OpenMenu">
      <ul class="content-list">
        <li class="content-li" @click="logout">
          <img src="../../Assets/icons/logout.svg" />Logout
        </li>
      </ul>
    </div>
  </div>
  <div class="closeContainer" v-if="OpenMenu" @click="toggleMenu"></div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["auth"]),
  },
  data() {
    return {
      OpenMenu: false,
    };
  },
  methods: {
    toggleMenu() {
      this.OpenMenu = !this.OpenMenu;
    },
    logout() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>

<style>
.closeContainer {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}

.content-li {
  display: flex;
  gap: 15px;
  justify-content: flex-start;
  margin: 0 10px 0 10px;
  position: relative;
}

.content-list {
  list-style-type: none;
  margin-left: 0;
  padding-left: 0;
  margin-bottom: 0;
}

.profil-container {
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  user-select: none;
}

.profil-dropdown {
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  min-width: fit-content;
  width: 100%;
  background-color: #f2f2f2;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border: 2px solid #e0e0e0;
  z-index: 100;
  user-select: none;
  text-wrap: nowrap;
  border-radius: 4px;
}

.icon-dot {
  max-width: fit-content;
  display: flex;
  flex-direction: row;

  border-radius: 50%;
  border: 4px solid #fff;

  min-height: 36px;
  min-width: 36px;
  max-height: 36px;
  max-width: 36px;

  margin-left: 10px;
}

.icon-profile {
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-size {
  height: 20px;
  width: 20px;
  margin: auto;
}

.user_img {
  width: 100%;
  height: 100%;
  border-radius: 100px;
  object-fit: cover;
}
</style>
