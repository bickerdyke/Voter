import {
  firebaseConfig,
  FIREBASE_AUTH_URL,
  FIREBASE_REFRESH_URL,
} from "@/config/firebase";
import axios from "axios";

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
    const authDO = {
      email: payload.email ? payload.email : "",
      password: payload.password ? payload.password : "",
      returnSecureToken: true,
    };

    let url = "";
    if (payload.mode === "signin") {
      url = `${FIREBASE_AUTH_URL}:signInWithPassword?key=${firebaseConfig.apiKey}`;
    } else if (payload.mode === "signup") {
      url = `${FIREBASE_AUTH_URL}:signUp?key=${firebaseConfig.apiKey}`;
    } else if (payload.mode === "anonymous") {
      url = `${FIREBASE_AUTH_URL}:signUp?key=${firebaseConfig.apiKey}`;
      delete authDO.email;
      delete authDO.password;
    } else {
      return;
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
          //@todo: auto-refresh statt auto-Signout. Könnte ewig neue anonyme Nutzer in der Nutzerverwaltung anlegen
          context.dispatch("autoSignout");
        }, expiresIn);

        context.commit("setUser", {
          userId: response.data.localId,
          token: response.data.idToken,
        });
      })
      .catch((error) => {
        // console.log({ error });
        const errorMessage = new Error(
          error.response.data.error.message || "UNKNOWN_ERROR"
        );
        throw errorMessage;
      });
  },
  refresh(context) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return;
    }

    const refreshDO = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };

    let url = `${FIREBASE_REFRESH_URL}?key=${firebaseConfig.apiKey}`;

    return axios
      .post(url, refreshDO)
      .then((response) => {
        console.log(response);
        // Daten im LocalStorage speichern
        const expiresIn = Number(response.data.expires_in) * 1000;

        localStorage.setItem("token", response.data.id_token);
        localStorage.setItem("userId", response.data.user_id);
        localStorage.setItem("expiresAt", new Date().getTime() + expiresIn);

        timer = setTimeout(() => {
          context.dispatch("refresh");
        }, expiresIn);

        context.commit("setUser", {
          userId: response.data.user_id,
          token: response.data.id_token,
        });
      })
      .catch((error) => {
        const errorMessage = new Error(
          error.response.data.error.message || "UNKNOWN_ERROR"
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
    const signinDO = {
      mode: "anonymous",
    };
    return context.dispatch("auth", signinDO);
  },
  // called at start from App.vue
  // checks for login token in local browser storage and moves it to vues-auth store,
  autoSignin(context) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      context.dispatch("refresh");
    } else {
      context.dispatch("signinAnonymous");
    }
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
