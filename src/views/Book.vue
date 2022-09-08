<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Catalogue raisonné
          </h1>
          <h2 class="subtitle">
            Catalogue raisonné
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
    <div class="cards-container sections-container" v-if="active === 'browse'">
      <div
        class="card section"
        v-for="(section, index) in sections"
        :key="`${index}`"
      >
        <router-link
          :to="'/booksection/' + section.book_id + '/' + section.booksection_id"
        >
          <div class="card-content"></div>
        </router-link>
        <footer class="card-footer">
          <div class="media">
            <div class="media-content">
              <div class="media-content-inner">
                <router-link
                  :to="
                    '/booksection/' + section.book_id + '/' + section.booksection_id
                  "
                >
					<p class="title is-6">
						{{ section.title }}
					</p>
					<p class="subtitle is-7">{{ section.style }}</p>
                </router-link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>

  </div>
</template>

<script>
	export default {
	  name: "Book",
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
