//import axios from "axios";

import { state } from "./state";
import { getters } from "./getters";

const mutations = {
  castVote(state, payload) {
    console.log("mutate vote:" + payload.target);
    // @todo: Session-ID prüfen
    //const voting = state.session.votings.find((v) => v.id === payload.vId);
    //console.log(voting);
    payload.target.push({ userId: payload.uId, vote: payload.vote });
  },
};
const actions = {
  castVote({ commit, getters }, payload) {
    return new Promise((resolve, reject) => {
      // payload verifizieren
      console.log(payload);
      if (!payload.sId || !payload.uId || !payload.vId || !payload.vote) {
        reject(new Error("Missing payload data"));
      }

      // state verifizieren (Session, user und voting da, vote NICHT da)
      const voting = getters.voting(payload.sId, payload.vId);
      if (!voting) {
        reject(new Error("Voting not available or SessionId-Missmatch"));
      }

      if (voting.votes.find((v) => v.userId == payload.uId)) {
        reject(new Error("User already voted"));
      }

      // firebase-DB updaten
      //@todo firebase anbindung

      // state updaten (mutation)
      payload.target = voting.votes;
      commit("castVote", payload);
      resolve();
    });
  },
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
