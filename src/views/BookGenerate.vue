<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Catalogue raisonné
          </h1>
          <h2 class="subtitle">
            Génération du PDF
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
				<router-link class="navbar-item" :to="'/book/' + current">
					<i class="material-icons">desktop_mac</i> Parcourir
				</router-link>
				<router-link class="navbar-item is-active" :to="'/book-generate/' + current">
					<i class="material-icons">desktop_mac</i> Générer
				</router-link>
				<a class="navbar-item" href="https://floutier.lescollections.fr/gestion/app/plugins/bookCreator/tmp/book_1_with_cover.pdf" target="_blank"><i class="material-icons">desktop_mac</i> Afficher la dernière version générée</a>
			</div>
            <div class="navbar-end">
				
			</div>
          </div>
        </div>
      </nav>

    </section>
    <div class="container" style="padding:20px 0;">
		<iframe src="https://floutier.lescollections.fr/gestion/index.php/bookCreator/Editor/renderSectionsPDF/book/1"
		style="height:600px;width:100%;"></iframe>
	</div>


  </div>
</template>

<script>
	export default {
	  name: "BookGenerate",
	  data: function() {
		return {
		  active: "browse",
      	  current: 0,
		  catalogues: this.$CatalogueSections
		}
	  },
  	  mounted: function() {},
	  created: function() {
		this.current = this.$route.params.id ? this.$route.params.id : 0;
		this.catalogue = this.$CatalogueSections[this.current];
		this.sections = this.catalogue.data;
		//console.log(this.$CatalogueSections[this.$route.params.id]);
	  },
  	  methods: {
	  }
	}
</script>

<style scoped>
#about-body {
  background-position: center 20%;
  background-size: cover;
  min-height: 1500px;
}
.sections-container {
}
.card.section {
	width:20%;
}
.card.section .card-content {
	height:20px;
}
</style>
