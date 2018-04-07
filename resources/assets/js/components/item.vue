<template>
  <div class="item py-3 cursor-pointer" v-on:click="highlightItem">
      <div class="row">
          <div class="col-8">{{ item.kultura }}</div>
          <div class="col-2">{{ item.vymera }}</div>
      </div>
      <div class="row item-detail pl-3" v-show="showDetail">
          <div class="col-12">
              <div>{{ item.ziadatel }}</div>
              <div>{{ item.rok }}</div>
              <div>{{ item.ico }}</div>
              <div>{{ item.diel }}</div>
              <div>{{ item.kultura }}</div>
              <div>{{ item.vymera }}</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      showDetail: false
    };
  },
  props: ["item"],
  methods: {
    highlightItem: function() {
      this.showDetail = !this.showDetail;
      if (this.item.feature.length == 0) {
        return;
      }
      // Zoom
      this.zoom();
      // Change color
      this.changeStyle();
    },
    zoom: function() {
      let latLon = this.createLatLon(
        this.item.feature[0].geometry.coordinates[0][0]
      );
      map.setCenter(latLon);
      map.setZoom(15);
    },
    changeStyle: function() {
      let currentFeature = map.data.getFeatureById(this.item.feature[0].id);
      let color = this.showDetail ? "#bada55" : '#474747';
      let style = {
        strokeWeight: 3,
        strokeColor: color,
        fillColor: color
      };
      map.data.overrideStyle(currentFeature, style);
    },
    createLatLon: function(coordinates) {
      return { lat: coordinates[1], lng: coordinates[0] };
    }
  }
};
</script>
