<template>
<div class="results">
  <item v-for="item in results" :key="item.year" :item="item"></item>
  <div v-if="isSearching">
      <!-- <p>Počkajte dáta sa načítavajú</p> -->
      <div class="loader"></div>
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
        if (item.geometry) {
          item.geometry.forEach(geometry => {
            map.data.addGeoJson(geometry);
          });
        }
      });
    }
  },
  watch: {
    results: function(newVal, oldVal) {
      this.showResultsOnMap();
    }
  }
};
</script>
