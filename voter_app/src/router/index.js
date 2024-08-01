import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import routes from "./routes/index";

import NotFoundPage from "@/pages/NotFoundPage.vue";

const basePath = "/"; //"/app/";

const router = createRouter({
  // Optionen
  history: createWebHistory(basePath),
  routes: [
    ...routes,
    {
      path: "/:pathMatch(.*)*",
      component: NotFoundPage,
      //redirect: "/",
    },
  ],
});

router.beforeEach((to) => {
  // make sure we are authenticated for DB access
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    // Wir nehmen hier an dass ein anonymes Login immer klappt und nach dem autoSignin auf jeden Fall
    // DB-Zugang besteht und wir bei Bedarf eine Session laden können.
    // Session bei Bedarf wird auch geladen wenn wir von vorneherein angemeldet sind.
    // Das ganze ist nur etwas verwirrend geschrieben da loadSessionFromRoute warten muss bis der Autologin beendet ist,
    // also in den "then"-Pfad muss
    return store
      .dispatch("autoSignin")
      .then(() => {
        loadSessionFromRoute(to.params.sessionId);
      })
      .catch((err) => {
        console.error(err);
        return { name: "hone" };
      });
  }

  if (store.getters.isAuthenticated) {
    return loadSessionFromRoute(to.params.sessionId);
  }
});

function loadSessionFromRoute(sessionId) {
  return new Promise((resolve) => {
    console.log("Check for Routeupdate");
    if (sessionId) {
      // Update session in store from database if necessary
      if (store.getters.currentSessionId !== sessionId) {
        store.commit("setSessionId", sessionId);
        resolve();
      } else {
        resolve();
      }
    } else {
      resolve();
    }
  });
}

export default router;
