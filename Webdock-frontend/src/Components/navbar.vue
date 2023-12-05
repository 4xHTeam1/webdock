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
          <notification v-if="auth.user !== null" />
          <profil v-if="auth.user !== null" />
          <login v-else />
        </div>
      </div>
      <div class="tap-parent-container">
        <router-link to="/" :class="{ active: activeTab === 'roadmap' }" style="text-decoration: none;">
          <taps buttontext="ROADMAP" :imageSrc="threeDots" :isActive="activeTab === 'roadmap'"></taps>
        </router-link>
        <router-link to="/feature-request" :class="{ active: activeTab === 'feature' }" style="text-decoration: none;">
          <taps buttontext="FEATURE REQUEST" :imageSrc="lightbulb" :isActive="activeTab === 'feature'"></taps>
        </router-link>
        <router-link to="/admin" :class="{ active: activeTab === 'admin' }" style="text-decoration: none;">
          <taps buttontext="ADMIN DASHBOARD" :imageSrc="webdocklogo" :isAdmin="true" :isActive="activeTab === 'admin'">
          </taps>
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
import webdocklogo from '../Assets/icons/webdock-logo.svg';
import threeDots from '../Assets/icons/three-dots-vertical.svg';
import lightbulb from '../Assets/icons/lightbulb.svg';
export default {
  computed: {
    ...mapState(["auth"]),
  },
  data() {
    return {
      webdocklogo,
      threeDots,
      lightbulb,
      activeTab: '',
    }
  },
  components: {
    taps,
    profil,
    notification,
    login
  },
  watch: {
    '$route': function () {
      this.setActiveTab();
    },
  },
  methods: {
    setActiveTab() {
      if (this.$route.path.startsWith('/feature-request')) {
        this.activeTab = 'feature';
      } else if (this.$route.path.startsWith('/admin')) {
        this.activeTab = 'admin';
      } else {
        this.activeTab = 'roadmap';
      }
    },
  },
  mounted: function () {
    this.setActiveTab();
  },
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
  max-height: 36px;
  width: 100%;
  height: auto;
}
</style>
