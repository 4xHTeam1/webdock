<template>
  <div class="UpvoteButton_Container" :class="{ active: activated }" @click="toggleUpvote">
    <img class="UpvoteButton_Image" src="../../Assets/icons/upvote.svg" />
    <div class="UpvoteButton_Upvote">{{ feature._count.featureUpvotes }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activated: false
    };
  },
  props: {
    feature: {
      type: Object,
      required: true,
    },
  },
  mounted: function () {
    this.activated = this.$store.state.auth.user !== null ? this.feature.featureUpvotes.some(
      (upvote) => upvote.userId === this.$store.state.auth.user.id
    ) : false;
  },
  methods: {
    async toggleUpvote() {
      try {
        if (!this.activated) {
          await this.$store.dispatch("features/upvoteFeature", {
            featureId: this.feature.id,
            userId: this.$store.state.auth.user.id,
          });
          if (this.$store.state.auth.user.id !== this.feature.userId) {
            await this.$store.dispatch("socket/sendUpvote", {
              postId: this.feature.id,
              userId: this.$store.state.auth.user.id,
              ownerId: this.feature.userId,
            });
          }
          this.$store.dispatch("features/sendUpvoteEmail", {
            ownerId: this.feature.userId,
            subject: "Your feature has been upvoted!",
            user: this.$store.state.auth.user,
            feature: this.feature,
            link: "http://localhost:5173/feature-request/" + this.feature.id,
          })
        } else {
          await this.$store.dispatch("features/downvoteFeature", {
            featureId: this.feature.id,
            userId: this.$store.state.auth.user.id,
          });
        }

        this.activated = !this.activated;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.UpvoteButton_Container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 40px;
  max-height: 40px;
  min-width: 40px;
  min-height: 40px;
  aspect-ratio: 1/1;
  background-color: #ebebeb;
  border-radius: 5px;
  border: 1px solid #949494;
  color: #000;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
}

.UpvoteButton_Image {
  width: 23px;
  aspect-ratio: auto;
  margin: 0;
  padding: 0;
}

.UpvoteButton_Upvote {
  font-size: 0.8rem;
  font-weight: bold;
  margin: 0;
  padding: 0;
}

.active .UpvoteButton_Image {
  filter: invert(22%) sepia(53%) saturate(5161%) hue-rotate(150deg) brightness(93%) contrast(99%);
}
</style>
