const appRoutes = [
  {
    path: "/",
    alias: "/home",
    /* component: HomePage, */
    component: () =>
      import(/*webpackChunkName: 'page-homepage' */ "@/pages/HomePage.vue"),
    /* beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        next("/shop");
      } else {
        next();
      }
    }, */
    props: false,
  },
  {
    path: "/create",
    component: () =>
      import(
        /*webpackChunkName: 'page-homepage' */ "@/pages/CreateSessionPage.vue"
      ),
    props: false,
  },
  {
    path: "/showresult/:sessionId",
    component: () =>
      import(/*webpackChunkName: 'page-results' */ "@/pages/ResultPage.vue"),
    props: true,
  },
  {
    path: "/vote/:sessionId/:userId/:votingId",
    component: () =>
      import(/*webpackChunkName: 'page-vote' */ "@/pages/VotePage.vue"),
    props: true,
  },
];

export default appRoutes;
