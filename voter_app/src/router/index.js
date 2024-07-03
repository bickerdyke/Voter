import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import routes from "./routes/index";

import NotFoundPage from "@/pages/NotFoundPage.vue";

const router = createRouter({
  // Optionen
  history: createWebHistory(),
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
  if (!store.getters.isAuthenticated) {
    store.dispatch("autoSignin");
  }

  console.log("Check for Routeupdate");
  const sessionId = to.params.sessionId;
  if (!sessionId) {
    return;
  }
  // Update session in store from database if neccessary
  if (store.getters.currentSessionId !== sessionId) {
    console.log("Updating session from Route");
    store.commit("setSessionId", sessionId);
  }
});

/*router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/");
  } else {
    next();
  }
});*/

export default router;
