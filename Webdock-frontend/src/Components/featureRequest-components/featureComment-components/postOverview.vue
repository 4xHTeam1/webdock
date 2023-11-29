<template>
  <div class="postContainer">
    <div class="postHeading">
      <div class="postHeadContainer">
        <upvoteButton :feature="feature" />
        <div class="postTitle">
          <h1>{{ feature.title }}</h1>
          <div class="postStatus" :style="{ '--color': color }">{{ feature.status.name }}</div>
        </div>
      </div>
      <div class="postUserInfo">
        <div class="usersAvatar">
          <div class="noneAvatar"
            v-if="feature.user.avatarURL === null || feature.user.avatarURL === '' || feature.user.avatarURL === undefined"
            style="background-color: #9cb">{{ feature.user.name[0] }}</div>
          <img v-else :src="feature.user.avatarURL" alt="avatar" class="user_img" />
          <img src="../../../Assets/webdock-logo-farvet.png" alt="webdock admin"
            v-if="feature.user.role.toLowerCase() === 'admin'" class="admin_logo">
        </div>
        <div class="userName" :style="{ color: feature.user.role.toLowerCase() === 'admin' ? '#018647' : '' }">{{
          feature.user.role.toLowerCase() === 'admin' ? feature.user.name + ' from Webdock' :
          feature.user.name }}</div>
      </div>
      <div class="description">
        <p>{{ feature.description }}</p>
      </div>
      <div class="date">
        <p>{{ new Date(feature.dateSubmitted).toLocaleDateString('en-GB') }}</p>
      </div>
      <div class="commentContainer">
        <textarea class="inputArea" placeholder="Leave a Comment" @input="resize($event)" :value="this.comment"
          @keyup="this.comment = $event.target.value" @click="toggleControls" ref="commentTextarea"></textarea>
        <div class="submitContainer" v-if="showControls" :class="{ showBorder: showControls }">
          <div class="submitBtn" @click="handleSubmitComment()">Submit</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import upvoteButton from "../../roadmap-components/upvoteButton.vue";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      showControls: false,
      comment: ""
    };
  },
  computed: {
    ...mapState(["auth"])
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
    handleSubmitComment() {
      if (!this.auth.user) { return }
      this.$store.dispatch("features/createComment", {
        id: this.feature.id,
        userId: this.auth.user.id,
        comment: this.comment
      });
    }
  },
  components: {
    upvoteButton,
  },
  props: {
    feature: {
      type: Object,
      required: true,
    },
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

.user_img {
  width: 100%;
  height: 100%;
  border-radius: 100px;
  object-fit: cover;
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

.postHeading {
  display: flex;
  flex-direction: column;
}

.postHeadContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.postHeadContainer h1 {
  font-size: 24px;
  margin: 0;
}

.postTitle {
  display: flex;
  flex-direction: column;
}

.description {
  margin-top: 10px;
}
</style>
