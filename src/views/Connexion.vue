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
        <button type="button" class="button is-primary">
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
