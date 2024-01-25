<template>
  <!-- map -->
  <div class="mt-8">
    <div class="form-continer">
      <form @submit.prevent="search">
        <div class="input-group">
          <div class="form-search">
            <div>
              <div>
                <b-input-group>
                  <div class="input-group">
                    <b-button v-b-toggle.sidebar-filter variant="primary">Filter</b-button>
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></span>
                    </div>
                    <b-form-input v-model="querySearch" type="text" :placeholder="placeholderText"
                      @focus="showMatches = true"></b-form-input>
                    <div class="input-group-append">
                      <b-button variant="light" @focus="showMatches = true" @click="search">Cari</b-button>
                    </div>
                    <!-- <b-button variant="light" @click="showGPSLocation" v-b-tooltip.hover="{ variant: 'info' }" title="Lokasi Anda"><i class="fa-solid fa-location-crosshairs"></i></b-button> -->
                    <div v-if="buttonRute">
                      <b-button variant="light" @click="hapusRute"><i
                          class="fa-solid fa-road-circle-xmark fa-beat"></i></b-button>
                    </div>
                  </div>
                </b-input-group>
              </div>
              <div class="search-list">
                <div v-if="showMatches">
                  <b-list-group v-for="match in matchesData" :key="match.value" @click="searchDataMatch(match)">
                    <b-list-group-item button>
                      <p><b>{{ match.nama }}</b></p>
                      <p class="sm"><small>{{ match.alamat }}</small></p>
                    </b-list-group-item>
                  </b-list-group>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div>
      <b-sidebar v-model="sidebarVisibilityFilter" id="sidebar-filter" sidebar-class="border-right" aria-modal="true" style="z-index: 9999;" width="270px">
        <template #default="{ hide }">
          <div class="px-3 py-2">
            <div>
              <div class="mt-4">
                <b-button class="" variant="light" block @click="hide"
                  style="font-size: 20px; padding: 0; width: 24px; height: 24px">
                  <span style="display: flex; justify-content: center; align-items: center">
                    <i class="fa-solid fa-circle-xmark" style="font-size: 20px;"></i>
                  </span>
                </b-button>
              </div>
              <!-- <b-button class="w-100 mt-2" variant="primary">
                <span style="display: flex; align-items: center">
                  <i class="fa-solid fa-infinity" style="margin-right: 10px;"></i>
                  <span style="flex: 1; text-align: center;">Semua</span>
                </span>
              </b-button> -->
            </div>
            <!-- jenis peta -->
            <b-form-group label="Pilih Jenis Peta">
              <b-form-radio-group v-model="selectedLayer">
                <b-form-radio value="display">Peta Display</b-form-radio>
                <b-form-radio value="satellite">Peta Satelit</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
            <hr />
            <b-form-radio-group>
              <!-- Pos -->
              <div>
                <div>
                  <div class="container">
                    <b-form-checkbox v-model="showLainnya" @change="toggleStatusJabatan"><img :src="LogoLainnya" width="18px" height="auto"
                        alt="Logo Lainnya" class="mr-2"> All Balakpus/Kotama</b-form-checkbox>
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <h5>By Status Jabatan</h5>
                <div class="container">
                  <b-form-checkbox v-model="showJabatanKosong" :disabled="!showLainnya">Jabatan Kosong</b-form-checkbox>
                  <b-form-checkbox v-model="showJabatanKurang1" :disabled="!showLainnya">Jabatan < 1 tahun</b-form-checkbox>
                  <b-form-checkbox v-model="showJabatanDiantara12" :disabled="!showLainnya">Jabatan 1-2 tahun</b-form-checkbox>
                  <b-form-checkbox v-model="showJabatanLebih2" :disabled="!showLainnya">Jabatan > 2 tahun</b-form-checkbox>
                </div>
              </div>
             
              <!-- <h5>By Balakpus / Kotama</h5>
              <div class="container">
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasA">Kodam I BB</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasB">Kodam II Swj</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasC">Kodam III Slw</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Kodam IV Dip</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasA">Kodam V Brw</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasB">Kodam VI Mlw</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasC">Kodam IX Udy</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Kodam XII Tpr</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasA">Kodam XIII Mdk</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasB">Kodam XIV Hsn</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasC">Kodam XVI Ptm</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Kodam XVII Cen</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasA">Kodam XVIII Ksr</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasB">Kodam Jaya</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasC">Kodam IM</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Pussenif</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Pussenkav</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Pussenarmed</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Pussenarhanud</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Pusziad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Kopassus</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Kostrad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Kodiklatad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Disadaad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Dislaikad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Disjarahad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Disjasad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Disinfolahtad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Dislitbangad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Dispsiad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Disbintalad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Dispenad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Ditkumad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Ditkuad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Dittopad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Ditajenad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Rspad GS</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Puskesad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Pusbekangad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Puspalad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Pushubad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Puspenerbad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Pusintelad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Pusterad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Puspomad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Pussansiad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Secapa AD</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Seskoad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Akmil</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Itjenad</b-form-checkbox>
                <b-form-checkbox :disabled="!showRumahSakit" v-model="RumahSakitKelasD">Mabesad</b-form-checkbox>
              </div>   -->

      
             
            </b-form-radio-group>
          </div>
        </template>
      </b-sidebar>
    </div>
    <div>
      <b-sidebar v-model="modalDetail" id="sidebar-right" title="" right shadow width="310px" show>
        <template #default="{ hide }">
          <div class="container">
            <div class="card-body">
              <div class="mt-4">
                <b-button class="ml-auto" variant="light" block @click="hide"
                  style="font-size:20px; padding: 0; width: 24px; height: 24px">
                  <span style="display: flex; justify-content: center; align-items: center;">
                    <i class="fa-solid fa-circle-xmark" style="font-size: 20px;"></i>
                  </span>
                </b-button>
              </div>
              <div v-if="selectedMarker.GroupData === 'DataMDMC'">
                <div>
                 
                  <span v-if="selectedMarker.title === 'Lainnya'">
                    <p class="h3"><b><img :src="LogoLainnya" width="40px" height="auto" alt="Logo Lainnya"> {{
                      selectedMarker.title }}</b></p>
                  </span>
                  
                  
                </div>
                <!-- nama -->
                <div>
                  <p class="h4" style="color: #0000ff; ">{{ selectedMarker.name }}</p>
                </div>
                <!-- alamat -->
                <div>
                  <span>
                    <tr>
                      <th><i class="fa-solid fa-location-crosshairs"></i> </th>
                      <th>
                        <div v-if="selectedMarker.address === null">
                          <p class="">Alamat Belum Input</p>
                        </div>
                        <div v-else>
                          <p>{{ selectedMarker.address }}</p>
                        </div>
                      </th>
                    </tr>
                  </span>
                  
                      <tr>
                        <th><i class="fa-solid fa-triangle-exclamation"></i></th>
                        <div >
                          <th>
                            <p class="">Jabatan Kosong: {{ selectedMarker.jab_kosong }}</p>
                          </th>
                        </div>
                      </tr>
                      <tr>
                      <th><i class="fa-solid fa-hourglass"></i></th>
                      <span>
                        <th>
                          <p>Jabatan 0-1 tahun:</p>
                          <span>
                          <p class="badge badge-success">{{ selectedMarker.jabdibawah1 }}</p>
                        </span>
                        </th>
                      </span>
                    </tr>
                    <tr>
                      <th><i class="fa-solid fa-hourglass"></i></th>
                      <span>
                        <th>
                          <p>Jabatan 1-2 tahun:</p>
                          <span>
                          <p class="badge badge-warning">{{ selectedMarker.jabdiatas1 }}</p>
                        </span>
                        </th>
                      </span>
                    </tr>
                    <tr>
                      <th><i class="fa-solid fa-hourglass"></i></th>
                      <span>
                        <th>
                          <p>Jabatan > 2 tahun:</p>
                          <span>
                          <p class="badge badge-danger">{{ selectedMarker.jabdiatas2 }}</p>
                        </span>
                        </th>
                      </span>
                    </tr>

                </div>
             
                <!-- link and direction -->
                <div>
                  <!-- <b-col class=""><div class='d-flex justify-content-center'><b-button variant="primary" :href='selectedMarker.gmaps' target='_blank'><i class="fa-solid fa-location-dot"></i> Gmaps</b-button></div></b-col> -->
                  <div class='d-flex justify-content-center'>
                    <b-button style="width: 100%" variant="primary" :href='selectedMarker.gmaps' target='_blank'><i
                        class="fa-solid fa-location-dot"></i> Gmaps</b-button>
                  </div>
                  <!-- <b-col class=""><div class='d-flex justify-content-center'><button class="btn btn-outline-primary btn-no-border"  @click="showRoute(selectedMarker)"><i class="fa-solid fa-diamond-turn-right"></i> Direction</button></div></b-col> -->
                </div>
                <!-- button detail -->
                <div class="mt-2">
                  <div class='d-flex justify-content-center'>
                    <button class="btn btn-outline-primary" style="width: 100%"
                      v-on:click="">Detail</button>
                  </div>
                </div>
                <!-- hr border -->
                <hr />
                <!-- lokasi terdekat -->
                <div>
                  <b-row>
                    <b-col>
                      <p>Terdekat Dari Lokasi</p>
                    </b-col>
                  </b-row>
                  <div>
                    <div>
                      <b-button class="mt-2 w-100 text-left" variant="outline-primary" @click="lokasiTerdekatRute1">
                        <div>
                          <span class="medium">
                            <img :src="LogoLainnya" width="18px" height="auto" alt="Logo Lainnya">
                            <b>{{ selectedMarker.tempatDekat1 }}</b>
                          </span>
                          <br>
                          <span class="medium"> {{ selectedMarker.jarakMeter1 }} KM</span>
                        </div>
                      </b-button>
                    </div>
                    <div>
                      <b-button class="mt-2 w-100 text-left" variant="outline-primary" @click="lokasiTerdekatRute2">
                        <div>  
                          <span class="medium">
                            <b><img :src="LogoLainnya" width="18px" height="auto" alt="Logo Lainnya">
                              {{ selectedMarker.tempatDekat2 }}</b>
                          </span>
                          <br>
                          <span class="medium"> {{ selectedMarker.jarakMeter2 }} KM</span>
                        </div>
                      </b-button>
                    </div>
                    <div>
                      <b-button class="mt-2 w-100 text-left" variant="outline-primary" @click="lokasiTerdekatRute3">
                        <div>
                          <span>
                            <b><img :src="LogoLainnya" width="18px" height="auto" alt="Logo Lainnya">
                              {{ selectedMarker.tempatDekat3 }}</b>
                          </span>
                          
                          <br>
                          <span class="medium"> {{ selectedMarker.jarakMeter3 }} KM</span>
                        </div>
                      </b-button>
                    </div>
                    <div>
                      <b-button class="mt-2 w-100 text-left" variant="outline-primary" @click="lokasiTerdekatRute4">
                        <div>
                          <span>
                            <b><img :src="LogoLainnya" width="18px" height="auto" alt="Logo Lainnya">
                              {{ selectedMarker.tempatDekat4 }}</b>
                          </span>
                          <br>
                          <span class="medium"> {{ selectedMarker.jarakMeter4 }} KM</span>
                        </div>
                      </b-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </b-sidebar>
    </div>
    <b-modal v-model="modalsizeImgDetail" size="lg" title="Detail Foto" centered hide-footer>
      <div class="d-flex justify-content-center">
        <div v-if="selectedMarker.img_aksi === null">
          <img
            src="https://st2.depositphotos.com/3904951/8925/v/600/depositphotos_89250312-stock-illustration-photo-picture-web-icon-in.jpg"
            style="max-width: 100%; max-height: 100%;"
          />
        </div>
        <div v-else>
          <img :src="selectedMarker.img_aksi" style="max-width: 100%; max-height: 100%;" />
        </div>
      </div>
    </b-modal>
    <!-- display map -->
    <div id="map" class="mapHome">
      <div id="legend"></div>
    </div>
  </div>
</template>
  
<script>
import router from '@/router';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
// import markerClusterGroup from 'leaflet.markercluster/dist/leaflet.markercluster';
import axios from 'axios';
import swal from 'sweetalert2';
import 'leaflet-gps';
import LogoLainnya from './../../../assets/Icons/LogoLainnya.png';
import LogoLainnyaStroke from './../../../assets/Icons/LogoLainnyaStroke.png';
import Coookie from 'universal-cookie';
const cookies = new Coookie();

export default {
  data() {
    return {
      map: null,
      routingControl: null,
      closestPlace: null,
      closestPlace: "",
      matchesData: [],
      DataLocation: [],
      sidebarVisibilityFilter: false,
      modalDetail: false,
      selectedMarker: {},
      buttonRute: false,
      // closd place
      places: [],
      nearestDataPlace: '',
      // layer sidebar
      sidebarVisible: false,
      baseLayer: null,
      satelliteLayer: null,
      selectedLayer: 'display',
      selectedType: '',
      // lainnya filter layer
      showLainnya: false,
      LainLayer: null,
      LogoLainnya,
      LogoLainnyaStroke,
   
      // near place
      // keyword cari
      querySearch: "",
      showMatchesValue: false,
      // filter by status aksi
      showJabatanKosong: false,
      showJabatanKadaluarsa: false,
      showJabatanKurang1: false,
      showJabatanDiantara12: false,
      showJabatanLebih2: false,
      // tooltip
      tooltips: [],
      // click distance cluster
      ruteMulaiLokasi: null,
      closestDistance: null,
      // filter data sidebar
      detaildataBMKG: false,
      dataGempaBMKG: {},
      sizeImg: { width: 155, height: 155 },
      modalsizeImgDetail: false,
      placeholderText: 'Cari Kotama',
      placeholderIndex: 0,
      placeholders: ['Cari Kotama....', 'Cari Balakpus....'],

    }
  },
  methods: {
    getToken() {
      this.token = cookies.get("token")
    },
    searchDataMatch(match) {
      this.querySearch = `${match.nama}`;
      this.showMatches = false;
      if (this.circle) {
        this.map.removeLayer(this.circle);
      }
      this.circle = L.circle([match.latitude, match.longitude], {
        color: '#e84118',
        fillColor: '#c23616',
        fillOpacity: 0.5,
        radius: 310
      }).addTo(this.map);
      this.map.setView([match.latitude, match.longitude], 8);
      this.querySearch = '';
      let zoomLevel = 8;
      const interval = setInterval(() => {
        zoomLevel += 2;
        if (zoomLevel <= 16) {
          this.map.setZoom(zoomLevel);
        } else {
          clearInterval(interval);
        }
      }, 200);
    },
    search() {
      if (this.filteredLocations.length > 0) {
        let firstLocation = this.filteredLocations[0];
        if (this.circle) {
          this.map.removeLayer(this.circle);
        }
        this.circle = L.circle([firstLocation.latitude, firstLocation.longitude], {
          color: '#e84118',
          fillColor: '#c23616',
          fillOpacity: 0.5,
          radius: 210
        }).addTo(this.map);
        this.map.setView([match.latitude, match.longitude], 8);
        this.querySearch = '';
        let zoomLevel = 8;
        const interval = setInterval(() => {
          zoomLevel += 2;
          if (zoomLevel <= 16) {
            this.map.setZoom(zoomLevel);
          } else {
            clearInterval(interval);
          }
        }, 200);
      } else {
        swal({
          title: "Tidak Ditemukan",
          text: "Data Tidak Dapat Ditemukan",
          type: "error",
          timer: 2000
        });
      }
    },
  
    handlerImgDetail(id) {
      this.modalsizeImgDetail = true;
    },
    showGPSLocation() {
      if (this.marker) {
        this.map.removeLayer(this.marker);
        this.marker = null;
      }
      navigator.geolocation.getCurrentPosition((position) => {
        let startLatLng = L.latLng(position.coords.latitude, position.coords.longitude);
        this.map.setView(startLatLng, 18);
        this.marker = L.marker(startLatLng, {
          icon: L.divIcon({
            html: '<i class="fa-solid fa-user" style="font-size: 18px;">',
            iconSize: [25, 25],
            className: 'fa-icon',
            iconAnchor: [12, 12],
            popupAnchor: [1, -12],
          })
        })
          .addTo(this.map)
        // if (!this.routingControl) {
        //   this.buttonRute = true;
        //   this.routingControl = L.Routing.control({
        //     createMarker: function () { return null; },
        //     waypoints: [
        //       startLatLng,
        //       null
        //     ],
        //     routeWhileDragging: true
        //   }).addTo(this.map);
        // }
      }, (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            swal.fire({
              icon: 'error',
              title: 'Gagal Menemukan Lokasi',
              text: 'User denied the request for Geolocation',
            });
            break;
          case error.POSITION_UNAVAILABLE:
            swal.fire({
              icon: 'error',
              title: 'Gagal Menemukan Lokasi',
              text: 'Location information is unavailable.',
            });
            break;
          case error.TIMEOUT:
            swal.fire({
              icon: 'error',
              title: 'Gagal Menemukan Lokasi',
              text: 'The request to get user location timed out.',
            });
            break;
          default:
            swal.fire({
              icon: 'error',
              title: 'Gagal Menemukan Lokasi',
              text: 'An unknown error occurred.',
            });
            break;
        }
      });
    },
    showRoute(marker) {
      let endLatLng = L.latLng(marker.latitude, marker.longitude);
      if (this.routingControl) {
        swal({
          title: 'Sedang Mencari Rute',
          allowEscapeKey: false,
          allowOutsideClick: true,
          timer: 2000,
          onOpen: () => {
            swal.showLoading();
          }
        });
        this.routingControl.setWaypoints([
          this.marker.getLatLng(),
          endLatLng
        ]);
      }
    },
    filterJabatanKosong() {
      this.filterDataAksiMarker.forEach((marker) => {
        const color = marker.status === 'Terlaksana' ? 'red' : 'blue';
        L.circleMarker([marker.latitude, marker.longitude], {
          radius: 15,
          fillColor: color,
          fillOpacity: 0.7,
          color: 'white',
          weight: 2,
        }).addTo(this.map)
      })
    },
    filterJabatanDibawah1() {
      this.filterDataAksiMarker.forEach((marker) => {
        const color = marker.status === 'Terlaksana' ? 'red' : 'green';
        L.circleMarker([marker.latitude, marker.longitude], {
          radius: 15,
          fillColor: color,
          fillOpacity: 0.7,
          color: 'white',
          weight: 2,
        }).addTo(this.map)
      })
    },
    filterJabatanDiatas1() {
      this.filterDataAksiMarker.forEach((marker) => {
        const color = marker.status === 'Terlaksana' ? 'red' : 'yellow';
        L.circleMarker([marker.latitude, marker.longitude], {
          radius: 15,
          fillColor: color,
          fillOpacity: 0.7,
          color: 'white',
          weight: 2,
        }).addTo(this.map)
      })
    },
    filterJabatanDiatas2() {
      this.filterDataAksiMarker.forEach((marker) => {
        const color = marker.status === 'Terlaksana' ? 'red' : 'red';
        L.circleMarker([marker.latitude, marker.longitude], {
          radius: 15,
          fillColor: color,
          fillOpacity: 0.7,
          color: 'white',
          weight: 2,
        }).addTo(this.map)
      })
    },
    closeDropdown() {
      this.showMatches = true;
    },
    lokasiTerdekatRute1() {
      if (this.routingControl) {
        this.map.removeControl(this.routingControl);
        this.routingControl = null;
      }
      if (this.marker) {
        this.map.removeLayer(this.marker);
        this.marker = null;
      }
      swal({
        title: 'Sedang Mencari Rute',
        allowEscapeKey: false,
        allowOutsideClick: true,
        timer: 2000,
        onOpen: () => {
          swal.showLoading();
        }
      });
      const latLngTempatTerdekat1 = L.latLng(this.selectedMarker.tempatTerdekatJarak1.split(","));
      this.buttonRute = true;
      this.routingControl = L.Routing.control({
        waypoints: [
          L.latLng(this.ruteMulaiLokasi),
          latLngTempatTerdekat1
        ],
        lineOptions: {
          styles: [
            { color: '#00b0ff', opacity: 0.7, weight: 5 }
          ]
        },
        addWaypoints: false,
        extendToWaypoints: true,
        collapsible: true,
        createMarker: function () { return null; }
      }).addTo(this.map);
      this.modalDetail = false;

    },
    lokasiTerdekatRute2() {
      if (this.routingControl) {
        this.map.removeControl(this.routingControl);
        this.routingControl = null;
      }
      if (this.marker) {
        this.map.removeLayer(this.marker);
        this.marker = null;
      }
      swal({
        title: 'Sedang Mencari Rute',
        allowEscapeKey: false,
        allowOutsideClick: true,
        timer: 2000,
        onOpen: () => {
          swal.showLoading();
        }
      });
      const latLngTempatTerdekat2 = L.latLng(this.selectedMarker.tempatTerdekatJarak2.split(","));
      this.buttonRute = true;
      this.routingControl = L.Routing.control({
        waypoints: [
          L.latLng(this.ruteMulaiLokasi),
          latLngTempatTerdekat2
        ],
        lineOptions: {
          styles: [
            { color: '#00b0ff', weight: 3 }
          ]
        },
        addWaypoints: false,
        extendToWaypoints: true,
        collapsible: true,
        createMarker: function () { return null; }
      }).addTo(this.map);
      this.modalDetail = false;

    },
    lokasiTerdekatRute3() {
      if (this.routingControl) {
        this.map.removeControl(this.routingControl);
        this.routingControl = null;
      }
      if (this.marker) {
        this.map.removeLayer(this.marker);
        this.marker = null;
      }
      swal({
        title: 'Sedang Mencari Rute',
        allowEscapeKey: false,
        allowOutsideClick: true,
        timer: 2000,
        onOpen: () => {
          swal.showLoading();
        }
      });
      const latLngTempatTerdekat3 = L.latLng(this.selectedMarker.tempatTerdekatJarak3.split(","));
      this.buttonRute = true;
      this.routingControl = L.Routing.control({
        waypoints: [
          L.latLng(this.ruteMulaiLokasi),
          latLngTempatTerdekat3
        ],
        lineOptions: {
          styles: [
            { color: '#00b0ff', opacity: 0.7, weight: 5 }
          ]
        },
        addWaypoints: false,
        extendToWaypoints: true,
        collapsible: true,
        createMarker: function () { return null; }
      }).addTo(this.map);
      this.modalDetail = false;

    },
    hapusRute() {
      if (this.routingControl) {
        this.map.removeControl(this.routingControl);
        this.routingControl = null;
      }
      this.buttonRute = false;
    },
    toggleStatusJabatan() {
      if (this.showLainnya) {
        this.showJabatanKosong = false;
        this.showJabatanKurang1 = false;
        this.showJabatanDiantara12 = false;
        this.showJabatanLebih2 = false;
      }
    },
    onClickCloseSidebar() {
      this.sidebarVisibilityFilter = false;
      this.modalDetail = false;
    },
  },

  mounted() {
    let token = cookies.get("token");
    if (!token) {
      swal({
        title: "Gagal",
        text: "Mohon Login Terlebih Dahulu",
        type: "warning",
        timer: 2000,
      });
      this.$router.push("/panel")
    }

    this.map = L.map('map', {
      zoomControl: false, // disable default zoom control
    }).setView([-0.9085086842426627, 118.1511063353415], 5);
    this.baseLayer = L.tileLayer('https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
      attribution: 'SIKARAD',
      minZoom: 0,
      maxZoom: 22,
      subdomains: 'abcd',
      accessToken: `${process.env.VUE_APP_JAWG}`
    }).addTo(this.map);
    this.satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'SIKARAD',
      maxZoom: 18
    });

    this.LainLayer = L.layerGroup();
    this.baseLayer.addTo(this.map);
    this.baseLayerVisibility = true;
    this.satelliteLayerVisibility = false;
    this.markerClusterGroup = L.layerGroup();

    axios.get(`${process.env.VUE_APP_URL}dashboard/peta`)
      .then(response => {
        let DataLocation = response.data.data.content;
        this.DataLocation = response.data.data.content;
        this.map.addLayer(this.LainLayer);

        DataLocation.forEach(marker => {
          let map = L.marker([marker.latitude, marker.longitude]);
   
            map.setIcon(L.divIcon({
              // html: '<i class="fa-solid fa-house-flag" style="font-size: 20px; color: #4F8DF4;  -webkit-text-stroke: 1px #0f60e8; text-stroke: 1px black;">',
              html: `<img src="${this.LogoLainnyaStroke}" width="25px" height="25px" alt="">`,
              iconSize: [20, 20],
              className: 'fa-icon',
              iconAnchor: [12, 12],
              popupAnchor: [1, -12],
            }));
            this.LainLayer.addLayer(map);
            map.on('click', e => {
              this.ruteMulaiLokasi = e.latlng;
              let closestPlaces = [];
              let closestDistance = [];
              this.DataLocation.forEach(DataMarkerDistance => {
                let distance = e.latlng.distanceTo(L.latLng(DataMarkerDistance.latitude, DataMarkerDistance.longitude));
                if (distance !== 0) {
                  closestDistance.push(distance);
                  closestPlaces.push(DataMarkerDistance);
                }
              });
              let sortedDistances = [...closestDistance].sort((a, b) => a - b).slice(0, 4);
              let namaTempatTerdekat = [];
              sortedDistances.forEach((distance, index) => {
                let marker = closestPlaces[closestDistance.indexOf(distance)];
                namaTempatTerdekat.push(marker.nama);
              });
              let namaTempatDekat = {
                place1: closestPlaces[closestDistance.indexOf(sortedDistances[0])].nama,
                place2: closestPlaces[closestDistance.indexOf(sortedDistances[1])].nama,
                place3: closestPlaces[closestDistance.indexOf(sortedDistances[2])].nama,
                place4: closestPlaces[closestDistance.indexOf(sortedDistances[3])].nama,
              };
              // Sort the distances and take the 3 closest places
              this.modalDetail = true;
              this.selectedMarker = {
                GroupData: 'DataMDMC',
                uuid: "" + marker.id + "",
                title: '' + marker.type + '',
                name: '' + marker.nama + '',
                personel: '' + marker.jumlah_relawan + '',
                address: "" + marker.alamat + "",
                gmaps: "" + marker.url_gmaps + "",
                jab_kosong: "" + marker.jab_kosong + "",
                jabdibawah1: "" + marker.jabdibawah1 + "",
                jabdiatas1: "" + marker.jabdiatas1 + "",
                jabdiatas2: "" + marker.jabdiatas2 + "",
                latitude: "" + marker.latitude + "",
                longitude: "" + marker.longitude + "",
                tempatDekat1: "" + namaTempatDekat.place1 + "",
                tempatDekat2: "" + namaTempatDekat.place2 + "",
                tempatDekat3: "" + namaTempatDekat.place3 + "",
                tempatDekat4: "" + namaTempatDekat.place4 + "",
                tempatDekaticon1: "" + namaTempatDekat.icon1 + "",
                tempatDekaticon2: "" + namaTempatDekat.icon2 + "",
                tempatDekaticon3: "" + namaTempatDekat.icon3 + "",
                tempatDekaticon4: "" + namaTempatDekat.icon4 + "",
                jarakMeter1: "" + (sortedDistances[0] / 1000).toFixed(2) + "",
                jarakMeter2: "" + (sortedDistances[1] / 1000).toFixed(2) + "",
                jarakMeter3: "" + (sortedDistances[2] / 1000).toFixed(2) + "",
                jarakMeter4: "" + (sortedDistances[3] / 1000).toFixed(2) + "",
                tempatTerdekatJarak1: "" + closestPlaces.find(place => place.nama === namaTempatDekat.place1).latitude + "," + closestPlaces.find(place => place.nama === namaTempatDekat.place1).longitude,
                tempatTerdekatJarak2: "" + closestPlaces.find(place => place.nama === namaTempatDekat.place2).latitude + "," + closestPlaces.find(place => place.nama === namaTempatDekat.place2).longitude,
                tempatTerdekatJarak3: "" + closestPlaces.find(place => place.nama === namaTempatDekat.place3).latitude + "," + closestPlaces.find(place => place.nama === namaTempatDekat.place3).longitude,
                tempatTerdekatJarak4: "" + closestPlaces.find(place => place.nama === namaTempatDekat.place4).latitude + "," + closestPlaces.find(place => place.nama === namaTempatDekat.place4).longitude,
              };
            });

          this.map.on('zoomend', () => {
            if (this.map.getZoom() >= 16) {
              if (this.tooltips.length === 0) {
                for (var i = 0; i < this.DataLocation.length; i++) {
                  var marker = this.DataLocation[i];
                  var tooltip = L.tooltip({
                    permanent: true,
                    direction: 'top'
                  })
                    .setContent('<b>' + marker.nama + '</b>')
                    .setLatLng([marker.latitude, marker.longitude])
                    .addTo(this.map);
                  this.tooltips.push(tooltip)
                }
              }
            } else {
              for (var i = 0; i < this.tooltips.length; i++) {
                var tooltip = this.tooltips[i];
                this.map.removeLayer(tooltip);
              }
              this.tooltips = [];
            }
          })
        });
      });

    const customIcon = L.divIcon({
      html: '<i class="fa-solid fa-bullseye fa-beat" style="color: #ff0000; font-size: 18px;"></i>',
      iconSize: [20, 20],
      className: 'fa-icon',
      iconAnchor: [12, 12],
      popupAnchor: [1, -12],
    });

    this.legend = L.control({ position: 'bottomleft' });
    this.legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend-container');
      var labels = ['<strong>Legenda</strong>'];
      labels.push(
        '<img class="ml-2" src="https://cdn-icons-png.flaticon.com/512/3046/3046360.png" width="18px" height="auto" alt="Logo Lainnya"> Kotama/Balakpus '
      );
      div.innerHTML += labels.join('<br>');
      return div;
    };
    this.legend.addTo(this.map);
    this.baseLayer.addTo(this.map)
    this.showLainnya = true;
    this.filterDataAksi();
    this.filterJabatanKosong();
    this.filterJabatanDibawah1();
    this.filterJabatanDiatas1();
    this.filterJabatanDiatas2()
    this.map.on('click', this.onClickCloseSidebar);

  },

  watch: {
    // filter search location
    querySearch(value) {
      this.matchesData = this.filteredLocations;
    },
    selectedLayer(newLayer, oldLayer) {
      if (newLayer !== oldLayer) {
        if (newLayer === 'display') {
          this.baseLayer.addTo(this.map)
          this.satelliteLayer.removeFrom(this.map)
        } else if (newLayer === 'satellite') {
          this.baseLayer.removeFrom(this.map)
          this.satelliteLayer.addTo(this.map)
        }
      }
    },

    showLainnya(newValue) {
      if (this.LainLayer) {
        if (newValue) {
          this.LainLayer.addTo(this.map);
        } else {
          this.LainLayer.removeFrom(this.map);
        }
      }
    },
    showJabatanKosong(newValue) {
      this.map.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
          this.map.removeLayer(layer);
        }
      });
      this.filterJabatanKosong();
    },
    showJabatanKadaluarsa(newValue) {
      this.map.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
          this.map.removeLayer(layer);
        }
      });
      this.filterDataAksi();
    },
    showJabatanKurang1(newValue) {
      this.map.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
          this.map.removeLayer(layer);
        }
      });
      this.filterJabatanDibawah1();
    },
    showJabatanDiantara12(newValue) {
      this.map.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
          this.map.removeLayer(layer);
        }
      });
      this.filterJabatanDiatas1();
    },
    showJabatanLebih2(newValue) {
      this.map.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
          this.map.removeLayer(layer);
        }
      });
      this.filterJabatanDiatas2();
    },


  },

  computed: {
    // filter by name as filterlocation using (match)
    filteredLocations() {
      return this.DataLocation.filter(location => {
        return location.nama.toLowerCase().includes(this.querySearch.toLowerCase());
      });
    },
    showMatches: {
      get() {
        return this.querySearch.length > 0 && this.matchesData.length > 0;
      },
      set(value) {
        this.showMatchesValue = value;
      },
    },
    
    filterDataAksiMarker() {
      return this.DataLocation.filter((marker) => {
        // NAMBAHIN KONDISI DISINI
        return (this.showJabatanKosong && marker.jab_kosong > 0) ||
          (this.showJabatanKurang1 && marker.jabdibawah1 > 0) ||
          (this.showJabatanDiantara12 && marker.jabdiatas1 > 0) ||
          (this.showJabatanLebih2 && marker.jabdiatas2 > 0)
      })
    },
  },
  
}
</script>

<style>
.mapHome {
  height: 85vh;
  width: auto;
  position: relative;
}

.legend-background {
  background-color: #fff;
  padding: 10px;
}

.legend-container {
  padding: 10px;
  margin: 10px;
  background-color: whitesmoke;
  border-radius: 8px;
}

.form-body {
  display: flex;
  justify-content: left;
  align-items: left;
}

.form-search {
  position: absolute;
  top: 5px;
  left: 0px;
  display: flex;
  justify-content: left;
  align-items: left;
  margin-left: 5px;
  margin-top: 5px;
  z-index: 999;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.4);
}

.search-list {
  position: absolute;
  width: 100%;
}

.search-list ul li:hover {
  background-color: lightgray;
}

.sidebar-toggle-button {
  position: absolute;
  top: 25px;
  right: 50px;
  display: flex;
  justify-content: right;
  align-items: right;
  margin-left: 50px;
  z-index: 999;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.4);
}

th {
  padding: 5px;
}

.btn-no-border {
  border: none;
}

.b-sidebar-left {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
}

.checkbox-container {
  max-height: 150px;
  /* Set the maximum height of the container */
  overflow-y: scroll;
  /* Enable the scroll bar */
}

.b-sidebar {
  z-index: 1000 !important;
}
</style>