import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import i18n from "./lang/i18n";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSquarePollVertical,
  faCopy,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSquarePollVertical);
library.add(faCopy);
library.add(faPrint);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(store);
app.use(router);
app.use(i18n);
app.mount("#app");
