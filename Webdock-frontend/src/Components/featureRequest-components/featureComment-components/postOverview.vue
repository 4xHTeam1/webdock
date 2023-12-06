<template>
  <div class="postContainer">
    <div class="postHeading">
      <div class="postHeadContainer">
        <upvoteButton :feature="feature" />
        <div class="postTitle">
          <h1>{{ feature.title }}</h1>
          <div class="postStatus" v-if="auth.user !== null && auth.user.role.toLowerCase() === 'admin'">
            <select v-model="selectedStatus" @change="updateStatus" :style="{ color: selectedStatus.color }">
              <option v-for="status in features.statuses" :key="status.id" :value="status.id"
                :style="{ color: status.color }">
                {{ status.name }}
              </option>
            </select>
          </div>
          <div class="postStatus" :style="{ color: feature.status.color }">
            {{ feature.status.name }}
          </div>
        </div>
      </div>
      <div class="postHeadBotContainer">
        <div class="postUserInfo">
          <div class="usersAvatar postUserAvatar">
            <div class="noneAvatar" v-if="feature.user.avatarURL === null ||
              feature.user.avatarURL === '' ||
              feature.user.avatarURL === undefined
              " style="background-color: #9cb">
              {{ feature.user.name[0] }}
            </div>
            <img v-else :src="feature.user.avatarURL" alt="avatar" class="user_img" />
            <img src="../../../Assets/webdock-logo-farvet.png" alt="webdock admin"
              v-if="feature.user.role.toLowerCase() === 'admin'" class="admin_logo" />
          </div>
          <div class="userName" :style="{
            color:
              feature.user.role.toLowerCase() === 'admin' ? '#018647' : '',
          }">
            <p>
              {{
                feature.user.role.toLowerCase() === "admin"
                ? feature.user.name + " from Webdock"
                : feature.user.name
              }}
            </p>
          </div>
        </div>
        <div class="description">
          <p>{{ feature.description }}</p>
        </div>
        <div class="date">
          <p>
            {{ new Date(feature.dateSubmitted).toLocaleDateString("en-GB") }}
          </p>
        </div>
        <div class="commentContainer" v-if="auth.user !== null">
          <textarea class="inputArea" placeholder="Leave a Comment" @input="resize($event)" @click="toggleControls"
            :value="this.comment" @keyup="this.comment = $event.target.value"></textarea>
          <div class="submitContainer" v-if="showControls" :class="{ showBorder: showControls }">
            <div class="submitBtn" :class="{ btnActive: this.comment !== '' }" @click="handleSubmitComment()">
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import upvoteButton from "../../roadmap-components/upvoteButton.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      showControls: false,
      isSubmitBtnActive: false,
      comment: "",
      selectedStatus: this.feature.status,
    };
  },
  computed: {
    ...mapState(["auth", "admin", "features"]),
  },
  created: async function () {
    this.selectedStatus = this.feature.status;
    if (this.features.statuses.length <= 0 || this.features.statuses === undefined) {
      await this.$store.dispatch("features/getAllStatuses");
    }
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
      if (!this.auth.user || this.comment === "") {
        return;
      }
      this.$store.dispatch("features/createComment", {
        id: this.feature.id,
        userId: this.auth.user.id,
        comment: this.comment,
      });

      this.comment = "";
      this.showControls = false;
    },
    updateStatus() {
      this.$store.dispatch("features/updateFeatureStatus", {
        id: this.feature.id,
        statusId: this.selectedStatus,
        requesterId: this.auth.user.id,
      });
    },
  },
  components: {
    upvoteButton,
  },
  props: {
    feature: {
      type: Object,
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

.postUserAvatar {
  margin: 0 10px 0 0;
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
  margin-bottom: 10px;
}

.postHeadBotContainer {
  margin-left: 50px;
}

.postHeadContainer h1 {
  margin: 0;
}

.postTitle {
  display: flex;
  flex-direction: column;
}

.description {
  margin-top: 10px;
}

.submitBtn {
  width: 80px;
  height: auto;
  text-align: center;
  font-size: 16px;
  opacity: 50%;
  background-color: #018647;
  color: white;
  cursor: default;
  padding: 8px;
  border-radius: 4px;
}

.btnActive {
  transition: ease-in 0.2s;
  background-color: #018647;
  opacity: 100%;
  cursor: pointer;
}
</style>
