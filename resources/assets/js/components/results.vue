<template>
  <div class="results">
    <item v-for="item in results" :key="item.year" :item="item"><hr></item>
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
