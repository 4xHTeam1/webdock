<template>
<div class="createbox">
    <div class="titlebox d-flex justify-content-center">
        Create Post
    </div>
    <div class="createbox-content">
        <div class="catagory">
            <div class="catagory-title">Catagory</div>
            <div class="catagory-dropdown" @click="toggleDropdown">
                {{ selectedOption }}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
            <div class="dropdown-content" v-if="isDropdownOpen">
                <input class="src-catagory" type="text" placeholder="Search..." @click.stop />
                <div class="catagory-options">
                    <p @click="selectOption('test1')">test1</p>
                    <p @click="selectOption('test2')">test2</p>
                    <p @click="selectOption('test3')">test3</p>
                </div>
            </div>
        </div>
        <div class="heading">
            <div class="heading-title">Title</div>
            <input class="heading-textfield" type="text" placeholder="Short, descriptive title">
        </div>
        <div class="details">
            <div class="details-title">Details</div>
            <textarea class="details-textarea" v-model="message" placeholder="Any additional details…"></textarea>
        </div>
        <div class="submit-area">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="#6F6E77" class="bi bi-image" viewBox="0 0 16 16">
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                </svg>
            </div>
            <div class="submit-button">Create Post</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      isDropdownOpen: false,
      selectedOption: "Select Catagory"
    };
  },
  methods: {
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
    }
  },
  mounted() {
    window.addEventListener('click', this.closeDropdown);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.closeDropdown);
  }
};
</script>

<style>
.createbox{
    background-color: #FCFCFC;
    width: 320px;
    height: 410px;
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

</style>