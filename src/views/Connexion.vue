<template>
  <div class="container">
    <div class="box">
      <div class="field">
        <label class="label">{{ $t("email") }}</label>
        <div class="control">
          <input
            class="input is-danger"
            type="email"
            v-bind:placeholder="$t('email')"
            v-model="email"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">{{ $t("password") }}</label>
        <div class="control">
          <input
            class="input"
            type="password"
            v-bind:placeholder="$t('password')"
          />
        </div>
      </div>
      <div class="has-text-centered">
        <button type="button" class="button is-primary" @click="connexion">
          {{ $t("login") }}
        </button>
      </div>
    </div>
  </div>
</template>
<i18n>
{
  "en": {
    "login": "Log in",
    "password": "Password",
    "email": "E-Mail Adress"
  },
  "fr": {
    "login": "Se connecter",
    "password": "Mot de passe",
    "email": "Adresse mail"
  }
}
</i18n>

<script>
//import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import "leaflet/dist/leaflet.css";
//import Vue from "vue";

// @ is an alias to /src
export default {
  name: "Collection",
  components: {},
  data: function() {
    return {
      email: ""
    };
  },
  computed: {},
  methods: {
    connexion() {
      this.$parent.$parent.API_db_name = this.email;
      this.$parent.$parent.API_db_is_logged_in = true;
      console.log(this.email);
      // Redirect to home page
      this.$router.push("/");
    }
  },
  created() {
    this.email = this.$parent.$parent.API_db_name;
  }
};
</script>
