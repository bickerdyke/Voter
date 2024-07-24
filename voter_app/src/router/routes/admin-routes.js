import store from "../../store";

const adminRoutes = [
  {
    path: "/logout",
    component: () =>
      import(/*webpackChunkName: 'page-homepage' */ "@/pages/HomePage.vue"),
    meta: {
      requiresAuth: false,
    },
    beforeEnter: () => {
      return store
        .dispatch("signout")
        .then(() => {
          return "/";
        })
        .catch(() => {
          return "/notfound";
        });
    },
  },
];

export default adminRoutes;
