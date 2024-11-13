import { FIREBASE_RTDB_URL } from "@/config/firebase";
import axios from "axios";

const actions = {
  loadSessions(context, payload) {
    return new Promise((resolve, reject) => {
      if (payload.uId) {
        console.log("loading list sessions for user " + payload.uId);
      } else {
        console.log("loading list of all sessions");
      }

      const token = context.rootState.auth.token;
      if (!token) {
        reject(new Error("No token available for backend access"));
      }

      let url = `${FIREBASE_RTDB_URL}sessions.json?auth=${token}`;
      if (payload.uId) {
        url += '&orderBy="author"&equalTo="' + payload.uId + '"';
      }

      axios
        .get(url, {
        })
        .then((response) => {
          console.log("session list received");
          resolve(response.data);
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
