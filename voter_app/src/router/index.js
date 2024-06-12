import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes/index";
import NotFoundPage from "@/pages/NotFoundPage.vue";
/* import store from "../store"; */

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

/*router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/");
  } else {
    next();
  }
});*/

export default router;
