<template>
  <div :class="`Feature_Container ${active ? 'Feature_Active' : ''}`">
    <img
      src="../../Assets/icons/check.svg"
      alt="check"
      class="Feature_Selected"
      v-if="active"
    />
    <div class="Feature_InfoContainer">
      <p :class="`Feature_Title ${active ? 'Feature_Text_Active' : ''}`">
        {{ feature.title }}
      </p>
      <div class="postUserInfo">
        <div class="usersAvatar postUserAvatar">
          <div
            class="noneAvatar"
            v-if="
              feature.user.avatarURL === null ||
              feature.user.avatarURL === '' ||
              feature.user.avatarURL === undefined
            "
            style="background-color: #9cb"
          >
            {{ feature.user.name[0] }}
          </div>
          <img
            v-else
            :src="feature.user.avatarURL"
            alt="avatar"
            class="user_img"
          />
          <img
            src="../../Assets/webdock-logo-farvet.png"
            alt="webdock admin"
            v-if="feature.user.role.toLowerCase() === 'admin'"
            class="admin_logo"
          />
        </div>
        <div
          class="userName"
          :style="{
            color: feature.user.role.toLowerCase() === 'admin' ? '#018647' : '',
          }"
        >
          <p>
            {{
              feature.user.role.toLowerCase() === "admin"
                ? feature.user.name + " from Webdock"
                : feature.user.name
            }}
          </p>
        </div>
      </div>
      <p :class="`Feature_Description ${active ? 'Feature_Text_Active' : ''} `">
        {{ feature.description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    feature: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.Feature_Container {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.Feature_Active {
  background-color: #24ab95;
  color: #fff;
}

.Feature_Text_Active {
  color: #fff !important;
}

.Feature_Selected {
  width: 20px;
  height: 20px;
  aspect-ratio: 1/1;
  position: absolute;
  top: 10px;
  right: 10px;
  filter: invert(100%);
}

.Feature_InfoContainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
  text-decoration: none;
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
  transition: all 0.2s ease-in-out;
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
  transition: all 0.2s ease-in-out;
}
</style>

