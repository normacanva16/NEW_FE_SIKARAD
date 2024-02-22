<template>
    <ContentWrapper>
      <div class="content-heading">
        <div>User Activity Log</div>
      </div>
  
      <div class="card mt-3">
        <div class="d-flex align-items-center justify-content-between">
          
          <div>
            <div class="mt-3 col-sm-12 d-flex">
              <b-form-input
                v-model="keyword"
                placeholder="Masukkan keyword"
                @keydown.enter="onPressEnterSearch"
              ></b-form-input>
              <b-button @click="handleClickSearch" variant="primary"
                >Cari</b-button
              >
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
  
  Vue.use(VueEasytable);
  
  export default {
    components: {
      VueEasytable,
      Multiselect,
    },
    data() {
      return {
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
  
      async getData() {
        this.loadingInstance.show();
  
        try {
          await axios
            .get(
              `${process.env.VUE_APP_URL}user-log?page=${this.pageIndex}&size=${this.pageSize}&search=${this.keyword}`
            )
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
      }
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
  