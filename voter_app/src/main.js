import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCircleArrowRight);
library.add(faCircleXmark);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(store);
app.use(router);
app.mount("#app");
