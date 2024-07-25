export const firebaseConfig = {
  authDomain: `${process.env.VUE_APP_FIREBASE_PROJECTID}.firebaseapp.com`,
  storageBucket: `${process.env.VUE_APP_FIREBASE_PROJECTID}.appspot.com`,
};

export const FIREBASE_RTDB_URL = `https://${process.env.VUE_APP_FIREBASE_PROJECTID}-default-rtdb.europe-west1.firebasedatabase.app/`;

export const FIREBASE_AUTH_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts";

export const FIREBASE_REFRESH_URL =
  "https://securetoken.googleapis.com/v1/token";
