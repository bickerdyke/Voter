<template>
  <div>
    <main>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <transition
              enter-active-class="animate__animated animate__fadeIn"
              leave-active-class="animate__animated animate__fadeOut"
              mode="out-in"
              appear
              :key="$route.path"
              ><slot v-if="true"><h1>Hauptbereich</h1></slot></transition
            >
          </div>
        </div>
      </div>
    </main>
    <footer class="footer d-print-none">
      <div style="height: 7rem" />
      <TheNavBar />
    </footer>
  </div>
</template>

<script>
import TheNavBar from "@/components/basics/TheNavBar";

export default {
  name: "TheHomeLayout",
  components: {
    TheNavBar,
  },
};
</script>

<style scoped></style>
