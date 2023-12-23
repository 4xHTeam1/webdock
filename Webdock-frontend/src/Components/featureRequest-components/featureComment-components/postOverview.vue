<template>
  <div v-if="mergeModalOpen" class="mergeModal_Container"
    :class="{ 'openModalBackground': mergeModalOpen && !mergeModalIsClosing, 'closeModalBackground': mergeModalIsClosing }">
    <div class="mergeModal_Wrapper"
      :class="{ 'OpenModal': mergeModalOpen, 'CloseModal': mergeModalIsClosing }">
      <img src="../../../Assets/icons/close.svg" alt="close" class="mergeModal_Close" @click="closeMergeModal">
      <div class="mergeModal_Info">
        <h1 class="mergeModal_Title">Merge Post</h1>
        <p class="mergeModal_Description">Choose 1 or more post to merge with this one</p>
      </div>
      <div class="mergeModal_SearchContainer">
        <div class="Search_Container">
          <img class="Search_Icon" src="../../../Assets/icons/searchIcon.svg" alt="search" />
          <input class="Search_Input" type="text" placeholder="Search"
            @keyup="(e) => this.filterFeatures(e.target.value)" />
        </div>
      </div>
      <div class="mergeModal_FeaturesContainer">
        <mergeFeature v-for="feature in this.filteredFeatures" :key="feature.id" :feature="feature"
          :active="checkIfSelected(feature)" @click="selectFeature(feature)" />
      </div>
      <div class="mergeModal_interactionContainer">
        <button class="mergeModal_CloseButton" @click="closeMergeModal">
          Cancel
        </button>
        <button class="mergeModal_ConfirmButton" :disabled="this.selectedFeatures.length <= 0" @click="mergePosts">
          Merge <span v-if="this.selectedFeatures.length > 0">{{ this.selectedFeatures.length }} post<span
              v-if="this.selectedFeatures.length >= 2">s</span></span>
        </button>
      </div>
    </div>
  </div>
  <div class="postContainer">
    <div class="postHeading">
      <div class="postHeadContainer">
        <upvoteButton :feature="feature" />
        <div class="postTitle_Container">
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
            <button class="Merge_Button" @click="openMergeModal">
              <img src="../../../Assets/icons/merge.svg" class="Merge_Icon" alt="merge" />
              <span class="Merge_Text">Merge Post</span>
            </button>
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
import mergeFeature from "../../mergePost-components/mergeFeature.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      showControls: false,
      isSubmitBtnActive: false,
      comment: "",
      selectedStatus: this.feature.status,
      mergeModalOpen: false,
      mergeModalIsClosing: false,
      selectedFeatures: [],
      filteredFeatures: [],
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
    mergePosts() {
      console.log("merge posts ", this.selectedFeatures)
    },
    checkIfSelected(feature) {
      return this.selectedFeatures.includes(feature);
    },
    selectFeature(feature) {
      if (this.selectedFeatures.includes(feature)) {
        this.selectedFeatures = this.selectedFeatures.filter((f) => {
          return f !== feature;
        });
      } else {
        this.selectedFeatures.push(feature);
      }
    },
    filterFeatures(search) {
      this.filteredFeatures = this.features.allFeatures.filter((feature) => {
        return feature.title.toLowerCase().includes(search.toLowerCase()) ||
          feature.description.toLowerCase().includes(search.toLowerCase());
      }).filter((feature) => {
        return feature.id !== this.feature.id;
      });
    },
    async openMergeModal() {
      await this.$store.dispatch("features/getAllFeatures");
      this.filteredFeatures = this.features.allFeatures.filter((feature) => {
        return feature.id !== this.feature.id;
      })
      this.mergeModalOpen = true;
    },
    closeMergeModal() {
      this.mergeModalIsClosing = true;
      setTimeout(() => {
        this.mergeModalOpen = false;
        this.mergeModalIsClosing = false;
      }, 500);
    },
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
    mergeFeature
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
@keyframes OpenModal {
  0% {
    opacity: 0;
    transform: scale(0.7);
  }

  60% {
    opacity: 1;
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes CloseModal {

  0% {
    transform: scale(1);
  }

  60% {
    opacity: 1;
    transform: scale(1.1);
  }

  100% {
    opacity: 0;
    transform: scale(0.7);
  }
}

@keyframes opacity {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes opacityReverse {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.openModalBackground {
  animation: opacity 0.5s ease-in-out forwards;
}

.closeModalBackground {
  animation: opacityReverse 0.5s ease-in-out forwards;
}

.openModal {
  animation: OpenModal 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

.closeModal {
  animation: CloseModal 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

.mergeModal_Container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.mergeModal_Wrapper {
  width: 800px;
  height: 600px;
  background: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  position: relative;
  animation: OpenModal 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

.Merge_Button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #fff;
  color: #018647;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
  width: fit-content;
  text-wrap: nowrap;
  cursor: pointer;
  border: none;
  outline: none;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
  transition: ease-in-out 0.2s;
}

.Merge_Button:hover {
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
  scale: 1.01;
}

.mergeModal_ConfirmButton:disabled {
  background-color: #ccc;
  color: #fff;
  cursor: not-allowed;
}

.mergeModal_ConfirmButton:disabled:hover {
  background-color: #ccc;
  color: #fff;
  cursor: not-allowed;
}

.mergeModal_ConfirmButton:enabled {
  background-color: #018647;
  color: #fff;
  border-radius: 4px;
  padding: 8px 15px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  outline: none;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
  transition: ease-in-out 0.2s;
}

.mergeModal_Close {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: ease-in-out 0.2s;
}

.mergeModal_Close:hover {
  scale: 1.1;
}

.Merge_Icon {
  width: 20px;
  height: 20px;
  filter: invert(29%) sepia(95%) saturate(3438%) hue-rotate(144deg) brightness(87%) contrast(99%);
}

.mergeModal_Info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid #ccc;
  padding: 15px;
}

.mergeModal_Title {
  margin: 0;
}

.mergeModal_Description {
  margin: 0;
}

.mergeModal_SearchContainer {
  padding: 15px;
  width: 100%;
  display: flex;
  justify-content: end;
}

.Search_Container {
  width: fit-content;
  height: 100%;
  min-height: 40px;
  max-height: 40px;
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  border: 1px solid #ccc;
  gap: 2px;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
}

.Search_Icon {
  width: 24px;
  aspect-ratio: 1/1;
  filter: invert(55%) sepia(21%) saturate(0%) hue-rotate(283deg) brightness(94%) contrast(94%);
}

.Search_Input {
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  font-size: 0.8rem;
  color: #000;
  background-color: transparent;
}

.Search_Input::placeholder {
  color: #888;
}

.mergeModal_FeaturesContainer {
  flex: 1 0 0;
  overflow-y: auto;
  padding: 0 15px 15px 15px;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mergeModal_interactionContainer {
  display: flex;
  flex-direction: row;
  justify-content: end;
  padding: 15px;
  gap: 10px;
}

.mergeModal_CloseButton {
  background-color: #fff;
  color: #860101;
  border-radius: 4px;
  padding: 8px 15px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  outline: none;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
  transition: ease-in-out 0.2s;
}

.mergeModal_CloseButton:hover {
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.6);
  color: #fff;
  background-color: #860101;
}

.mergeModal_ConfirmButton {
  background-color: #018647;
  color: #fff;
  border-radius: 4px;
  padding: 8px 15px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  outline: none;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
  transition: ease-in-out 0.2s;
}

.mergeModal_ConfirmButton:hover {
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.6);
  color: #fff;
  background-color: #035730;
}

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

.postTitle_Container {
  display: flex;
  flex-direction: column;
}

.postTitle {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
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
