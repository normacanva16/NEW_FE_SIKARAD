<template>
    <div id="map" class="map"></div>
</template>

<script>
import L from 'leaflet';
import 'leaflet.markercluster';

export default {
  name: 'Map',
  data() {
    return {
      map: null,
      markerClusterGroup: null
    };
  },
  mounted() {
    // Initialize the map
    this.map = L.map('map').setView([51.505, -0.09], 13);

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 18
    }).addTo(this.map);

    // Create the marker cluster group
    this.markerClusterGroup = L.markerClusterGroup({
      iconCreateFunction: function(cluster) {
        var childCount = cluster.getChildCount();
        var c = ' marker-cluster-';
        if (childCount < 10) {
          c += 'small';
        } else if (childCount < 100) {
          c += 'medium';
        } else {
          c += 'large';
        }
        return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
      }
    });

    // Add some markers to the cluster group
    this.markerClusterGroup.addLayer(L.marker([51.5, -0.09]));
    this.markerClusterGroup.addLayer(L.marker([51.51, -0.1]));
    this.markerClusterGroup.addLayer(L.marker([51.49, -0.05]));
    this.markerClusterGroup.addLayer(L.marker([51.49, -0.08]));

    // Add the marker cluster group to the map
    this.map.addLayer(this.markerClusterGroup);
  }
};
</script>

<style>
  .map{
    height: 575px;
    width: auto;
  }
</style>