<template>
  <div class="alert alert-success shadow my-5 d-print-none">
    <h3>Testlinks</h3>
    <p>Drei Beispiel Stimm-Auszählungen:</p>
    <div class="button-group">
      <router-link
        :to="{ name: 'showresult', params: { sessionId: '4711' } }"
        class="btn btn-success"
        >Session #4711</router-link
      >
      &nbsp;
      <router-link
        :to="{ name: 'showresult', params: { sessionId: '4712' } }"
        class="btn btn-success"
        >Session #4712</router-link
      >
      &nbsp;
      <router-link
        :to="{ name: 'showresult', params: { sessionId: '4713' } }"
        class="btn btn-success"
      >
        Session #4713</router-link
      >
    </div>
    <hr />
    <p>Die dazu passenden Zugangs-Urls:</p>
    <div class="button-group">
      <router-link
        :to="{ name: 'showlinks', params: { sessionId: '4711' } }"
        class="btn btn-success"
        >Session #4711</router-link
      >
      &nbsp;
      <router-link
        :to="{ name: 'showlinks', params: { sessionId: '4712' } }"
        class="btn btn-success"
        >Session #4712</router-link
      >
      &nbsp;
      <router-link
        :to="{
          name: 'showlinks',
          params: { sessionId: '4713' },
          query: { created: true },
        }"
        class="btn btn-success"
      >
        Session #4713 (wie frisch angelegt)</router-link
      >
    </div>
    <hr />
    <p>Übersichten für einen einzelnen Nutzer:</p>
    <router-link
      :to="{
        name: 'uservoting',
        params: { sessionId: '4711', userId: 'jl7as' },
      }"
      class="btn btn-success"
      >Gustav, Session #4711</router-link
    >
    &nbsp;
    <router-link
      :to="{
        name: 'uservoting',
        params: { sessionId: '4713', userId: '0815' },
      }"
      class="btn btn-success"
      >Heinz, Session #4713 (alle Posten offen)</router-link
    >
    <hr />
  </div>
</template>

<script>
export default {
  name: "TestLinks",
  computed: {},
};
</script>

<style scoped></style>
