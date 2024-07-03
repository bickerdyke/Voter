import SessionHeadline from '@/components/SessionHeadline'; import
SlideVoteSelect from '@/components/voting/SlideVoteSelect';
<template>
  <div class="row bg-light my-5">
    <div class="col-md-3 p-3 d-flex" :class="imageOrderClass">
      <img
        :src="imgUrl"
        v-if="imgUrl"
        class="rounded-4 img-fluid d-block mx-auto d-fill"
        style="width: 100%; max-width: 100%; object-fit: cover"
      />
    </div>
    <div class="col-md-7 offset-md-1 p-3">
      <h4 v-if="$slots.headline"><slot name="headline"></slot></h4>
      <p>{{ description }}</p>
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
    imageRight: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    imageOrderClass() {
      return this.imageRight ? "order-2" : "";
    },
  },
  methods: {},
};
</script>
<style scoped></style>
