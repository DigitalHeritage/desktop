<template>
  <div class="home">
    <section class="hero is-primary" :style="{backgroundImage:'url('+artwork.Image+')'}">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ artwork.Title }}
          </h1>
          <h2 class="subtitle">
            {{ artwork.Author }}
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
          <a class="navbar-item" @click="showPrev"><i class="material-icons">keyboard_arrow_left</i></a>
          <a class="navbar-item" @click="active='detail'" :class="{ 'is-active' : active=='detail' }"><i class="material-icons">desktop_mac</i> Affichage détaillé</a>
          <a class="navbar-item" @click="active='modify'" :class="{ 'is-active' : active=='modify' }" ><i class="material-icons">create</i> Modifier</a> 
          <a class="navbar-item" @click="activateJson" :class="{ 'is-active' : active=='json' }" to="/collection"><i class="material-icons">reorder</i> Modifier JSON</a> 
          <a class="navbar-item" to="/detail"><i class="material-icons">photo_library</i> Images associées</a> 
        </div>
        <div class="navbar-end">
          <a class="navbar-item" @click="showNext"><i class="material-icons">keyboard_arrow_right</i></a>
        </div>
      </div>
      </div>
      </nav>
    </section>
        
    <div class="container" v-if="active=='detail'" style="padding:35px 0;">
      <div class="columns is-desktop">
        <div class="column is-one-third"><img :src="image" /></div>
        <div class="column">
          <div v-for="(property, key) in record" style="padding-bottom:6px;" v-bind:key="key" v-bind:title="property">
            <template v-if="property"><strong>{{key}}</strong> {{property}}</template>
          </div>
        </div>
      </div>
    </div>

    <div class="container edit" v-if="active=='modify'" style="padding:35px 0;">
      <div v-for="(property, key) in artwork" style="padding-bottom:6px;" v-bind:key="key" v-bind:title="property">
        <template v-if="key !== 'Description'" ><strong>{{key}}</strong><br/><input v-model="artwork[key]" /></template>
        <template v-else><strong>{{key}}</strong><br/><textarea v-model="artwork[key]"></textarea></template>
      </div>
    </div>

    <div class="container json-edit" v-if="active=='json'" style="padding:35px 0;">
      <textarea v-model="json" placeholder="ajoutez plusieurs lignes"></textarea>
      <button class="button is-success" @click="updateArtworkFromJson">Actualiser</button>
    </div>
  </div>
</template>

<script>
import Artworks from '../../public/artworks-guardian.json';

// @ is an alias to /src
export default {
  name: "Home",
  props: { 
    id: {
      type: String,
      required: false,
    },
  },
  data:function() {
    return {
      current: 0,
      active: "detail",
      json: "",
      artwork: {}
    }
  },
  computed: {
    title() {
      return this.artwork.Title;
    },
    subtitle() {
      return this.artwork.Author;
    },
    record: function() {
      let result=Object.assign({}, this.artwork);
      delete result.Image;
      return result;
    },
    image: function() {
      return this.artwork.Image;
    }
  },
  methods: {
    showNext() {
      if(this.current<(Artworks.data.length - 1)) this.current++;
      this.artwork=Artworks.data[this.current];
    },
    showPrev() {
      if(this.current>0) this.current--;
      this.artwork=Artworks.data[this.current];
    },
    activateJson() {
      this.active='json';
      this.json=JSON.stringify(this.artwork, null, 2);
    },
    updateArtworkFromJson() {
      this.artwork=JSON.parse(this.json);
    },
  },
  created() {
    if(this.id !== undefined) {
      this.current=parseInt(this.id);
    }
    this.artwork=Artworks.data[this.current];
  }
};
</script>

<style>
.hero {
  background-position:center 20%;background-size:cover;
}
.hero-body {
  background-image:url('../assets/grad-to-transparent.png');background-repeat:repeat-x;background-position:top left;
}
.json-edit textarea {
  width:100%;
  height:340px;
  font-family: monospace;
  font-size:14px;
}
.edit input,
.edit textarea {
  width:100%;
  font-family: monospace;
  font-size:14px;
}
.edit textarea {
  height:80px;
}
</style>