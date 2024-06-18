import store from "../../store";

const adminRoutes = [
  {
    path: "/logout",
    component: () =>
      import(/*webpackChunkName: 'page-homepage' */ "@/pages/HomePage.vue"),
    beforeEnter: () => {
      store.dispatch("signout");
      return "/";
    },
  },
];

export default adminRoutes;
