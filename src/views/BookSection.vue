<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
				<div class="is-pulled-right" v-if="modified">
					<span class="tag is-primary">
						Modifié
					</span>&nbsp;
					<span class="tag is-warning">
						<i class="material-icons">backup</i>
					</span>
				</div>
            <span v-html="section.title"></span>
          </h1>
          <h2 class="subtitle">
			<span v-html="book_title"></span>
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
				<a class="navbar-item" @click="showPrev"><i class="material-icons">keyboard_arrow_left</i></a>
				<a class="navbar-item" @click="showBrowse" :class="{ 'is-active': active === 'browse' }"><i class="material-icons">desktop_mac</i> Voir</a>
				<a class="navbar-item" @click="showEdit" :class="{ 'is-active': active === 'edit' }"><i class="material-icons">edit</i> Editer</a>
				<a class="navbar-item" @click="showHTML" :class="{ 'is-active': active === 'html' }"><i class="material-icons">code</i> Aperçu HTML</a>
				<a class="navbar-item" @click="showPDF" :class="{ 'is-active': active === 'pdf' }"><i class="material-icons">picture_as_pdf</i> PDF</a>
			</div>
            <div class="navbar-end">
				<a class="navbar-item" @click="showNext"><i class="material-icons">keyboard_arrow_right</i></a>
			</div>
          </div>
        </div>
      </nav>
    </section>
    <div class="content container" style="padding:10px 0;" v-if="active === 'browse'">
		<p>
			<span class="tag is-info">Titre</span>&nbsp;
			<span v-html="section.title"></span>
		</p>
		<p>
			<span class="tag is-info">Introduction/résumé</span>&nbsp; 
			{{ section.intro }}
		</p>
		<p>
			<span class="tag is-info">Style</span>&nbsp;
			{{ section.style }}
		</p>
		<p>
			<span class="tag is-info">Contenu</span>&nbsp;
		</p>
		<div style="border:1px solid gray;padding:20px;">
			<v-card-text v-html="compiledMarkdown"></v-card-text>
		</div>
		<p>
			<span class="tag is-info">Représentation</span>&nbsp;
			<span v-if="section.representation_id != 0">{{ section.representation_id }}</span>
		</p>
		<p>
			<span class="tag is-info">Ensemble</span>&nbsp;
			<span v-if="section.set_id != 0">{{ section.set_id }}</span>
		</p>		
    </div>

	<div class="content container" style="padding:10px 0;" v-if="active === 'edit'">
		<div class="field is-horizontal">
			<div class="field-label is-normal">
				<label class="label">Titre</label>
			</div>
			<div class="field-body">
				<div class="field">
				<p class="control">
					<input v-model="section.title" class="input" type="email" placeholder="Recipient email">
				</p>
				</div>
			</div>
		</div>
		<div class="field is-horizontal">
			<div class="field-label is-normal">
				<label class="label">Introduction/résumé</label>
			</div>
			<div class="field-body">
				<div class="field">
				<p class="control">
					<input v-model="section.intro" class="input" type="email" placeholder="Recipient email">
				</p>
				</div>
			</div>
		</div>
		
		<div class="field is-horizontal">
			<div class="field-label is-normal">
				<label class="label">Style</label>
			</div>
			<div class="field-body">
				<div class="field">
				<p class="control">
					<input v-model="section.style" class="input" type="email" placeholder="Recipient email">
				</p>
				</div>
			</div>
		</div>
		
		<div class="field is-horizontal">
			<div class="field-label is-normal">
				<label class="label">Contenu</label>
			</div>
			<div class="field-body">
				<div class="field">
				<p class="control">
					<textarea style="height:500px" v-model="section.content" class="input" type="email" placeholder="Recipient email"></textarea>
				</p>
				</div>
			</div>
		</div>

		<div class="field is-horizontal">
			<div class="field-label is-normal">
				<label class="label">Représentation</label>
			</div>
			<div class="field-body">
				<div class="field">
				<p class="control">
					<input v-model="section.representation_id" class="input" type="email" placeholder="Recipient email">
				</p>
				</div>
			</div>
		</div>
		
		<div class="field is-horizontal">
			<div class="field-label is-normal">
				<label class="label">Ensemble</label>
			</div>
			<div class="field-body">
				<div class="field">
				<p class="control">
					<input v-model="section.set_id" class="input" type="email" placeholder="Recipient email">
				</p>
				</div>
			</div>
		</div>

	</div>
	<div v-if="active === 'html'">
		<iframe :src="'https://floutier.lescollections.fr/gestion/dh_service_catalogueraisonne.php?action=renderSectionHTML&book='+ section.book_id +'&section='+section.booksection_id " style="width:100%; height:calc(100vh - 269px);"></iframe>
	</div>

	<div v-if="active === 'pdf'">
		<iframe :src="'https://floutier.lescollections.fr/gestion/dh_service_catalogueraisonne.php?action=renderSectionPDF&book='+ section.book_id +'&section='+section.booksection_id " style="width:100%; height:calc(100vh - 269px);"></iframe>
	</div>

  </div>
</template>

<script>
	import { marked } from 'marked';

	export default {
	  name: "BookSection",
	  data: function() {
		return {
		  active: "browse",
		  book_index: 0,
		  book_title: "",
		  section_index: 0,
		  catalogues: this.$CatalogueSections,
		  section: {},
		  content: "# text",
		  modified: false
		}
	  },
  	  mounted: function() {},
	  created: function() {
		this.book_index = this.$route.params.book_index ? this.$route.params.book_index : 0;
		this.section_index = this.$route.params.section_index ? this.$route.params.section_index : 0;
		this.catalogue = this.$CatalogueSections[this.book_index];
		this.book_title = this.catalogue._metadata.title;
		this.section = this.catalogue.data[this.section_index];
		this.content = this.section.content;
		//console.log(this.$CatalogueSections[this.$route.params.id]);
	  },
  	  methods: {
		showNext() {
			console.log("saveLocal");
			//this.$parent.$parent.saveLocal();
			if (this.section_index < this.$CatalogueSections[this.book_index].data.length - 1)
				this.section_index++;
			this.section = this.catalogue.data[this.section_index];
			this.content = this.section.content;
		},
		showPrev() {
			console.log("saveLocal");
			//this.$parent.$parent.saveLocal();
			if (this.section_index > 0) this.section_index--;
			this.section = this.catalogue.data[this.section_index];
			this.content = this.section.content;
		},
		showHTML() {
			this.active = "html";
		},
		showEdit() {
			this.active = "edit";
		},
		showPDF() {
			this.active = "pdf";
		},
		showBrowse() {
			this.active = "browse";
		}
	  },
	  computed: {
		compiledMarkdown() {
			return marked.parse(this.content);
	  	}
	  },
	  watch: {
		section: {
			deep: true,
			handler(val) {
				console.log(val);
				console.log("modified");
				this.modified = true;
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
.sections-container {
}
.card.section {
	width:20%;
}
.card.section .card-content {
	height:20px;
}
</style>
