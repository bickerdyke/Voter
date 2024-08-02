<template>
  <SchoolDeVoteSelect plusminus="false" @voted="voted" />
</template>

<script>
import { SchoolDeVoteSelect } from "@/components/voting/SchoolDeVoteSelect";
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
  data() {},
  props: {
    plusminus: {
      type: Boolean,
      default: true,
    },
  },
  computed: {},
  methods: {
    voted(val) {
      this.$emit("voted", val);
    },
  },
};
</script>

<style scoped></style>
