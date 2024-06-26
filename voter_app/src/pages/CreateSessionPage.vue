<template>
  <TheHomeLayout>
    <div>
      <!-- Header -->
      <SessionHeadline>
        <template v-slot:headline>$t(Voter-Service)</template>
        <template v-slot:subtitle>$t(Create Session)</template>
      </SessionHeadline>
    </div>
  </TheHomeLayout>
</template>

<script>
import TheHomeLayout from "@/layouts/TheHomeLayout";
import SessionHeadline from "@/components/SessionHeadline";

export default {
  name: "HomePage",
  components: {
    TheHomeLayout,
    SessionHeadline,
  },
};
</script>

<style scoped></style>
