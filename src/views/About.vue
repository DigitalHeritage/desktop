<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            About
          </h1>
          <h2 class="subtitle">
            DigitalHeritage is brought to you by
            <a href="https://www.ideesculture.com">IdéesCulture</a>.
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
        <img src="../assets/lemon-hat.png" style="width:33%;" />
        <h1 class="is-size-1 has-text-link">Brainjuicing</h1>
        <h2 class="is-size-3 has-text-grey-dark">
          Transforming your lemon hat to pure lemon-aid from 2012.
        </h2>
        <div class="has-text-black">Love from Le Mans, Gautier</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#about-body {
  background-position: center 20%;
  background-size: cover;
  background-image: url("../assets/lemontrees.jpg");
  min-height: 1500px;
}
</style>
