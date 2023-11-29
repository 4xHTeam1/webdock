<template>
  <div class="commentContainer">
    <div class="topContainer">
      <div class="postUserInfo">
        <div class="usersAvatar">
          <div class="noneAvatar"
            v-if="comment.user.avatarURL === null || comment.user.avatarURL === '' || comment.user.avatarURL === undefined"
            style="background-color: #9cb">{{ comment.user.name[0] }}</div>
          <img v-else :src="comment.user.avatarURL" alt="avatar" />
        </div>
        <div class="userName">{{ comment.user.name }}</div>
      </div>
    </div>
    <div class="bottomContainer">
      <div class="commentBody">
        <div>
          {{ comment.comment }}
        </div>
        <div class="menu">
          <div class="likeReaction">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart"
              viewBox="0 0 16 16">
              <path
                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
            </svg>
          </div>
          <div class="commentTimestamp">{{ new Date(comment.dateSubmitted).toLocaleDateString("en-GB") }} </div>
          <div class="commentReply" @click="toggleCommentReplyContainer"><p>Reply</p></div>
        </div>
      </div>
      <div class="commentReplyContainer" v-if="showCommentReplyContainer">
        <textarea class="inputArea" placeholder="Leave a Comment" @input="resize($event)" @click="toggleControls"
          ref="commentTextarea"></textarea>
        <div class="submitContainer" v-if="showControls" :class="{ 'showBorder': showControls }">
          <div class="submitBtn"><p>Submit</p></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showControls: false,
      showCommentReplyContainer: false,
    };
  },
  props: {
    comment: {
      type: Object,
      required: true,
    }
  },
  methods: {
    resize(e) {
      e.target.style.height = "45px";
      e.target.style.height = `${e.target.scrollHeight}px`;
    },
    toggleControls() {
      this.showControls = true;
      document.body.addEventListener('click', this.handleDocumentClick);
    },
    toggleCommentReplyContainer() {
      this.showCommentReplyContainer = !this.showCommentReplyContainer;
    },
    handleDocumentClick(hideSubmit) {
      const textarea = this.$refs.commentTextarea;
      if (textarea && !textarea.contains(hideSubmit.target)) {
        if (!textarea.value.trim()) {
          this.showControls = false;
        }
      }
    }
  },
};
</script>

<style>

.bottomContainer{
  margin: 0px 0px 0px 34px;
}

.postUserInfo {
  display: flex;
  flex-direction: row;
}

.commentReply {
  text-decoration: underline;
  cursor: pointer;
}

.commentReplyContainer {
  border-radius: 6px;
  display: flex;
  flex-direction: column;
}
</style>
