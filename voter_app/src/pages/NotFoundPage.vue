<template>
  <TheHomeLayout>
    <template #default>
      <div class="container">
        <div class="row">
          <div class="offset-2 col-8">
            <div class="card mt-5">
              <div class="card-body text-center">
                <img src="@/assets/x_notFound.svg" width="300" />
                <div class="display-3">Seite nicht gefunden</div>
                <hr />
                <router-link to="/" class="btn bg-vue"
                  >Bring mich zurück zur Startseite</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </TheHomeLayout>
</template>

<script>
import TheHomeLayout from "@/layouts/TheHomeLayout";
export default {
  name: "NotFoundPage",
  components: {
    TheHomeLayout,
  },
};
</script>

<style scoped></style>
