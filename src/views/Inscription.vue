<template>
  <div class="modal" v-bind:class="{ 'is-active': isModalActive }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Création de compte</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <iframe
          src="http://api.digitalheritage.fr/subscribeform"
          style="width:100%;height:70vh;"
        />
      </section>
    </div>
  </div>
</template>

<script>
//import Vue from "vue";

export default {
  name: "Collections",
  data: function() {
    return {
      isModalActive: false
    };
  },
  created: function() {
    this.isModalActive = true;
  },
  methods: {
    closeModal() {
      this.isModalActive = false;
      this.$router.push("/connexion");
    }
  }
};
</script>
