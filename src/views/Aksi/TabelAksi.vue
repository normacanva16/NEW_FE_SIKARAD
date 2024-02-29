<template>
  <ContentWrapper>
    <div class="content-heading">
      <div>Data Personel</div>
    </div>
    <div class="container-fluid">
      <!-- DATATABLE DEMO 2-->

      <div>
        <b-modal
        id="modal-detail-employee"
        ref="modal-detail-employee"
        title="Detail Personel"
        hide-footer
        size="md"
        @hidden="resetField()"
      >
        <form @submit.prevent="">
          <div class="clearfix" v-if="loadingCreate === true">
            <b-spinner class="float-right" label="Floated Right"></b-spinner>
          </div>
          <b-row>
            <b-col>
              <b-row class="my-1">
                  <b-col sm="3">
                    <label for="input-none">KOTAMA / BALAKPUS:</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                  id="kotama_balakpus"
                  v-model="kotama_balakpus"
                  readonly
                ></b-form-input>
                  </b-col>
              </b-row>
              <b-row class="my-1">
                  <b-col sm="3">
                    <label for="input-none">SATUAN:</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                  id="satuan"
                  v-model="satuan"
                  readonly
                ></b-form-input>
                  </b-col>
              </b-row>

              <b-row class="my-1">
                  <b-col sm="3">
                    <label for="input-none">KODE JABATAN:</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                  id="kode_jabatan"
                  v-model="kode_jabatan"
                  readonly
                ></b-form-input>
                  </b-col>
              </b-row>

              <b-row class="my-1">
                  <b-col sm="3">
                    <label for="input-none">NAMA:</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                  id="nama"
                  v-model="nama"
                  readonly
                ></b-form-input>
                  </b-col>
              </b-row>

              <b-row class="my-1">
                  <b-col sm="3">
                    <label for="input-none">PANGKAT:</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                  id="pangkat"
                  v-model="pangkat"
                  readonly
                ></b-form-input>
                  </b-col>
              </b-row>

              <b-row class="my-1">
                  <b-col sm="3">
                    <label for="input-none">TGL LAHIR:</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                  id="tgl_lahir"
                  v-model="tgl_lahir"
                  readonly
                ></b-form-input>
                  </b-col>
              </b-row>

              <b-row class="my-1">
                  <b-col sm="3">
                    <label for="input-none">KORPS:</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                  id="korps"
                  v-model="korps"
                  readonly
                ></b-form-input>
                  </b-col>
              </b-row>

              <b-row class="my-1">
                  <b-col sm="3">
                    <label for="input-none">NRP:</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                  id="nrp"
                  v-model="nrp"
                  readonly
                ></b-form-input>
                  </b-col>
              </b-row>

              <b-row class="my-1">
                  <b-col sm="3">
                    <label for="input-none">JABATAN:</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                  id="jabatan"
                  v-model="jabatan"
                  readonly
                ></b-form-input>
                  </b-col>
              </b-row>

              <b-row class="my-1">
                  <b-col sm="3">
                    <label for="input-none">TMT JABATAN:</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                  id="tmt_jabatan"
                  v-model="tmt_jabatan"
                  readonly
                ></b-form-input>
                  </b-col>
              </b-row>
              
              <b-row class="my-1">
                  <b-col sm="3">
                    <label for="input-none">ABIT:</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                  id="abit"
                  v-model="abit"
                  readonly
                ></b-form-input>
                  </b-col>
              </b-row>

              <b-row class="my-1">
                  <b-col sm="3">
                    <label for="input-none">TINGKAT JABATAN:</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                  id="tingkat_jabatan"
                  v-model="tingkat_jabatan"
                  readonly
                ></b-form-input>
                  </b-col>
              </b-row>

              <b-row class="my-1">
                  <b-col sm="3">
                    <label for="input-none">DAFUKAJ:</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                  id="dafukaj"
                  v-model="dafukaj"
                  readonly
                ></b-form-input>
                  </b-col>
              </b-row>

              <b-row class="my-1">
                  <b-col sm="3">
                    <label for="input-none">MASA JABATAN:</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                  id="masa_jabatan"
                  v-model="masa_jabatan"
                  readonly
                ></b-form-input>
                  </b-col>
              </b-row>
              
            </b-col>
          </b-row>
        </form>
      </b-modal>
      </div>

      <div>
        <b-modal id="modal" ref="modal" :title="title" hide-footer>
          <b-row>
            <b-col class="container-body text-center w-6">
              <b-button class="button-border">
                <h1><i class="fa-solid fa-cloud-arrow-up text-warp"></i></h1>
                <h2 class="text-warp">Import</h2>
                <p class="text-warp">Tambah data berformat .XLSX</p>
              </b-button>
            </b-col>
            <b-col class="container-body text-center w-6">
              <b-button class="button-border" id="show-btn" @click="handleShowModalInputManual()">
                <h1><i class="fa-solid fa-pen-to-square text-warp"></i></h1>
                <h2 class="text-warp">Manual</h2>
                <p class="text-warp">Tambah Secara Manual</p>
              </b-button>
            </b-col>
          </b-row>
        </b-modal>
      </div>

      <div>
        <b-modal
    v-model="modalShow"
    hide-footer
    @hidden="resetField()"
    :title="titleModalManual"
    scrollable
  > 
    <div class="mt-1 mb-3 col-sm-12 d-flex">
      <b-form-input
        v-model="katakunci"
        placeholder="Masukkan keyword"
        @keydown.enter="onPressEnterCari"
      ></b-form-input>
      <!-- <b-button @click="handleClickCari" variant="primary">Cari</b-button> -->
    </div>

    <form @submit.prevent="submitForm">
      <div class="clearfix" v-if="loadingCreate === true">
        <b-spinner class="float-right" label="Floated Right"></b-spinner>
      </div>

      <b-row v-for="(item, index) in filteredForms" :key="index">
        <b-col>
          <b-form-group :label="item.text" :label-for="'file_' + index">
            <div class="d-flex align-items-center justify-content-between">
              <b-form-file
                :id="'file_' + index"
                v-model="file"
                @input="updateSelectedIndex(index)"
                placeholder="Masukkan file"
                :disabled="item.value === 'true' || (file !== '' && index !== selectedIndex)"
              ></b-form-file>

              <!-- Conditionally render the button or icon based on item.value -->
              <template v-if="item.value === 'true'">
                <i class="fa-solid fa-check text-success ml-3"></i>
              </template>
              <template v-else>
                <b-button class="ml-3" type="submit" variant="primary" :disabled="loadingCreate || (file !== '' && index !== selectedIndex)" @click="updateCode(item.code)">
                  Submit
                </b-button>
              </template>
            </div>

            <div v-if="item.value === 'false'">
                <b-form-text class="text-danger" v-if="errorFile && item.value === 'false' && file === ''">
                  File Wajib Diisi!
                </b-form-text>
                <p class="mt-2 text-dark">Format File: Excel</p>
            </div>
            <div v-else>
                <p class="mt-2 text-dark">Last Update: {{ item.last_updated_date }}</p>
            </div>
          </b-form-group>
        </b-col>
      </b-row>
    </form>
  </b-modal>
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
            </div>

            <div>
              <b-row class="mt-3">
              <b-col sm="12">
                <label for=""
                  ><h4><i class="fa-solid fa-people-group"></i> Data Personel</h4></label
                >
                <b-form-group label="KOTAMA / BALAKPUS" label-for="tipe_aksi">
                  <multiselect id="kotama" v-model="kotama" :options="optionKotama" :close-on-select="true" :clear-on-select="false" placeholder="PILIH KOTAMA/BALAKPUS" label="text" track-by="value" :show-labels="false"> </multiselect>
                </b-form-group>
                <b-form-group label="MASA JABATAN" label-for="tipe_aksi">
                  <multiselect id="masa_jabatan" v-model="masa_jabatan" :options="optionMasaJabatan" :close-on-select="true" :clear-on-select="false" placeholder="PILIH MASA JABATAN" label="text" track-by="value" :show-labels="false"> </multiselect>
                </b-form-group>
                <b-form-group label="PANGKAT" label-for="tipe_aksi">
                  <multiselect id="pangkat" v-model="pangkat" :options="optionPangkat" :close-on-select="true" :clear-on-select="false" placeholder="PILIH PANGKAT" label="text" track-by="value" :show-labels="false"> </multiselect>
                </b-form-group>
                <b-form-group label="KORPS" label-for="tipe_aksi">
                  <multiselect id="korps" v-model="korps" :options="optionKorps" :close-on-select="true" :clear-on-select="false" placeholder="PILIH KORPS" label="text" track-by="value" :show-labels="false"> </multiselect>
                </b-form-group>
              </b-col>
            </b-row>

            <b-button type="submit" variant="primary" class="mt-5 ml-4" @click="getData">Cari</b-button>
            <b-button type="submit" variant="primary" class="mt-5 ml-5" @click="resetSearch">Batal</b-button>


            </div>

            
          </div>
        </template>
      </b-sidebar>
    </div>

      <div class="card mt-3">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center flex-wrap">
          <div v-if="isAdmin">
            <b-button
                  variant="primary"
                  class="ml-3 btn-sm w-100"
                  @click="handleShowModal"
                  :disabled="uploadInProgress"
                  ><i class="fa fa-upload" aria-hidden="true"></i> Upload Data</b-button
                >
          </div>
          <div v-else></div>
          <div>
          <b-button class="ml-4 btn-sm w-20" variant="success" @click="alertDownloadAksi()">
            <i class="fa-solid fa-download" aria-hidden="true"></i> Download
          </b-button>
        </div>
                <!-- Tombol Hapus -->
          <div v-if="isAdmin">
            <b-button class="ml-3 btn-sm w-20" variant="danger" @click="alertAksi()">
              <i class="fas fa-trash-alt"></i> Hapus
            </b-button>
          </div>
          <div v-else></div>
        </div>
          <!-- <div>
            <b-button
                  variant="primary"
                  class="ml-3 btn-sm w-100"
                  @click="handleShowModal"
                  >Download Data</b-button
                >
          </div> -->
          <div>
            <!-- <div class="mt-3 col-sm-12 d-flex">
              <b-button @click="handleClickSearch" variant="primary">Filter</b-button>
              <b-form-input v-model="keyword" placeholder="Masukkan keyword" @keydown.enter="onPressEnterSearch"></b-form-input>
            </div> -->
            <div>
                <b-input-group>
                  <div class="input-group">
                    <b-button v-b-toggle.sidebar-filter variant="primary">Filter</b-button>
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></span>
                    </div>
                    <b-form-input v-model="keyword" placeholder="Masukkan keyword" @keydown.enter="onPressEnterSearch"></b-form-input>
                    <div class="input-group-append">
                      <b-button variant="light" @click="handleClickSearch">Cari</b-button>
                    </div>
                  </div>
                </b-input-group>
              </div>
          </div>
        </div>

        <div class="card-body">
          <div>
            <h4>Semua Data Personel</h4>
            <ve-table id="tableAksi" :columns="columns" :table-data="DataAksi" :cell-style-option="cellStyleOption" :border-x="true" :border-y="true" :scroll-width="600" />
            <div v-show="DataAksi.length === 0" class="empty-data">Tidak ada data...</div>

            <div class="table-pagination">
              <ve-pagination :total="totalCount" :page-index="pageIndex" :page-size="pageSize" @on-page-number-change="pageNumberChange" @on-page-size-change="pageSizeChange" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <TabelAksimu /> -->
  </ContentWrapper>
</template>

<script>
import router from "@/router";
import axios from "axios";
import swal from "sweetalert2";
import VueEasytable from "vue-easytable";
import Vue from "vue";
import "vue-easytable/libs/theme-default/index.css";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import Multiselect from "vue-multiselect";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
// import TabelAksimu from "./TabelAksimu.vue";

Vue.use(VueEasytable);

export default {
  components: {
    VueEasytable,
    DatePicker,
    Multiselect,
    // TabelAksimu,
  },
  data() {
    return {
      isAdmin: true,
      selectedIndex: null,
    uploadInProgress: false,
      modalShow: false, 
      modalInputManual: false,
      file1: null,
      file: "",
      errorFile: false,
      kotama_balakpus:"",
      satuan:"",
      kode_jabatan:"",
      tgl_lahir:"",
      nama:"",
      pangkat:"",
      korps:"",
      nrp:"",
      code:0,
      jabatan:"",
      tmt_jabatan:"",
      abit:"",
      tingkat_jabatan:"",
      dafukaj:"",
      masa_jabatan:"",
      DataAksi: [],
      optionInstansi: [],
      optionBencana: [],
      optionSurveillance: [],
      optionTipeAksi: [],
      optionKelurahan: [],
      isLoading: false,
      loadingInstance: null,
      loadingBroadcast: false,
      kotama:null,
      masa_jabatan: null,
      pangkat: null,
      korps: null,
      sidebarVisibilityFilter: false,
      optionKotama:[],
      IsExistKotamaEmployee:[],
      optionMasaJabatan:[
        {
          text: "Jabatan Kosong",
          value: "kosong"
        },
        {
          text: "diantara 0 - 1 tahun",
          value: "diatas0"
        },
        {
          text: "diantara 1 - 2 tahun",
          value: "dibawah2"
        },
        {
          text: "lebih dari 2 tahun",
          value: "diatas2"
        }
      ],
      optionPangkat:[
      {
          text: "Mayor",
          value: "mayor"
        },
        {
          text: "Letkol",
          value: "letkol"
        },
        {
          text: "Kolonel",
          value: "kolonel"
        },
        {
          text: "Brigjen",
          value: "brigjen"
        },
        {
          text: "Mayjen",
          value: "mayjen"
        },
        {
          text: "Letjen",
          value: "letjen"
        },
        {
          text: "Jenderal",
          value: "jenderal"
        }
      ],
      optionKorps:[
      {
          text: "INF",
          value: "inf"
        },
        {
          text: "KAV",
          value: "kav"
        },
        {
          text: "ARM",
          value: "arm"
        },
        {
          text: "ARH",
          value: "arh"
        },
        {
          text: "CPN",
          value: "cpn"
        },
        {
          text: "CZI",
          value: "czi"
        },
        {
          text: "CHB",
          value: "chb"
        },
        {
          text: "CPL",
          value: "cpl"
        },
        {
          text: "CPM",
          value: "cpm"
        },
        {
          text: "CKM",
          value: "ckm"
        },
        {
          text: "CBA",
          value: "cba"
        },
        {
          text: "CAJ",
          value: "caj"
        },
        {
          text: "CTP",
          value: "ctp"
        },
        {
          text: "CKU",
          value: "cku"
        },
        {
          text: "CHK",
          value: "chk"
        },
        {
          text: "K",
          value: "k"
        }
      ],
      keyword: "",
      katakunci: "",
      title: "",
      instansiId: "",
      isPublish: false,
      typeMdmc: 0,
      roles: null,
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      id: null,
      instansiMdmc: "",
      errorInstansiMdmc: false,
      judul: "",
      errorJudul: false,
      deskripsi: "",
      errorDeskripsi: false,
      tipeBencana: [],
      errorTipeBencana: false,
      tipeSurvlience: [],
      errorTipeSurvlience: false,
      tipeAksi: "",
      errorTipeAksi: false,
      tanggalAksi: null,
      errorTanggalAksi: false,
      startDate: null,
      endDate: null,
      alamat: "",
      errorAlamat: false,
      kelurahan: "",
      errorKelurahan: false,
      kecamatan: "",
      kabupaten: "",
      provinsi: "",
      latitudePerusahaanMedis: 0,
      longitudePerusahaanMedis: 0,
      linkGoogleMaps: "",
      action: "create",
      loadingCreate: false,
      token: null,
      anakInstansiRujukan: [],
      showAlertLinkMap: false,
      titleModalManual: "Import Data Personel",
      cellStyleOption: {
        headerCellClass: ({ column, rowIndex }) => {
          if (rowIndex === 0) {
            return "table-header-cell-class";
          }
        },
      },
      columns: [
        { field: "no", key: "no", title: "No", align: "center", width: 60 },
        // {
        //   field: "kotama_balakpus",
        //   key: "kotama_balakpus",
        //   title: "KOTAMA / BALAKPUS",
        //   align: "left",
        //   width: 200,
        // }, 
        {
          field: "satuan",
          key: "satuan",
          title: "SATUAN",
          align: "left",
          width: 200,
        },
        {
          field: "jabatan",
          key: "jabatan",
          title: "JABATAN",
          align: "left",
          width: 200,
        },
        {
          field: "masa_jabatan",
          key: "masa_jabatan",
          title: "MASA JABATAN",
          align: "left",
          width: 200,
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            if (row.masa_jabatan !== null && row.masa_jabatan !== "") {
    let indexTahun = row.masa_jabatan.indexOf(" tahun");

    if (indexTahun !== -1) {
        let stringSebelumTahun = row.masa_jabatan.substring(0, indexTahun);
        let years = parseInt(stringSebelumTahun);

        // Assuming the format is "tahun bulan hari"
        // Extracting months and days
        let indexBulan = row.masa_jabatan.indexOf(" bulan");
        let indexHari = row.masa_jabatan.indexOf(" hari");

        let months = 0;
        let days = 0;

        if (indexBulan !== -1) {
            let stringBetweenTahunBulan = row.masa_jabatan.substring(indexTahun + 6, indexBulan);
            months = parseInt(stringBetweenTahunBulan);
        }

        if (indexHari !== -1) {
            let stringBetweenBulanHari = row.masa_jabatan.substring(indexBulan + 7, indexHari);
            days = parseInt(stringBetweenBulanHari);
        }

        // if (((years === 0 && months >= 0) && (years !== 0 && months !== 0 && days !== 0)) || (years === 1  && months === 0 && days === 0)) {
        //     return <b-badge variant="success">{row.masa_jabatan}</b-badge>;
        // } else if (((years === 1 && months >= 0)&& (years !== 0 && months !== 0 && days !== 0) )||  (years === 2  && months === 0 && days === 0)) {
        //     return <b-badge variant="warning">{row.masa_jabatan}</b-badge>;
        // } else if ((years === 2  && months >= 0 && days >= 1) || (years > 2)) {
        //     return <b-badge variant="danger">{row.masa_jabatan}</b-badge>;
        // }else if ((years === 0  && months === 0 && days === 0) ) {
        //   return <b-badge variant="light">{row.masa_jabatan}</b-badge>;
        // }
        if (years === 0) {
            if (months === 0) {
                if (days === 0) {
                    return <b-badge variant="light">{row.masa_jabatan}</b-badge>;
                } else {
                  return <b-badge variant="success">{row.masa_jabatan}</b-badge>;
                }
            } else {
                return <b-badge variant="success">{row.masa_jabatan}</b-badge>;
            }
        } else if (years === 1) {
            if (months === 0) {
                if (days === 0) {
                  return <b-badge variant="success">{row.masa_jabatan}</b-badge>;
                } else {
                  return <b-badge variant="warning">{row.masa_jabatan}</b-badge>;
                }
            } else {
              return <b-badge variant="warning">{row.masa_jabatan}</b-badge>;
            }
        } else if (years === 2) {
            if (months === 0) {
                if (days === 0) {
                    return <b-badge variant="warning">{row.masa_jabatan}</b-badge>;
                } else {
                    return <b-badge variant="danger">{row.masa_jabatan}</b-badge>;
                }
            } else {
                return <b-badge variant="danger">{row.masa_jabatan}</b-badge>;
            }
        } else if (years >= 3) {
            return <b-badge variant="danger">{row.masa_jabatan}</b-badge>;
        }

    } else {
        return '-';
    }
} else {
    return '-';
}

          }
        },
        {
          field: "nama",
          key: "nama",
          title: "NAMA",
          align: "left",
          width: 200,
        },
        {
          field: "pangkat",
          key: "pangkat",
          title: "PANGKAT",
          align: "left",
          width: 200,
        },
        {
          field: "korps",
          key: "korps",
          title: "KORPS",
          align: "left",
          width: 200,
        },
        {
          field: "nrp",
          key: "nrp",
          title: "NRP",
          align: "left",
          width: 200,
        },
        {
          field: "tmt_jabatan",
          key: "tmt_jabatan",
          title: "TMT JAB",
          align: "left",
          width: 200,
        },
        
        {
          field: "",
          key: "e",
          title: "ACTION",
          center: "left",
          width: 250,

          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return (
              <span>
                <button class="btn btn-outline-success" on-click={() => this.handleDetailForm(row.id)}>
                  <i class="fa fa-magnifying-glass"></i>
                </button>
                &nbsp;
              </span>
              
            );
          },
        },
      ],
    };
  },
  methods: {
    updateCode(code) {
    this.code = code;
  },
    updateSelectedIndex(index) {
    this.selectedIndex = index;
  },
    pageNumberChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.getData();
    },

    resetSearch() {
      this.kotama = '',
      this.masa_jabatan = '',
      this.pangkat = '',
      this.korps = ''
      this.getData();
    },

    // page size change
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getData();
    },

    onClickCloseSidebar() {
      this.sidebarVisibilityFilter = false;
      this.sidebarVisibility = false;
    },

    handleDetailForm(id) {
      this.action = "detail";
      this.id = id;
      this.$refs["modal-detail-employee"].show("modal-detail-employee");

      axios
        .get(`${process.env.VUE_APP_URL}employee/${id}`)
        .then((response) => {
          this.kotama_balakpus = response.data.data.kotama_balakpus;
          this.satuan = response.data.data.satuan;
          this.kode_jabatan = response.data.data.kode_jabatan;
          this.tgl_lahir = response.data.data.tgl_lahir;
          this.nama = response.data.data.nama;
          this.pangkat = response.data.data.pangkat;
          this.korps = response.data.data.korps;
          this.nrp = response.data.data.nrp;
          this.jabatan = response.data.data.jabatan;
          this.tmt_jabatan = response.data.data.tmt_jabatan;
          this.abit = response.data.data.abit;
          this.tingkat_jabatan = response.data.data.tingkat_jabatan;
          this.dafukaj = response.data.data.dafukaj;
          this.masa_jabatan = response.data.data.masa_jabatan; 
        });
    },

    async handleDownload() {
      try {
        let url = `${process.env.VUE_APP_URL}employee/download/excel?&allData=true`

        if (this.kotama !== null && this.kotama.value !== null && this.kotama.value !== "" && this.kotama.value !== undefined) {
          url += `&code_kotama_balakpus=${this.kotama.value}`;
        }

        if (this.masa_jabatan !== null && this.masa_jabatan.value !== null && this.masa_jabatan.value !== "" && this.masa_jabatan.value !== undefined) {
          url += `&masa_jabatan=${this.masa_jabatan.value}`;
        }

        if (this.pangkat !== null && this.pangkat.value !== null && this.pangkat.value !== "" && this.pangkat.value !== undefined) {
          url += `&pangkat=${this.pangkat.value}`;
        }

        if (this.korps !== null && this.korps.value !== null && this.korps.value !== "" && this.korps.value !== undefined) {
          url += `&korps=${this.korps.value}`;
        }

        await axios.get(url, { responseType: "blob" }).then((response) => {
          let FileSaver = require("file-saver");
          let tanggal = new Date().getDate();
          let bulan = new Date().getMonth();
          let tahun = new Date().getFullYear();
          FileSaver.saveAs(
            response.data,
            `DataPersonel_${tanggal}${bulan}${tahun}`
          );
        });
      } catch (error) {
        console.error(error);
        this.loadingInstance.close();

        swal("Kesalahan Server!", "Tidak dapat terhubung ke server!", error);
      }
    },

     async deleteAksi() {
      try{
        let url = `${process.env.VUE_APP_URL}employee?&allData=true`

        if (this.kotama !== null && this.kotama.value !== null && this.kotama.value !== "" && this.kotama.value !== undefined) {
          url += `&code_kotama_balakpus=${this.kotama.value}`;
        }

        if (this.masa_jabatan !== null && this.masa_jabatan.value !== null && this.masa_jabatan.value !== "" && this.masa_jabatan.value !== undefined) {
          url += `&masa_jabatan=${this.masa_jabatan.value}`;
        }

        if (this.pangkat !== null && this.pangkat.value !== null && this.pangkat.value !== "" && this.pangkat.value !== undefined) {
          url += `&pangkat=${this.pangkat.value}`;
        }

        if (this.korps !== null && this.korps.value !== null && this.korps.value !== "" && this.korps.value !== undefined) {
          url += `&korps=${this.korps.value}`;
        }

        await axios
        .delete(url, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          swal({
            title: "Berhasil!",
            text: "Data Telah Dihapus.",
            type: "success",
            timer: 2000,
            heightAuto: false,
          });
          this.getData();
        })
        .catch((e) => {
          if (e.response.data.message) {
            swal({
              title: "Gagal!",
              text: e.response.data.message,
              type: "danger",
              heightAuto: false,
            });
          }
        });


      } catch (error) {
        console.error(error);
        this.loadingInstance.close();

        swal("Kesalahan Server!", "Tidak dapat terhubung ke server!", error);
      }
    },
    getToken() {
      this.token = cookies.get("token");
      this.roles = cookies.get("roles");
      this.instansiId = cookies.get("instansi_id");
      this.anakInstansiRujukan = cookies.get("anak_instansi_rujukan");
    },

    handleShowModal() {
      this.getIsExistKotama();
      this.modalShow = true;

    },

    handleClickSearch() {
      this.pageIndex = 1;

      this.getData();
    },

    onPressEnterSearch() {
      this.pageIndex = 1;

      this.getData();
    },

    searchByText(text) {
    // Ubah teks pencarian menjadi huruf kecil untuk pencocokan yang lebih baik
    const searchText = text.toLowerCase();
    // Filter item berdasarkan teks pencarian
    return this.IsExistKotamaEmployee.filter(item => item.text.toLowerCase().includes(searchText));
  },
  // Fungsi untuk menangani tombol pencarian diklik
  handleClickCari() {
    // Panggil fungsi pencarian dengan teks yang dimasukkan
    const searchResult = this.searchByText(this.katakunci);
    // Lakukan sesuatu dengan hasil pencarian, misalnya tampilkan di konsol atau simpan ke variabel untuk ditampilkan di antarmuka pengguna
    console.log('Hasil Pencarian:', searchResult);
    // Reset nilai kata kunci setelah pencarian selesai
    this.katakunci = '';
  },
  // Fungsi untuk menangani pencarian ketika tombol 'Enter' ditekan
  onPressEnterCari() {
    // Panggil fungsi pencarian dengan teks yang dimasukkan
    const searchResult = this.searchByText(this.katakunci);
    // Lakukan sesuatu dengan hasil pencarian, misalnya tampilkan di konsol atau simpan ke variabel untuk ditampilkan di antarmuka pengguna
    console.log('Hasil Pencarian:', searchResult);
    // Reset nilai kata kunci setelah pencarian selesai
    this.katakunci = '';
  },

    resetField() {
      this.file = "";
      this.action = "create";
    },

    renderTitle() {
      if (this.action === "create") {
        this.title = "Tambah Aksi";
      } else {
        this.title = "Ubah Aksi";
      }
    },
    alertAksi() {
      swal({
        title: "Anda Yakin Hapus Data?",
        text: "Data yang dihapus tidak dapat kembali. Tolong cek kembali filter yang anda pilih.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yakin !",
        cancelButtonText: "Batal",
        heightAuto: false,
      }).then((result) => {
        if (result.value) {
          this.deleteAksi();
        }
      });
    },

    alertDownloadAksi() {
      swal({
        title: "Download Data",
        text: "Tolong cek kembali filter yang anda pilih.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "primary",
        confirmButtonText: "Download",
        cancelButtonText: "Batal",
        heightAuto: false,
      }).then((result) => {
        if (result.value) {
          this.handleDownload();
        }
      });
    },


    async getData() {
      this.loadingInstance.show();

      try {
        let url = `${process.env.VUE_APP_URL}employee?page=${this.pageIndex}&size=${this.pageSize}&search=${this.keyword}&allData=true`

        if (this.kotama !== null && this.kotama.value !== null && this.kotama.value !== "" && this.kotama.value !== undefined) {
          url += `&code_kotama_balakpus=${this.kotama.value}`;
        }

        if (this.masa_jabatan !== null && this.masa_jabatan.value !== null && this.masa_jabatan.value !== "" && this.masa_jabatan.value !== undefined) {
          url += `&masa_jabatan=${this.masa_jabatan.value}`;
        }

        if (this.pangkat !== null && this.pangkat.value !== null && this.pangkat.value !== "" && this.pangkat.value !== undefined) {
          url += `&pangkat=${this.pangkat.value}`;
        }

        if (this.korps !== null && this.korps.value !== null && this.korps.value !== "" && this.korps.value !== undefined) {
          url += `&korps=${this.korps.value}`;
        }

        await axios.get(url).then((response) => { 
          this.totalCount = response.data.data.totalData;
          let row = response.data.data.content;

          row.map((item, index) => {
            return (item.no = index + 1 + this.pageSize * (this.pageIndex - 1));
          });

          this.DataAksi = row; 
          this.loadingInstance.close();
        });
      } catch (error) {
        console.error(error);
        this.loadingInstance.close();

        swal("Kesalahan Server!", "Tidak dapat terhubung ke server!", error);
      }
    },

    async getKotamaOption() {
      await axios
        .get(`${process.env.VUE_APP_URL}mst-kotama/list/option`)
        .then((response) => {
          let data = response.data;
          this.optionKotama = data;
        })
        .catch((error) => {
          console.error(error);
          swal("Kesalahan Server!", "Tidak dapat terhubung ke server!", error);
        });
    },

    async getIsExistKotama() {
      await axios
        .get(`${process.env.VUE_APP_URL}employee/list/employee/exist`)
        .then((response) => {
          let data = response.data;
          this.IsExistKotamaEmployee = data;
        })
        .catch((error) => {
          console.error(error);
          swal("Kesalahan Server!", "Tidak dapat terhubung ke server!", error);
        });
    },


    handleShowModalInputManual() {
      this.modalInputManual = true;
    },

    // reset field
    // resetField() {
    //   this.id = null;
    //   this.file = "";
    //   this.linkGoogleMaps = "";
    //   this.file1 = null;
    //   this.action = "create";
    //   this.errorInstansiMdmc = false;
    //   this.errorJudul = false;
    //   this.errorDeskripsi = false;
    //   this.errorTipeBencana = false;
    //   this.errorTipeSurvlience = false;
    //   this.errorTipeAksi = false;
    //   this.errorTanggalAksi = false;
    //   this.errorAlamat = false;
    // },

    validation() {
 
      // if (this.file === "") {
      //   this.errorFile = true;
      // } else {
      //   this.errorFile = false;
      // }
      if (!this.file || (this.file instanceof File && this.file.size === 0)) {
        this.errorFile = true;
        return false;
      } else {
        this.errorFile = false;
        return true;
      }
    },

    // menambah data
    async submitForm() {
      console.log("masuk")
      if (this.validation()) {
        console.log("masuk validasi")
        const formData = new FormData();
        console.log(this.file,"file");
        formData.append("file", this.file);
        this.uploadInProgress = true;
        this.loadingCreate = true;

          await axios
            .post(`${process.env.VUE_APP_URL}employee?code=${this.code}`, formData, {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            })
            .then((response) => {
              this.loadingCreate = false;

              swal({
                title: "Success",
                text: "Data Berhasil Disimpan",
                type: "success",
                timer: 2000,
              });
              this.getData();
            this.resetField();
            this.modalShow = false;
            this.uploadInProgress = false;
            })
            .catch((error) => {
              this.loadingCreate = false;
              this.uploadInProgress = false;

              console.error(error);
              if (error.response.data.error_messages[0].msg) {
                swal("Server error!", error.response.data.error_messages[0].msg);
              } else {
                swal("Server error!", "Could not connect to the server!");
              }
            });
        
      }
    },

    // get kelurahana
    async getKelurahanOption() {
      await axios
        .get(`${process.env.VUE_APP_URL}mst-wilayah/combine`)
        .then((response) => {
          this.optionKelurahan = response.data.data.content;
        })
        .catch((error) => {
          console.error(error);
          swal("Server error", "Could not connect to the server!", error);
        });
    },

    // find kelurahan
    async asyncFindKelurahan(keyword) {
      this.isLoading = true;
      await axios
        .get(`${process.env.VUE_APP_URL}mst-wilayah/combine?search=${keyword}`)
        .then((response) => {
          this.optionKelurahan = response.data.data.content;

          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          console.error(error);
          swal("Server error", "Could not connect to the server!", error);
        });
    },

    formattedDate(oldDate) {
      let date = new Date(oldDate);

      // Get year, month, and day part from the date
      let year = date.toLocaleString("default", { year: "numeric" });
      let month = date.toLocaleString("default", { month: "2-digit" });
      let day = date.toLocaleString("default", { day: "2-digit" });

      // Generate yyyy-mm-dd date string
      return year + "-" + month + "-" + day;
    },
  },
  computed: {
    requiredPassword() {
      return this.action === "create" ? true : false;
    },
    filteredForms() {
      // Filter forms based on search keyword (katakunci)
      return this.IsExistKotamaEmployee.filter(form => form.text.toLowerCase().includes(this.katakunci.toLowerCase()));
    },
  },
  mounted() {
    let token = cookies.get("token");
    if (!token) {
      this.$router.push("/panel");
    }
    this.loadingInstance = this.$veLoading({
      target: document.querySelector("#tableAksi"),
      name: "wave",
    });
    // Call the getData method when the component is mounted
    this.getToken();
    this.getData();
    this.getKotamaOption();

    this.renderTitle();
  },
  watch: {
    // whenever question changes, this function will run
    tipeAksi: function (newAksi, oldAksi) {
      if (this.action !== "update") {
        if (newAksi) {
          this.tipeBencana = [];
          this.tipeSurvlience = [];
        }
      }
    },
    kelurahan: function (newKelurahan, oldKelurahan) {
      if (newKelurahan) {
        this.kecamatan = newKelurahan.kecamatan_name;
        this.kabupaten = newKelurahan.kabupaten_name;
        this.provinsi = newKelurahan.provinsi_name;
      }
    },

    linkGoogleMaps(val) {
      if (val && val.includes("@")) {
        const latlng = val.substring(val.indexOf("@") + 1, val.indexOf("z") - 1);
        const lat = parseFloat(latlng.split(",")[0]);
        const lng = parseFloat(latlng.split(",")[1]);
        if (isNaN(lat) || isNaN(lng)) {
          swal({
            type: "warning",
            title: "Link tidak valid!!",
            text: "Harap masukkan link yang valid.",
          }).then(() => {
            this.showAlertLinkMap = true;
          });
          return;
        }
        this.latitudePerusahaanMedis = lat;
        this.longitudePerusahaanMedis = lng;
      } else {
        this.latitudePerusahaanMedis = null;
        this.longitudePerusahaanMedis = null;
      }
    },
    tanggalAksi: function (newData, oldData) {
      this.startDate = this.formattedDate(newData[0]);
      this.endDate = this.formattedDate(newData[1]);
    },
    action: function (newAction, oldAction) {
      if (newAction) {
        this.renderTitle();
      }
    },
    modalInputManual: function (newData) {
      if (newData === true) {
        this.getInstansiOption();
        this.getTipeAksiOption();
        this.getSurveillanceOption();
        this.getKelurahanOption();
        this.getBencanaOption();
      }
    },

    file1: function (newData) {
      if (newData.size > 10485760) {
        swal({
          title: "Terjadi Kesalahan!",
          text: "Ukuran Foto Max 2MB",
          type: "error",
          heightAuto: false,
        });
        this.file1 = "";
      }
    },
  },
  created() {
    // role menu
    const cookies = new Cookies();
    const roles = cookies.get("roles");
    if (roles === "user") {
      this.isAdmin = false;
    }
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
