const appRoutes = [
  {
    path: "/",
    alias: "/home",
    name: "home",
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
    name: "create",
    component: () =>
      import(
        /*webpackChunkName: 'page-homepage' */ "@/pages/CreateSessionPage.vue"
      ),
    props: false,
  },
  {
    path: "/showvotinglinks/:sessionId",
    name: "showlinks",
    component: () =>
      import(
        /*webpackChunkName: 'page-homepage' */ "@/pages/ShowVotingLinks.vue"
      ),
    props: true,
  },
  {
    path: "/uservoting/:sessionId/:userId",
    name: "uservoting",
    component: () =>
      import(
        /*webpackChunkName: 'page-homepage' */ "@/pages/UserVotingOverview.vue"
      ),
    props: true,
  },
  {
    path: "/showresult/:sessionId",
    name: "showresult",
    component: () =>
      import(/*webpackChunkName: 'page-results' */ "@/pages/ResultPage.vue"),
    props: true,
  },
  {
    path: "/vote/:sessionId/:userId/:votingId",
    name: "vote",
    component: () =>
      import(/*webpackChunkName: 'page-vote' */ "@/pages/VotePage.vue"),
    props: true,
  },
];

export default appRoutes;
