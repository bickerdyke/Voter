import { FIREBASE_RTDB_URL } from "@/config/firebase";
import axios from "axios";

import { state } from "./state";
import { getters } from "./getters";

const mutations = {
  // Referenz auf state wird im payload durch die action mitgegeben
  castVote(state, payload) {
    if (!state.currentSessionData.votings[payload.vId].votes) {
      state.currentSessionData.votings[payload.vId].votes = {};
    }
    state.currentSessionData.votings[payload.vId].votes[payload.uId] =
      payload.votingitem;
  },

  setSessionId(state, payload) {
    state.currentSessionId = payload;
  },

  setSessionData(state, payload) {
    // Make sure that voters and users are objects instead of arrays
    // https://firebase.blog/posts/2014/04/best-practices-arrays-in-firebase/
    // firebase sometimes mixes that up...

    if (Array.isArray(payload.votings)) {
      payload.votings = payload.votings.reduce(
        (a, v, i) => (v ? { ...a, [i]: v } : { ...a }),
        {}
      );
    }

    if (Array.isArray(payload.users)) {
      payload.users = payload.users.reduce(
        (a, v, i) => (v ? { ...a, [i]: v } : { ...a }),
        {}
      );
    }

    state.currentSessionData = payload;
  },
};
const actions = {
  castVote({ commit, getters }, payload) {
    return new Promise((resolve, reject) => {
      // payload verifizieren
      if (!payload.uId || !payload.vId || !payload.vote) {
        reject(new Error("Missing payload data"));
      }

      // state verifizieren (Session, user und voting da, vote NICHT da)
      const voting = getters.voting(payload.vId);
      if (!voting) {
        reject(new Error("Voting not available or SessionId-Missmatch"));
      }

      if (
        voting.votes &&
        Object.keys(voting.votes).find((v) => v == payload.uId)
      ) {
        reject(new Error("User already voted"));
      }

      // firebase-DB updaten
      const token = getters.token;
      if (!token) {
        reject(new Error("No Database connection"));
      }

      const votingItem = {
        vote: payload.vote,
        author: getters.userId,
        timestamp: Date.now(),
      };
      const url = `${FIREBASE_RTDB_URL}/sessions/${getters.currentSessionId}/votings/${payload.vId}/votes/${payload.uId}.json/?auth=${token}`;
      console.log("RTDB-Url: " + url);
      console.log("Data: " + votingItem);

      return axios
        .put(url, votingItem)
        .then((response) => {
          console.log("success i think");
          console.log(response);

          // update local state
          payload.votingitem = votingItem;
          commit("castVote", payload);

          resolve();
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },

  // Store current Session to firestore-DB
  storeSession(context /*, payload */) {
    const token = context.rootState.auth.token;

    const sessionItem = {
      ...state.session,
    };

    const sessionId = sessionItem.id;
    delete sessionItem.id;

    const url = `${FIREBASE_RTDB_URL}/${sessionId}.json?auth=${token}`;
    console.log("RTDB-Url: " + url);
    console.log("Data: " + sessionItem);

    axios
      .post(url, sessionItem)
      .then((response) => {
        console.log("success i think");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  loadSession(context) {
    return new Promise((resolve, reject) => {
      console.log("loading upodated session information");
      const token = context.rootState.auth.token;
      if (!token) {
        reject(new Error("No token available for backend access"));
      }
      const url = `${FIREBASE_RTDB_URL}/sessions/${state.currentSessionId}.json?auth=${token}`;

      axios
        .get(url)
        .then((response) => {
          context.commit("setSessionData", response.data);
          console.log("session information loaded");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const votingModule = {
  state,
  mutations,
  actions,
  getters,
};

export default votingModule;
