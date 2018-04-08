<template>
   <div class="container-fluid">
      <div class="row" style="max-height: 18vh;">
         <div class="col-12">
            <div class="card my-2">
               <div class="card-block">
                  <div class="card-body">
                     <div class="form-row">
                        <div class="form-group col-8">
                           <input type="text" class="form-control" id="search" v-model="searchTerm" placeholder="IČO/Obec">
                        </div>
                        <div class="form-group col-4">
                           <select class="form-control" id="year" v-model="searchYear">
                              <option v-for="option in _.range(2018, 2007)" :key='option' v-bind:value="option">{{ option }}</option>
                           </select>
                        </div>
                     </div>
                     <div class="form-row">
                       <div class="form-group col-8 mb-0">
                          <label class="radio-inline">
                        <input type="radio" name="optradio" class="mx-1" value="ico" v-model="picked" checked="checked">IČO
                        </label>
                        <label class="radio-inline mx-1">
                        <input type="radio" name="optradio" v-model="picked" value="obec" class="mx-1">Obec
                        </label>
                       </div>
                       <div class="form-group col-4 mb-0">
                         <button type="submit" class="btn btn-primary" @click="search">Vyhľadať</button>
                       </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div style="max-height:80vh; overflow-y: scroll; margin:0;padding:0;">
        <results :results="results" :isSearching="isSearching" :resultsEmpty="resultsEmpty"></results>
      </div>
   </div>
</template>

<script>
export default {
  data: function() {
    return {
      picked: 'ico',
      results: null,
      searchTerm: null,
      searchYear: 2016,
      isSearching: false,
      resultsEmpty: false
    };
  },
  methods: {
    search: function() {
      this.isSearching = true;
      this.resultsEmpty = false;
      this.results = null;
      
      var endpoint = "";
      var endpointParams = {};

      map.data.forEach(function(feature) {
          map.data.remove(feature);
      });

      if(this.picked == "ico"){
        endpoint = "findByIcoAndYear";
        endpointParams = {
            year: this.searchYear,
            ico: this.searchTerm
        }
      } else {
        endpoint = "findByPlace";
        endpointParams = {
            place: this.searchTerm,
            year: this.searchYear,
        }
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
    }
  }
};
</script>
