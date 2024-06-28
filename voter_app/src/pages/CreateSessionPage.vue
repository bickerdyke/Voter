<template>
  <TheHomeLayout>
    <div>
      <!-- Header -->
      <SessionHeadline>
        <template v-slot:headline>{{ $t("Voter-Service") }}</template>
        <template v-slot:subtitle>{{ $t("Create Session Headline") }}</template>
      </SessionHeadline>

      <!-- Create Session Block-->
      <CreateSession />

      <!-- Footer (empty) -->
    </div>
  </TheHomeLayout>
</template>

<script>
import TheHomeLayout from "@/layouts/TheHomeLayout";
import SessionHeadline from "@/components/SessionHeadline";
import CreateSession from "@/components/voting/CreateSession";

export default {
  name: "CreateSesionPage",
  components: {
    TheHomeLayout,
    SessionHeadline,
    CreateSession,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped></style>
