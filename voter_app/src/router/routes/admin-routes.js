import store from "../../store";

const adminRoutes = [
  {
    path: "/logout",
    component: () =>
      import(/*webpackChunkName: 'page-homepage' */ "@/pages/HomePage.vue"),
    beforeEnter: (to, from, next) => {
      store.dispatch("signout");
      next("/");
    },
  },
];

export default adminRoutes;
