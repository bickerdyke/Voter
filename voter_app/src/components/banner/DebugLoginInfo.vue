<template>
  <table>
    <tr>
      <th>&nbsp;</th>
      <th>vuex-store</th>
      <th>Browser local storage</th>
    </tr>
    <tr>
      <th>User Id</th>
      <td>{{ userId }}</td>
      <td>{{ lsUserId() }}</td>
    </tr>
    <tr>
      <th>Token</th>
      <td>{{ token }}</td>
      <td>{{ lsToken() }}</td>
    </tr>
    <tr>
      <th>expires</th>
      <td>-</td>
      <td>{{ lsExpiresAt() }}</td>
    </tr>
    <tr>
      <th>is logged in</th>
      <td>{{ isLoggedIn }}</td>
    </tr>
  </table>
  <button class="btn btn-primary" @click="logout">Logout</button>
  <button class="btn btn-primary" @click="loginAnonymous">
    anonymes Login
  </button>
  <button class="btn btn-primary" @click="refresh">Refresh</button>
</template>

<script>
/* global localStorage */
export default {
  name: "DebugLoginInfo",
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated ? "logged in" : "logged out";
    },
    token() {
      return this.$store.getters.token ? "OK" : "Empty";
    },
    userId() {
      return this.$store.getters.userId;
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("signout");
    },
    loginAnonymous() {
      this.$store.dispatch("signinAnonymous");
    },
    refresh() {
      this.$store.dispatch("refresh");
    },

    lsToken() {
      return localStorage.getItem("token") ? "OK" : "Empty";
    },
    lsUserId() {
      return localStorage.getItem("userId");
    },
    lsExpiresAt() {
      return new Date(Number(localStorage.getItem("expiresAt")));
    },
  },
};
</script>
<style scoped></style>
