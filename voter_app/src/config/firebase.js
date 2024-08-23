const projectId = import.meta.env.VITE_FIREBASE_PROJECTID;

export const firebaseConfig = {
  authDomain: `${projectId}.firebaseapp.com`,
  storageBucket: `${projectId}.appspot.com`,
};

export const FIREBASE_RTDB_URL = `https://${projectId}-default-rtdb.europe-west1.firebasedatabase.app/`;

export const FIREBASE_AUTH_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts";

export const FIREBASE_REFRESH_URL =
  "https://securetoken.googleapis.com/v1/token";
