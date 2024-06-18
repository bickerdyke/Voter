import { FIREBASE_RTDB_URL } from "@/config/firebase";
import axios from "axios";

import { state } from "./state";
import { getters } from "./getters";

const mutations = {
  // Referenz auf state wird im payload durch die action mitgegeben
  castVote(state, payload) {
    payload.target.push({ userId: payload.uId, vote: payload.vote });
  },
  openAndCastVote(state, payload) {
    const voting = state.currentSessionData.votings.find(
      (v) => v.id === payload.vId
    );
    voting.votes = [{ userId: payload.uId, vote: payload.vote }];
  },
  setSessionId(state, payload) {
    state.currentSessionId = payload;
  },

  setSessionData(state, payload) {
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

      if (voting.votes && voting.votes.find((v) => v.userId == payload.uId)) {
        reject(new Error("User already voted"));
      }

      // firebase-DB updaten
      //@todo firebase anbindung

      if (voting.votes) {
        payload.target = voting.votes;
        commit("castVote", payload);
      } else {
        console.log("Adding a new set of votes");
        commit("openAndCastVote", payload);
      }
      resolve();
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
