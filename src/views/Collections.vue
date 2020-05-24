<template>
  <div class="home">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            DigitalHeritage
          </h1>
          <h2 class="subtitle">
            A collection management app
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
          <router-link class="navbar-item is-active" to="/collection">Browse collections</router-link>
          <router-link class="navbar-item" to="/detail">Add a collection</router-link>
        </div>
        <div class="navbar-end">
        </div>
      </div>
      </div>
      </nav>
    </section>

    <div class="collections-list container" v-for="(collection, key) of collections" v-bind:key="key" v-bind:title="collection">
      <router-link to="/collection/0">
      <div class="card is-one-third">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{collection.metadata.Title}}</p>
              <p class="subtitle is-6">{{collection.metadata.Subtitle}}</p>
            </div>
          </div>

          <div class="content">
            <i>{{collection.metadata.Description.substring(0,114)}}...</i>
          </div>
        </div>
      </div>
      </router-link>
    </div> 
  </div>
</template>

<script>
import Artworks from '../../public/artworks-guardian.json';

export default {
  name: "Collections",
  data: function() {
    return { 
      collections : [
        {
          data: Artworks._metadata, 
          metadata: Artworks._metadata
        }  
      ]
      
    }
  }
};
</script>

<style>
.collections-list {
  padding:40px 0;
}
</style>