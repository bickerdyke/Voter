<template>
  <div class="my-3 card noborder">
    <div class="card-body">
      <img
        :src="imgUrl"
        v-if="imgUrl"
        class="rounded-4 me-3 img-fluid"
        :class="floatStyle"
        style="width: 200px; height: 200px; object-fit: cover"
      />
      <div class="m-5 mw-25">{{ description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageAndDescription",
  components: {},
  props: {
    imgUrl: String,
    description: String,
    floatStyle: {
      type: String,
      default: "float-start",
    },
  },
  computed: {},
  methods: {},
};
</script>
<style scoped></style>
