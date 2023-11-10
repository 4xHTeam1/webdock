<template>
  <div class="Feature_Container">
    <upvote-button :upvotes="upvotes" />
    <div class="Feature_InfoContainer">
      <p class="Feature_Title">{{ title }}</p>
      <p class="Feature_Description">{{ description }}</p>
    </div>
  </div>
</template>

<script>
import UpvoteButton from "./upvoteButton.vue";
export default {
  components: {
    UpvoteButton,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    upvotes: {
      type: Number,
      required: false,
    },
  },
};
</script>

<style>
.Feature_Container {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.Feature_Upvote {
  min-width: 40px;
  min-height: 40px;
  max-width: 40px;
  max-height: 40px;
  aspect-ratio: 1/1;
  background-color: #ebebeb;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #949494;
  color: #000;
}

.Feature_InfoContainer {
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}

.Feature_Title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
  padding: 0;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.Feature_Description {
  font-size: 1rem;
  margin: 0;
  padding: 0;
  color: #000;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
}
</style>
