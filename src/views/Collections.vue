<template>
  <div class="home">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            DigitalHeritage
          </h1>
          <h2 class="subtitle">
            {{ $t("subtitle") }}
          </h2>
        </div>
      </div>
      <nav
        class="navbar"
        style="background-color:rgba(11, 8, 117, 0.74);"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="container">
          <div id="navbarSecondary" class="navbar-menu navbar-secondary">
            <div class="navbar-start">
              <router-link class="navbar-item is-active" to="/collection"
                ><i class="material-icons">library_books</i> {{ $t("browse") }}
              </router-link>
              <a class="navbar-item" @click="addNewCollection"
                ><i class="material-icons">library_add</i>{{ $t("add") }}</a
              >
            </div>
            <div class="navbar-end"></div>
          </div>
        </div>
      </nav>
    </section>

    <div class="collections-list container">
      <div v-for="(collection, key) of collections" v-bind:key="key">
        <router-link :to="{ path: '/collection/' + key }">
          <div class="card is-one-third">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{{ getCollectionTitle(collection) }}</p>
                  <p class="subtitle is-6">
                    {{ getCollectionSubtitle(collection) }}
                  </p>
                </div>
              </div>

              <div class="content">
                <i
                  >{{
                    getCollectionDescription(collection).substring(0, 114)
                  }}...</i
                >
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Collections from "../../public/collections.json";

export default {
  name: "Collections",
  data: function() {
    return {
      collections: Collections
    };
  },
  methods: {
    addNewCollection() {
      let target = "/collection/" + this.collections.length;
      let template = {
        _metadata: {
          Title: "My collection " + this.collections.length,
          Subtitle: "How would I call it ?",
          Description: "",
          filename: ""
        },
        _data: [{}]
      };
      this.collections.push(template);
      this.$router.push(target);
    },
    getCollectionTitle(collection) {
      if (collection._metadata && collection._metadata.Title) {
        return collection._metadata.Title;
      } else {
        return "Collection...";
      }
    },
    getCollectionSubtitle(collection) {
      if (collection._metadata && collection._metadata.Subtitle) {
        return collection._metadata.Subtitle;
      } else {
        return "";
      }
    },
    getCollectionDescription(collection) {
      if (collection._metadata && collection._metadata.Description) {
        return collection._metadata.Description;
      } else {
        return "";
      }
    }
  }
};
</script>

<style>
.collections-list {
  padding: 40px 0;
}
</style>

<i18n>
{
  "en": {
    "subtitle": "A collection management app",
    "browse": "Browse collections",
    "add": "Add a collection"
  },
  "fr": {
    "subtitle": "Une application de gestion de collections",
    "browse": "Parcourir les collections",
    "add": "Ajouter une collection"
  }
}
</i18n>
