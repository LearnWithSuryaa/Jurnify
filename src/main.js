import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

import { Motion } from "@motionone/vue";

const app = createApp(App);

app.use(router);

app.directive("motion", Motion);

app.mount("#app");
