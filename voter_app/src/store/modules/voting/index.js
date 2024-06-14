//import axios from "axios";

import { state } from "./state";
import { getters } from "./getters";

const mutations = {
  castVote(state, payload, was, zh) {
    console.log(payload);
    console.log(was);
    console.log(zh);
    const voting = getters.voting(payload.sId, payload.vId);
    console.log(voting);
    if (!voting) {
      return;
    }
  },
};
const actions = {
  fetchVoting(context) {
    console.log(context);
    /*
    const token = context.rootState.auth.token;
    axios
      .get(
        `https://vue-3-shop-backend-default-rtdb.europe-west1.firebasedatabase.app/products.json?auth=${token}`
      )
      .then((response) => {
        const productsDO = [];
        for (const id in response.data) {
          productsDO.push({
            id: id,
            ...response.data[id],
          });
        }
        context.commit("setProducts", productsDO);
      })
      .catch((error) => {
        console.log(error);
      });*/
  },
};

const votingModule = {
  state,
  mutations,
  actions,
  getters,
};

export default votingModule;
