import { createApp } from "vue";
import App from "./App.vue";
import router from "./Router";
import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";
import store from "./stores/store";

const app = createApp(App).use(bootstrap);

app.use(router);
app.use(store);

app.mount("#app");
