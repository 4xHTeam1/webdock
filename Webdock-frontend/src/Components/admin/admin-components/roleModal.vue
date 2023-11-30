<template>
  <div class="roleModalOverlay">
    <div class="roleModalContainer">
      <div class="roleModalContent">
        <div class="modalHeader">
          <div class="modalTitle">
            <h1>Change role</h1>
          </div>
          <div class="closeBtn" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" class="bi bi-x"
              viewBox="0 0 16 16">
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
        </div>
        <div class="changeRole">
          <div class="userInfoContainer">
            <div class="usersAvatar">
              <div class="noneAvatar" style="background-color: rgb(101, 148, 132)"
                v-if="this.admin.selectedUser.avatarURL === ''">
                {{ this.admin.selectedUser.name[0] }}
              </div>
              <img :src="this.admin.selectedUser.avatarURL" alt="Avatar" class="user_img" v-else />
            </div>
            <div class="firstName">{{ this.admin.selectedUser.name }}</div>
          </div>
          <div class="roleSelecter">
            <div class="roleDropdown" @click="toggleDropdown">
              {{ selectedOption }}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
              </svg>
              <div class="dropdownContent" v-if="isDropdownOpen">
                <div class="roleOptions">
                  <p @click="selectOption('USER')">USER</p>
                  <p @click="selectOption('ADMIN')">ADMIN</p>
                </div>
              </div>
            </div>

          </div>
          <div class="buttonContainer">
            <button class="btnCancel" @click="closeModal()">Cancel</button>
            <button class="btnAccept" @click="handleUpdateUser()">Accept</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isDropdownOpen: false,
      selectedOption: "Switch role",
    };
  },
  computed: {
    ...mapState(["admin", "auth"]),
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isDropdownOpen = false;
    },
    closeDropdown(event) {
      if (!event.target.closest(".roleDropdown")) {
        this.isDropdownOpen = false;
      }
    },
    async handleUpdateUser() {
      await this.$store.dispatch("admin/updateRole", {
        requesterId: this.auth.user.id,
        userId: this.admin.selectedUser.id,
        role: this.selectedOption,
      });
      await this.$store.dispatch("admin/getUsers", this.auth.user.id);
      this.closeModal();
    },
  },
  mounted() {
    window.addEventListener("click", this.closeDropdown);
    this.selectedOption = this.admin.selectedUser.role;
  },
  beforeDestroy() {
    window.removeEventListener("click", this.closeDropdown);
  },
};
</script>

<style scoped>
.roleModalOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.575);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.roleModalContainer {
  background-color: rgb(240, 240, 240);
  border-radius: 8px;
  width: 100%; 
  max-width: 400px; 
}

.modalHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 2px solid grey;
}

.modalTitle {
  padding: 5px 5px 0 5px;
}

.modalTitle h1 {
  color: black;
  font-size: 1.5rem;
}

.closeBtn {
  justify-content: flex-end;
  cursor: pointer;
}

.changeRole {
  padding: 20px;
  color: black;
}

.userInfoContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  padding: 6px 0 6px 0;
  margin: 0 60px 20px 60px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.usersAvatar {
  width: 64px;
  height: 64px;
  border-radius: 100px;
  position: relative;
  z-index: 1;
}

.noneAvatar {
  font-size: 44px;
}

.roleSelecter {
  display: flex;
  flex-direction: column;
  margin: 0 60px 0 60px;
}

.roleDropdown {
  border-bottom: 2px solid rgb(129, 129, 129);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  position: relative;
}

.dropdownContent {
  background-color: #fcfcfc;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 10px 10px;
  width: 100%;
  z-index: 1000;
  top: calc(100% + 2px);
  left: 0;
  display: flex;
  flex-direction: column;
  max-height: 200px;
  overflow-y: auto;
}

.roleOptions {
  cursor: pointer;
  padding: 10px;
}

.roleOptions p{
  transition: ease-in-out 0.2s;
  padding: 5px;
}

.roleOptions p:hover {
  background-color: #cecece;
  transition: ease-in-out 0.2s
}

.roleOptions p {
  font-size: 18px;
}

.buttonContainer {
  gap: 5px;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.btnCancel {
  border-radius: 10px;
  background-color: rgb(177, 129, 129);
  border: 3px solid rgb(97, 71, 71);
}

.btnCancel:hover {
  background-color: rgb(97, 71, 71);
  border: 3px solid rgb(177, 129, 129);
  transition: ease-in 0.2s;
}

.btnAccept {
  border-radius: 10px;
  background-color: rgb(123, 172, 123);
  border: 3px solid rgb(71, 100, 71);
}

.btnAccept:hover {
  background-color: rgb(71, 100, 71);
  border: 3px solid rgb(123, 172, 123);
  transition: ease-in 0.2s;
}

.user_img {
  width: 100%;
  height: 100%;
  border-radius: 100px;
  object-fit: cover;
}
</style>
