import {
  firebaseConfig,
  FIREBASE_AUTH_URL,
  FIREBASE_REFRESH_URL,
} from "@/config/firebase";
import axios from "axios";

var base32 = require("base32-encoding");

let timer;

const state = {
  userId: null,
  token: null,
};
const mutations = {
  setUser(state, payload) {
    state.userId = payload.userId;
    state.token = payload.token;
  },
};
const actions = {
  auth(context, payload) {
    return new Promise((resolve, reject) => {
      const authDO = {
        email: payload.email ? payload.email : "",
        password: payload.password ? payload.password : "",
        returnSecureToken: true,
      };

      const apikey = base32.parse(firebaseConfig.apiKey);
      let url = "";
      if (payload.mode === "signin") {
        url = `${FIREBASE_AUTH_URL}:signInWithPassword?key=${apikey}`;
      } else if (payload.mode === "signup") {
        url = `${FIREBASE_AUTH_URL}:signUp?key=${apikey}`;
      } else if (payload.mode === "anonymous") {
        url = `${FIREBASE_AUTH_URL}:signUp?key=${apikey}`;
        delete authDO.email;
        delete authDO.password;
      } else {
        reject(new Error("invalid auth-mode in payload"));
      }

      return axios
        .post(url, authDO)
        .then((response) => {
          // Daten im LocalStorage speichern
          const expiresIn = Number(response.data.expiresIn) * 1000; // Lebensdauer in ms

          localStorage.setItem("token", response.data.idToken);
          localStorage.setItem("userId", response.data.localId);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          localStorage.setItem("expiresAt", new Date().getTime() + expiresIn);

          timer = setTimeout(() => {
            //@todo: #42 auto-refresh statt auto-Signout. Könnte ewig neue anonyme Nutzer in der Nutzerverwaltung anlegen
            context.dispatch("autoSignout");
          }, expiresIn);

          context.commit("setUser", {
            userId: response.data.localId,
            token: response.data.idToken,
          });

          resolve();
        })
        .catch((error) => {
          // console.log({ error });
          reject(
            new Error(error.response.data.error.message || "UNKNOWN_ERROR"),
          );
        });
    });
  },
  refresh(context) {
    console.log("refreshing login...");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return;
    }

    const refreshDO = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };

    const apikey = base32.parse(firebaseConfig.apiKey);
    let url = `${FIREBASE_REFRESH_URL}?key=${apikey}`;

    return axios
      .post(url, refreshDO)
      .then((response) => {
        // Daten im LocalStorage speichern
        const expiresIn = Number(response.data.expires_in) * 1000;

        localStorage.setItem("token", response.data.id_token);
        localStorage.setItem("userId", response.data.user_id);
        localStorage.setItem("expiresAt", new Date().getTime() + expiresIn);

        timer = setTimeout(() => {
          context.dispatch("refresh");
        }, expiresIn);

        console.log("Guest-Login: " + response.data.user_id);

        context.commit("setUser", {
          userId: response.data.user_id,
          token: response.data.id_token,
        });
      })
      .catch((error) => {
        const errorMessage = new Error(
          error.response.data.error.message || "UNKNOWN_ERROR",
        );
        throw errorMessage;
      });
  },
  signup(context, payload) {
    const signupDO = {
      ...payload,
      mode: "signup",
    };
    return context.dispatch("auth", signupDO);
  },
  signin(context, payload) {
    const signinDO = {
      ...payload,
      mode: "signin",
    };
    return context.dispatch("auth", signinDO);
  },
  signinAnonymous(context) {
    console.log("anonymous logging in...");
    const signinDO = {
      mode: "anonymous",
    };
    return context.dispatch("auth", signinDO);
  },
  // called at start from App.vue
  // checks for login token in local browser storage and moves it to vues-auth store,
  autoSignin(context) {
    return new Promise((resolve) => {
      console.log("Checking for existing login...");
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        context
          .dispatch("refresh")
          .then(() => {
            resolve();
          })
          .catch(() => {
            // Problem beim Token-Refresh beim Anmeldungsstart.
            // z.B. User-Account in Firebase gelöscht oder Session beendet
            // --> doch wieder neu anonym anmelden um eine Session zu bekommen
            // @todo: #43 evtl. unangemeldeten Status einführen
            context.dispatch("signinAnonymous").then(() => {
              resolve();
            });
          });
      } else {
        context.dispatch("signinAnonymous").then(() => {
          resolve();
        });
      }
    });
  },
  signout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("refreshToken");

    clearTimeout(timer);

    context.commit("setUser", {
      token: null,
      userId: null,
    });
  },
  autoSignout(context) {
    // Server-Kommunikation, falls notwendig
    context.dispatch("signout");
  },
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  token: (state) => state.token,
  userId: (state) => state.userId,
};

const authModule = {
  state,
  mutations,
  actions,
  getters,
};

export default authModule;
