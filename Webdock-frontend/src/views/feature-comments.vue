<template>
  <div class="container" v-if="selectedFeature && selectedFeatureComments">
    <RouterLink to="/feature-request" class="link-decoration">
      <div class="goback-row">
        <img class="goback-arrow" src="../Assets/icons/arrow-left.svg">
        <div class="goback-p"> GO BACK</div>
      </div>
    </RouterLink>
  </div>
  <div class="container d-flex justify-content-center Comments_Container">
    <sideBar v-if="selectedFeature" :feature="this.$store.state.features.selectedFeature" />
    <div class="Comments_OverviewContainer">
      <div class="overview-comments">
        <postOverview v-if="selectedFeature" :feature="this.$store.state.features.selectedFeature" />
        <div class="postActivity">
          <div class="publicHeader">
            <div class="headerLeft">Activity Feed</div>
          </div>
          <div class="ActivityList_Container">
            <div class="activityList">
              <div class="postStatusChange">
                <postStatusChange status="planned" color="#1FA0FF" />
              </div>
              <div class="postComments" v-for="comment in this.$store.state.features.selectedFeatureComments"
                :key="comment.id">
                <postComment :comment="comment" />
                <div class="replyComment" v-for="reply in comment.commentReplys" :key="reply.id">
                  <postComment :comment="reply" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sideBar from "../Components/featureRequest-components/featureComment-components/sideBar.vue";
import postComment from "../Components/featureRequest-components/featureComment-components/postComment.vue";
import postStatusChange from "../Components/featureRequest-components/featureComment-components/postStatusChange.vue";
import postOverview from "../Components/featureRequest-components/featureComment-components/postOverview.vue";
export default {
  components: {
    postOverview,
    postStatusChange,
    postComment,
    sideBar,
  },
  computed: {
    selectedFeature() {
      return this.$store.state.features.selectedFeature;
    },
    selectedFeatureComments() {
      return this.$store.state.features.selectedFeatureComments;
    },
  },
  async mounted() {
    await this.$store.dispatch("features/getFeatureById", this.$route.params.id);
    await this.$store.dispatch("features/getCommentsForFeature", this.$route.params.id);
    console.log(this.$store.state.features.selectedFeatureComments)
  },
};
</script>

<style>
.goback-row {
  margin-left: 5px;
  margin-top: 5px;
  display: flex;
  color: #fff;
}

.goback-arrow {
  scale: 2;
}

.goback-p {
  margin-bottom: auto;
  padding-left: 14px;
  font-weight: bold;
}

.link-decoration {
  text-decoration: none;
}

.Comments_Container {
  flex: 1 1 0;
  gap: 18px;
  padding: 24px 0;
  padding-top: 10px;
}

.activityList {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  flex: 1 1 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.ActivityList_Container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.Comments_OverviewContainer {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
}

.overview-comments {
  flex: 1 1 0;
  flex-wrap: nowrap;
  background: #fcfcfc;
  border-radius: 10px;
  max-width: 600px;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.postActivity {
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  flex: 1;
}

.publicHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
}

.headerRight {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.postStatusChange {
  padding: 12px 10px 12px 0;
  border: 2px solid #ebebeb;
  border-radius: 6px;
  margin-bottom: 12px;
}

.sortSelect {
  min-width: 80px;
  width: auto;
  border-radius: 4px;
  padding: 6px;
  border: 2px solid #ebebeb;
}

.sortBy {
  display: flex;
  align-items: center;
}

.sortSelect:focus {
  outline: none;
}

.commentContainer {
  border-radius: 6px;
  display: flex;
  flex-direction: column;
}

.inputArea {
  height: 45px;
  width: 100%;
  border: none;
  outline: none;
  overflow-y: hidden;
  resize: none;
  padding: 8px 12px;
  border: 2px solid #ebebeb;
  font-size: 14px;
  background-color: #f7f7f7;
  color: black;
}

.inputArea:focus {
  outline: none;
}

.showBorder {
  border: 2px solid #ebebeb;
  border-top: none;
}

.imageContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 39px;
  height: 39px;
  background-color: #e8e8e8;
  border-radius: 6px;
}

.submitBtn {
  width: 80px;
  height: auto;
  text-align: center;
  font-size: 16px;
  background-color: #018647;
  color: white;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
}

.postComments{
  display: flex;
  flex-direction: column;
  width: 100%;
}

.replyComment {
  padding: 12px 0 12px 43px;
}
</style>
