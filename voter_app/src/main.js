import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import i18n from "./lang/i18n";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleArrowRight,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCircleArrowRight);
library.add(faCircleXmark);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(store);
app.use(router);
app.use(i18n);
app.mount("#app");
