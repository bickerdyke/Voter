import { createStore } from "vuex";

import votingModule from "./modules/voting";
import authModule from "./modules/auth";

const store = createStore({
  modules: {
    voting: votingModule,
    auth: authModule,
  },
});

export default store;
