import { FIREBASE_RTDB_URL } from "@/config/firebase";
import axios from "axios";

const actions = {
  loadSessions(context, payload) {
    return new Promise((resolve, reject) => {
      console.log("loading list of all sessions" + payload.uid ? " for user " + payload.uid : "");
      const token = context.rootState.auth.token;
      if (!token) {
        reject(new Error("No token available for backend access"));
      }
      const url = `${FIREBASE_RTDB_URL}/sessions.json?auth=${token}`;

      axios
        .get(url, {
          headers: {
            "X-Firebase-ETag": true,
          },
        })
        .then((response) => {
          console.log("session list received");
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

};

const votingModule = {
  actions,
};

export default votingModule;
