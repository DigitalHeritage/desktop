<template>
  <div id="app">
    <nav
      class="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="../public/icon.png" style="height:70%" />
        </router-link>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">{{
            $t("collections")
          }}</router-link>
          <router-link class="navbar-item" to="/about">{{
            $t("about")
          }}</router-link>

          <div
            class="navbar-item has-dropdown is-hoverable"
            style="display:none;"
          >
            <a class="navbar-link">
              More
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                About
              </a>
              <a class="navbar-item">
                Jobs
              </a>
              <a class="navbar-item">
                Contact
              </a>
              <hr class="navbar-divider" />
              <a class="navbar-item">
                Report an issue
              </a>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <LocaleSwitcher />
            <div class="buttons">
              <a class="button is-primary" href="/inscription">
                <strong>{{ $t("signup") }}</strong>
              </a>
              <a class="button is-light" href="/connexion">
                {{ $t("login") }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<i18n>
{
  "en": {
    "signup": "Sign up",
    "login": "Log in",
    "about": "About",
    "collections": "Collections"
  },
  "fr": {
    "signup": "S'inscrire",
    "login": "Se connecter",
    "about": "A propos",
    "collections": "Collections"
  }
}
</i18n>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import LocaleSwitcher from "@/components/LocaleSwitcher";
export default {
  components: { LocaleSwitcher }
};
</script>
