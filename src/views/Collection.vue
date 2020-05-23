<template>
<div>
  <div class="card" v-for="(artwork, index) of artworks" v-bind:key="artwork">
    <router-link :to="'/detail/' + index">
    <div class="card-content" :style="{backgroundImage:'url('+artwork.Image+')'}">
      
    </div>
    </router-link>
    <footer class="card-footer">
      <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <router-link :to="'/detail/' + index">
            <img :src="artwork.Image" alt="Placeholder image">
          </router-link >
        </figure>
      </div>
      <div class="media-content">
        <router-link :to="'/detail/' + index">
        <p class="title is-4">{{artwork.Title}}</p>
        <p class="subtitle is-6">{{artwork.Author}}</p>
        </router-link>
      </div>
    </div>
    </footer>
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
      artworks: []
    }
  },
  computed: {
  },
  methods: {
  },
  created() { 
    this.artworks=Artworks;
  }
};
</script>

<style>
.card-content {
  height:400px;
  background-size:contain;
  background-position:center center;
  background-repeat:no-repeat;
}
.card {
  width:33%;
  float:left;
}
</style>