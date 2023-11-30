<template>
  <div class="feature-container">
    <div class="featureHeadContainer">
        <upvoteButton :feature="feature" />
        <div class="featureHeadText">
            <div class="feature-heading"><h1>{{ feature.title }}</h1></div>
            <div class="feature-status" :style="{ '--color': color }"><p>{{ feature.status.name }}</p></div>
            <div class="feature-text"><p>{{ feature.description }}</p></div>
        </div>
    </div>
    <router-link style="text-decoration: none; color: inherit;" :to="`/feature-request/${feature.id}`">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#bbb" class="bi bi-chat-left" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" /></svg>
    </router-link>
  </div>
</template>

<script>
import upvoteButton from '../roadmap-components/upvoteButton.vue'
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
  justify-content: space-between;
  align-items: center;
  margin: 16px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 6px;
}

.featureHeadContainer{
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
}

.featureHeadContainer p{
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
}
</style>