<template>
  <div class="createbox" v-if="isLoggedIn">
    <div class="titlebox d-flex justify-content-center">
      <h1>Category</h1>
    </div>
    <div class="createbox-content">
      <div class="catagory">
        <div class="catagory-title">
          <p>Category</p>
        </div>
        <div class="catagory-dropdown" @click="toggleDropdown">
          <p>
            {{ selectedOption.name }}
          </p>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down"
            viewBox="0 0 16 16">
            <path fill-rule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
          </svg>
        </div>
        <div class="dropdown-content" v-if="isDropdownOpen">
          <div class="catagory-options">
            <p @click="selectOption(category)" v-for="category in features.categories" :key="category.id">
              {{ category.name }}
            </p>
          </div>
        </div>
      </div>
      <div class="heading">
        <div class="heading-title"><p>Title</p></div>
        <input class="heading-textfield" type="text" placeholder="Short, descriptive title" :value="selectedTitle"
          maxlength="255" @keyup="setTitle($event)" />
        <div class="char-counter">
          <p class="char-counter-text">{{ selectedTitle.length }}/255</p>
        </div>
      </div>
      <div class="details">
        <div class="details-title"><p>Details</p></div>
        <textarea class="details-textarea" placeholder="Any additional details…" :value="selectedDescription"
          @keyup="setDecription($event)" maxlength="500"></textarea>
        <div class="char-counter">
          <p class="char-counter-text">{{ selectedDescription.length }}/500</p>
        </div>
      </div>
      <div class="submit-area">
        <div class="submit-button" @click="createPost()">Create Post</div>
      </div>
    </div>
  </div>
  <div class="createbox" v-else>
    <p class="noLoginText">
      Log in to your Webdock.io account to give feedback
    </p>
    <div class="noLoginButtonContainer">
      <login :className="'loginButton'" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import login from "../shared/Login.vue";

export default {
  computed: {
    ...mapState(["features", "auth"]),
  },
  data() {
    return {
      isDropdownOpen: false,
      selectedOption: { id: 0, name: "Select Option" },
      selectedTitle: "",
      selectedDescription: "",
      isLoggedIn: false,
    };
  },
  components: {
    login,
  },
  methods: {
    createPost() {
      if (this.auth.user === null) {
        return;
      }
      const data = {
        title: this.selectedTitle,
        description: this.selectedDescription,
        category: this.selectedOption,
        userId: this.auth.user.id,
      };
      this.$store.dispatch("features/createPost", data);
      this.selectedTitle = "";
      this.selectedDescription = "";
      this.selectedOption = { id: 0, name: "select Option" };
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isDropdownOpen = false;
    },
    closeDropdown(event) {
      if (!event.target.closest(".catagory-dropdown")) {
        this.isDropdownOpen = false;
      }
    },
    setTitle(event) {
      this.selectedTitle = event.target.value;
    },
    setDecription(event) {
      this.selectedDescription = event.target.value;
    },
  },
  mounted() {
    this.isLoggedIn = this.$store.state.auth.user !== null;
    window.addEventListener("click", this.closeDropdown);
    this.$store.dispatch("features/getAllCategories");
  },
};
</script>

<style>
.createbox {
  background-color: #fcfcfc;
  width: 320px;
  border-radius: 10px;
  height: fit-content;
}

.noLoginText {
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  margin: 7px 0;
  text-align: center;
  color: #000;
  padding: 12px;
}

.loginButton {
  width: 100%;
  height: 35px;
  padding: 0 10px;
  border-radius: 5px;
  color: #fff;
  background: #018647;
  cursor: pointer;
  transition: ease-in-out 0.2s;
  border: none;
  min-width: 90px;
}

.loginButton:hover {
  color: #fff;
  background: #016134;
}

.noLoginButtonContainer {
  display: flex;
  justify-content: center;
  padding: 12px;
  align-items: stretch;
}

.createbox-content {
  margin: 18px;
}

.titlebox {
  padding: 12px;
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-weight: bold;
  background-color: rgb(235, 235, 235);
  border-radius: 10px 10px 0 0;
  box-shadow: 0px 12px 25px -5px rgba(0, 0, 0, 0.25);
}

.catagory-title {
  padding-top: 8px;
}

.catagory-dropdown {
  border-bottom: 2px solid rgb(129, 129, 129);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.dropdown-content {
  background-color: #fcfcfc;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 10px 10px;
  position: absolute;
  width: 284px;
}

.src-catagory {
  width: 100%;
  outline: none;
}

.catagory-options {
  text-align: left;
  padding: 10px;
}

.catagory-options p {
  cursor: pointer;
}

.heading-title {
  padding-top: 8px;
}

.heading-textfield {
  width: 284px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid rgb(129, 129, 129);
  outline: none;
  background-color: #fcfcfc;
  color: black;
}

.details-title {
  padding-top: 8px;
}

.details-textarea {
  width: 284px;
  height: 80px;
  outline: none;
  border: 2px solid rgb(129, 129, 129);
  border-radius: 4px;
  resize: none;
  background-color: #e8e8e8;
  color: black;
}

.submit-area {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 8px;
}

.submit-button {
  width: 100px;
  height: auto;
  text-align: center;
  font-size: 16px;
  background-color: #018647;
  color: white;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
}

.submit-button:hover {
  background-color: #016134;
  transition: ease-in 0.2s;
}

.char-counter{
  display: flex;
  justify-content: flex-end;
}

.char-counter-text{
  color: #888888
}
</style>