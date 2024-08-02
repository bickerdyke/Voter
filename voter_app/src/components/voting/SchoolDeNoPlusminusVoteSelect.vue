<template>
  <SchoolDeVoteSelect :plusminus="false" @voted="votedRelay" />
</template>

<script>
import SchoolDeVoteSelect from "@/components/voting/SchoolDeVoteSelect";
export default {
  name: "SchoolDeNoPlusminusVoteSelect",
  emits: {
    voted(payload) {
      return payload ? true : false;
    },
  },
  components: {
    SchoolDeVoteSelect,
  },
  methods: {
    votedRelay(val) {
      this.$emit("voted", val);
    },
  },
};
</script>

<style scoped></style>
