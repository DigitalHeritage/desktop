<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ metadata.Title }}
          </h1>
          <h2 class="subtitle">
            {{ metadata.Subtitle }}
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
              <a
                class="navbar-item"
                :class="{ 'is-active': active === 'browse' }"
                @click="active = 'browse'"
                ><i class="material-icons">view_module</i> Browse</a
              >
              <a
                class="navbar-item"
                :class="{ 'is-active': active === 'timeline' }"
                @click="active = 'timeline'"
                ><i class="material-icons">straighten</i> Timeline</a
              >
              <a
                class="navbar-item"
                :class="{ 'is-active': active === 'map' }"
                @click="active = 'map'"
                ><i class="material-icons">room</i> Map</a
              >
              <a
                class="navbar-item"
                :class="{ 'is-active': active === 'edit' }"
                @click="active = 'edit'"
                ><i class="material-icons">create</i> Edit</a
              >
              <a
                class="navbar-item"
                :class="{ 'is-active': active === 'addAnItem' }"
                @click="addAnItem"
                ><i class="material-icons">note_add</i> Add an item</a
              >
              <a
                class="navbar-item"
                :class="{ 'is-active': active === 'options' }"
                @click="active = 'options'"
                ><i class="material-icons">settings</i> Options</a
              >
              <a class="navbar-item" @click="preload"
                ><i class="material-icons">run_circle</i> Preload</a
              >
            </div>
            <div class="navbar-end"></div>
          </div>
        </div>
      </nav>
    </section>
    <div class="cards-container" v-if="active === 'browse'">
      <div
        class="card"
        v-for="(artwork, index) of artworks"
        :key="`${index}`"
        :style="{ backgroundImage: 'url(' + artwork._metadata.Image + ')' }"
      >
        <router-link :to="'/detail/' + collectionId + '/' + index">
          <div class="card-content"></div>
        </router-link>
        <footer class="card-footer">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <router-link :to="'/detail/' + collectionId + '/' + index">
                  <img
                    v-if="artwork._metadata.Image"
                    :src="artwork._metadata.Image"
                    :alt="artwork.Title"
                  />
                </router-link>
              </figure>
            </div>
            <div class="media-content">
              <div class="media-content-inner">
                <router-link :to="'/detail/' + collectionId + '/' + index">
                  <div v-if="artwork._metadata">
                    <p class="subtitle is-7">
                      {{ artwork._metadata.Subtitle }}
                    </p>
                    <p class="title is-6">{{ artwork._metadata.Title }}</p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>

    <div class="container edit" v-if="active == 'edit'" style="padding:35px 0;">
      <div
        v-for="(property, key) in metadata"
        style="padding-bottom:6px;"
        v-bind:key="key"
        v-bind:title="property"
      >
        <template v-if="key !== 'Description'"
          ><strong>{{ key }}</strong
          ><br /><input
            v-model="metadata[key]"
            class="input"
            :placeholder="key"
          />
        </template>
        <template v-else
          ><strong>{{ key }}</strong
          ><br /><textarea
            v-model="metadata[key]"
            class="textarea"
            :placeholder="key"
          ></textarea
        ></template>
      </div>
    </div>

    <div
      class="container loadURL"
      v-if="active == 'loadURL'"
      style="padding:35px 0;"
    >
      <label class="label">URL</label>
      <input
        style="margin-top:12px"
        v-model="URL"
        class="input"
        placeholder="https://..."
      />
      <button
        style="margin-top:12px"
        class="button is-primary"
        @click.prevent="loadURL"
      >
        Load from URL
      </button>
      <article style="margin-top:30px;" class="message is-gray">
        <div class="message-header">
          Need an example ?
        </div>
        <div class="message-body">
          <div class="content">
            <p>https://api.digitalheritage.fr/artworks-guardian.php</p>
          </div>
        </div>
      </article>
    </div>

    <div
      class="container loadFile"
      v-if="active === 'loadFile'"
      style="padding:35px 0;"
    >
      <label class="label">Load a file</label>
      <div id="file-js-example" class="file has-name">
        <label class="file-label">
          <input
            @change="selectFile"
            class="file-input"
            type="file"
            name="resume"
          />
          <span class="file-cta">
            <i class="material-icons">attach_file</i>&nbsp;
            <span class="file-label">
              Choose a file…
            </span>
          </span>
          <span class="file-name">
            {{ fileSelectedMessage }}
          </span>
        </label>
      </div>
      <button
        style="margin-top:12px"
        class="button is-primary"
        @click.prevent="loadFile"
      >
        Load file
      </button>
    </div>

    <div
      class="container options"
      v-if="active === 'options'"
      style="padding:35px 0;"
    >
      <div class="columns">
        <div class="column is-one-quarter-desktop is-half-mobile">
          <a class="button is-primary" @click="downloadJson"
            ><i class="material-icons">save</i> Download</a
          >
        </div>
        <div class="column is-three-quarters-desktop is-half-mobile">
          Download the collection as a single JSON file
        </div>
      </div>
      <div class="columns">
        <div class="column is-one-quarter-desktop is-half-mobile">
          <a class="button is-info" @click="active = 'loadFile'"
            ><i class="material-icons">insert_drive_file</i> Load file</a
          >
        </div>
        <div class="column is-three-quarters-desktop is-half-mobile">
          Replace this collection by a JSON file
        </div>
      </div>
      <div class="columns">
        <div class="column is-one-quarter-desktop is-half-mobile">
          <a class="button is-info" @click="active = 'loadURL'"
            ><i class="material-icons">link</i> Load from URL</a
          >
        </div>
        <div class="column is-three-quarters-desktop is-half-mobile">
          Replace this collection by an online JSON
        </div>
      </div>
      <hr />
      <div class="columns">
        <div class="column is-one-quarter-desktop is-half-mobile">
          <a class="button is-danger" @click="deleteCollection"
            ><i class="material-icons">delete</i> Delete this collection</a
          >
        </div>
        <div class="column is-three-quarters-desktop is-half-mobile"></div>
      </div>
    </div>

    <div v-if="active === 'map'">
      <l-map
        style="height: 700px; width: 100%"
        :zoom="zoom"
        :center="center"
        @update:zoom="mapZoomUpdated"
        @update:center="mapCenterUpdated"
        @update:bounds="mapBoundsUpdated"
      >
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker v-for="marker of markers" :lat-lng="marker.geo" :key="marker">
          <l-popup>
            <div @click="markerClick(marker.id)" style="cursor:pointer">
              <table style="border:none;">
                <tr>
                  <td style="padding-right:6px;">
                    <img :src="marker.image" style="width:40px;height:auto;" />
                  </td>
                  <td>{{ marker.name }}</td>
                </tr>
              </table>
            </div>
            <div class="is-clearfix"></div>
          </l-popup>
        </l-marker>
      </l-map>
    </div>

    <div v-if="active === 'timeline'">
      <link
        title="timeline-styles"
        rel="stylesheet"
        href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css"
      />
      <div id="timeline-embed" style="width: 100%; height: 600px"></div>
    </div>
  </div>
</template>

<script>
import Collections from "../../public/collections.json";
import jsponpath from "jsonpath";
import _ from "lodash";
import L from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
//import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import "leaflet/dist/leaflet.css";

function downloadTextFile(text, name) {
  const a = document.createElement("a");
  const type = name.split(".").pop();
  a.href = URL.createObjectURL(
    new Blob([text], { type: `text/${type === "txt" ? "plain" : type}` })
  );
  a.download = name;
  a.click();
}

// @ is an alias to /src
export default {
  name: "Collection",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data: function() {
    return {
      artworks: [],
      metadata: {},
      active: "browse",
      URL: "",
      result: "",
      fileSelectedMessage: "No file selected",
      json: "",
      collectionId: 0,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 3,
      center: [47.41322, -1.219482],
      bounds: null,
      markers: []
    };
  },
  computed: {},
  methods: {
    downloadJson() {
      let filename = this.metadata.filename
        ? this.metadata.filename
        : "collection.json";
      downloadTextFile(
        JSON.stringify({ _metadata: this.metadata, data: this.artworks }),
        filename
      );
    },
    loadURL() {
      // To test, use : https://api.digitalheritage.fr/artworks-guardian.php

      if (!this.URL) return;
      fetch(this.URL)
        .then(response => response.json())
        .then(json => {
          console.log(json);
          this.artworks = json.data;
          this.metadata = json._metadata;
        });
    },
    loadFile() {
      // If no JSON loaded, silent crash
      if (!this.json) return;
      // Parse the JSON
      let collection = JSON.parse(this.json);
      // Store the JSON instead of the actual collection
      this.artworks = collection.data;
      this.metadata = collection._metadata;
    },
    selectFile(event) {
      // Fetching the selected files
      var files = event.target.files || event.dataTransfer.files;
      // Silent crash when no file selected
      if (!files.length) return;
      // We use only the first file selected, other are not examined ; update the selected file name
      this.fileSelectedMessage = files[0].name;
      // Create a filereader for the file, prepare to store the result inside this.json
      const fr = new FileReader();
      let that = this;
      fr.onload = event => {
        that.json = event.target.result;
      };
      // Do the file read
      fr.readAsText(files.item(0));
    },
    deleteCollection() {
      Collections.splice(this.collectionId, 1);
      this.$router.push("/");
    },
    addAnItem() {
      let lastnum = this.artworks.length - 1;
      // Cloning the last item into an object
      let item = Object.assign({}, this.artworks[lastnum]);
      // Removing the property values
      for (var prop in item) {
        item[prop] = "";
      }
      item["Title"] = "New item";
      console.log(item);
      this.artworks.push(item);
      this.active = "browse";
    },
    mapZoomUpdated(zoom) {
      this.zoom = zoom;
    },
    mapCenterUpdated(center) {
      this.center = center;
    },
    mapBoundsUpdated(bounds) {
      this.bounds = bounds;
    },
    markerClick(id) {
      this.$router.push("/detail/" + id);
    },
    preload() {
      let artworks = this.artworks;
      let titlepath = this.metadata._title;
      let imagepath = this.metadata._image;
      _.forEach(artworks, function(el, index) {
        artworks[index]._metadata = {
          Title: jsponpath.query(artworks[index], "$." + titlepath).pop()
        };
      });
      _.forEach(artworks, function(el, index) {
        artworks[index]._metadata.Image =
          "https://www.augustins.org/documents/10180/156407/" +
          jsponpath.query(artworks[index], "$." + imagepath).pop();
        console.log(artworks[index]._metadata);
      });
      window.history.pushState("", "", "/collection/" + this.collectionId);
    }
  },
  created() {
    this.collectionId = this.$route.params.id ? this.$route.params.id : 0;
    this.artworks = Collections[this.collectionId].data;
    if (Collections[this.collectionId]._metadata) {
      this.metadata = Collections[this.collectionId]._metadata;
    } else {
      this.metadata = {
        Title: "Collection...",
        Subtitle: "",
        Description: ""
      };
    }

    for (let i = 0; i < this.artworks.length; i++) {
      // Geo is inside _metada.Geo
      // TODO : group by same Geo, for Paris Louvre
      if (
        this.artworks[i]._metadata &&
        this.artworks[i]._metadata.Geo &&
        this.artworks[i]._metadata.Geo[0]
      ) {
        this.markers.push({
          geo: L.latLng(
            this.artworks[i]._metadata.Geo[0],
            this.artworks[i]._metadata.Geo[1]
          ),
          name: this.artworks[i]._metadata.Title,
          id: i,
          image: this.artworks[i].Image
        });
      }
    }
  }
};
</script>

<style scope>
.card-content {
  height: 280px;
}

.card {
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  width: 33%;
  float: left;
}

.card footer {
  background-color: rgba(255, 255, 255, 0.85);
  border-top: none;
  min-height: 60px;
}

.card figure.image a {
  height: 100%;
  display: inline-block;
  line-height: 58px;
  vertical-align: middle;
}

.card figure.image a img {
  vertical-align: middle;
  display: inline;
}

.media-content .subtitle {
  margin-top:4px;
}
</style>
