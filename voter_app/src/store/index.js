import { createStore } from "vuex";

import authModule from "./modules/x_auth";
import shopModule from "./modules/x_shop";
import cartModule from "./modules/x_cart";

const store = createStore({
  modules: {
    auth: authModule,
    shop: shopModule,
    cart: cartModule,
  },
});

export default store;
