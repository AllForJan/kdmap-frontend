<template>
  <div class="item cursor-pointer px-4 pt-3 pb-2" v-on:click="highlightItem" v-bind:class="{ active: showDetail }" >
      <div class="row">
          <div class="col-4">{{ item.lokalita }}</div>
          <div class="col-5">{{ item.kultura }}</div>
          <div class="col-3">{{ item.vymera }}</div>
      </div>
      <div class="row item-detail pl-3" v-show="showDetail">
          <div class="col-12">
            <hr>
            <table class="table borderless">
              <tbody>
                <tr>
                  <td>Žiadateľ:</td>
                  <td>{{ item.ziadatel }}</td>
                </tr>
                 <tr>
                  <td>Rok:</td>
                  <td>{{ item.rok }}</td>
                </tr>
                 <tr>
                  <td>IČO:</td>
                  <td>{{ item.ico }}</td>
                </tr>
                 <tr>
                  <td>Diel:</td>
                  <td>{{ item.diel }}</td>
                </tr>
                 <tr>
                  <td>Kultúra:</td>
                  <td>{{ item.kultura }}</td>
                </tr>
                 <tr>
                  <td>Výmera:</td>
                  <td>{{ item.vymera }}</td>
                </tr>
              </tbody>
            </table>
            <hr>
            <div class="text-right">
              <button type="button" class="btn btn-primary btn-success mb-2"><a :href="buildUrl(item.lokalita, item.diel)" target="_blank">Zobraz žiadosť</a></button>
            </div>
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
      let color = this.showDetail ? "#bada55" : '#000000';
      let style = {
        strokeWeight: 3,
        strokeColor: color,
        fillColor: color
      };
      map.data.overrideStyle(currentFeature, style);
    },
    createLatLon: function(coordinates) {
      return { lat: coordinates[1], lng: coordinates[0] };
    },
    buildUrl: function(locality, diel) {
      return "http://www.apa.sk/ziadosti-o-priame-podpory?lokalita=" + locality + "&diel=" + diel +
       "&meno=&ico=&rok=2016&submit=H%C4%BEadaj&navID=624#form2";
    }
  }
};
</script>
