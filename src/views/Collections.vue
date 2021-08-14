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
                ><i class="material-icons">library_add</i> {{ $t("add") }}</a
              >
              <a class="navbar-item" @click="addNewCollectionFromTemplate"
                ><i class="material-icons">library_add</i>
                {{ $t("Add from template") }}</a
              >
              <a
                class="navbar-item"
                :class="{ 'is-active': active === 'options' }"
                @click="active = 'options'"
                ><i class="material-icons">settings</i> {{ $t("options") }}</a
              >
            </div>
            <div class="navbar-end"></div>
          </div>
        </div>
      </nav>
    </section>

    <div class="collections-list container" v-if="active === 'list'">
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
    <div
      class="container options"
      v-if="active === 'options'"
      style="padding:35px 0;"
    >
      <hr />
      <div class="columns">
        <div class="column is-one-quarter-desktop is-half-mobile">
          <a class="button is-danger" @click="restoreDemoData"
            ><i class="material-icons">delete</i>
            <img src="" alt="" sizes="" srcset="" />
            {{ $t("Restaurer les données de démonstration") }}</a
          >
        </div>
        <div class="column is-three-quarters-desktop is-half-mobile"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
//import Collections from "../../public/collections.json";

export default {
  name: "Collections",
  data: function() {
    return {
      active: "list",
      collections: this.$Collections,
      collectionsTemplate: [
        {
          name: "Cartes pokemon",
          template: {
            _metadata: {
              Title: "Cartes pokemon",
              Subtitle: "...",
              Description: "",
              _title: "Cartes pokemon",
              _image: ""
            },
            data: [
              {
                _metadata: {
                  Title: "Dracaufeu",
                  Subtitle: "Charizard",
                  Date: "",
                  Geo: [],
                  Image:
                    "https://i.ebayimg.com/images/g/yg4AAOSw5WVblqBV/s-l1600.jpg"
                },
                Title: "Dracaufeu",
                Date: "",
                Location: "",
                Subtitle: "Charizard",
                Description: "",
                Credits: "",
                Image:
                  "https://i.ebayimg.com/images/g/yg4AAOSw5WVblqBV/s-l1600.jpg",
                Type: "feu",
                Etat: "quasi neuf",
                Serie: "1ere édition",
                Langue: "japonais"
              }
            ]
          }
        }
      ]
    };
  },
  mounted: function() {
    if (this.$PremiereOuverture) {
      for (let index = 0; index < localStorage.length; index++) {
        if (localStorage.key(index).startsWith("digitalheritage-collection")) {
          this.loadLocal();
          break;
        }
      }
      Vue.prototype.$PremiereOuverture = false;
    }
  },
  methods: {
    loadLocal() {
      console.log("loadLocal");
      Vue.prototype.$Collections = [];
      for (let index = localStorage.length - 1; index >= 0; index--) {
        if (localStorage.key(index).startsWith("digitalheritage-collection")) {
          Vue.prototype.$Collections.push(
            JSON.parse(localStorage.getItem(localStorage.key(index)))
          );
        }
      }
      this.collections = this.$Collections;
    },
    addNewCollection() {
      let target = "/collection/" + this.collections.length;
      let template = {
        _metadata: {
          Title: "My collection " + this.collections.length,
          Subtitle: "How would I call it ?",
          Description: "",
          filename: "",
          id: this.collections.length
        },
        data: [{}]
      };
      this.collections.push(template);
      this.$router.push(target);
    },
    addNewCollectionFromTemplate() {
      let target = "/collection/" + this.collections.length;
      console.log(this.collectionsTemplate[0].template);
      this.collections.push(this.collectionsTemplate[0].template);
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
    "add": "Add a collection",
    "Yes": "Yes",
    "No": "No",
    "modalTitle": "Load from the browser ?",
    "modalSubtitle": "Do you want to load the datas stored in your browser ?",
    "loadBrowser": "Load from browser",
    "saveBrowser": "Save in browser"
  },
  "fr": {
    "subtitle": "Une application de gestion de collections",
    "browse": "Parcourir les collections",
    "add": "Ajouter une collection",
    "Yes": "Oui",
    "No": "Non",
    "modalTitle": "Charger depuis le navigateur ?",
    "modalSubtitle": "Voulez vous charger vos données depuis le navigateur ?",
    "loadBrowser": "Charger du navigateur",
    "saveBrowser": "Enregistrer dans le navigateur"
  }
}
</i18n>
