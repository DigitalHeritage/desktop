<template>
  <div class="home">
    <div
      id="loading"
      style="position: absolute;top:0;left:0;right:0;bottom:0;background-color: rgba(0,0,0,0.4);color:white;font-size:60px;z-index:100;line-height: 100vh;text-align: center;display:none;"
    >
      <i class="material-icons rotate" style="font-size:70px;"
        >hourglass_empty</i
      >
    </div>
    <div
      :style="{
        backgroundImage: 'url(' + artwork._metadata.Image + ')',
        display: zoom ? 'block' : 'none'
      }"
      @click="zoom = false"
      @keyup.esc="zoom = false"
      id="fullscreenimage"
    ></div>
    <section
      class="hero is-primary"
      :style="{ backgroundImage: 'url(' + artwork._metadata.Image + ')' }"
    >
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            <router-link :to="'/collection/' + collectionId"
              ><span class="tag is-primary is-pulled-right">{{
                collectionName
              }}</span></router-link
            >
            {{ artwork._metadata.Title }}
          </h1>
          <h2 class="subtitle">
            {{ artwork._metadata.Subtitle }}
          </h2>
          <p></p>
        </div>
      </div>
      <nav
        class="navbar"
        style="background-color: rgba(11, 8, 117, 0.74)"
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
                @click="detail"
                :class="{ 'is-active': active == 'detail' }"
                ><i class="material-icons">desktop_mac</i> {{ $t("view") }}</a
              >
              <!-- <a
                class="navbar-item"
                @click="active = 'modify'"
                :class="{ 'is-active': active == 'modify' }"
                ><i class="material-icons">create</i> {{ $t("edit") }}</a
              >-->
              <a
                class="navbar-item"
                @click="alpacaForm"
                :class="{ 'is-active': active == 'modify2' }"
                ><i class="material-icons">create</i> {{ $t("edit2") }}</a
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

    <div class="container" v-if="active == 'detail'" style="padding: 35px 0">
      <div class="columns is-desktop">
        <div class="column is-one-third">
          <img :src="image" @click="zoom = true" class="zoomable" />
        </div>
        <div class="column">
          <div style="float: right">
            <button class="button" disabled>
              <span class="icon"><i class="material-icons">save</i></span>
            </button>

            <button class="button">
              <label class="checkbox">
                <input type="checkbox" /> {{ $t("published") }}
              </label>
            </button>
          </div>

          <div class="recorddisplay" v-html="recordDisplay"></div>
          <div
            v-for="(property, key) in record"
            style="padding-bottom: 6px"
            v-bind:key="key"
            v-bind:title="property"
          >
            <!-- <template v-if="property"
              ><strong>{{ key }}</strong> {{ property }}</template
            > -->
          </div>
        </div>
      </div>
    </div>

    <div
      class="container edit"
      v-if="active == 'modify'"
      style="padding: 35px 0"
    >
      <div
        v-for="(property, key) in record"
        style="padding-bottom: 6px"
        v-bind:key="key"
        v-bind:title="property"
      >
        <template v-if="key !== 'Description'"
          ><strong>{{ key }}</strong
          ><br /><input
            v-model="artwork[key]"
            class="input"
            :placeholder="key"
            @change="changeProperty(key)"
        /></template>
        <template v-else
          ><strong>{{ key }}</strong
          ><br /><textarea
            v-model="artwork[key]"
            class="textarea"
            :placeholder="key"
          ></textarea>
        </template>
      </div>
    </div>

    <div
      class="container edit2"
      v-if="active == 'modify2'"
      style="padding: 35px 0"
    >
      <div id="form-alpaca"></div>
    </div>

    <div
      class="container json-edit"
      v-if="active == 'json'"
      style="padding: 35px 0"
    >
      <textarea
        v-model="json"
        placeholder="ajoutez plusieurs lignes"
      ></textarea>
      <button class="button is-success" @click="updateArtworkFromJson">
        {{ $t("refresh") }}
      </button>
    </div>

    <div class="container" v-if="active == 'images'" style="padding: 35px 0">
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
                <span class="material-icons"> add_a_photo </span>
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
// eslint-disable-next-line
import jQuery from "jquery";
import * as Alpaca from "alpaca";
import AdvancedEditorSchema from "../../public/advanced-editor-schemas.json";
import AdvancedEditorOptions from "../../public/advanced-editor-options.json";
import axios from "axios";

//import AdvancedEditorView from "../../public/advanced-editor-view.json";

function recordDisplay(record, level = 0) {
  var result = "";
  console.log("record", record);
  for (const property in record) {
    let value = record[property];

    if (typeof value == "string") {
      // Simple text value
      if (value.trim() != "" && property != "locale") {
        result =
          result +
          "<p style='padding-left:" +
          level * 10 +
          "px'><strong>" +
          property +
          "</strong> " +
          value +
          "</p>";
      }
    }
    if (value == null) {
      continue;
    }
    if (typeof value == "object") {
      // This is an object
      if (Array.isArray(value)) {
        // This is an array of values
        let result2 =
          "<p style='padding-left:" +
          level * 10 +
          "px'><strong>" +
          property +
          "</strong></p>" +
          "<ul>";
        value.forEach(function(currentValue) {
          result2 = result2 + recordDisplay(currentValue, 0);
        });
        result2 = result2 + "</ul>";
        if (result2.includes("<ul></ul>") == false) {
          result = result + result2;
        }
      } else {
        result =
          result +
          "<p style='padding-left:" +
          level * 10 +
          "px'><strong>" +
          property +
          "</strong></p>";
        result = result + recordDisplay(value, level + 1);
      }
    }
  }
  return result;
}

// @ is an alias to /src
export default {
  name: "Home",
  props: {
    coll: {
      type: String,
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
      return this.artwork.Subtitle;
    },

    record: function() {
      let result = Object.assign({}, this.artwork);
      delete result.Image;
      // Remove from display some fields
      console.log(
        "_origine",
        this.$Collections[this.collectionId]._metadata._origine
      );
      if (
        this.$Collections[this.collectionId]._metadata._origine ==
        "CollectiveAccess"
      ) {
        delete result.representations;
        delete result.intrinsic_fields;
      }
      delete result._metadata;
      delete result._key;
      return result;
    },
    image: function() {
      return this.artwork._metadata.Image;
    },
    collectionName() {
      return this.$Collections[this.collectionId]._metadata.Title;
    },
    recordDisplay() {
      return recordDisplay(this.record["data"]);
      //return recordDisplay(this.record);
    },
    recordDisplay2() {
      let displayRows = [];
      for (const property in this.record) {
        //console.log(`${property}: ${object[property]}`);
        let value = this.record[property];
        //console.log(value);
        if (typeof value == "string") {
          if (value != "") {
            displayRows.push(
              "<p><strong>" +
                property +
                "</strong> " +
                this.record[property] +
                "</p>"
            );
          } else {
            displayRows.push(
              "<p><strong style='color:lightgray;'>" +
                property +
                "</strong></p>"
            );
          }
        } else {
          console.log(typeof this.record[property]);
          for (const property2 in value) {
            console.log("property2");
            let value2 = value[property2];
            if (typeof value2 == "string") {
              if (value2 != "") {
                displayRows.push(
                  "<p style='padding:20px'><strong>" +
                    property2 +
                    "</strong> " +
                    value2[property2] +
                    value2[property2] +
                    "</p>"
                );
              } else {
                displayRows.push(
                  "<p style='padding:20px'><strong style='color:lightgray;'>" +
                    property2 +
                    "</strong></p>"
                );
              }
              console.log(typeof this.record[property2]);
            }
          }
        }
      }
      let result = displayRows.join("\n");
      return result;
    }
  },
  methods: {
    detail() {
      this.active = "detail";
      if (window.$(".alpaca-field").css("display") == "block") {
        window.$(".alpaca-field").css("display", "none");
      }
    },
    showNext() {
      console.log("saveLocal");
      //this.$parent.$parent.saveLocal();
      if (this.current < this.$Collections[this.collectionId].data.length - 1)
        this.current++;
      this.artwork = this.$Collections[this.collectionId].data[this.current];
    },
    showPrev() {
      console.log("saveLocal");
      //this.$parent.$parent.saveLocal();
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
      this.artwork._metadata["Image"] = this.artwork["Image"];
    },
    updateImage() {
      this.artwork.Image = this.previewimage;
      this.previewimage = null;
      this.artwork._metadata["Image"] = this.artwork["Image"];
    },
    zoomImage() {},
    changeProperty(key) {
      if (key === "Title" || key === "Subtitle" || key === "Image") {
        //Change metadata according to the edited fields of an item to keep persistence
        this.artwork._metadata[key] = this.artwork[key];
      }
    },
    alpacaForm() {
      this.active = "modify2";
      let that = this;
      if (window.$(".alpaca-field").css("display") == "none") {
        window.$(".alpaca-field").css("display", "block");
      }

      setTimeout(function() {
        window.$("#form-alpaca").alpaca({
          data: that.artwork["data"],
          schema: AdvancedEditorSchema,
          options: AdvancedEditorOptions,
          view: {
            parent: "bootstrap-edit-horizontal",
            wizard: {
              title: "Welcome to the Wizard",
              description: "Please fill things in as you wish",
              bindings: {
                Thematique: 1,
                Domaine: 2,
                Reference: 2,
                Designation: 2,
                Description: 3,
                Dimensions: 3,
                "Materiaux et techniques": 3,
                Inscriptions: 3,
                Personne: 4,
                Dates: 4,
                Lieux: 4,
                Georeference: 4,
                "References bibliographiques": 5,
                "Liens externes": 5,
                Localisation: 5,
                Etat: 5,
                Acquisition: 5,
                Assurance: 5,
                "Bloc-notes": 5
              },
              steps: [
                {
                  title: "Thématique",
                  description: "Type d'objet"
                },
                {
                  title: "Identification",
                  description: "Domaine, numéro, désignation"
                },
                {
                  title: "Description",
                  description: "Description détaillée"
                },
                {
                  title: "Etude",
                  description: "Personnes, dates et lieux liés"
                },
                {
                  title: "Divers",
                  description: "Etat, liens et notes"
                }
              ],
              buttons: {
                previous: {
                  title: "Précédent"
                },
                next: {
                  title: "Suivant"
                },
                submit: {
                  title: "Valider",
                  validate: function(callback) {
                    callback(true);
                  },
                  click: function() {
                    document.getElementById("loading").style.display = "block";
                    window
                      .$("#loading")
                      .height(
                        window.$(".home").height() +
                          window.$(".navbar").height()
                      );
                    var xhr = new XMLHttpRequest();
                    xhr.open(
                      "POST",
                      "https://floutier.lescollections.fr/gestion/dh_service_edit.php",
                      true
                    );
                    xhr.setRequestHeader("Content-Type", "application/json");
                    console.log("DATA SEND :", JSON.stringify(this.getValue()));
                    xhr.send(JSON.stringify(this.getValue()));
                    xhr.onreadystatechange = function() {
                      if (xhr.readyState == 4 && xhr.status == 200) {
                        that.updateData();
                      }
                    };
                  },
                  id: "mySubmit",
                  attributes: {
                    "data-test": "123"
                  }
                }
              }
            }
          }
        });
      }, 50);
    },
    updateData() {
      var artwork_id = this.record["data"]["object_id"];
      let url_collection =
        "https://floutier.lescollections.fr/gestion/dh_update_json.php?object_id=" +
        artwork_id;
      axios
        .get(url_collection)
        .then(response => {
          // JSON responses are automatically parsed.
          let new_collection = response.data;
          this.$Collections[this.collectionId] = new_collection;
          this.artwork = this.$Collections[this.collectionId].data[
            this.current
          ];
          document.getElementById("loading").style.display = "none";
          this.detail();
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },

  created() {
    console.log(Alpaca);
    if (this.id !== undefined) {
      this.current = parseInt(this.id);
    }
    if (this.coll !== undefined) {
      this.collectionId = parseInt(this.coll);
    }
    this.artwork = this.$Collections[this.collectionId].data[this.current];
    console.log(
      "this.artwork",
      this.$Collections[this.collectionId].data[this.current]
    );
  },
  beforeDestroy() {
    console.log("saveLocal");
    this.$parent.$parent.saveLocal();
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
ul {
  list-style-type: disc !important;
  margin-left: 24px !important;
}
.recorddisplay > p {
  padding-bottom: 6px !important;
}
.recorddisplay > ul {
  padding-bottom: 6px !important;
}
</style>
<i18n>
{
  "en" : {
    "view": "View",
    "edit": "Edit",
    "edit2": "Advanced editor",
    "editJSON": "Edit JSON",
    "images": "Images",
    "delete": "Delete",
    "refresh": "Refresh",
    "replaceImage": "Replace this image",
    "useImage": "Use this image",
    "cancel": "Cancel",
    "chooseFile": "Choose a file…",
    "published": "published"
  },
  "fr": {
    "view": "Voir",
    "edit": "Editer",
    "edit2": "Editeur avancé",
    "editJSON": "Editer le JSON",
    "images": "Images",
    "delete": "Supprimer",
    "refresh": "Actualiser",
    "replaceImage": "Remplacer l'image",
    "useImage": "Utiliser cette image",
    "cancel": "Annuler",
    "chooseFile": "Choisir un fichier…",
    "published": "publié"
  }
}
</i18n>
