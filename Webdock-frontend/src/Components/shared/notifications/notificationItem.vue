<template>
  <div class="notificationItem_Container">
    <div class="notificationItem_ImageContainer">
      <img
        class="notificationItem_Image"
        src="{{ notification.avatarURL }}"
        alt="avatarURL"
        v-if="!checkNotificationPic()"
      />
      <div
        class="notificationItem_ImageDefault"
        :style="{ backgroundColor: randomPastelColor, color: textColor }"
        v-if="checkNotificationPic()"
      >
        {{ notification.name[0] }}
      </div>
    </div>
    <div class="notificationItem_InfoContainer">
      <div class="notificationItem_Info">
        <p class="notificationItem_User">{{ notification.name }}</p>
        <p class="notificationItem_Type">{{ notification.type }}</p>
      </div>
      <div class="notificationItem_Feature">
        <p class="notificationItem_FeatureTitle">
          {{ notification.data.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "notificationItem",
  props: {
    notification: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      red: 0,
      green: 0,
      blue: 0,
    };
  },
  computed: {
    randomPastelColor() {
      const base = 256;
      const range = 100; // Adjust this to get lighter or darker colors
      this.red = Math.floor(Math.random() * range + (base - range));
      this.green = Math.floor(Math.random() * range + (base - range));
      this.blue = Math.floor(Math.random() * range + (base - range));
      return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    },
    textColor() {
      // https://www.w3.org/TR/AERT/#color-contrast
      // https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
      const brightness = Math.sqrt(
        0.299 * this.red ** 2 + 0.587 * this.green ** 2 + 0.114 * this.blue ** 2
      );
      return brightness > 127.5 ? "black" : "white";
    },
  },
  mounted: async function () {
    console.log(this.notification);
  },
  methods: {
    checkNotificationPic() {
      return (
        this.notification === null ||
        this.notification === undefined ||
        this.notification === "" ||
        this.notification.avatarURL === null ||
        this.notification.avatarURL === undefined ||
        this.notification.avatarURL === ""
      );
    },
  },
};
</script>

<style>
.notificationItem_Container {
  width: 100%;
  height: 100%;
  min-height: 70px;
  min-width: 300px;
  display: flex;
  flex-direction: row;
  background: #f2f2f2;
  border-radius: 3px;
  border: 1px solid #a9a9a9;
  padding: 5px;
  justify-items: center;
  gap: 5px;
}

.notificationItem_ImageContainer {
  width: 37px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.notificationItem_ImageDefault {
  width: 37px;
  height: 37px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.notificationItem_InfoContainer {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.notificationItem_Info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  max-height: fit-content;
}

.notificationItem_User {
  font-size: 0.8rem;
  font-weight: lighter;
  color: #a7a7a7;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
}

.notificationItem_Type {
  font-size: 0.8rem;
  font-weight: lighter;
  color: #327e60;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  min-width: fit-content;
  margin: 0;
}

.notificationItem_Feature {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0;
}

.notificationItem_FeatureTitle {
  font-size: 1rem;
  font-weight: light;
  color: #000;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  min-width: fit-content;
}
</style>
