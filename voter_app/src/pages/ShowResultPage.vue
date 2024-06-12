<template>
  <TheHomeLayout>
    <div>
      <h1 class="text-center display-3">Bierclub vom 11.11.2031</h1>
      <p>{{ sessionId }}</p>
      <p>Hier muss ein schön gestalteter Erklärungstext hin</p>
      <p>
        <img src="http://placeholder.com/300" />
        Titelbild Voting
      </p>
      <p>
        Beschreibung des Votings:<br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ea iquam
        deserunt, dolore incidunt reiciendis modi doloremque labore soluta!
        Animi tenetur itaque illum. Earum mollitia nostrum enim assumenda
        asperiores.
      </p>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>
              <div class="my-1">
                <ProfilePicture
                  email="bickerdyke@gmail.com"
                  default="wavatar"
                />
              </div>
              <div class="my-1">Marcel</div>
            </th>
            <th>
              <div class="my-1">
                <ProfilePicture email="herbert@foo.invalid" />
              </div>
              <div class="my-1">Herbert</div>
            </th>
            <th>
              <div class="my-1">
                <ProfilePicture
                  email="herbert@foo.invalid"
                  fallback="monsterid"
                  imageUrl="http://placeholder.com/80"
                />
              </div>
              <div class="my-1">Karl</div>
            </th>
            <th>
              <div class="my-1">
                <ProfilePicture
                  email="herbert@foo.invalid"
                  fallback="wavatar"
                />
              </div>
              <div class="my-1">Gustav</div>
            </th>
            <th>
              <div class="my-1">Ergebnis</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th><img src="http://placeholder.com/80" />Well-Tee</th>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <th>6,5</th>
          </tr>
          <tr>
            <th><img src="http://placeholder.com/80" />Bla</th>
            <td></td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <th>6,5</th>
          </tr>
          <tr>
            <th><img src="http://placeholder.com/80" />Blubb</th>
            <td>1</td>
            <td></td>
            <td></td>
            <td>4</td>
            <th>12</th>
          </tr>
          <tr>
            <th><img src="http://placeholder.com/80" />Riesling</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <th></th>
          </tr>
        </tbody>
      </table>
    </div>
  </TheHomeLayout>
</template>

<script>
import TheHomeLayout from "@/layouts/TheHomeLayout";
import ProfilePicture from "@/components/ProfilePicture";

export default {
  name: "ShowResultPage",
  components: {
    TheHomeLayout,
    ProfilePicture,
  },
  props: {
    sessionId: String,
  },
};
</script>

<style scoped></style>
