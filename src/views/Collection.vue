<template>
<div>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {{metadata.Title}}
        </h1>
        <h2 class="subtitle">
          {{metadata.Subtitle}}
        </h2>
      </div>
    </div>
  <nav
    class="navbar" style="background-color:rgba(11, 8, 117, 0.74);"
    role="navigation"
    aria-label="main navigation">
    <div class="container">
    <div id="navbarSecondary" class="navbar-menu navbar-secondary">
      <div class="navbar-start">
        <a class="navbar-item" :class="{ 'is-active' : active=='browse' }" @click="active = 'browse'"><i class="material-icons">view_module</i> Browse</a>
          <a class="navbar-item" :class="{ 'is-active' : active=='edit' }" @click="active= 'edit'"><i class="material-icons">create</i> Edit</a>
          <a class="navbar-item" :class="{ 'is-active' : active=='downloadJson' }" @click="downloadJson"><i class="material-icons">save</i> Download</a>
          <a class="navbar-item" :class="{ 'is-active' : active=='loadURL' }" @click="active = 'loadURL'"><i class="material-icons">link</i> Load from URL</a>
        <a class="navbar-item" :class="{ 'is-active' : active=='loadFile' }" @click="active = 'loadFile'"><i class="material-icons">insert_drive_file</i> Load file</a>
      </div>
      <div class="navbar-end">
        <a class="navbar-item" @click="deleteCollection"><i class="material-icons">delete</i> Delete </a>
      </div>
    </div>
    </div>
    </nav>
  </section>
  <div class="cards-container" v-if="active=='browse'">
    <div class="card"  v-for="(artwork, index) of artworks" v-bind:key="artwork" :style="{backgroundImage:'url('+artwork.Image+')'}">
      <router-link :to="'/detail/' + index">
      <div class="card-content" >
        
      </div>
      </router-link>
      <footer class="card-footer">
        <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <router-link :to="'/detail/' + index">
              <img :src="artwork.Image" :alt="artwork.Title">
            </router-link >
          </figure>
        </div>
        <div class="media-content">
          <div class="media-content-inner">
            <router-link :to="'/detail/' + index">
            <p class="subtitle is-7">{{artwork.Author}}</p>
            <p class="title is-6">{{artwork.Title}}</p>
            </router-link>
          </div>
        </div>
      </div>
      </footer>
    </div>
  </div>

  <div class="container edit" v-if="active=='edit'" style="padding:35px 0;">
    <div v-for="(property, key) in metadata" style="padding-bottom:6px;" v-bind:key="key" v-bind:title="property">
      <template v-if="key !== 'Description'" ><strong>{{key}}</strong><br/><input v-model="metadata[key]"  class="input" :placeholder="key"/></template>
      <template v-else><strong>{{key}}</strong><br/><textarea v-model="metadata[key]" class="textarea" :placeholder="key"></textarea></template>
    </div>
  </div>

  <div class="container loadURL" v-if="active=='loadURL'" style="padding:35px 0;">
    <label class="label">URL</label>
    <input style="margin-top:12px"  v-model="URL" class="input" placeholder="https://..." />
    <button style="margin-top:12px" class="button is-primary" @click.prevent="loadURL">Load from URL</button>
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

  <div class="container loadFile" v-if="active=='loadFile'" style="padding:35px 0;">
    <label class="label">Load a file</label>
    <div id="file-js-example" class="file has-name">
    <label class="file-label">
      <input @change="selectFile" class="file-input" type="file" name="resume">
      <span class="file-cta">
        <i class="material-icons">attach_file</i>&nbsp;
        <span class="file-label">
          Choose a file…
        </span>
      </span>
      <span class="file-name">
        {{fileSelectedMessage}}
      </span>
    </label>
  </div>
    <button style="margin-top:12px" class="button is-primary" @click.prevent="loadFile">Load file</button>
  </div>

</div>


</template>

<script>
import Artworks from '../../public/artworks-guardian.json';

function downloadTextFile(text, name) {
  const a = document.createElement('a');
  const type = name.split(".").pop();
  a.href = URL.createObjectURL( new Blob([text], { type:`text/${type === "txt" ? "plain" : type}` }) );
  a.download = name;
  a.click();
}

// @ is an alias to /src
export default {
  name: "Collection",
  components: {
  },
  data:function() {
    return {
      artworks: [],
      metadata: {},
      active: "browse",
      URL: "",
      result: "",
      fileSelectedMessage: "No file selected",
      json: "",
      collectionId: 0
    }
  },
  computed: {
  },
  methods: {
    downloadJson() {
      let filename = (this.metadata.filename ? this.metadata.filename : "collection.json")
      downloadTextFile(JSON.stringify({_metadata: this.metadata, data: this.artworks}), filename);
    },
    loadURL() {
      // To test, use : https://api.digitalheritage.fr/artworks-guardian.php

      if(!this.URL) return;
      fetch(this.URL)
        .then(response => response.json())
        .then(json => {
          console.log(json);
          this.artworks=json.data;
          this.metadata=json._metadata;
        });
    },
    loadFile() {
      // If no JSON loaded, silent crash
      if(!this.json) return;
      // Parse the JSON
      let collection = JSON.parse(this.json);
      // Store the JSON instead of the actual collection
      this.artworks=collection.data;
      this.metadata=collection._metadata;
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
      let that=this;
      fr.onload = event => {
        that.json = event.target.result;
      }
      // Do the file read
      fr.readAsText(files.item(0));
    },
    deleteCollection() {
      Artworks.splice(this.collectionId, 1);
      this.$router.push("/");
    }
  },
  created() {
    this.collectionId=(this.$route.params.id ? this.$route.params.id : 0);
    this.artworks=Artworks[this.collectionId].data;
    this.metadata=Artworks[this.collectionId]._metadata;
  }
};
</script>

<style scope>
.card-content {
  height:280px;
}
.card {
  background-size:cover;
  background-position:top center;
  background-repeat:no-repeat;
  width:33%;
  float:left;
}
.card footer {
  background-color:rgba(255,255,255,0.85);
  border-top:none;
  min-height:60px;
}
.card figure.image a {
  height:100%;
  display:inline-block;
  line-height:58px;
  vertical-align: middle;  
}
.card figure.image a img {
  vertical-align: middle;
  display:inline;
}

</style>