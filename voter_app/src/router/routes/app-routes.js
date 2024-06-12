/* import store from "../../store"; */
import ResultPage from "@/pages/ResultPage";
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
    path: "/showresult/:sessionId",
    component: ResultPage,
    props: true,
  },
];

export default appRoutes;
