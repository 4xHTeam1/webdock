<template>
  <div
    class="UpvoteButton_Container"
    :class="{ active: activated }"
    @click="toggleUpvote"
  >
    <img class="UpvoteButton_Image" src="../../Assets/icons/upvote.svg" />
    <div class="UpvoteButton_Upvote">{{ upvotesNumber }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activated: false,
      upvotesNumber: this.upvotes,
    };
  },
  props: {
    upvotes: {
      type: Number,
      required: true,
    },
  },
  methods: {
    toggleUpvote() {
      this.activated = !this.activated;
      this.upvotesNumber += this.activated ? 1 : -1;
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
  filter: invert(22%) sepia(53%) saturate(5161%) hue-rotate(150deg)
    brightness(93%) contrast(99%);
}
</style>
