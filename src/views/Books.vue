<template>
  <div>
	<div
      id="loading"
      style="position: absolute;top:0;left:0;right:0;bottom:0;background-color: rgba(0,0,0,0.4);color:white;font-size:60px;z-index:100;line-height: 100vh;text-align: center;display:none;"
    >
      <i class="material-icons rotate" style="font-size:70px;"
        >hourglass_empty</i
      >
    </div>
	
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Catalogue raisonné
          </h1>
          <h2 class="subtitle">
            Préparer un catalogue raisonné papier
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
            <div class="navbar-start"></div>
            <div class="navbar-end"></div>
          </div>
        </div>
      </nav>
    </section>

	<div class="sets-list container">
      <div v-for="(catalogue, key) of catalogues" v-bind:key="key">
        <div @click="redirect('/book/' + key)">
          <div class="card is-one-third">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{{ getTitle(catalogue) }}</p>
                </div>
              </div>

              <div class="content">
                <i>{{ getDescription(catalogue).substring(0, 114) }}</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
	
  </div>
</template>

<script>
	export default {
	  name: "Books",
	  data: function() {
	    return {
		  catalogues: this.$CatalogueSections
		}
	  },
  	  mounted: function() {},
  	  methods: {
		redirect(target) {
			document.getElementById("loading").style.display = "block";
			//console.log(target);
			var self = this;
			var timeouttarget = target;
			setTimeout(function() {
				self.$router.push(timeouttarget);
			}, 50);
		},
		getTitle(catalogue) {
			console.log("catalogue", catalogue);
			if (catalogue._metadata && catalogue._metadata.title) {
				return catalogue._metadata.title;
			} else {
				return catalogue._metadata.idno;
			}
		},
		getDescription(catalogue) {
			if (catalogue._metadata && catalogue._metadata.description) {
				return catalogue._metadata.description;
			} else {
				return "";
			}
		}
	  }
	}
</script>

<style scoped>
#about-body {
  background-position: center 20%;
  background-size: cover;
  min-height: 1500px;
}
</style>
