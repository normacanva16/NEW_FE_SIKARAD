<template>
  <ContentWrapper>
    <div class="content-heading">
      <div>Rekapitulasi Data Pegawai</div>
    </div>
    <div>
      <!-- DATATABLE DEMO 2-->
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

            <!-- <div>
              <b-row class="mt-3">
              <b-col sm="12">
                <label for=""
                  ><h4><i class="fa-solid fa-people-group"></i> Rekapitulasi Pegawai</h4></label
                >
                <b-form-group label="KOTAMA / BALAKPUS" label-for="tipe_aksi">
                  <multiselect id="kotama" v-model="kotama" :options="optionKotama" :close-on-select="true" :clear-on-select="false" placeholder="PILIH KOTAMA/BALAKPUS" label="text" track-by="value" :show-labels="false" disabled> </multiselect>
                </b-form-group>
                <b-form-group label="MASA JABATAN" label-for="tipe_aksi">
                  <multiselect id="masa_jabatan" v-model="masa_jabatan" :options="optionMasaJabatan" :close-on-select="true" :clear-on-select="false" placeholder="PILIH MASA JABATAN" label="text" track-by="value" :show-labels="false" disabled> </multiselect>
                </b-form-group>
                <b-form-group label="PANGKAT" label-for="tipe_aksi">
                  <multiselect id="pangkat" v-model="pangkat" :options="optionPangkat" :close-on-select="true" :clear-on-select="false" placeholder="PILIH PANGKAT" label="text" track-by="value" :show-labels="false"> </multiselect>
                </b-form-group>
                <b-form-group label="KORPS" label-for="tipe_aksi">
                <multiselect id="korps" v-model="korps" :options="optionKorps" :close-on-select="true" :clear-on-select="false" placeholder="PILIH KORPS" label="text" track-by="value" :show-labels="false"> </multiselect>
              </b-form-group>
              </b-col>
            </b-row>

            <b-button type="submit" variant="primary" class="mt-5 ml-4" @click="handleClickSearch">Cari</b-button>
            <b-button type="submit" variant="primary" class="mt-5 ml-5" @click="resetSearch">Batal</b-button>


            </div> -->

            
          </div>
        </template>
      </b-sidebar>
    </div>

      <div class="mt-3">

        <b-form-group label="PANGKAT" label-for="tipe_aksi">
                  <multiselect id="pangkat" v-model="pangkat" :options="optionPangkat" :close-on-select="true" :clear-on-select="false" placeholder="PILIH PANGKAT" label="text" track-by="value" :show-labels="false"> </multiselect>
                </b-form-group>
        <!-- <div class="d-flex align-items-center justify-content-end">

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
        </div> -->

          <div class="mt-5">
            <div class="chart-container">
              <div style="overflow-x: auto;">
                <apexchart
                  :options="chartOptions"
                  :series="seriesData"
                  type="bar"
                  height="300"
                ></apexchart>
              </div>
            </div>
          </div>

        <div>
          <div>
            <div class="d-flex align-items-center justify-content-between mt-5">
              <h4>Rekapitulasi Data Pegawai</h4>
                <b-button class="ml-3 btn-sm w-20" variant="primary" @click="alertDownloadAksi()">
                  <i class="fa-solid fa-print"></i> Print Tabel
                </b-button>
              </div>
          </div>
            </div>
            <ve-table id="tableAksi" :columns="columns" :table-data="DataAksi" :cell-style-option="cellStyleOption" :border-x="true" :border-y="true" :scroll-width="600" />
            <div v-show="DataAksi.length === 0" class="empty-data">Tidak ada data...</div>

            <div class="table-pagination">
              <ve-pagination :total="totalCount" :page-index="pageIndex" :page-size="pageSize" @on-page-number-change="pageNumberChange" @on-page-size-change="pageSizeChange" />
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
import VueApexCharts from "vue-apexcharts";
import jsPDF from "jspdf";
import "jspdf-autotable";
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

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
    uploadInProgress: false,
      modalShow: false, 
      modalInputManual: false,
      file1: null,
      file: "",
      errorFile: false,
      kotama_balakpus:"",
      kode_jabatan:"",
      nama:"",
      pangkat:"",
      korps:"",
      nrp:"",
      jabatan:"",
      tmt_jabatan:"",
      abit:"",
      tingkat_jabatan:"",
      dafukaj:"",
      masa_jabatan:"",
      DataAksi: [],
      DataAksiDownload: [],
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
      sidebarVisibilityFilter: false,
      optionKotama:[],
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
        text: "Semua Pangkat",
        value: "all"
      },
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
    korps: null,
    optionKorps:[],
      keyword: "",
      title: "",
      instansiId: "",
      isPublish: false,
      typeMdmc: 0,
      roles: null,
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      id: null,
      action: "create",
      loadingCreate: false,
      token: null,
      anakInstansiRujukan: [],
      showAlertLinkMap: false,
      titleModalManual: "Import Data Pegawai",
      cellStyleOption: {
        headerCellClass: ({ column, rowIndex }) => {
          if (rowIndex === 0) {
            return "table-header-cell-class";
          }
        },
      },
      columns: [
        { field: "no", key: "no", title: "No", align: "center", width: 60 },
        {
          field: "kotama_balakpus",
          key: "kotama_balakpus",
          title: "KOTAMA / BALAKPUS",
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
          field: "datadetail",
          key: "datadetail",
          title: "KETERANGAN",
          align: "left",
          width: 200,
          renderBodyCell: ({ row, column, rowIndex }, h) => {
if (column.key === 'datadetail') { // Jika kolom adalah "KETERANGAN"
  // Membuat daftar berurutan dari elemen-elemen dalam array datadetail
  const listItems = row.datadetail.map(item => h('li', item));
  // Menggabungkan daftar berurutan ke dalam elemen <ul>
  return h('ul', listItems);
} else {
  // Mengembalikan nilai default jika kolom bukan "KETERANGAN"
  return row[column.field];
}
}
        }
      ],

      //apexchart start

          chartOptions: {
            chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: '13px',
                fontWeight: 900
              }
            }
          }
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'string',
        categories: [],
        labels: {
          rotate: -45, // Rotate labels for better readability
          style: {
            fontSize: "10px",
          },
        },
        tickPlacement: "on",
        axisTicks: {
          show: true,
        },
        maxHeight: 300, // Set the maximum height of the X-axis scrollbar
        scrollbar: {
          enabled: true,
        },
      },
      yaxis: {
        title: {
          text: "Number of Personnel",
        },
      },
      title: {
        text: "Rekapitulasi Personel",
        align: "center",
        margin: 20, // Adjust the title margin as needed
      },
    },


    seriesData: [],

      //apexchart end
    };
  },

  methods: {

    alertDownloadAksi() {
    swal({
      title: "Download Data Tabel",
      text: "Tolong cek kembali filter yang anda pilih.",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "primary",
      confirmButtonText: "Download",
      cancelButtonText: "Batal",
      heightAuto: false,
    }).then((result) => {
      if (result.value) {
        this.printTabelRekapitulasiPersonel();
      }
    });
  },

 async printTabelRekapitulasiPersonel() {

    try {
        let url = `${process.env.VUE_APP_URL}dashboard/tabel/rekapitulasi/download?allData=true`

        if (this.pangkat !== null && this.pangkat.value !== null && this.pangkat.value !== "" && this.pangkat.value !== undefined) {
          url += `&pangkat=${this.pangkat.value}`;
        }

        await axios.get(url).then((response) => { 
          this.totalCount = response.data.total_data;
          let row = response.data.data;

          row.map((item, index) => {
            return (item.no = index + 1 + this.pageSize * (this.pageIndex - 1));
          });

          this.DataAksiDownload = row; 
        });
      } catch (error) {
        console.error(error);

        swal("Kesalahan Server!", "Tidak dapat terhubung ke server!", error);
      }

  // Create a new jsPDF instance
  const pdfDoc = new jsPDF();

  // Set document properties
  pdfDoc.setProperties({
    title: 'Rekapitulasi Data Pegawai',
    subject: 'Tabel Rekapitulasi Personel',
    author: 'Your Name',
    keywords: 'rekapitulasi, pegawai, table',
  });

  // Add a title to the PDF
  pdfDoc.setFontSize(18);
  pdfDoc.text('Rekapitulasi Data Pegawai', 20, 20);

  // Add a date to the PDF
  pdfDoc.setFontSize(12);
  const currentDate = new Date().toLocaleDateString();
  pdfDoc.text(`Date: ${currentDate}`, 20, 30);

  // Add the table using jspdf-autotable
  const columns = this.columns.map(column => column.title);
  console.log(columns)
  const data = this.DataAksiDownload.map(row => {
  // Mencari indeks kolom "KETERANGAN"
  const indexKeterangan = this.columns.findIndex(col => col.key === 'datadetail');
  console.log(indexKeterangan)
  if (indexKeterangan !== -1) {
    // Mengubah nilai kolom "KETERANGAN" menjadi daftar berurutan
    row['datadetail'] = row.datadetail.map(item => `• ${item}`).join("\n");
  }
  // Mengembalikan baris data yang telah dimodifikasi
  return Object.values(row);
});

  pdfDoc.autoTable({
    head: [columns],
    body: data,
    startY: 40, // Adjust the starting Y position as needed
  });

  // Save or open the PDF
  pdfDoc.save('Rekapitulasi_Pegawai.pdf');
},


  async populateChartData() {
if (!this.loadingInstance) {
  // Initialize loading instance if not already initialized
  this.loadingInstance = this.$veLoading({
    target: document.querySelector("#tableAksi"),
    name: "wave",
  });
}

this.loadingInstance.show();

try {
  let url = `${process.env.VUE_APP_URL}dashboard/diagram/rekapitulasi?allData=true`;

  if (this.pangkat !== null && this.pangkat.value !== null && this.pangkat.value !== "" && this.pangkat.value !== undefined) {
    url += `&pangkat=${this.pangkat.value}`;
  }

  const response = await axios.get(url);

  const seriesData = response.data.series.map((series) => ({
    name: series.name,
    data: series.data.map((item) => item[1]),
  }));

  for (let i = 0; i < response.data.series[0].data.length; i++) {
    this.chartOptions.xaxis.categories.push(response.data.series[0].data[i][0])
  }

  this.seriesData = seriesData;

} catch (error) {
  if (this.loadingInstance) {
    this.loadingInstance.close();
  }
  swal("Kesalahan Server!", "Tidak dapat terhubung ke server!", error);
}
},

    pageNumberChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.getData();
    },

    resetSearch() {
      this.kotama = '',
      this.masa_jabatan = '',
      this.pangkat = ''
      this.getData();
      this.populateChartData();
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

    getToken() {
      this.token = cookies.get("token");
      this.roles = cookies.get("roles");
      this.instansiId = cookies.get("instansi_id");
      this.anakInstansiRujukan = cookies.get("anak_instansi_rujukan");
    },

    handleShowModal() {
      this.modalShow = true;
    },

    handleClickSearch() {
      this.pageIndex = 1;

      if (this.pangkat !== null && this.pangkat.value === "all") {
        this.pangkat = null;
      }

      this.getData();
      this.populateChartData();
    },

    onPressEnterSearch() {
      this.pageIndex = 1;

      this.getData();
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

    async getData() {
      this.loadingInstance.show();

      try {
        let url = `${process.env.VUE_APP_URL}dashboard/tabel/rekapitulasi?page=${this.pageIndex}&size=${this.pageSize}&search=${this.keyword}&allData=true`

        if (this.pangkat !== null && this.pangkat.value !== null && this.pangkat.value !== "" && this.pangkat.value !== undefined) {
          url += `&pangkat=${this.pangkat.value}`;
        }

        await axios.get(url).then((response) => { 
          this.totalCount = response.data.total_data;
          let row = response.data.data;

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


    handleShowModalInputManual() {
      this.modalInputManual = true;
    },


    validation() {
 
      if (!this.file || (this.file instanceof File && this.file.size === 0)) {
        this.errorFile = true;
        return false;
      } else {
        this.errorFile = false;
        return true;
      }
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

    this.populateChartData();
  },
  watch: {
    // whenever question changes, this function will run

    pangkat: function(newPangkat, oldPangkat) {
  // Pastikan pangkat baru tidak sama dengan pangkat lama dan tidak null
  if (newPangkat !== oldPangkat && newPangkat !== null) {
    // Panggil handleClickSearch untuk memperbarui data sesuai dengan opsi pangkat yang baru
    this.handleClickSearch();
  }
},

    action: function (newAction, oldAction) {
      if (newAction) {
        this.renderTitle();
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

    this.populateChartData();
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.chart-container {
width: 100%;
overflow-x: auto;
}
</style>
