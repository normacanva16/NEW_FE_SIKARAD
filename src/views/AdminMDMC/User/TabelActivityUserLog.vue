<template>
    <ContentWrapper>
      <div class="content-heading">
        <div>User Activity Log</div>
      </div>
  
      <div class="card mt-3">
        <div class="d-flex align-items-center justify-content-between">
            <!-- filter start date & filter end date -->

            <div class="mt-3 col-sm-8 d-flex">
                <!-- Tampilkan kalender ketika selectedStartDate dipilih -->
                <datepicker
                v-model="selectedStartDate"
                placeholder="Pilih Tanggal Awal"
                class="mr-2"
                :input-class="'datepicker-input'"
                ></datepicker>
                <!-- Tampilkan kalender ketika selectedEndDate dipilih -->
                <datepicker
                v-model="selectedEndDate"
                placeholder="Pilih Tanggal Akhir"
                :input-class="'datepicker-input'"
                ></datepicker>
               <!-- tambahkan tombol cari -->
               <b-button @click="handleDateFilterChange" :disabled="!selectedStartDate || !selectedEndDate" variant="primary" class="ml-2"><i class="fa-solid fa-search"></i></b-button>
                <!-- tambahkan tombol reset untuk reset selectedStartDate & selectedEndDate -->
                <b-button @click="resetFilters" variant="danger" class="ml-2"><i class="fa-solid fa-refresh"></i></b-button>
            </div>
            
          <div>
            <div class="mt-3 col-sm-12 d-flex">
              <b-form-input
                v-model="keyword"
                placeholder="Masukkan keyword"
                @keydown.enter="onPressEnterSearch"
              ></b-form-input>
              <b-button @click="handleClickSearch" variant="primary"
                ><i class="fa-solid fa-search"></i></b-button
              >
              <b-button class="ml-2 btn-sm w-20" variant="primary" @click="handleDownload()">
                <i class="fa-solid fa-download" aria-hidden="true"></i> 
          </b-button>
            </div>
          </div>
        </div>
  
        <div class="card-body">
          <div>
            <ve-table
              id="table"
              :columns="columns"
              :table-data="DataUser"
              :cell-style-option="cellStyleOption"
              :border-x="true"
              :border-y="true"
            />
            <div v-show="DataUser.length === 0" class="empty-data">
              Tidak ada data...
            </div>
  
            <div class="table-pagination">
              <ve-pagination
                :total="totalCount"
                :page-index="pageIndex"
                :page-size="pageSize"
                @on-page-number-change="pageNumberChange"
                @on-page-size-change="pageSizeChange"
              />
            </div>
          </div>
        </div>
      </div>
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
  import Datepicker from 'vuejs-datepicker';
  
  Vue.use(VueEasytable);
  
  export default {
    components: {
      VueEasytable,
      Multiselect,
      Datepicker
    },
    data() {
      return {
        startDate: null,
      endDate: null,
      selectedStartDate: null,
      selectedEndDate: null,
        DataUser: [],
        keyword: "",
        loadingCreate: false,
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,
        options: ["list", "of", "options"],
        id: null,
        errorTipeAkun: false,
        errorNamaAdmin: false,
        errorEmail: false,
        errorPassword: false,
        errorUserName: false,
        errorKeterangan: false,
        token: null,
        cellStyleOption: {
          headerCellClass: ({ column, rowIndex }) => {
            if (rowIndex === 0) {
              return "table-header-cell-class";
            }
          },
        },
        columns: [
          { field: "no", key: "no", title: "No", align: "left" },
          {
            field: "activity_date",
            key: "activity_date",
            title: "Activity Date",
            align: "left",
          },
          { field: "ip_address", key: "ip_address", title: "Alamat IP", align: "left" },
          {
            field: "email",
            key: "email",
            title: "Email",
            align: "left",
          },
          { field: "activity", key: "activity", title: "Detail Activity", align: "left" },
        ],
      };
    },
    methods: {
      pageNumberChange(pageIndex) {
        this.pageIndex = pageIndex;
        this.getData();
      },
  
      // page size change
      pageSizeChange(pageSize) {
        this.pageIndex = 1;
        this.pageSize = pageSize;
        this.getData();
      },
  
      getToken() {
        this.token = cookies.get("token");
      },
  
      handleClickSearch() {
        this.pageIndex = 1;
  
        this.getData();
      },
  
      onPressEnterSearch() {
        this.pageIndex = 1;
  
        this.getData();
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

    // Metode untuk menangani perubahan pada filter start_date dan end_date
    handleDateFilterChange() {
      if (this.selectedStartDate && this.selectedEndDate) {
        // Mengatur nilai startDate dan endDate sesuai dengan nilai yang dipilih dari filter
        this.startDate = this.formattedDate(this.selectedStartDate);
        this.endDate = this.formattedDate(this.selectedEndDate);
      } else {
        // Reset nilai startDate dan endDate jika salah satu atau kedua filter kosong
        this.startDate = null;
        this.endDate = null;
      }

      // Panggil metode getData() untuk memperbarui data dengan filter baru
      this.getData();
    },

     // Metode untuk mereset filter tanggal
     resetFilters() {
      this.selectedStartDate = null;
      this.selectedEndDate = null;
      this.startDate = null;
      this.endDate = null;
      this.getData();
    },
  
      async getData() {
        this.loadingInstance.show();
  
        try {
            let url = `${process.env.VUE_APP_URL}user-log?page=${this.pageIndex}&size=${this.pageSize}&search=${this.keyword}`

            if (this.startDate !== null && this.endDate !== null) {
             url += `&start_date=${this.startDate}&end_date=${this.endDate}`;
            }

          await axios
            .get(url)
            .then((response) => {
              this.totalCount = response.data.data.totalData;
              let row = response.data.data.content;
  
              row.map((item, index) => {
                return (item.no =
                  index + 1 + this.pageSize * (this.pageIndex - 1));
              });
  
              this.DataUser = row;
              this.loadingInstance.close();
            });
        } catch (error) {
          console.error(error);
          this.loadingInstance.close();
  
          swal("Kesalahan Server!", "Tidak dapat terhubung ke server!", error);
        }
      },

      async handleDownload() {
      try {
        let url = `${process.env.VUE_APP_URL}user-log/excel?&allData=true`

            if (this.startDate !== null && this.endDate !== null) {
             url += `&start_date=${this.startDate}&end_date=${this.endDate}`;
            }

        await axios.get(url, { responseType: "blob" }).then((response) => {
          let FileSaver = require("file-saver");
          let tanggal = new Date().getDate();
          let bulan = new Date().getMonth();
          let tahun = new Date().getFullYear();
          FileSaver.saveAs(
            response.data,
            `DataUserActivityLog_${tanggal}${bulan}${tahun}`
          );
        });
      } catch (error) {
        console.error(error);
        this.loadingInstance.close();

        swal("Kesalahan Server!", "Tidak dapat terhubung ke server!", error);
      }
    },
    },
    computed: {
      requiredPassword: function () {
        return this.action === "create" ? true : false;
      },
    },
    mounted() {
      // Call the getData method when the component is mounted
      let token = cookies.get("token");
      if (!token) {
        this.$router.push("/panel");
      }
      this.loadingInstance = this.$veLoading({
        target: document.querySelector("#table"),
        name: "wave",
      });
      this.getData();
      this.getToken();
    },
    watch: {
      // whenever question changes, this function will run
    },
  };
  </script>
  
  <style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

  
<style>
.datepicker-input {
  width: 200px; /* Adjust width as needed */
  height: 40px; /* Adjust height as needed */
}
</style>
  