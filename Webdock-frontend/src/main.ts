import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import authStore from "./stores/authstore";

createApp(App).use(authStore).mount("#app");
