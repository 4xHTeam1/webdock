<template>
  <div class="tap-container" :style="{ display: checkIfShow() ? '' : 'none' }">
    <img class="img-color" :src="imageSrc">
    <p id="roadmap-tap" :style="{ color: isActive ? '#000' : '#fff' }" class="fw-bolder noHover">{{ buttontext }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      isLoggedIn: false,
    }
  },
  computed: {
    ...mapState(["auth"]),
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
      required: false
    },
    buttontext: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    },
    imageSrc: {
      type: String,
      required: true
    }
  },
  methods: {
    checkIfShow() {
      if (this.isAdmin) {
        if (this.auth.user === null) return false
        return this.auth.user.role.toLowerCase() === 'admin'
      }
      return true
    }
  },
}
</script>

<style>
.img-color {
  filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(140deg) brightness(102%) contrast(110%);
}

.tap-container {
  max-width: fit-content;
  display: flex;
  flex-direction: row;

  border: 3px solid #fff;
  border-bottom: none;
  border-radius: 11px 11px 0 0;

  margin-left: -2px;

  padding: 5px;
  padding-right: 7px;
  background: none;
}

#roadmap-tap {
  margin-bottom: 0;
  text-decoration: none;
  color: inherit;
}
</style>

