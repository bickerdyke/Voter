import { FIREBASE_RTDB_URL } from "@/config/firebase";
import { SESSION_RELOAD_POLL_INTERVAL } from "@/config/misc";
import axios from "axios";

import { state } from "./state";
import { getters } from "./getters";

let reloadTimer;

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
    state.loadComplete = false;
    state.currentSessionId = payload;
  },

  setSessionData(state, payload) {
    // Make sure that voters and users are objects instead of arrays
    // https://firebase.blog/posts/2014/04/best-practices-arrays-in-firebase/
    // firebase sometimes mixes that up...

    if (Array.isArray(payload.votings)) {
      payload.votings = payload.votings.reduce(
        (a, v, i) => (v ? { ...a, [i]: v } : { ...a }),
        {},
      );
    }

    if (Array.isArray(payload.users)) {
      payload.users = payload.users.reduce(
        (a, v, i) => (v ? { ...a, [i]: v } : { ...a }),
        {},
      );
    }

    state.currentSessionData = payload;
    state.loadComplete = true;
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

  // add a new session to firebase DB
  addSession({ getters }, payload) {
    return new Promise((resolve, reject) => {
      console.log(getters);
      const token = getters.token;
      if (!token) {
        reject(new Error("No token available for backend access"));
      }

      const sessionId = payload.id;
      delete payload.id;

      const sessionItem = {
        ...payload,
        author: getters.userId,
        timestamp: Date.now(),
      };

      const url = `${FIREBASE_RTDB_URL}/sessions/${sessionId}.json?auth=${token}`;
      axios
        .put(url, sessionItem)
        .then((/*response*/) => {
          resolve();
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  },

  dummy() {
    return new Promise((resolve, reject) => {
      var start = Date.now(),
        now = start;
      while (now - start < 4000) {
        now = Date.now();
      }

      if (Math.random() > 0.3) {
        console.log("Fake OK");
        resolve();
      } else {
        console.log("Fake ERROR");
        reject(new Error("Randumm Dummy Error"));
      }
    });
  },

  //@todo: #53 automatisches Refresh der Session
  loadSession(context) {
    return new Promise((resolve, reject) => {
      clearTimeout(reloadTimer);
      console.log("loading updated session information");
      const token = context.rootState.auth.token;
      if (!token) {
        reject(new Error("No token available for backend access"));
      }
      const url = `${FIREBASE_RTDB_URL}/sessions/${state.currentSessionId}.json?auth=${token}`;

      axios
        .get(url, {
          headers: {
            "X-Firebase-ETag": true,
          },
        })
        .then((response) => {
          context.commit("setSessionData", response.data);
          console.log("session information loaded");
          this.reloadTimer = setTimeout(() => {
            context.dispatch("loadSession");
          }, SESSION_RELOAD_POLL_INTERVAL);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  sessionExists(context, id) {
    const token = context.rootState.auth.token;
    if (!token) {
      console.error("No authentication token available.");
      throw new Error("No authentication token available.");
    }

    return axios
      .get(`${FIREBASE_RTDB_URL}/sessions/${id}.json?auth=${token}`)
      .then((result) => {
        switch (result.status) {
          case 200:
            return result.data != null;
          case 404:
            return false;
          default:
            console.error("Fehler bei der DB-Abfrage: " + result);
            return false;
        }
      })
      .catch((error) => {
        console.error(error);
        throw error;
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
