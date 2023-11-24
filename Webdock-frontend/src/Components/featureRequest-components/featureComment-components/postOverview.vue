<template>
  <div class="postContainer">
    <!-- <upvoteButton/> -->
    <div class="postHeading">
      <div class="postTitle">bandwidth usage</div>
      <div class="postStatus" :style="{ '--color': color }">{{ status }}</div>
      <div class="postUserInfo">
        <div class="usersAvatar">
          <div class="noneAvatar" style="background-color: #9cb">R</div>
        </div>
        <div class="userName">Robin Edwards</div>
      </div>
      <div class="description">
        Can we please have an reporting tab which shows monthly bandwidth usage
        for a server ...
      </div>
      <div class="date">19 oktober 2023</div>
      <div class="commentContainer">
        <textarea
          class="inputArea"
          placeholder="Leave a Comment"
          @input="resize($event)"
          @click="toggleControls"
          ref="commentTextarea"
        ></textarea>
        <div
          class="submitContainer"
          v-if="showControls"
          :class="{ showBorder: showControls }"
        >
          <div class="submitBtn">Submit</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//  import upvoteButton from '../Components/upvoteButton.vue'
export default {
  data() {
    return {
      showControls: false,
    };
  },
  methods: {
    resize(e) {
      e.target.style.height = "45px";
      e.target.style.height = `${e.target.scrollHeight}px`;
    },
    toggleControls() {
      this.showControls = true;
      document.body.addEventListener("click", this.handleDocumentClick);
    },
    handleDocumentClick(hideSubmit) {
      const textarea = this.$refs.commentTextarea;
      if (textarea && !textarea.contains(hideSubmit.target)) {
        if (!textarea.value.trim()) {
          this.showControls = false;
        }
      }
    },
  },
  components: {
    // upvoteButton,
  },
  props: {
    status: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
  },
};
</script>

<style>
.postUserInfo {
  display: flex;
  flex-direction: row;
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

.submitContainer {
  display: flex;
  flex-direction: row;
  justify-content: end;
  padding: 12px;
}
</style>
