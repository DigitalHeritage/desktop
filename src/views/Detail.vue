<template>
  <div class="home">
    <div
      :style="{
        backgroundImage: 'url(' + artwork.Image + ')',
        display: zoom ? 'block' : 'none'
      }"
      v-focus
      @click="zoom = false"
      @keyup.esc="zoom = false"
      id="fullscreenimage"
    ></div>
    <section
      class="hero is-primary"
      :style="{ backgroundImage: 'url(' + artwork.Image + ')' }"
    >
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            <router-link :to="'/collection/' + collectionId"
              ><span class="tag is-primary is-pulled-right">{{
                collectionName
              }}</span></router-link
            >
            {{ artwork.Title }}
          </h1>
          <h2 class="subtitle">
            {{ artwork.Author }}
          </h2>
          <p></p>
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
              <a class="navbar-item" @click="showPrev"
                ><i class="material-icons">keyboard_arrow_left</i></a
              >
              <a
                class="navbar-item"
                @click="active = 'detail'"
                :class="{ 'is-active': active == 'detail' }"
                ><i class="material-icons">desktop_mac</i> {{ $t("view") }}</a
              >
              <a
                class="navbar-item"
                @click="active = 'modify'"
                :class="{ 'is-active': active == 'modify' }"
                ><i class="material-icons">create</i> {{ $t("edit") }}</a
              >
              <a
                class="navbar-item"
                @click="activateJson"
                :class="{ 'is-active': active == 'json' }"
                to="/collection"
                ><i class="material-icons">reorder</i> {{ $t("editJSON") }}</a
              >
              <a class="navbar-item" @click="active = 'images'"
                ><i class="material-icons">photo_library</i>
                {{ $t("images") }}</a
              >
            </div>
            <div class="navbar-end">
              <a class="navbar-item" @click="deleteArtwork"
                ><i class="material-icons">delete</i> {{ $t("delete") }}</a
              >
              <a class="navbar-item" @click="showNext"
                ><i class="material-icons">keyboard_arrow_right</i></a
              >
            </div>
          </div>
        </div>
      </nav>
    </section>

    <div class="container" v-if="active == 'detail'" style="padding:35px 0;">
      <div class="columns is-desktop">
        <div class="column is-one-third">
          <img :src="image" @click="zoom = true" class="zoomable" />
        </div>
        <div class="column">
          <div
            v-for="(property, key) in record"
            style="padding-bottom:6px;"
            v-bind:key="key"
            v-bind:title="property"
          >
            <template v-if="property"
              ><strong>{{ key }}</strong> {{ property }}</template
            >
          </div>
        </div>
      </div>
    </div>

    <div
      class="container edit"
      v-if="active == 'modify'"
      style="padding:35px 0;"
    >
      <div
        v-for="(property, key) in artwork"
        style="padding-bottom:6px;"
        v-bind:key="key"
        v-bind:title="property"
      >
        <template v-if="key !== 'Description'"
          ><strong>{{ key }}</strong
          ><br /><input v-model="artwork[key]" class="input" :placeholder="key"
        /></template>
        <template v-else
          ><strong>{{ key }}</strong
          ><br /><textarea
            v-model="artwork[key]"
            class="textarea"
            :placeholder="key"
          ></textarea
        ></template>
      </div>
    </div>

    <div
      class="container json-edit"
      v-if="active == 'json'"
      style="padding:35px 0;"
    >
      <textarea
        v-model="json"
        placeholder="ajoutez plusieurs lignes"
      ></textarea>
      <button class="button is-success" @click="updateArtworkFromJson">
        {{ $t("refresh") }}
      </button>
    </div>

    <div class="container" v-if="active == 'images'" style="padding:35px 0;">
      <div class="columns is-desktop">
        <div class="column is-one-third">
          <img :src="image" @click="zoom = true" class="zoomable" />
        </div>
        <div class="column is-one-third">
          <h2>{{ $t("replaceImage") }}</h2>
          <img :src="previewimage" class="uploading-image" />
          <button
            v-if="previewimage"
            class="button is-success"
            @click="updateImage"
          >
            {{ $t("useImage") }}</button
          >&nbsp;
          <button
            v-if="previewimage"
            class="button is-warning"
            @click="previewimage = null"
          >
            {{ $t("cancel") }}
          </button>

          <div class="file is-boxed" v-if="!previewimage">
            <label class="file-label">
              <input
                type="file"
                accept="image/jpeg"
                class="file-input"
                @change="uploadImage"
              />
              <span class="file-cta">
                <span class="material-icons">
                  add_a_photo
                </span>
                <span class="file-label">
                  {{ $t("chooseFile") }}
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  props: {
    coll: {
      type: Number,
      required: false
    },
    id: {
      type: String,
      required: false
    }
  },
  data: function() {
    return {
      current: 0,
      active: "detail",
      json: "",
      artwork: {},
      collectionId: 0,
      previewimage: null,
      zoom: false
    };
  },
  computed: {
    title() {
      return this.artwork.Title;
    },
    subtitle() {
      return this.artwork.Author;
    },
    record: function() {
      let result = Object.assign({}, this.artwork);
      delete result.Image;
      delete result._metadata;
      return result;
    },
    image: function() {
      return this.artwork.Image;
    },
    collectionName() {
      return this.$Collections[this.collectionId]._metadata.Title;
    }
  },
  methods: {
    showNext() {
      if (this.current < this.$Collections[this.collectionId].data.length - 1)
        this.current++;
      this.artwork = this.$Collections[this.collectionId].data[this.current];
    },
    showPrev() {
      if (this.current > 0) this.current--;
      this.artwork = this.$Collections[this.collectionId].data[this.current];
    },
    activateJson() {
      this.active = "json";
      this.json = JSON.stringify(this.artwork, null, 2);
    },
    updateArtworkFromJson() {
      console.log(this.$Collections);
      this.artwork = JSON.parse(this.json);
      this.$Collections[this.collectionId].data[this.current] = JSON.parse(
        this.json
      );
    },
    deleteArtwork() {
      this.$Collections[this.collectionId].data.splice(this.current, 1);
      this.$router.push("/collection/" + this.collectionId);
    },
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.previewimage = e.target.result;
        console.log(this.previewimage);
      };
    },
    updateImage() {
      this.artwork.Image = this.previewimage;
      this.previewimage = null;
    },
    zoomImage() {}
  },
  created() {
    if (this.id !== undefined) {
      this.current = parseInt(this.id);
    }
    if (this.coll !== undefined) {
      this.collectionId = parseInt(this.coll);
    }
    this.artwork = this.$Collections[this.collectionId].data[this.current];
  }
};
</script>

<style>
.hero {
  background-position: center 20%;
  background-size: cover;
}
.hero-body {
  background-image: url("../assets/grad-to-transparent.png");
  background-repeat: repeat-x;
  background-position: top left;
}
.json-edit textarea {
  width: 100%;
  height: 340px;
  font-family: monospace;
  font-size: 14px;
}
.edit input,
.edit textarea {
  width: 100%;
}
.edit textarea {
  height: 80px;
}
</style>

<i18n>
{
  "en" : {
    "view": "View",
    "edit": "Edit",
    "editJSON": "Edit JSON",
    "images": "Images",
    "delete": "Delete",
    "refresh": "Refresh",
    "replaceImage": "Replace this image",
    "useImage": "Use this image",
    "cancel": "Cancel",
    "chooseFile": "Choose a file…"
  },
  "fr": {
    "view": "Voir",
    "edit": "Editer",
    "editJSON": "Editer le JSON",
    "images": "Images",
    "delete": "Supprimer",
    "refresh": "Actualiser",
    "replaceImage": "Remplacer l'image",
    "useImage": "Utiliser cette image",
    "cancel": "Annuler",
    "chooseFile": "Choisir un fichier…"
  }
}
</i18n>
