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
    meta: {
      requiresAuth: false,
    },
    props: false,
  },
  {
    path: "/legal",
    name: "legal",
    component: () =>
      import(/*webpackChunkName: 'page-homepage' */ "@/pages/LegalPage.vue"),
    meta: {
      requiresAuth: false,
    },
    props: false,
  },
  {
    path: "/create",
    name: "create",
    component: () =>
      import(
        /*webpackChunkName: 'page-homepage' */ "@/pages/CreateSessionPage.vue"
      ),
    meta: {
      requiresAuth: true,
    },
    props: false,
  },
  {
    path: "/showvotinglinks/:sessionId",
    name: "showlinks",
    component: () =>
      import(
        /*webpackChunkName: 'page-homepage' */ "@/pages/ShowVotingLinks.vue"
      ),
    meta: {
      requiresAuth: true,
    },
    props: true,
  },
  {
    path: "/uservoting/:sessionId/:userId",
    alias: "/showresult/:sessionId/:userId",
    name: "uservoting",
    component: () =>
      import(
        /*webpackChunkName: 'page-homepage' */ "@/pages/UserVotingOverview.vue"
      ),
    meta: {
      requiresAuth: true,
    },
    props: true,
  },
  {
    path: "/showresult/:sessionId",
    name: "showresult",
    component: () =>
      import(/*webpackChunkName: 'page-results' */ "@/pages/ResultPage.vue"),
    meta: {
      requiresAuth: true,
    },
    props: true,
  },
  {
    path: "/vote/:sessionId/:userId/:votingId",
    name: "vote",
    component: () =>
      import(/*webpackChunkName: 'page-vote' */ "@/pages/VotePage.vue"),
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
];

export default appRoutes;
