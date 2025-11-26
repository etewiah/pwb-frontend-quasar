<template>
  <div>
    <div
      class="map-regular-section"
      v-if="listingMapMarkers.length > 0"
      style="height: 900px"
    >
      <l-map
        ref="map"
        v-model:zoom="zoom"
        :center="mapCenter"
        style="height: 900px"
        @click="handleMapClick"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
        
        <l-marker
          v-for="(m, index) in listingMapMarkers"
          :key="index"
          :lat-lng="m.position"
          :draggable="isMapDraggable"
          @click="openMarker(m.id)"
        >
          <l-icon
            :icon-url="markerIconUrl"
            :icon-size="[40, 40]"
            :icon-anchor="[20, 40]"
          ></l-icon>
          <l-popup v-if="openedMarkerIds[m.id] === 1">
            <div>{{ m.infoWindowText }}</div>
          </l-popup>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LIcon,
} from "@vue-leaflet/vue-leaflet"

import icon from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import shadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: shadow
})

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon,
  },
  props: {
    singleLatLngDetails: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const zoom = ref(15)
    const map = ref(null)

    return {
      zoom,
      map,
    }
  },
  data() {
    return {
      openedMarkerIds: {},
      markerIconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
    }
  },
  computed: {
    isMapDraggable() {
      return true
    },
    mapCenter() {
      if (this.listingMapMarkers[0] && this.listingMapMarkers[0].position) {
        return this.listingMapMarkers[0].position
      }
      return [0, 9]
    },
    listingMapMarkers() {
      let listingMapMarkers = []
      if (
        this.singleLatLngDetails.latitude &&
        this.singleLatLngDetails.longitude
      ) {
        let infoWindowText = this.singleLatLngDetails.streetAddress || this.singleLatLngDetails.title || "Property Location"
        listingMapMarkers.push({
          id: this.singleLatLngDetails.id,
          position: [
            parseFloat(this.singleLatLngDetails.latitude),
            parseFloat(this.singleLatLngDetails.longitude),
          ],
          infoWindowText: infoWindowText,
        })
        // Auto-open the popup for the marker
        this.openedMarkerIds[this.singleLatLngDetails.id] = 1
      }
      return listingMapMarkers
    },
  },
  methods: {
    handleMapClick(event) {
      // Leaflet click handling - can implement reverse geocoding with Nominatim if needed
      console.log("Map clicked at:", event.latlng)
    },
    closeMarker(id) {
      this.openedMarkerIds[id] = 0
    },
    openMarker(id) {
      this.openedMarkerIds[id] = 1
    },
  },
}
</script>

<style scoped>
/* Fix for Leaflet marker icons not showing correctly */
:deep(.leaflet-marker-icon) {
  margin-left: -20px !important;
  margin-top: -40px !important;
}
</style>
