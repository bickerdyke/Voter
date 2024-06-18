<template>
  <TheHomeLayout>
    <div>
      <!-- Header -->
      <SessionHeadline>
        <template v-slot:headline>Herzlich Willkommen</template>
        <template v-slot:subtitle>Abstimmungen leicht gemacht</template>
      </SessionHeadline>

      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ea
          aliquam deserunt, dolore incidunt reiciendis modi doloremque labore
          error soluta! Animi tenetur itaque illum. Earum mollitia nostrum enim
          assumenda asperiores.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet omnis
          unde quidem, odit recusandae nostrum asperiores velit totam debitis
          voluptate? Eum corporis ut voluptatum, dolore esse consequatur
          eveniet? Officiis, perspiciatis?
        </p>
        <button class="btn btn-primary">Abstimmung anlegen</button>
        <div>
          Für Zugang zu bestehenden Abstimmungen bitte Abstimmungs-Link
          verwenden.
        </div>
        <p>
          Beispiel-Ergebnis:
          <router-link to="/showresult/4711" class="btn-success"
            >Session #4711</router-link
          >
        </p>
        <p>
          Beispiel-Voting:
          <router-link to="/vote/4711/0815/1" class="btn-success"
            >Stimme abgeben</router-link
          >
        </p>
      </div>
      <div><DebugLoginInfo /></div>
    </div>
  </TheHomeLayout>
</template>

<script>
import TheHomeLayout from "@/layouts/TheHomeLayout";
import SessionHeadline from "@/components/SessionHeadline";
import DebugLoginInfo from "@/components/DebugLoginInfo";

export default {
  name: "HomePage",
  components: {
    TheHomeLayout,
    SessionHeadline,
    DebugLoginInfo,
  },
};
</script>

<style scoped></style>
