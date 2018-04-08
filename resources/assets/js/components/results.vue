<template>
  <div class="results">
    <item v-for="item in results" :key="item.year" ref="ref_i" :item="item"><hr></item>
    <div v-if="isSearching">
        <div class="loader my-3"></div>
    </div>
      <div v-if="resultsEmpty">
        <p>Neboli nájdené žiadne výsledky</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["results", "resultsEmpty", "isSearching"],
  methods: {
    showResultsOnMap: function() {
      Object.entries(this.results).forEach(([key, item]) => {
        if (item.feature.length != 0) {
          item.feature.forEach(geometry => {
            map.data.addGeoJson(geometry);
          });
        }
      });
      var th = this;
      map.data.addListener('click', function(event) {
          console.log(event.feature.j);
          th.results.forEach(e => {
            if(e.feature && e.feature.length > 0){
              if(e.feature[0].id === event.feature.j){
                console.log(app);
                app.$refs.ref_i.highlightItem(); //assuming my component has a doSomething() method
              }
            }
          });
          // const item = th.results.find(cd => item.feature[0].id === event.feature.j)
        
          // This works now, still have to loop through the arrays for the multipolygons
        
      });
    }
  },
  watch: {
    results: function(newVal, oldVal) {
      if (newVal) {
        this.showResultsOnMap();
      }
    }
  }
};
</script>
