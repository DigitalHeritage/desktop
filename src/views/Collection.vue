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
          <a class="navbar-item" :class="{ 'is-active' : active=='browse' }" @click="active = 'browse'">Browse the collection</a>
          <a class="navbar-item" :class="{ 'is-active' : active=='edit' }" @click="active= 'edit'">Edit collection</a>
      </div>
      <div class="navbar-end">
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

  <div class="container edit" v-if="active=='modify'" style="padding:35px 0;">
    <div v-for="(property, key) in artwork" style="padding-bottom:6px;" v-bind:key="key" v-bind:title="property">
      <template v-if="key !== 'Description'" ><strong>{{key}}</strong><br/><input v-model="artwork[key]" /></template>
      <template v-else><strong>{{key}}</strong><br/><textarea v-model="artwork[key]"></textarea></template>
    </div>
  </div>
</div>


</template>

<script>
import Artworks from '../../public/artworks-guardian.json';

// @ is an alias to /src
export default {
  name: "Collection",
  components: {
  },
  data:function() {
    return {
      artworks: [],
      metadata: {},
      active: "browse"
    }
  },
  computed: {
  },
  methods: {
  },
  created() { 
    this.artworks=Artworks.data;
    this.metadata=Artworks._metadata;
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