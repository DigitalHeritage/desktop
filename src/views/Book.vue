<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Book
          </h1>
          <h2 class="subtitle">
            Edit your printed catalogue
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

    <div id="about-body">
      <div class="container" style="padding-top:40px;">
			<iframe style="height:600px; border:1px solid darkblue;width:100%;" src="https://floutier.lescollections.fr/gestion/book"></iframe>
	  </div>
    </div>
  </div>
</template>

<style scoped>
#about-body {
  background-position: center 20%;
  background-size: cover;
  min-height: 1500px;
}
</style>
