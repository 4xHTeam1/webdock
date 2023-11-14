<template>
        <div class="feature-container">
            <!-- <upvoteButton/> -->
            <div class="feature-textall">
                <div class="feature-heading">bandwidth usage</div>
                <div class="feature-status" :style="{ '--color': color}">{{status}}</div>
                <div class="feature-text">Can we please have an reporting tab which shows monthly bandwidth usage for a server ...</div>
            </div>
            <router-link style="text-decoration: none; color: inherit;" to="/feature-request/feature-comments">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#bbb" class="bi bi-chat-left" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                </svg>
            </router-link>
        </div>
</template>

<script>
//  import upvoteButton from '../Components/upvoteButton.vue'
export default {
  components: {
    // upvoteButton,
  },
  props: {
    status: {
      type: String,
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

.feature-container{
    padding: 18px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 16px;
}

.feature-textall{
    display: flex;
    flex-direction: column;
}

.feature-heading{
    font-size: 2rem;
}

.feature-status{
    font-size: 1rem;
    color: var(--color);
    text-transform: uppercase;
}

.feature-text{
    font-size: 1rem;
    text-overflow: ellipsis;
    width: 90%;
}


</style>