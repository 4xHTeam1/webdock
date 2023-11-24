<template>
<div class="createbox">
    <div class="titlebox d-flex justify-content-center">
        Create Post
    </div>
    <div class="createbox-content">
        <div class="catagory">
            <div class="catagory-title">Catagory</div>
            <div class="catagory-dropdown" @click="toggleDropdown">
                {{ selectedOption.name }}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
            <div class="dropdown-content" v-if="isDropdownOpen">
                <div class="catagory-options">
                    <p @click="selectOption(category)" v-for="category in this.$store.state.features.categories" :key="category.id">{{ category.name }}</p>
                </div>
            </div>
        </div>
        <div class="heading">
            <div class="heading-title">Title</div>
            <input class="heading-textfield" type="text" placeholder="Short, descriptive title" :value="selectedTitle" @keyup="setTitle($event)">
        </div>
        <div class="details">
            <div class="details-title">Details</div>
            <textarea class="details-textarea" placeholder="Any additional details…" :value="selectedDescription" @keyup="setDecription($event)"></textarea>
        </div>
        <div class="submit-area">
            <div class="submit-button" @click="createPost()">Create Post</div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from "vuex"

export default {
    computed: {
        ...mapState(["features"])
    },
  data() {
    return {
      isDropdownOpen: false,
      selectedOption: {id:0, name:"select Option"},
      selectedTitle: "",
      selectedDescription: ""
    };
  },
  methods: {
    createPost() {
        if (this.$store.state.auth.user === null) {return}
        const data = {
        title: this.selectedTitle,
        description: this.selectedDescription,
        categoryId: this.selectedOption.id,
        userId: this.$store.state.auth.user.id
      }
      this.$store.dispatch("features/createPost",data)
      this.selectedTitle=""
      this.selectedDescription=""
      this.selectedOption={id:0, name:"select Option"}
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isDropdownOpen = false;
    },
    closeDropdown(event) {
      if (!event.target.closest('.catagory-dropdown')) {
        this.isDropdownOpen = false;
      }
    },
    setTitle(event) {
        this.selectedTitle = event.target.value;
    },
    setDecription(event) {
        this.selectedDescription = event.target.value;
    }
  },
  mounted() {
    window.addEventListener('click', this.closeDropdown);
    this.$store.dispatch("features/getAllCategories");
  }
};
</script>

<style>
.createbox{
    background-color: #FCFCFC;
    width: 320px;
    max-height: 380px;
    border-radius: 10px;
}

.createbox-content{
    margin: 18px;
}

.titlebox{
    padding: 12px;
    color: rgb(0, 0, 0);
    font-size: 16px;
    font-weight: bold;
    background-color: rgb(235, 235, 235);
    border-radius: 10px 10px 0 0;
    box-shadow: 0px 12px 25px -5px rgba(0, 0, 0, 0.25)
}



.catagory-title{
    padding-top: 8px;
}

.catagory-dropdown{
    border-bottom: 2px solid rgb(129, 129, 129);
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}

.dropdown-content{
    background-color: #FCFCFC;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 0 0 10px 10px;
    position: absolute;
    width: 284px;
    
}

.src-catagory{
    width: 100%;
    outline: none;
}

.catagory-options{
    text-align: left;
    padding: 10px;
}

.catagory-options p{
    cursor: pointer;
}



.heading-title{
    padding-top: 8px;
}

.heading-textfield{
    width: 284px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 2px solid rgb(129, 129, 129);
    outline: none;
    background-color: #FCFCFC;
    color: black;
}



.details-title{
    padding-top: 8px;
}

.details-textarea{
    width: 284px;
    height: 80px;
    outline: none;
    border: 2px solid rgb(129, 129, 129);
    border-radius: 4px;
    resize: none;
    background-color: #E8E8E8;
    color: black;
}

.submit-area{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 8px;
}

.submit-button{
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

.submit-button:hover{
    background-color: #016134;
    transition: ease-in 0.2s;
}

</style>