<template>
  <div class="container">
    <article class="message is-danger" style="margin-top:24px" v-if="error">
      <div class="message-body">
        {{ errorMessage }}
      </div>
    </article>
    <div class="box">
      <div class="field">
        <label class="label">{{ $t("email") }}</label>
        <div class="control">
          <input
            class="input is-danger"
            type="email"
            v-bind:placeholder="$t('email')"
            v-model="email"
            ref="email"
            name="email"
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
            v-model="password"
            name="password"
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
  name: "Connexion",
  components: {},
  data: function() {
    return {
      email: "",
      password: "",
      error: false,
      errorMessage: ""
    };
  },
  computed: {},
  mounted() {
    this.focusInput();
  },
  methods: {
    connexion() {
      //this.$parent.$parent.API_db_name = this.email;
      //this.$parent.$parent.API_db_is_logged_in = true;
      console.log(this.email);
      // Redirect to home page
      //this.$router.push("/");
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open("POST", "http://api.digitalheritage.fr/auth", false);
      xmlHttp.setRequestHeader(
        "Content-Type",
        "application/json;charset=UTF-8"
      );
      xmlHttp.send(
        JSON.stringify({ password: this.password, email: this.email })
      );

      let ans = JSON.parse(xmlHttp.responseText);
      if (ans.result == "ok") {
        this.$parent.$parent.API_db_name = this.email;
        this.$parent.$parent.API_db_is_logged_in = true;
        console.log(this.email);
        // Redirect to home page
        this.$router.push("/");
      } else {
        this.error = true;
        this.errorMessage = ans.message;
      }
    },
    focusInput() {
      this.$refs.email.focus();
    }
  },
  created() {
    this.email = this.$parent.$parent.API_db_name;
  }
};
</script>
