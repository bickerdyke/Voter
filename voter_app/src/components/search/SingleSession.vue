<template>
  <b>{{ sessionData.title }}</b
  ><template v-if="sessionData.subtitle"
    >&nbsp;&ndash;&nbsp;{{ sessionData.subtitle }}</template
  ><br />
  <router-link
    :to="{
      name: 'showlinks',
      params: { sessionId: this.sessionKey },
    }"
    >{{ $t("Search.Links") }} </router-link
  >&nbsp;&nbsp;<router-link
    :to="{
      name: 'showresult',
      params: { sessionId: 'bdm_2024-05' },
    }"
    >{{ $t("Search.Results") }}</router-link
  >
</template>

<script>
export default {
  name: "SingleSession",
  props: {
    sessionKey: {
      type: String,
      required: true,
    },
    sessionData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
