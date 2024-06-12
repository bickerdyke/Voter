<template>
  <TheHomeLayout>
    <div>
      <h1 class="text-center display-1">Willkommen</h1>
      <p>Hier muss ein schön gestalteter Erklärungstext hin</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ea
        aliquam deserunt, dolore incidunt reiciendis modi doloremque labore
        error soluta! Animi tenetur itaque illum. Earum mollitia nostrum enim
        assumenda asperiores.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet omnis
        unde quidem, odit recusandae nostrum asperiores velit totam debitis
        voluptate? Eum corporis ut voluptatum, dolore esse consequatur eveniet?
        Officiis, perspiciatis?
      </p>
      <button class="col-4">Abstimmung anlegen</button>
      <div>
        Für Zugang zu bestehenden Abstimmungen bitte Abstimmungs-Link verwenden.
      </div>
      <p>
        Beispiel-Abstimmung:
        <a href="/showresult/4711" class="btn-success">#4711</a>
      </p>
    </div>
  </TheHomeLayout>
</template>

<script>
import TheHomeLayout from "@/layouts/TheHomeLayout";

export default {
  name: "HomePage",
  components: {
    TheHomeLayout,
  },
};
</script>

<style scoped></style>
