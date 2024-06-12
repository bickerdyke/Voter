/* import store from "../../store"; */
import ShowResultPage from "@/pages/ShowResultPage";
const appRoutes = [
  {
    path: "/",
    alias: "/home",
    /* component: HomePage, */
    component: () =>
      import(
        /*webpackChunkName: 'component-homepage' */ "@/pages/HomePage.vue"
      ),
    /* beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        next("/shop");
      } else {
        next();
      }
    }, */
  },
  {
    path: "/showresult/:voteId",
    component: ShowResultPage,
    props: true,
  },
];

export default appRoutes;
