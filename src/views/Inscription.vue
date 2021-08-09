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
            ref="email"
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
      <div class="field">
        <label class="label">{{ $t("confirmPassword") }}</label>
        <div class="control">
          <input
            class="input"
            type="password"
            v-bind:placeholder="$t('password')"
          />
        </div>
      </div>
      <div class="has-text-centered">
        <button type="button" class="button is-primary">
          {{ $t("register") }}
        </button>
      </div>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "register": "Sign Up",
    "confirmPassword": "Confirm your password",
    "password": "Password",
    "email": "E-Mail Adress"
  },
  "fr": {
    "register": "S'inscrire",
    "confirmPassword": "Confirmer le mot de passe",
    "password": "Mot de passe",
    "email": "Adresse mail"
  }
}
</i18n>

<script>
// @ is an alias to /src
export default {
  name: "Inscription",
  mounted() {
    this.focusInput();
  },
  methods: {
    focusInput() {
      this.$refs.email.focus();
    }
  }
};
</script>
