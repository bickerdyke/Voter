import { createStore } from "vuex";

import votingModule from "./modules/voting";

const store = createStore({
  modules: {
    voting: votingModule,
  },
});

export default store;
