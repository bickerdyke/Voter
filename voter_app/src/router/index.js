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
    // Das ganze ist nur etwas verwirrend geschrieben da loasSessionFromRoute warten muss bis der Autologin beendet ist,
    // also in den "then"-Pfad muss
    return store
      .dispatch("autoSignin")
      .then(() => {
        loadSessionFromRoute(to.params.sessionId);
      })
      .catch(() => {
        router.next("/");
      });
  }

  if (store.getters.isAuthenticated) {
    return loadSessionFromRoute(to.params.sessionId);
  }
});

function loadSessionFromRoute(sessionId) {
  return new Promise(() => {
    console.log("Check for Routeupdate");
    if (sessionId) {
      // Update session in store from database if neccessary
      if (store.getters.currentSessionId !== sessionId) {
        console.log("Updating session from Route");
        store.commit("setSessionId", sessionId);
      }
    }
  });
}

export default router;
