import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createPinia } from "pinia";

import "./index.css";
import store from "./store";

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(router);

app.use(store);
app.use(pinia);

app.mount("#app");
