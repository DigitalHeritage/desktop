<template>
  <div class="container">
    <h2 style="padding-top:50px;" class="title">Profil</h2>
    <div><strong>Email</strong> {{ this.email }}</div>
    <hr />
    <a @click="logout" class="button is-dark is-primary"
      ><i class="material-icons">exit_to_app</i
      ><span style="width: 5px;"></span> Logout
    </a>
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
//import Vue from "vue";

// @ is an alias to /src
export default {
  name: "RemoteProfile",
  components: {},
  data: function() {
    return {
      email: this.$parent.$parent.API_db_name,
      is_logged_in: this.$parent.$parent.API_db_is_logged_in
    };
  },
  computed: {},
  methods: {
    logout() {
      this.$parent.$parent.API_db_name = "";
      this.$parent.$parent.API_db_is_logged_in = false;
      console.log(this.email);
      // Redirect to home page
      this.$router.push("/");
    }
  },
  created() {
    if (!this.is_logged_in) {
      console.log("redirect");
      this.$router.push("/");
    }
  }
};
</script>
