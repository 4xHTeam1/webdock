<template>
  <div class="nav-container">
    <div class="container">
      <div class="logo-icon-flex" id="webdock-logo">
        <router-link to="/" tag="div" class="homelink">
          <div>
            <img class="img-size" src="../Assets/webdock-logo-hvid.svg">
          </div>
        </router-link>
        <div class="icon-parent-container">
          <notification v-if="this.$store.state.auth.user !== null" />
          <profil v-if="this.$store.state.auth.user !== null" />
          <login v-if="this.$store.state.auth.user === null" />
        </div>
      </div>
      <div class="tap-parent-container">
        <router-link to="/" :class="{ active: roadmapActive }" style="text-decoration: none;"
          @click="setroadmapActive">
          <taps buttontext="ROADMAP" imageSrc="src/Assets/icons/three-dots-vertical.svg" :isActive="roadmapActive"></taps>
        </router-link>
        <router-link to="/feature-request" :class="{ active: featureActive }" style="text-decoration: none;"
          @click="setfeatureActive">
          <taps buttontext="FEATURE REQUEST" imageSrc="src/Assets/icons/lightbulb.svg" :isActive="featureActive"></taps>
        </router-link>
      </div>
    </div>
    <div class="seperating-line"></div>
  </div>
</template>


<script lang="ts">
import taps from '../Components/nav-components/taps.vue';
import profil from '../Components/nav-components/profil.vue';
import notification from '../Components/shared/notificationComponent.vue';
import login from '../Components/shared/Login.vue'
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(["auth"]),
  },
  data() {
    return {
      roadmapActive: document.location.pathname === "/",
      featureActive: document.location.pathname === "/feature-request"
    }
  },
  components: {
    taps,
    profil,
    notification,
    login
  },
  methods: {
    setroadmapActive() {
      this.roadmapActive = true;
      this.featureActive = false;
    },
    setfeatureActive() {
      this.featureActive = true;
      this.roadmapActive = false;
    },
  },
  props: {
    buttontext: {
      type: String,
      required: true
    },
    imageSrc: String,
    letterSrc: {
      type: String,
      required: true
    }
  }
};


</script>
<style>
.active {
  background: white;
  color: #000;
  border-radius: 11px 11px 0 0;
}

.active:hover {
  text-decoration: none;
  color: #000;
}

a {
  text-decoration: none;
  color: #fff;
}

a:hover {
  text-decoration: none;
  color: #fff;
}



.active>.tap-container>.img-color {
  filter: invert(0%) sepia(94%) saturate(4%) hue-rotate(239deg) brightness(99%) contrast(101%);
}

.homelink {
  background: none;
}

.icon-parent-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
}

.logo-icon-flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.nav-container {
  margin-top: 1.5vh;
}

.seperating-line {
  width: 100vw;
  height: 3px;
  background: #fff;
}

.tap-parent-container {
  margin-top: 15px;

  display: flex;
  flex-direction: row;
}

.img-size {
  width: 20vw;
  min-width: 200px;
}
</style>