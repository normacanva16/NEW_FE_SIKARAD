<template>
    <ContentWrapper>
      <div class="content-heading">
        <div>Kotama / Balakpus</div>
      </div>
      <div class="container-fluid">
        <b-modal
          id="modal-tambah-user"
          ref="modal-tambah-user"
          title="Edit Kotama / Balakpus"
          hide-footer
          size="md"
          @hidden="resetField()"
        >
          <form @submit.prevent="submitForm">
            <div class="clearfix" v-if="loadingCreate === true">
              <b-spinner class="float-right" label="Floated Right"></b-spinner>
            </div>
            <b-row>
              <b-col>
                <b-form-group label="Nama Kotama / Balakpus" label-for="nama_kotama">
                  <b-form-input
                    id="nama"
                    v-model="nama"
                    placeholder="Masukkan nama kotama / balakpus"
                    disabled
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Alamat" label-for="alamat">
                  <b-form-input
                    id="alamat"
                    v-model="alamat"
                    placeholder="Masukkan alamat"
                  ></b-form-input>
                  <b-form-text class="text-danger" v-if="errorAlamat">
                    Alamat Kotama / Balakpus Wajib Diisi!
                  </b-form-text>
                </b-form-group>
                <b-form-group label="Peta Lokasi" label-for="peta-lokasi">
                  <b-form-textarea
                    id="url_gmaps"
                    size="sm"
                    v-model="linkGoogleMaps"
                    placeholder="Google Maps Link"
                  ></b-form-textarea>
                  <b-form-text class="text-danger" v-if="errorUrlGmaps">
                    Url Gmaps Wajib Diisi!
                  </b-form-text>
                  <a
                    href="https://www.google.com/maps/@-2.4079478,116.7097771,5.25z"
                    target="_blank"
                    rel="noopener noreferrer"
                    ><i class="fa-solid fa-location-crosshairs"></i> Buka Google
                    Maps</a
                  >
                </b-form-group>
                <b-form-group label="Longitude" label-for="longitude">
                  <b-form-input
                    id="longitude"
                    v-model="longitude"
                    placeholder="Longitude"
                    disabled
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Latitude" label-for="latitude">
                  <b-form-input
                    id="latitude"
                    v-model="latitude"
                    placeholder="Latitude"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
  
            <b-button type="submit" variant="primary" :disabled="loadingCreate"
              >Submit</b-button
            >
          </form>
        </b-modal>
      </div>

      <div class="container-fluid">
        <b-modal
          id="modal-edit-foto"
          ref="modal-edit-foto"
          title="Edit Logo kotama / balakpus"
          hide-footer
          size="md"
          @hidden="resetField()"
        >
          <form @submit.prevent="submitFoto">
            <div class="clearfix" v-if="loadingCreate === true">
              <b-spinner class="float-right" label="Floated Right"></b-spinner>
            </div>
            <b-row>
              <b-col>

                <div class="mb-2 text-center">
                  <img v-for="(image, index) in getFilteredImages(code)" :key="index" :src="getImageSrc(image)" :alt="image.devcode" width="100px" height="auto" >
                </div>
                <b-form-file v-model="file1" placeholder="Pilih foto" drop-placeholder="Pilih foto"></b-form-file>
               
              </b-col>
            </b-row>
  
            <b-button type="submit" variant="primary" :disabled="loadingCreate" @click="submitFoto(code)">Submit</b-button>
          </form>
        </b-modal>
      </div>
  
      <div class="card mt-3">
        <div class="d-flex align-items-center justify-content-end">

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
        optionRoles: [],
        optionInstansi: [],
        listImageKotamaData: [],
        keyword: "",
        loadingCreate: false,
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,
        errorImage: false,
        options: ["list", "of", "options"],
        id: null,
        code: null,
        file1: null,
        nama: "",
        alamat: "",
        linkGoogleMaps: "",
        latitude: "",
        longitude: "",
        errorAlamat: false,
        errorUrlGmaps: false,
        token: null,
        action: "create",
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
            field: "nama",
            key: "nama",
            title: "Nama Kotama / Balakpus",
            align: "left",
          },
          {
            field: "alamat",
            key: "alamat",
            title: "Alamat",
            align: "left",
          },
          {
            field: "",
            key: "e",
            title: "Action",
            width: "",
            center: "left",
  
            renderBodyCell: ({ row, column, rowIndex }, h) => {
              return (
                <span>
                &nbsp;
                <button
                  class="btn btn-outline-primary"
                  on-click={() => this.handleEditForm(row.id)}
                >
                  <i class="fa fa-pencil"></i>
                </button>
                &nbsp;
                <button
                  class="btn btn-outline-primary"
                  onClick={() => this.handleEditFoto(row.code)}
                >
                  Edit Logo
                </button>
              </span>
              );
            },
          },
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
      handleEditForm(id) {
        this.action = "update";
        this.id = id;
        this.$refs["modal-tambah-user"].show("modal-tambah-user");
  
        axios
          .get(`${process.env.VUE_APP_URL}mst-kotama/${id}`)
          .then((response) => {
            this.nama = response.data.data.nama;
            this.alamat = response.data.data.alamat;
            this.linkGoogleMaps = response.data.data.url_gmaps;
            this.latitude = response.data.data.latitude;
            this.longitude = response.data.data.longitude;
          });
      },

      handleEditFoto(code) {
        this.action = "update";
        this.code = code;
        this.$refs["modal-edit-foto"].show("modal-edit-foto");
      },
  
      handleClickSearch() {
        this.pageIndex = 1;
  
        this.getData();
      },
  
      onPressEnterSearch() {
        this.pageIndex = 1;
  
        this.getData();
      },
      alertUser(id) {
        swal({
          title: "Anda Yakin Hapus Data?",
          text: "Data yang dihapus tidak dapat kembali",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yakin !",
          cancelButtonText: "Batal",
          heightAuto: false,
        }).then((result) => {
          if (result.value) {
            this.deleteUser(id);
            swal({
              title: "Berhasil!",
              text: "Data Telah Dihapus.",
              type: "success",
              heightAuto: false,
            });
          }
        });
      },
  
      async deleteUser(id) {
        try {
          await axios.delete(`${process.env.VUE_APP_URL}users/${id}`, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
          this.getData();
        } catch (error) {
          console.error(error);
        }
      },
  
      async getData() {
        this.loadingInstance.show();
  
        try {
          await axios
            .get(
              `${process.env.VUE_APP_URL}mst-kotama?page=${this.pageIndex}&size=${this.pageSize}&search=${this.keyword}`
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
      },
  
      // reset field
      resetField() {
        this.id = null;
        this.linkGoogleMaps = "";
        this.nama = "";
        this.alamat = "";
        this.latitude = "";
        this.longitude = "";
        this.errorAlamat = false;
        this.errorUrlGmaps = false;
        this.action = "create";
      },
  
      // menambah data
      async submitForm() {
        if (this.validation()) {
          const data = {
            nama: this.nama,
            alamat: this.alamat,
            latitude:
            this.latitude !== ""
              ? this.latitude
              : null,
          longitude:
            this.longitude !== ""
              ? this.longitude
              : null,
          url_gmaps: this.linkGoogleMaps,
          };
  
          this.loadingCreate = true;
  
          if (this.id) {
            await axios
              .put(`${process.env.VUE_APP_URL}mst-kotama/${this.id}`, data, {
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
                });
                this.$refs["modal-tambah-user"].hide();
                this.getData();
                this.resetField();
              })
              .catch((error) => {
                this.loadingCreate = false;
  
                console.error(error);
                if (error.response.data.error_messages[0].msg) {
                  swal(
                    "Server error!",
                    error.response.data.error_messages[0].msg
                  );
                } else {
                  swal("Server error!", "Could not connect to the server!");
                }
              });
          } 
        }
      },

      async submitFoto(code) {
          const formData = new FormData();
          if (this.file1) {
            formData.append("image", this.file1);
          } else {
            formData.append("image", null);
          }
          this.loadingCreate = true;

          if (this.code) {
          await axios
            .put(`${process.env.VUE_APP_URL}mst-kotama/image/${code}`, formData)
            .then((response) => {
              this.loadingCreate = false;

              swal({
                title: "Success",
                text: "Data Berhasil Diubah",
                type: "success",
                timer: 2000,
              });
              this.$refs["modal-edit-foto"].hide();
              this.getData();
              this.resetField();
            })
            .catch((error) => {
              this.loadingCreate = false;

              console.error(error);
              if (error.response.data.error_messages[0].msg) {
                swal("Server error!", error.response.data.error_messages[0].msg);
              } else {
                swal("Server error!", "Could not connect to the server!");
              }
            });
        }
        
       
      },
      validation() {
        if (this.tipeAkun === "") {
          this.errorTipeAkun = true;
        } else {
          this.errorTipeAkun = false;
        }
  
        if (this.namaAdmin === "") {
          this.errorNamaAdmin = true;
        } else {
          this.errorNamaAdmin = false;
        }
  
        if (this.email === "") {
          this.errorEmail = true;
        } else {
          this.errorEmail = false;
        }
  
        if (this.action === "create") {
          if (this.password === "") {
            this.errorPassword = true;
          } else {
            this.errorPassword = false;
          }
        }
  
        if (this.userName === "") {
          this.errorUserName = true;
        } else {
          this.errorUserName = false;
        }
  
        if (this.keterangan === "") {
          this.errorKeterangan = true;
        } else {
          this.errorKeterangan = false;
        }
  
        if (
          this.tipeAkun === "" ||
          this.namaAdmin === "" ||
          this.email === "" ||
          this.userName === "" ||
          this.keterangan === ""
        ) {
          return false;
        } else if (this.action === "create" && this.password === "") {
          return false;
        } else {
          return true;
        }
      },

      validationImage() {
        if (this.file1 == null) {
          this.errorImage = true;
        } else{
          this.errorImage = false;
        }
      },

      async listimagelogo() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_URL}dashboard/image`);
        this.listImageKotamaData = response.data.images;
        console.log("image", this.listImageKotamaData)

      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    },
        getFilteredImages(code) {
        // Filter listImageKotamaData based on the selectedMarker.code
        return this.listImageKotamaData.filter(image => image.code == code);
      },
      getImageSrc(image) {
        // Return the base64 image source
        return 'data:image/jpeg;base64,' + image.imageBase64;
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
      this.listimagelogo();
      this.getData();
      this.getToken();
    },
    watch: {
      // whenever question changes, this function will run
      tipeAkun: function (newTipeAkun, oldTipeAkun) {
        if (oldTipeAkun !== null) {
          this.keterangan = null;
        }
      },

      linkGoogleMaps(val) {
      // Extract the latitude and longitude values from the link
      if (val) {
        const latlng = val.substring(
          val.indexOf("@") + 1,
          val.indexOf("z") - 1
        );
        const lat = latlng.split(",")[0];
        const lng = latlng.split(",")[1];
        this.latitude = lat;
        this.longitude = lng;
      } else {
        this.latitude = "";
        this.longitude = "";
      }
    },
    },
  };
  </script>
  
  <style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
  