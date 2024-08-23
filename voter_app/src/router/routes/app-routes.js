const appRoutes = [
  {
    path: "/",
    alias: "/home",
    name: "home",
    component: () =>
      import("@/pages/HomePage.vue"),
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
      import("@/pages/LegalPage.vue"),
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
        "@/pages/CreateSessionPage.vue"
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
        "@/pages/ShowVotingLinks.vue"
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
        "@/pages/UserVotingOverview.vue"
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
      import("@/pages/ResultPage.vue"),
    meta: {
      requiresAuth: true,
    },
    props: true,
  },
  {
    path: "/vote/:sessionId/:userId/:votingId",
    name: "vote",
    component: () =>
      import("@/pages/VotePage.vue"),
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
];

export default appRoutes;
