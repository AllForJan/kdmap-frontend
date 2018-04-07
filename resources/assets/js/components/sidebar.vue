<template>
 <div class="col-3">
    <div class="row">
        <div class="col-12">
            <div class="card mt-2 mb-3">
              <div class="card-block">
                <div class="card-header"><h5>Vyhľadávanie</h5></div>
                <div class="card-body">
                  <div class="form-row">
                    <div class="form-group col-8">
                        <input type="text" class="form-control" id="search" v-model="searchterm" placeholder="IČO/Obec">
                    </div>
                    <div class="form-group col-4">
                        <select class="form-control" id="year" v-model="searchyear">
                            <option v-for="option in _.range(2018, 2007)" :key='option' v-bind:value="option">{{ option }}</option>
                        </select>
                    </div>
                  </div>
                <div>
                  <label class="radio-inline">
                    <input type="radio" name="optradio" class="mx-1" checked="checked">IČO
                  </label>
                  <label class="radio-inline mx-1">
                    <input type="radio" name="optradio" class="mx-1">Obec
                  </label>
                </div>
                  <div>
                    <button type="submit" class="btn btn-primary" @click="search">Vyhľadať</button>
                  </div>
                </div>
              </div>   
            </div> 
        </div>
    </div>
        <div class="card mt-2 mb-4">
          <div class="card-block">
            <div class="card-header"><h5>Výsledky</h5></div>
            <div class="card-body">
            <results :results="results" :isSearching="isSearching" :resultsEmpty="resultsEmpty"></results>
             </div>
          </div>
        </div>
    
</div>
</template>

<script>
export default {
  data: function() {
    return {
      results: null,
      searchTerm: null,
      searchYear: null,
      isSearching: false,
      resultsEmpty: false
    };
  },
  methods: {
    search: function() {
      this.isSearching = true;
      this.resultsEmpty = false;
      this.results = null;
      this.api = "http://kdmap-api.test/api/";

      axios
        .get(this.api + "search", {
          params: {
            year: this.searchYear,
            ico: this.searchTerm
          }
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
