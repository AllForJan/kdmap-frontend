<template>
 <div class="col-4">
    <div class="row">
        <div class="col-12">
            <div class="form-row mt-3">
                <div class="form-group col-8">
                    <input type="text" class="form-control" id="search" v-model="searchTerm" placeholder="IČO">
                </div>
                <div class="form-group col-2">
                    <select class="form-control" id="year" v-model="searchYear">
                        <option v-for="option in _.range(2007, 2018)" :key='option' v-bind:value="option">{{ option }}</option>
                    </select>
                </div>
                <div class="col-2">
                    <button type="submit" class="btn btn-primary" @click="search">Go</button>
                </div>
            </div>
        </div>
    </div>
    <results :results="results" :isSearching="isSearching" :resultsEmpty="resultsEmpty"></results>
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
