<template>
   <div class="container-fluid">
      <div class="row">
         <div class="col-12">
            <div class="card my-2">
               <div class="card-block">
                  <div class="card-body">
                     <div class="form-row">
                        <div class="form-group col-8">
                           <input type="text" class="form-control" id="search" v-model="searchTerm" placeholder="IČO/Presný názov obce">
                        </div>
                        <div class="form-group col-4">
                           <select class="form-control" id="year" v-model="searchYear">
                              <option v-for="option in _.range(2017, 2008)" :key='option' v-bind:value="option">{{ option }}</option>
                           </select>
                        </div>
                     </div>
                     <div class="form-row">
                       <div class="form-group col-7 mb-0">
                          <label class="radio-inline">
                        <input type="radio" name="optradio" class="mx-1" value="ico" v-model="picked" checked="checked">IČO
                        </label>
                        <label class="radio-inline mx-1">
                        <input type="radio" name="optradio" v-model="picked" value="obec" class="mx-1">Obec
                        </label>
                       </div>
                       <div class="form-group col-4 mb-0 search-info">
                        <button type="submit" class="btn btn-info" @click="show">&nbsp;?&nbsp;</button>&nbsp;
                        <button type="submit" class="btn btn-primary" @click="search">Vyhľadať</button>
                       </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <modal name="info-modal">
        <div class="card-body">
          <h5 class="card-title">Informácie o aplikácii</h5>
          <h2>URL aplikácie sa bude meniť. </h2>
          Táto stránka je len dočasná a bude presunutá na URL, ktorú upresníme.<br><br>
          <p class="card-text">KDMAP vznikla počas udalosti <b>Hackathon - #AllforJan 2018.</b></p>
          <p class="card-text">V prípade poruchy stránky nás kontaktujte na: <b>simko.igor@gmail.com</b>
          Aplikácia je open-source a repozitáre sú dostupné na githube:</p> 
          <a target="_blank" href="https://github.com/AllForJan/kdmap-backend" class="btn btn-primary btn-sm">backend</a>
          <a target="_blank" href="https://github.com/AllForJan/kdmap-frontend" class="btn btn-primary btn-sm">frontend</a>
        </div>
      </modal>
      <div class="results-wrapper">
        <results :results="results" :isSearching="isSearching" :resultsEmpty="resultsEmpty"></results>
      </div>
   </div>
</template>

<script>

export default {
  
  data: function() {
    return {
      showModal: false,
      picked: "ico",
      results: null,
      searchTerm: null,
      searchYear: 2016,
      isSearching: false,
      resultsEmpty: false
    };
  },
  methods: {
    search: function() {
       if(!this.searchTerm || !this.searchYear){
        return;
      }

      this.isSearching = true;
      this.resultsEmpty = false;
      this.results = null;

      var endpoint = "";
      var endpointParams = {};

      initMap();

      if (this.picked == "ico") {
        endpoint = "findByIcoAndYear";
        endpointParams = {
          year: this.searchYear,
          ico: this.searchTerm
        };
      } else {
        endpoint = "findByPlace";
        endpointParams = {
          place: this.searchTerm,
          year: this.searchYear
        };
      }
      axios
        .get(config.api + endpoint, {
          params: endpointParams
        })
        .then(response => {
          this.isSearching = false;

          if (response.data.length) {
            this.results = response.data;
          } else {
            this.resultsEmpty = true;
          }
        });
    },
    show () {
      console.log(this.$modal);
      this.$modal.show('info-modal',{
      });
    },
    hide () {
      this.$modal.hide('info-modal');
    }
  },
  created: function(){
    setTimeout(this.show, 100);
    // this.show();
 },
};
</script>
