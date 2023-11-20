<template>
    <div class="commentContainer">
        <div class="topContainer">
            <div class="postUserInfo">
                <div class="usersAvatar">
                  <div class="noneAvatar" style="background-color:#9cb;">A</div>
                </div>
                <div class="userName">Robin Edwards</div>
            </div>
        </div>
        <div class="bottomContainer">
            <div class="commentBody">
                <div>
                    Robin Edwards You mentioned in your support ticket to us on this topic that this was to be used for CO2 emission calculations. This got us thinking: It would be kind of cool to be able to show resource usage by month in a table but also show some calculation of CO2 impact and what our CO2 mitigation has done for you.
                    Could you share, out of interest, which formula you were planning on calculating CO2 emissions based on bandwidth utilization?
                </div>
                <div class="menu">
                    <div class="likeReaction">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                        </svg>
                    </div>
                    <div class="commentTimestamp">August 8, 2023 </div>
                    <div class="commentReply" @click="toggleCommentReplyContainer">Reply</div>
                </div>
            </div>
            <div class="commentReplyContainer" v-if="showCommentReplyContainer">
                <textarea class="inputArea" placeholder="Leave a Comment" @input="resize($event)" @click="toggleControls" ref="commentTextarea"></textarea>
                <div class="submitContainer" v-if="showControls" :class="{ 'showBorder': showControls }">
                    <div class="imageContainer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="#bbb" class="bi bi-image" viewBox="0 0 16 16">
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                        </svg>
                    </div>
                    <div class="submitBtn">Submit</div>
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
          this.showControls =false;
        }
      }
    }
  },
};
</script>

<style>

    .postUserInfo{
        display: flex;
        flex-direction: row;
        }

    .usersAvatar{
      min-width: 26px;
      width: 26px;
      height: 26px;
      border-radius: 100px;
      position: relative;
      z-index: 1;
      margin: 0 10px 0 10px;
    }

    .noneAvatar{
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

    .commentReply{
        text-decoration: underline;
        cursor: pointer;
    }

    .commentReplyContainer{
        border-radius: 6px;
        display: flex;
        flex-direction: column;
    }

</style>
