import { createStore } from "vuex";

import votingModule from "./modules/voting";
import searchModule from "./modules/search";
import authModule from "./modules/auth";

const store = createStore({
  modules: {
    voting: votingModule,
    search: searchModule,
    auth: authModule,
  },
});

export default store;
