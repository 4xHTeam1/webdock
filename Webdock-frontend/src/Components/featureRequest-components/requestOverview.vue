<template>
  <div class="feature-container">
    <div class="feature_upvoteContainer">
      <upvoteButton :feature="feature" />
    </div>
    <router-link class="feature_wrapper" :to="`/feature-request/${feature.id}`">
      <div class="featureHeadContainer">
        <div class="featureHeadText">
          <div class="feature-heading">
            <h1>
              <b>{{ feature.title }}</b>
            </h1>
          </div>
          <div class="feature-status" :style="{ '--color': color }">
            <p>{{ feature.status.name }}</p>
          </div>
          <div class="feature-text">
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#bbb" class="bi bi-chat-left"
        viewBox="0 0 16 16">
        <path
          d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
      </svg>
    </router-link>
  </div>
</template>

<script>
import upvoteButton from "../roadmap-components/upvoteButton.vue";
export default {
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
.feature-container {
  padding: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 6px;
  gap: 25px;
  width: 100%;
  border: 1px solid #fff;
  transition: all 0.2s ease-in-out;
}

.featureHeadContainer {
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  flex: 1;
}

.featureHeadContainer h1 {
  font-size: 1.5rem;
}

.featureHeadContainer p {
  font-size: 18px;
  margin: 0px;
}

.feature-status {
  font-size: 1rem;
  color: var(--color);
  text-transform: uppercase;
}

.feature-text {
  font-size: 1rem;
  text-overflow: ellipsis;
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  color: #888
}

.feature_wrapper {
  text-decoration: none;
  color: #000;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 25px;
  flex: 1;
}

.feature-container:hover {
  border: 1px solid #a9a9a9
}

.feature_wrapper:hover {
  text-decoration: none;
  color: #000;
}

.feature_upvoteContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: fit-content;
  height: 100%;
}
</style>